import { executeGit } from '../services/git-executor';

export async function checkout(repoPath: string, branch: string, create = false): Promise<string> {
  const args = create ? ['checkout', '-b', branch] : ['checkout', branch];
  const result = await executeGit(args, repoPath);
  return result.stdout || result.stderr;
}
