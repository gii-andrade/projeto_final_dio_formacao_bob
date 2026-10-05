import { z } from 'zod';
import { gerarDesafio, formatarDesafio } from '../../../src/commands/desafio.js';
import { buscarTrilha } from '../../../src/commands/trilha.js';
import { resolveDataPath, resolveOutputPath } from '../utils/paths.js';
export function registerDesafioTool(server) {
    server.registerTool('gerar_desafio', {
        description: 'Gera um desafio prático personalizado para um aluno com base em uma trilha da DIO. ' +
            'O desafio inclui tarefas, XP disponível, prazo e pode ser salvo em arquivo.',
        inputSchema: z.object({
            aluno_nome: z.string().min(1).describe('Nome completo do aluno'),
            aluno_email: z.string().email().describe('E-mail do aluno (ex: joao@dio.me)'),
            tecnologia: z
                .string()
                .min(1)
                .describe('Tecnologia ou nome da trilha (ex: "java", "python", "kubernetes")'),
            salvar_arquivo: z
                .boolean()
                .default(false)
                .describe('Se true, salva o desafio em um arquivo .txt na pasta docs/'),
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
                            text: `Nenhuma trilha encontrada para "${tecnologia}". Use a tool "buscar_trilha" para ver as disponíveis.`,
                        },
                    ],
                    isError: true,
                };
            }
            const trilha = resultado.encontradas[0];
            const aluno = { nome: aluno_nome, email: aluno_email };
            let outputPath;
            if (salvar_arquivo) {
                const nomeArquivo = `desafio_${aluno_nome.toLowerCase().replace(/\s+/g, '_')}_${trilha.id}.txt`;
                outputPath = resolveOutputPath(nomeArquivo);
            }
            const desafio = gerarDesafio(aluno, trilha, outputPath);
            const texto = formatarDesafio(desafio);
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
                    { type: 'text', text: `Erro ao gerar desafio: ${err instanceof Error ? err.message : String(err)}` },
                ],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=desafio-tool.js.map