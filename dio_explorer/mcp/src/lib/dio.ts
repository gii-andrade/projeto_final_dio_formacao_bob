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

export interface Aluno {
  nome: string;
  email: string;
}

export interface TrilhaResult {
  encontradas: Trilha[];
  termo: string;
  total: number;
}

// ── Trilha ────────────────────────────────────────────────────────────────────

export function carregarTrilhas(dataPath: string): Trilha[] {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return (JSON.parse(raw) as { trilhas: Trilha[] }).trilhas;
}

export function buscarTrilha(termo: string, dataPath: string): TrilhaResult {
  if (!termo || termo.trim() === '') throw new Error('Termo de busca não pode ser vazio.');
  const trilhas = carregarTrilhas(dataPath);
  const termoNorm = termo.toLowerCase().trim();
  const encontradas = trilhas.filter(
    (t) =>
      t.nome.toLowerCase().includes(termoNorm) ||
      t.tecnologia.toLowerCase().includes(termoNorm) ||
      t.descricao.toLowerCase().includes(termoNorm)
  );
  return { encontradas, termo, total: encontradas.length };
}

export function formatarTrilha(trilha: Trilha): string {
  return [
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
  ].join('\n');
}

// ── Desafio ───────────────────────────────────────────────────────────────────

export interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
  trilha_id: string;
  trilha_nome: string;
  aluno: Aluno;
  tarefas: string[];
  xp_disponivel: number;
  prazo_dias: number;
  gerado_em: string;
}

const DESAFIOS_POR_TECNOLOGIA: Record<string, { titulo: string; tarefas: string[]; xp: number; prazo: number }> = {
  java: {
    titulo: 'Construa uma API REST de Gerenciamento de Tarefas com Java',
    tarefas: [
      'Configurar projeto Spring Boot com Maven',
      'Modelar a entidade Tarefa (id, titulo, descricao, status, dataCriacao)',
      'Implementar repositório JPA (TarefaRepository)',
      'Criar service com regras de negócio (TarefaService)',
      'Expor endpoints REST: GET /tarefas, POST /tarefas, PUT /tarefas/{id}, DELETE /tarefas/{id}',
      'Adicionar validações com Bean Validation (@NotBlank, @NotNull)',
      'Escrever testes unitários com JUnit 5 e Mockito (cobertura mínima 70%)',
      'Documentar a API com Springdoc OpenAPI (Swagger UI)',
    ],
    xp: 3000,
    prazo: 7,
  },
  python: {
    titulo: 'Desenvolva uma API de Blog com Django REST Framework',
    tarefas: [
      'Criar projeto Django e configurar DRF',
      'Modelar entidades Post e Comentario',
      'Implementar serializers e viewsets',
      'Adicionar autenticação JWT com SimpleJWT',
      'Escrever testes com pytest-django',
    ],
    xp: 2500,
    prazo: 7,
  },
  default: {
    titulo: 'Projeto Prático de Desenvolvimento de Software',
    tarefas: [
      'Definir requisitos do projeto',
      'Implementar funcionalidades principais',
      'Escrever testes automatizados',
      'Documentar o código',
    ],
    xp: 2000,
    prazo: 7,
  },
};

export function gerarDesafio(aluno: Aluno, trilha: Trilha, outputPath?: string): Desafio {
  if (!aluno.nome || aluno.nome.trim() === '') throw new Error('Nome do aluno é obrigatório.');
  if (!aluno.email || !aluno.email.includes('@')) throw new Error('E-mail do aluno inválido.');
  const chave =
    Object.keys(DESAFIOS_POR_TECNOLOGIA).find((k) => trilha.tecnologia.toLowerCase().includes(k)) ?? 'default';
  const template = DESAFIOS_POR_TECNOLOGIA[chave]!;
  const desafio: Desafio = {
    id: `desafio-${trilha.id}-${Date.now()}`,
    titulo: template.titulo,
    descricao: `Desafio prático da trilha "${trilha.nome}" para consolidar o aprendizado de ${trilha.tecnologia}.`,
    tecnologia: trilha.tecnologia,
    nivel: trilha.nivel,
    trilha_id: trilha.id,
    trilha_nome: trilha.nome,
    aluno,
    tarefas: template.tarefas,
    xp_disponivel: template.xp,
    prazo_dias: template.prazo,
    gerado_em: new Date().toISOString(),
  };
  if (outputPath) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, formatarDesafio(desafio), 'utf-8');
  }
  return desafio;
}

