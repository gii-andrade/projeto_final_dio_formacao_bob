import { executeGit } from '../services/git-executor';

export async function status(repoPath: string): Promise<string> {
  const result = await executeGit(['status'], repoPath);
  return result.stdout;
}
