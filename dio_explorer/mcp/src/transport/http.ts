import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { validateBearerToken } from '../auth/bearer.js';

const PORT = parseInt(process.env['MCP_PORT'] ?? '3333', 10);
const HOST = process.env['MCP_HOST'] ?? '0.0.0.0';
const HTTPS_CERT = process.env['MCP_HTTPS_CERT'];
const HTTPS_KEY = process.env['MCP_HTTPS_KEY'];

export async function startHttpTransport(server: McpServer): Promise<void> {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
  });

  // Conector MCP → transporte HTTP
  await server.connect(transport);

  /**
   * Handler HTTP principal.
   * Todas as requisições passam pelo Bearer auth antes de chegar ao transporte MCP.
   */
  const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse): void => {
    // Health check — sem autenticação
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', server: 'dio-explorer-mcp', version: '1.0.0' }));
      return;
    }

    // Bearer token auth para todos os outros endpoints
    const auth = validateBearerToken(req.headers['authorization']);
    if (!auth.valid) {
      res.writeHead(auth.status, {
        'Content-Type': 'application/json',
        'WWW-Authenticate': 'Bearer realm="dio-explorer-mcp"',
      });
      res.end(JSON.stringify({ error: auth.message }));
      console.error(`[dio-explorer-mcp] Auth falhou (${auth.status}): ${req.method} ${req.url}`);
      return;
    }

    // Delega ao transporte MCP (Streamable HTTP)
    transport.handleRequest(req, res).catch((err: unknown) => {
      console.error('[dio-explorer-mcp] Erro no transporte HTTP:', err);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno do servidor MCP.' }));
      }
    });
  };

  // Decide se inicia HTTP simples ou HTTPS
  let httpServer: http.Server | https.Server;

  if (HTTPS_CERT && HTTPS_KEY) {
    const tlsOptions = {
      cert: fs.readFileSync(HTTPS_CERT),
      key: fs.readFileSync(HTTPS_KEY),
    };
    httpServer = https.createServer(tlsOptions, requestHandler);
    console.error(`[dio-explorer-mcp] Servidor HTTPS iniciando em https://${HOST}:${PORT}`);
  } else {
    httpServer = http.createServer(requestHandler);
    console.error(`[dio-explorer-mcp] Servidor HTTP iniciando em http://${HOST}:${PORT}`);
    if (process.env['NODE_ENV'] === 'production') {
      console.error('[dio-explorer-mcp] ⚠️  AVISO: Use HTTPS em produção. Defina MCP_HTTPS_CERT e MCP_HTTPS_KEY.');
    }
  }

  httpServer.listen(PORT, HOST, () => {
    const protocol = HTTPS_CERT && HTTPS_KEY ? 'https' : 'http';
    console.error(`[dio-explorer-mcp] Pronto em ${protocol}://${HOST}:${PORT}`);
    console.error(`[dio-explorer-mcp] Health check: ${protocol}://${HOST}:${PORT}/health`);
    console.error(
      process.env['MCP_API_KEY']
        ? '[dio-explorer-mcp] Autenticação Bearer: ATIVADA ✅'
        : '[dio-explorer-mcp] Autenticação Bearer: DESATIVADA ⚠️  (defina MCP_API_KEY para produção)'
    );
  });
}
