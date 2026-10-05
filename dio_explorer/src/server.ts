import { config } from './config/config';
import { logger } from './utils/logger';

export function createServer() {
  return {
    async start() {
      logger.info(`Starting ${config.server.name} v${config.server.version}`);
      // MCP server initialization will go here
    },
  };
}
