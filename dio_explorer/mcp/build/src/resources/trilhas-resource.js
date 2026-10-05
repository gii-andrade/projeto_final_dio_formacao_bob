import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { carregarTrilhas } from '../../../src/commands/trilha.js';
import { resolveDataPath } from '../utils/paths.js';
export function registerTrilhasResource(server) {
    /**
     * Resource: dio://trilhas
     * Retorna o catálogo completo de trilhas em JSON.
     */
    server.resource('trilhas', 'dio://trilhas', async (uri) => {
        const dataPath = resolveDataPath();
        const trilhas = carregarTrilhas(dataPath);
        return {
            contents: [
                {
                    uri: uri.href,
                    mimeType: 'application/json',
                    text: JSON.stringify({ trilhas, total: trilhas.length }, null, 2),
                },
            ],
        };
    });
    /**
     * Resource Template: dio://trilhas/{id}
     * Retorna uma trilha específica por ID.
     */
    server.resource('trilha-por-id', new ResourceTemplate('dio://trilhas/{id}', { list: undefined }), async (uri, { id }) => {
        const dataPath = resolveDataPath();
        const trilhas = carregarTrilhas(dataPath);
        const trilhaId = Array.isArray(id) ? id[0] : id;
        const trilha = trilhas.find((t) => t.id === trilhaId);
        if (!trilha) {
            return {
                contents: [
                    {
                        uri: uri.href,
                        mimeType: 'application/json',
                        text: JSON.stringify({ error: `Trilha "${trilhaId}" não encontrada.` }),
                    },
                ],
            };
        }
        return {
            contents: [
                {
                    uri: uri.href,
                    mimeType: 'application/json',
                    text: JSON.stringify(trilha, null, 2),
                },
            ],
        };
    });
}
//# sourceMappingURL=trilhas-resource.js.map