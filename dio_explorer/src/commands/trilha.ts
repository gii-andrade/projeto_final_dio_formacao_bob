import * as fs from 'fs';
import * as path from 'path';

export interface Trilha {
  id: string;
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
  numero_de_modulos: number;
  xp_total: number;
  duracao_estimada_horas: number;
  certificado: boolean;
  vitalicio: boolean;
  modulos: string[];
  badges: Badge[];
  promocoes: Promocao[];
}

export interface Badge {
  id: string;
  nome: string;
  descricao: string;
  xp_requerido: number;
  icone: string;
}

export interface Promocao {
  id: string;
  descricao: string;
  desconto_percentual: number;
  validade: string;
  codigo_cupom: string;
}

export interface TrilhaResult {
  encontradas: Trilha[];
  termo: string;
  total: number;
}

export function carregarTrilhas(dataPath?: string): Trilha[] {
  const filePath = dataPath ?? path.resolve(__dirname, '../../data/trilhas_dio.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(raw) as { trilhas: Trilha[] };
  return parsed.trilhas;
}

export function buscarTrilha(termo: string, dataPath?: string): TrilhaResult {
  if (!termo || termo.trim() === '') {
    throw new Error('Termo de busca não pode ser vazio.');
  }

  const trilhas = carregarTrilhas(dataPath);
  const termoNorm = termo.toLowerCase().trim();

  const encontradas = trilhas.filter(
    (t) =>
      t.nome.toLowerCase().includes(termoNorm) ||
      t.tecnologia.toLowerCase().includes(termoNorm) ||
      t.descricao.toLowerCase().includes(termoNorm)
  );

  return {
    encontradas,
    termo,
    total: encontradas.length,
  };
}

export function formatarTrilha(trilha: Trilha): string {
  const linhas: string[] = [
    `📚 ${trilha.nome}`,
    `   ID       : ${trilha.id}`,
    `   Tecnologia: ${trilha.tecnologia}`,
    `   Nível    : ${trilha.nivel}`,
    `   Módulos  : ${trilha.numero_de_modulos}`,
    `   XP Total : ${trilha.xp_total.toLocaleString('pt-BR')}`,
    `   Duração  : ${trilha.duracao_estimada_horas}h`,
    `   Certificado: ${trilha.certificado ? 'Sim ✅' : 'Não'}`,
    `   Módulos na trilha:`,
    ...trilha.modulos.map((m, i) => `     ${i + 1}. ${m}`),
  ];
  return linhas.join('\n');
}
