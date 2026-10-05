/**
 * Middleware de autenticação Bearer Token.
 *
 * Lê o token esperado de MCP_API_KEY.
 * Retorna 401 se ausente ou inválido, 403 se a variável não estiver configurada.
 *
 * Uso em produção: defina MCP_API_KEY com um token seguro (ex: openssl rand -hex 32)
 */
export declare function validateBearerToken(authHeader: string | undefined): {
    valid: boolean;
    status: number;
    message: string;
};
