#!/usr/bin/env node
/**
 * DIO Explorer MCP Server — Entry Point
 *
 * Modos de transporte suportados:
 *   stdio  (padrão) — usado pelo Bob/Claude Desktop como processo filho
 *   http           — servidor HTTP/HTTPS para acesso via API ou SSO
 *
 * Selecione o transporte pela variável de ambiente:
 *   MCP_TRANSPORT=stdio  (padrão)
 *   MCP_TRANSPORT=http
 *
 * Variáveis adicionais para modo HTTP:
 *   MCP_PORT        — porta HTTP (padrão: 3333)
 *   MCP_HOST        — host (padrão: 0.0.0.0)
 *   MCP_API_KEY     — chave Bearer obrigatória em modo HTTP
 *   MCP_HTTPS_CERT  — caminho para certificado TLS (opcional)
 *   MCP_HTTPS_KEY   — caminho para chave TLS (opcional)
 */
import { createDioMcpServer } from './server.js';
import { startStdioTransport } from './transport/stdio.js';
import { startHttpTransport } from './transport/http.js';
const transport = process.env['MCP_TRANSPORT'] ?? 'stdio';
async function main() {
    const server = createDioMcpServer();
    if (transport === 'http') {
        await startHttpTransport(server);
    }
    else {
        await startStdioTransport(server);
    }
}
main().catch((err) => {
    console.error('[dio-explorer-mcp] Fatal error:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map