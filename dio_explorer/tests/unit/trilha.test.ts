import * as path from 'path';
import { buscarTrilha, carregarTrilhas, formatarTrilha } from '../../src/commands/trilha';
import { trilhaJavaMock } from '../fixtures/mocks';

const FIXTURE_PATH = path.resolve(__dirname, '../fixtures/trilhas_mock.json');

describe('/trilha — carregarTrilhas()', () => {
  it('deve carregar trilhas do arquivo JSON de fixture', () => {
    const trilhas = carregarTrilhas(FIXTURE_PATH);
    expect(trilhas).toBeInstanceOf(Array);
    expect(trilhas.length).toBeGreaterThan(0);
  });

  it('deve conter a trilha de Java no fixture', () => {
    const trilhas = carregarTrilhas(FIXTURE_PATH);
    const java = trilhas.find((t) => t.id === 'trilha-004');
    expect(java).toBeDefined();
    expect(java?.nome).toBe('Formação Java Developer');
  });

  it('deve lançar erro se o arquivo não existir', () => {
    expect(() => carregarTrilhas('/caminho/inexistente.json')).toThrow();
  });
});

describe('/trilha — buscarTrilha()', () => {
  it('deve encontrar a trilha de Java pelo termo "java"', () => {
    const result = buscarTrilha('java', FIXTURE_PATH);
    expect(result.total).toBeGreaterThan(0);
    expect(result.encontradas[0].nome).toContain('Java');
  });

  it('deve encontrar a trilha pelo termo "Spring Boot"', () => {
    const result = buscarTrilha('Spring Boot', FIXTURE_PATH);
    expect(result.total).toBeGreaterThan(0);
  });

  it('deve retornar zero resultados para termo que não existe', () => {
    const result = buscarTrilha('COBOL', FIXTURE_PATH);
    expect(result.total).toBe(0);
    expect(result.encontradas).toHaveLength(0);
  });

  it('deve retornar o termo original no resultado', () => {
    const result = buscarTrilha('java', FIXTURE_PATH);
    expect(result.termo).toBe('java');
  });

  it('deve lançar erro se o termo for vazio', () => {
    expect(() => buscarTrilha('', FIXTURE_PATH)).toThrow('Termo de busca não pode ser vazio.');
  });

  it('deve lançar erro se o termo for apenas espaços', () => {
    expect(() => buscarTrilha('   ', FIXTURE_PATH)).toThrow('Termo de busca não pode ser vazio.');
  });

  it('deve fazer busca case-insensitive', () => {
    const lower = buscarTrilha('java', FIXTURE_PATH);
    const upper = buscarTrilha('JAVA', FIXTURE_PATH);
    expect(lower.total).toBe(upper.total);
  });
});

describe('/trilha — formatarTrilha()', () => {
  it('deve incluir o nome da trilha na saída formatada', () => {
    const saida = formatarTrilha(trilhaJavaMock);
    expect(saida).toContain('Formação Java Developer');
  });

  it('deve incluir a tecnologia na saída formatada', () => {
    const saida = formatarTrilha(trilhaJavaMock);
    expect(saida).toContain('Java');
  });

  it('deve incluir o número de módulos na saída', () => {
    const saida = formatarTrilha(trilhaJavaMock);
    expect(saida).toContain('12');
  });

  it('deve listar os módulos numerados', () => {
    const saida = formatarTrilha(trilhaJavaMock);
    expect(saida).toContain('1. Fundamentos de Java');
  });

  it('deve indicar que tem certificado', () => {
    const saida = formatarTrilha(trilhaJavaMock);
    expect(saida).toContain('Sim');
  });
});
