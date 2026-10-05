import { exec } from 'child_process';
import { promisify } from 'util';
import { config } from '../config/config';

const execAsync = promisify(exec);

export interface GitResult {
  stdout: string;
  stderr: string;
}

export async function executeGit(args: string[], cwd?: string): Promise<GitResult> {
  const command = `git ${args.join(' ')}`;
  const result = await execAsync(command, {
    cwd,
    timeout: config.git.timeout,
  });
  return result;
}
