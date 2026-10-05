import { executeGit } from '../services/git-executor';

export async function clone(repoUrl: string, destination: string): Promise<string> {
  const result = await executeGit(['clone', repoUrl, destination]);
  return result.stdout || result.stderr;
}
