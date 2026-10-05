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
export declare function carregarTrilhas(dataPath?: string): Trilha[];
export declare function buscarTrilha(termo: string, dataPath?: string): TrilhaResult;
export declare function formatarTrilha(trilha: Trilha): string;
