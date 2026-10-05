import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { emitirCertificado, formatarCertificado, gerarCodigoVerificacao } from '../../src/commands/certificado';
import { trilhaJavaMock, trilhaSemCertMock, alunoMock } from '../fixtures/mocks';

describe('/certificado — gerarCodigoVerificacao()', () => {
  it('deve gerar um código no formato DIO-xxx-xxxxxxxx', () => {
    const codigo = gerarCodigoVerificacao('joao@dio.me', 'trilha-004', '2024-01-01T00:00:00.000Z');
    expect(codigo).toMatch(/^DIO-TRILHA-004-[0-9A-F]{8}$/);
  });

  it('deve gerar o mesmo código para os mesmos parâmetros (determinístico)', () => {
    const c1 = gerarCodigoVerificacao('joao@dio.me', 'trilha-004', '2024-01-01T00:00:00.000Z');
    const c2 = gerarCodigoVerificacao('joao@dio.me', 'trilha-004', '2024-01-01T00:00:00.000Z');
    expect(c1).toBe(c2);
  });

  it('deve gerar códigos diferentes para alunos diferentes', () => {
    const c1 = gerarCodigoVerificacao('joao@dio.me', 'trilha-004', '2024-01-01T00:00:00.000Z');
    const c2 = gerarCodigoVerificacao('maria@dio.me', 'trilha-004', '2024-01-01T00:00:00.000Z');
    expect(c1).not.toBe(c2);
  });
});

describe('/certificado — emitirCertificado()', () => {
  it('deve emitir certificado válido para trilha de Java', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    expect(cert).toBeDefined();
    expect(cert.valido).toBe(true);
    expect(cert.trilha_id).toBe('trilha-004');
  });

  it('deve associar o aluno correto ao certificado', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    expect(cert.aluno.nome).toBe('João da Silva');
    expect(cert.aluno.email).toBe('joao.silva@dio.me');
  });

  it('deve registrar o XP conquistado corretamente', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    expect(cert.xp_conquistado).toBe(16000);
  });

  it('deve registrar todos os módulos concluídos', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    expect(cert.modulos_concluidos).toBe(12);
  });

  it('deve incluir os badges conquistados', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    expect(cert.badges_conquistados.length).toBe(3);
    expect(cert.badges_conquistados.some((b) => b.includes('Java Rookie'))).toBe(true);
  });

  it('deve incluir um código de verificação no certificado', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    expect(cert.codigo_verificacao).toMatch(/^DIO-/);
  });

  it('deve lançar erro se o nome do aluno for vazio', () => {
    expect(() =>
      emitirCertificado({ nome: '', email: 'joao@dio.me' }, trilhaJavaMock)
    ).toThrow('Nome do aluno é obrigatório para emitir o certificado.');
  });

  it('deve lançar erro se o e-mail for inválido', () => {
    expect(() =>
      emitirCertificado({ nome: 'João', email: 'invalido' }, trilhaJavaMock)
    ).toThrow('E-mail do aluno inválido para emitir o certificado.');
  });

  it('deve lançar erro se a trilha não oferecer certificado', () => {
    expect(() =>
      emitirCertificado(alunoMock, trilhaSemCertMock)
    ).toThrow('não oferece certificado');
  });

  it('deve salvar o certificado em arquivo quando outputPath for fornecido', () => {
    const tmpDir = os.tmpdir();
    const outputPath = path.join(tmpDir, `cert_teste_${Date.now()}.txt`);
    emitirCertificado(alunoMock, trilhaJavaMock, outputPath);
    expect(fs.existsSync(outputPath)).toBe(true);
    const conteudo = fs.readFileSync(outputPath, 'utf-8');
    expect(conteudo).toContain('CERTIFICADO DE CONCLUSÃO');
    fs.unlinkSync(outputPath);
  });

  it('deve registrar a data de conclusão no certificado', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    expect(cert.data_conclusao).toBeTruthy();
    expect(new Date(cert.data_conclusao).getTime()).not.toBeNaN();
  });
});

describe('/certificado — formatarCertificado()', () => {
  it('deve incluir o nome do aluno no certificado formatado', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    const texto = formatarCertificado(cert);
    expect(texto).toContain('JOÃO DA SILVA');
  });

  it('deve incluir o nome da trilha no certificado formatado', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    const texto = formatarCertificado(cert);
    expect(texto).toContain('Formação Java Developer');
  });

  it('deve incluir o código de verificação no texto formatado', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    const texto = formatarCertificado(cert);
    expect(texto).toContain(cert.codigo_verificacao);
  });

  it('deve incluir os badges no certificado', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    const texto = formatarCertificado(cert);
    expect(texto).toContain('Java Rookie');
  });

  it('deve incluir mensagem de parabéns', () => {
    const cert = emitirCertificado(alunoMock, trilhaJavaMock);
    const texto = formatarCertificado(cert);
    expect(texto).toContain('Parabéns');
  });
});
