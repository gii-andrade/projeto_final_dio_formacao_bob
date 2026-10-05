import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { gerarDesafio, formatarDesafio } from '../../src/commands/desafio';
import { trilhaJavaMock, trilhaSemCertMock, alunoMock } from '../fixtures/mocks';

describe('/desafio — gerarDesafio()', () => {
  it('deve gerar um desafio para a trilha de Java', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    expect(desafio).toBeDefined();
    expect(desafio.trilha_id).toBe('trilha-004');
    expect(desafio.trilha_nome).toBe('Formação Java Developer');
  });

  it('deve associar o aluno correto ao desafio', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    expect(desafio.aluno.nome).toBe('João da Silva');
    expect(desafio.aluno.email).toBe('joao.silva@dio.me');
  });

  it('deve gerar tarefas específicas para Java', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    expect(desafio.tarefas.length).toBeGreaterThan(0);
    expect(desafio.tarefas.some((t) => t.toLowerCase().includes('spring boot'))).toBe(true);
  });

  it('deve atribuir XP e prazo ao desafio', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    expect(desafio.xp_disponivel).toBeGreaterThan(0);
    expect(desafio.prazo_dias).toBeGreaterThan(0);
  });

  it('deve gerar um ID com prefixo correto para o desafio', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    expect(desafio.id).toMatch(/^desafio-trilha-004-\d+$/);
  });

  it('deve usar template default para tecnologia desconhecida', () => {
    const desafio = gerarDesafio(alunoMock, trilhaSemCertMock);
    expect(desafio.tarefas).toContain('Definir requisitos do projeto');
  });

  it('deve lançar erro se o nome do aluno for vazio', () => {
    expect(() =>
      gerarDesafio({ nome: '', email: 'joao@dio.me' }, trilhaJavaMock)
    ).toThrow('Nome do aluno é obrigatório.');
  });

  it('deve lançar erro se o e-mail do aluno for inválido', () => {
    expect(() =>
      gerarDesafio({ nome: 'João', email: 'emailsemaroba' }, trilhaJavaMock)
    ).toThrow('E-mail do aluno inválido.');
  });

  it('deve salvar o desafio em arquivo quando outputPath for fornecido', () => {
    const tmpDir = os.tmpdir();
    const outputPath = path.join(tmpDir, `desafio_teste_${Date.now()}.txt`);
    gerarDesafio(alunoMock, trilhaJavaMock, outputPath);
    expect(fs.existsSync(outputPath)).toBe(true);
    const conteudo = fs.readFileSync(outputPath, 'utf-8');
    expect(conteudo).toContain('DESAFIO DIO');
    fs.unlinkSync(outputPath);
  });

  it('deve incluir a data de geração no desafio', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    expect(desafio.gerado_em).toBeTruthy();
    expect(new Date(desafio.gerado_em).getTime()).not.toBeNaN();
  });
});

describe('/desafio — formatarDesafio()', () => {
  it('deve incluir o título do desafio no texto formatado', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    const texto = formatarDesafio(desafio);
    expect(texto).toContain(desafio.titulo);
  });

  it('deve incluir o nome do aluno no texto formatado', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    const texto = formatarDesafio(desafio);
    expect(texto).toContain('João da Silva');
  });

  it('deve incluir a seção TAREFAS no texto formatado', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    const texto = formatarDesafio(desafio);
    expect(texto).toContain('TAREFAS:');
  });

  it('deve incluir o XP disponível', () => {
    const desafio = gerarDesafio(alunoMock, trilhaJavaMock);
    const texto = formatarDesafio(desafio);
    expect(texto).toContain('pontos');
  });
});
