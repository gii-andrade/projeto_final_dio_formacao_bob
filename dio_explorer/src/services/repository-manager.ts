import { executeGit } from './git-executor';

export class RepositoryManager {
  async getStatus(repoPath: string): Promise<string> {
    const result = await executeGit(['status', '--porcelain'], repoPath);
    return result.stdout;
  }

  async listBranches(repoPath: string): Promise<string[]> {
    const result = await executeGit(['branch', '--list'], repoPath);
    return result.stdout
      .split('\n')
      .map((b) => b.trim().replace(/^\*\s*/, ''))
      .filter(Boolean);
  }
}
