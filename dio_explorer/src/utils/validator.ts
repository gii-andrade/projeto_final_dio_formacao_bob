export function validateRepoPath(path: string): void {
  if (!path || typeof path !== 'string') {
    throw new Error('Repository path must be a non-empty string');
  }
}

export function validateUrl(url: string): void {
  const gitUrlPattern = /^(https?:\/\/|git@|ssh:\/\/)/;
  if (!gitUrlPattern.test(url)) {
    throw new Error(`Invalid git URL: ${url}`);
  }
}

export function validateBranchName(name: string): void {
  if (!name || /\s/.test(name)) {
    throw new Error(`Invalid branch name: "${name}"`);
  }
}
