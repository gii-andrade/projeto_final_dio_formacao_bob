import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerTrilhaTool } from './tools/trilha-tool.js';
import { registerDesafioTool } from './tools/desafio-tool.js';
import { registerCertificadoTool } from './tools/certificado-tool.js';
import { registerTrilhasResource } from './resources/trilhas-resource.js';
import { registerPrompts } from './prompts/index.js';

export function createDioMcpServer(): McpServer {
  const server = new McpServer({
    name: 'dio-explorer-mcp',
    version: '1.0.0',
  });

  // Tools — ações invocáveis pelo modelo
  registerTrilhaTool(server);
  registerDesafioTool(server);
  registerCertificadoTool(server);

  // Resources — dados contextuais acessíveis por URI
  registerTrilhasResource(server);

  // Prompts — templates reutilizáveis
  registerPrompts(server);

  return server;
}
