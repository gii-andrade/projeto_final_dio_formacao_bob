import { executeGit } from '../services/git-executor';

export async function push(repoPath: string, remote = 'origin', branch?: string): Promise<string> {
  const args = branch ? ['push', remote, branch] : ['push', remote];
  const result = await executeGit(args, repoPath);
  return result.stdout || result.stderr;
}
