import { GitError, handleError } from '../../src/utils/error-handler';

describe('error-handler — GitError', () => {
  it('deve criar um GitError com mensagem', () => {
    const err = new GitError('algo deu errado');
    expect(err.message).toBe('algo deu errado');
    expect(err.name).toBe('GitError');
  });

  it('deve armazenar command e stderr opcionais', () => {
    const err = new GitError('falhou', 'git push', 'remote rejected');
    expect(err.command).toBe('git push');
    expect(err.stderr).toBe('remote rejected');
  });

  it('deve ser instância de Error', () => {
    const err = new GitError('teste');
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(GitError);
  });
});

describe('error-handler — handleError()', () => {
  it('deve retornar o próprio GitError se já for GitError', () => {
    const original = new GitError('original');
    const result = handleError(original);
    expect(result).toBe(original);
  });

  it('deve converter Error comum em GitError', () => {
    const err = new Error('erro comum');
    const result = handleError(err);
    expect(result).toBeInstanceOf(GitError);
    expect(result.message).toBe('erro comum');
  });

  it('deve converter string em GitError', () => {
    const result = handleError('erro em string');
    expect(result).toBeInstanceOf(GitError);
    expect(result.message).toBe('erro em string');
  });

  it('deve converter número em GitError', () => {
    const result = handleError(42);
    expect(result).toBeInstanceOf(GitError);
    expect(result.message).toBe('42');
  });
});
