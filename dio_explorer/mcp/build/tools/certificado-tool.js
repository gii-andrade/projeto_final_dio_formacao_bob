import { z } from 'zod';
import { emitirCertificado, formatarCertificado, buscarTrilha } from '../lib/dio.js';
import { resolveDataPath, resolveOutputPath } from '../utils/paths.js';
export function registerCertificadoTool(server) {
    server.registerTool('emitir_certificado', {
        description: 'Emite um certificado de conclusão para um aluno que completou uma trilha da DIO. ' +
            'Gera um código de verificação único e pode salvar o certificado em arquivo.',
        inputSchema: z.object({
            aluno_nome: z.string().min(1).describe('Nome completo do aluno'),
            aluno_email: z.string().email().describe('E-mail do aluno (ex: joao@dio.me)'),
            tecnologia: z
                .string()
                .min(1)
                .describe('Tecnologia ou nome da trilha concluída (ex: "java", "python")'),
            salvar_arquivo: z
                .boolean()
                .default(false)
                .describe('Se true, salva o certificado em um arquivo .txt na pasta docs/'),
        }),
    }, async ({ aluno_nome, aluno_email, tecnologia, salvar_arquivo }) => {
        try {
            const dataPath = resolveDataPath();
            const resultado = buscarTrilha(tecnologia, dataPath);
            if (resultado.total === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Nenhuma trilha encontrada para "${tecnologia}". Use "buscar_trilha" para ver as disponíveis.`,
                        },
                    ],
                    isError: true,
                };
            }
            const trilha = resultado.encontradas[0];
            if (!trilha.certificado) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `A trilha "${trilha.nome}" não oferece certificado de conclusão.`,
                        },
                    ],
                    isError: true,
                };
            }
            const aluno = { nome: aluno_nome, email: aluno_email };
            let outputPath;
            if (salvar_arquivo) {
                const nomeArquivo = `certificado_${aluno_nome.toLowerCase().replace(/\s+/g, '_')}_${trilha.id}.txt`;
                outputPath = resolveOutputPath(nomeArquivo);
            }
            const certificado = emitirCertificado(aluno, trilha, outputPath);
            const texto = formatarCertificado(certificado);
            const aviso = outputPath
                ? `\n\n📁 Arquivo salvo em: ${outputPath}`
                : '';
            return {
                content: [{ type: 'text', text: texto + aviso }],
            };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Erro ao emitir certificado: ${err instanceof Error ? err.message : String(err)}`,
                    },
                ],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=certificado-tool.js.map