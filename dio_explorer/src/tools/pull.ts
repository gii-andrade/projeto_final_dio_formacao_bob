import { executeGit } from '../services/git-executor';

export async function pull(repoPath: string, remote = 'origin', branch?: string): Promise<string> {
  const args = branch ? ['pull', remote, branch] : ['pull', remote];
  const result = await executeGit(args, repoPath);
  return result.stdout;
}
