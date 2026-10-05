export interface Repository {
  path: string;
  url?: string;
  branch?: string;
}

export interface CommitInfo {
  hash: string;
  message: string;
  author: string;
  date: string;
}

export interface GitOperationResult {
  success: boolean;
  output: string;
  error?: string;
}
