import { Trilha } from './trilha';
export interface Aluno {
    nome: string;
    email: string;
}
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
