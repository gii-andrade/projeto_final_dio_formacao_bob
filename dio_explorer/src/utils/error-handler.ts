export class GitError extends Error {
  constructor(
    message: string,
    public readonly command?: string,
    public readonly stderr?: string
  ) {
    super(message);
    this.name = 'GitError';
  }
}

export function handleError(err: unknown): GitError {
  if (err instanceof GitError) return err;
  if (err instanceof Error) return new GitError(err.message);
  return new GitError(String(err));
}
