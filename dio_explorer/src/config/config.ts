export const config = {
  git: {
    defaultBranch: process.env.DEFAULT_BRANCH || 'main',
    timeout: parseInt(process.env.GIT_TIMEOUT || '30000', 10),
  },
  server: {
    name: 'dio-explorer-mcp',
    version: '1.0.0',
  },
};
