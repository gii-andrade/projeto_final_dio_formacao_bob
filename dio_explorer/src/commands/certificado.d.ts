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
export declare function gerarCodigoVerificacao(alunoEmail: string, trilhaId: string, dataConclusao: string): string;
export declare function emitirCertificado(aluno: Aluno, trilha: Trilha, outputPath?: string): Certificado;
export declare function formatarCertificado(cert: Certificado): string;
