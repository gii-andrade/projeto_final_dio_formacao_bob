import { z } from 'zod';
import { buscarTrilha, formatarTrilha, carregarTrilhas } from '../lib/dio.js';
import { resolveDataPath } from '../utils/paths.js';
export function registerTrilhaTool(server) {
    /**
     * Tool: buscar_trilha
     * Busca trilhas DIO por tecnologia, nome ou descrição.
     */
    server.registerTool('buscar_trilha', {
        description: 'Busca trilhas de aprendizado na DIO por tecnologia, nome ou palavra-chave. ' +
            'Exemplos de termos: "java", "python", "kubernetes", "spring boot".',
        inputSchema: z.object({
            termo: z
                .string()
                .min(1)
                .describe('Termo de busca (tecnologia, nome da trilha ou palavra-chave)'),
            formato: z
                .enum(['resumo', 'completo'])
                .default('resumo')
                .describe('Formato da resposta: "resumo" (uma linha por trilha) ou "completo" (com módulos e badges)'),
        }),
    }, async ({ termo, formato }) => {
        try {
            const dataPath = resolveDataPath();
            const resultado = buscarTrilha(termo, dataPath);
            if (resultado.total === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Nenhuma trilha encontrada para o termo "${termo}". Tente: "java", "python", "kubernetes" ou "machine learning".`,
                        },
                    ],
                };
            }
            let texto;
            if (formato === 'completo') {
                texto = resultado.encontradas.map(formatarTrilha).join('\n\n' + '─'.repeat(60) + '\n\n');
            }
            else {
                texto = resultado.encontradas
                    .map((t) => `• ${t.nome} [${t.nivel}] — ${t.numero_de_modulos} módulos, ${t.xp_total.toLocaleString('pt-BR')} XP, ${t.duracao_estimada_horas}h`)
                    .join('\n');
                texto = `Encontradas ${resultado.total} trilha(s) para "${termo}":\n\n${texto}`;
            }
            return { content: [{ type: 'text', text: texto }] };
        }
        catch (err) {
            return {
                content: [{ type: 'text', text: `Erro ao buscar trilha: ${err instanceof Error ? err.message : String(err)}` }],
                isError: true,
            };
        }
    });
    /**
     * Tool: listar_trilhas
     * Lista todas as trilhas disponíveis.
     */
    server.registerTool('listar_trilhas', {
        description: 'Lista todas as trilhas de aprendizado disponíveis na DIO com informações básicas.',
        inputSchema: z.object({}),
    }, async () => {
        try {
            const dataPath = resolveDataPath();
            const trilhas = carregarTrilhas(dataPath);
            const lista = trilhas
                .map((t, i) => `${i + 1}. ${t.nome}\n   Tecnologia: ${t.tecnologia}\n   Nível: ${t.nivel} | Módulos: ${t.numero_de_modulos} | XP: ${t.xp_total.toLocaleString('pt-BR')}`)
                .join('\n\n');
            return {
                content: [{ type: 'text', text: `📚 Trilhas disponíveis na DIO (${trilhas.length} total):\n\n${lista}` }],
            };
        }
        catch (err) {
            return {
                content: [{ type: 'text', text: `Erro ao listar trilhas: ${err instanceof Error ? err.message : String(err)}` }],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=trilha-tool.js.map