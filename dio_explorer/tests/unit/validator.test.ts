import { validateRepoPath, validateUrl, validateBranchName } from '../../src/utils/validator';

describe('validator — validateRepoPath()', () => {
  it('deve aceitar um caminho válido', () => {
    expect(() => validateRepoPath('/home/user/projeto')).not.toThrow();
  });

  it('deve lançar erro para string vazia', () => {
    expect(() => validateRepoPath('')).toThrow('Repository path must be a non-empty string');
  });

  it('deve lançar erro para valor não-string', () => {
    expect(() => validateRepoPath(null as unknown as string)).toThrow();
  });
});

describe('validator — validateUrl()', () => {
  it('deve aceitar URL https válida', () => {
    expect(() => validateUrl('https://github.com/user/repo.git')).not.toThrow();
  });

  it('deve aceitar URL ssh git@', () => {
    expect(() => validateUrl('git@github.com:user/repo.git')).not.toThrow();
  });

  it('deve aceitar URL ssh://', () => {
    expect(() => validateUrl('ssh://git@github.com/user/repo.git')).not.toThrow();
  });

  it('deve lançar erro para URL inválida', () => {
    expect(() => validateUrl('apenas-um-nome')).toThrow('Invalid git URL');
  });
});

describe('validator — validateBranchName()', () => {
  it('deve aceitar nome de branch válido', () => {
    expect(() => validateBranchName('feature/minha-feature')).not.toThrow();
  });

  it('deve lançar erro para nome com espaços', () => {
    expect(() => validateBranchName('meu branch')).toThrow('Invalid branch name');
  });

  it('deve lançar erro para nome vazio', () => {
    expect(() => validateBranchName('')).toThrow('Invalid branch name');
  });
});
