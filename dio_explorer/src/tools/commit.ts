import { executeGit } from '../services/git-executor';

export async function commit(repoPath: string, message: string): Promise<string> {
  const result = await executeGit(['commit', '-m', message], repoPath);
  return result.stdout;
}
