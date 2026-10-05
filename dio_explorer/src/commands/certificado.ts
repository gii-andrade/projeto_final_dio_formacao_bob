import * as fs from 'fs';
import * as path from 'path';
import { Aluno } from './desafio';
import { Trilha } from './trilha';

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
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  return `DIO-${trilhaId.toUpperCase()}-${hex}`;
}

export function emitirCertificado(aluno: Aluno, trilha: Trilha, outputPath?: string): Certificado {
  if (!aluno.nome || aluno.nome.trim() === '') {
    throw new Error('Nome do aluno é obrigatório para emitir o certificado.');
  }
  if (!aluno.email || !aluno.email.includes('@')) {
    throw new Error('E-mail do aluno inválido para emitir o certificado.');
  }
  if (!trilha.certificado) {
    throw new Error(`A trilha "${trilha.nome}" não oferece certificado.`);
  }

  const dataConclusao = new Date().toISOString();
  const codigoVerificacao = gerarCodigoVerificacao(aluno.email, trilha.id, dataConclusao);

  const badgesConquistados = trilha.badges
    ? trilha.badges.map((b) => `${b.icone} ${b.nome}`)
    : [];

  const certificado: Certificado = {
    id: `cert-${trilha.id}-${Date.now()}`,
    aluno,
    trilha_id: trilha.id,
    trilha_nome: trilha.nome,
    tecnologia: trilha.tecnologia,
    nivel: trilha.nivel,
    modulos_concluidos: trilha.numero_de_modulos,
    xp_conquistado: trilha.xp_total,
    badges_conquistados: badgesConquistados,
    data_conclusao: dataConclusao,
    codigo_verificacao: codigoVerificacao,
    valido: true,
  };

  if (outputPath) {
    const conteudo = formatarCertificado(certificado);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, conteudo, 'utf-8');
  }

  return certificado;
}

export function formatarCertificado(cert: Certificado): string {
  const linhas: string[] = [
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
  ];
  return linhas.join('\n');
}
