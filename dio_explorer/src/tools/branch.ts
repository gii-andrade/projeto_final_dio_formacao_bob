import { executeGit } from '../services/git-executor';

export async function branch(repoPath: string, name?: string): Promise<string> {
  const args = name ? ['branch', name] : ['branch', '--list'];
  const result = await executeGit(args, repoPath);
  return result.stdout;
}