export function formatarDesafio(desafio: Desafio): string {
  return [
    '='.repeat(60),
    `  DESAFIO DIO — ${desafio.tecnologia.toUpperCase()}`,
    '='.repeat(60),
    '',
    `Título   : ${desafio.titulo}`,
    `Nível    : ${desafio.nivel}`,
    `Trilha   : ${desafio.trilha_nome}`,
    `Aluno    : ${desafio.aluno.nome}`,
    `E-mail   : ${desafio.aluno.email}`,
    `XP       : ${desafio.xp_disponivel.toLocaleString('pt-BR')} pontos`,
    `Prazo    : ${desafio.prazo_dias} dias`,
    `Gerado em: ${new Date(desafio.gerado_em).toLocaleString('pt-BR')}`,
    '',
    'TAREFAS:',
    ...desafio.tarefas.map((t, i) => `  ${i + 1}. ${t}`),
    '',
    `Descrição: ${desafio.descricao}`,
    '',
    '='.repeat(60),
    'Boa sorte! Complete o desafio e suba no seu GitHub. 🚀',
    '='.repeat(60),
  ].join('\n');
}

// ── Certificado ───────────────────────────────────────────────────────────────

export interface Certificado {
  id: string;
  aluno: Aluno;
  trilha_id: string;
  trilha_nome: string;
  tecnologia: string;
  nivel: string;
  modulos_concluidos: number;
  xp_conquistado: number;
  badges_conquistados: string[];
  data_conclusao: string;
  codigo_verificacao: string;
  valido: boolean;
}

export function gerarCodigoVerificacao(alunoEmail: string, trilhaId: string, dataConclusao: string): string {
  const base = `${alunoEmail}|${trilhaId}|${dataConclusao}`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    const char = base.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `DIO-${trilhaId.toUpperCase()}-${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
}

export function emitirCertificado(aluno: Aluno, trilha: Trilha, outputPath?: string): Certificado {
  if (!aluno.nome || aluno.nome.trim() === '') throw new Error('Nome do aluno é obrigatório para emitir o certificado.');
  if (!aluno.email || !aluno.email.includes('@')) throw new Error('E-mail do aluno inválido para emitir o certificado.');
  if (!trilha.certificado) throw new Error(`A trilha "${trilha.nome}" não oferece certificado.`);
  const dataConclusao = new Date().toISOString();
  const cert: Certificado = {
    id: `cert-${trilha.id}-${Date.now()}`,
    aluno,
    trilha_id: trilha.id,
    trilha_nome: trilha.nome,
    tecnologia: trilha.tecnologia,
    nivel: trilha.nivel,
    modulos_concluidos: trilha.numero_de_modulos,
    xp_conquistado: trilha.xp_total,
    badges_conquistados: trilha.badges ? trilha.badges.map((b) => `${b.icone} ${b.nome}`) : [],
    data_conclusao: dataConclusao,
    codigo_verificacao: gerarCodigoVerificacao(aluno.email, trilha.id, dataConclusao),
    valido: true,
  };
  if (outputPath) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, formatarCertificado(cert), 'utf-8');
  }
  return cert;
}

export function formatarCertificado(cert: Certificado): string {
  return [
    '*'.repeat(60),
    '*' + ' '.repeat(58) + '*',
    `*${'CERTIFICADO DE CONCLUSÃO'.padStart(41).padEnd(58)}*`,
    `*${'Digital Innovation One'.padStart(40).padEnd(58)}*`,
    '*' + ' '.repeat(58) + '*',
    '*'.repeat(60),
    '',
    `Certificamos que`,
    '',
    `  👤 ${cert.aluno.nome.toUpperCase()}`,
    `  📧 ${cert.aluno.email}`,
    '',
    `concluiu com êxito a trilha:`,
    '',
    `  📚 ${cert.trilha_nome}`,
    `     Tecnologia : ${cert.tecnologia}`,
    `     Nível      : ${cert.nivel}`,
    `     Módulos    : ${cert.modulos_concluidos}`,
    `     XP Total   : ${cert.xp_conquistado.toLocaleString('pt-BR')} pontos`,
    '',
    `Badges conquistados:`,
    ...cert.badges_conquistados.map((b) => `  • ${b}`),
    '',
    `Data de conclusão : ${new Date(cert.data_conclusao).toLocaleDateString('pt-BR')}`,
    `Código de verificação: ${cert.codigo_verificacao}`,
    '',
    '*'.repeat(60),
    '*' + ' '.repeat(58) + '*',
    `*${'Parabéns! Continue evoluindo na DIO. 🚀'.padStart(49).padEnd(58)}*`,
    '*' + ' '.repeat(58) + '*',
    '*'.repeat(60),
  ].join('\n');
}
