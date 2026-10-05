/**
 * Middleware de autenticação Bearer Token.
 *
 * Lê o token esperado de MCP_API_KEY.
 * Retorna 401 se ausente ou inválido, 403 se a variável não estiver configurada.
 *
 * Uso em produção: defina MCP_API_KEY com um token seguro (ex: openssl rand -hex 32)
 */
export function validateBearerToken(authHeader) {
    const apiKey = process.env['MCP_API_KEY'];
    if (!apiKey) {
        // Sem MCP_API_KEY configurada — modo público (apenas para desenvolvimento local)
        return { valid: true, status: 200, message: 'ok' };
    }
    if (!authHeader) {
        return {
            valid: false,
            status: 401,
            message: 'Authorization header ausente. Use: Authorization: Bearer <token>',
        };
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0]?.toLowerCase() !== 'bearer') {
        return {
            valid: false,
            status: 401,
            message: 'Formato inválido. Use: Authorization: Bearer <token>',
        };
    }
    const token = parts[1];
    if (token !== apiKey) {
        return { valid: false, status: 403, message: 'Token inválido ou expirado.' };
    }
    return { valid: true, status: 200, message: 'ok' };
}
//# sourceMappingURL=bearer.js.map