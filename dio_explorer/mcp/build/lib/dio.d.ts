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
export declare function carregarTrilhas(dataPath: string): Trilha[];
export declare function buscarTrilha(termo: string, dataPath: string): TrilhaResult;
export declare function formatarTrilha(trilha: Trilha): string;
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
export declare function gerarDesafio(aluno: Aluno, trilha: Trilha, outputPath?: string): Desafio;
export declare function formatarDesafio(desafio: Desafio): string;
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
export declare function gerarCodigoVerificacao(alunoEmail: string, trilhaId: string, dataConclusao: string): string;
export declare function emitirCertificado(aluno: Aluno, trilha: Trilha, outputPath?: string): Certificado;
export declare function formatarCertificado(cert: Certificado): string;
