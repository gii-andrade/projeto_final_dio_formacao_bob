import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
export async function startStdioTransport(server) {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('[dio-explorer-mcp] Servidor rodando em modo stdio.');
}
//# sourceMappingURL=stdio.js.map