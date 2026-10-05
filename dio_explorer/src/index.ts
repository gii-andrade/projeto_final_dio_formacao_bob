import { createServer } from './server';

async function main() {
  const server = createServer();
  await server.start();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
