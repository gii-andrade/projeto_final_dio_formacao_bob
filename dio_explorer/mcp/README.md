# DIO Explorer — Servidor MCP

Servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) que expõe as trilhas, desafios e certificados da DIO para agentes de IA como o IBM Bob e o Claude Desktop.

Suporta **três modos de acesso**:

| Modo | Caso de uso |
|------|-------------|
| `stdio` | Bob / Claude Desktop (processo filho local) |
| `http` | API remota acessível via rede |
| `https` | API remota com TLS (produção) |

---

## Estrutura

```
mcp/
├── src/
│   ├── index.ts              — entry point (seleciona o transporte)
│   ├── server.ts             — cria e registra o McpServer
│   ├── tools/
│   │   ├── trilha-tool.ts    — tools: buscar_trilha, listar_trilhas
│   │   ├── desafio-tool.ts   — tool: gerar_desafio
│   │   └── certificado-tool.ts — tool: emitir_certificado
│   ├── resources/
│   │   └── trilhas-resource.ts — resources: dio://trilhas, dio://trilhas/{id}
│   ├── prompts/
│   │   └── index.ts          — prompts: explorar_trilha, onboarding_aluno
│   ├── transport/
│   │   ├── stdio.ts          — transporte stdio
│   │   └── http.ts           — transporte HTTP/HTTPS com Bearer auth
│   ├── auth/
│   │   └── bearer.ts         — middleware de autenticação Bearer Token
│   └── utils/
│       └── paths.ts          — resolução de caminhos de dados e saída
├── .env.example              — variáveis de ambiente documentadas
├── package.json
└── tsconfig.json
```

---

## Instalação

```bash
cd dio_explorer/mcp
npm install
npm run build
```

---

## Modo stdio — Bob / Claude Desktop

### Registrar no Bob (workspace)

Adicione ao `.bob/mcp.json` do workspace:

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": ["/caminho/absoluto/para/dio_explorer/mcp/build/index.js"],
      "env": {
        "DIO_DATA_PATH": "/caminho/absoluto/para/dio_explorer/data/trilhas_dio.json",
        "DIO_OUTPUT_DIR": "/caminho/absoluto/para/dio_explorer/docs"
      }
    }
  }
}
```

### Testar manualmente

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node build/index.js
```

---

## Modo HTTP — API Remota

### Iniciar o servidor

```bash
# HTTP simples (desenvolvimento)
MCP_TRANSPORT=http MCP_PORT=3333 node build/index.js

# Com autenticação Bearer (recomendado)
MCP_TRANSPORT=http MCP_PORT=3333 MCP_API_KEY=meu-token-secreto node build/index.js

# HTTPS com TLS (produção)
MCP_TRANSPORT=http \
MCP_PORT=443 \
MCP_API_KEY=meu-token-secreto \
MCP_HTTPS_CERT=/etc/ssl/cert.pem \
MCP_HTTPS_KEY=/etc/ssl/key.pem \
node build/index.js
```

### Endpoints

| Método | Caminho | Descrição |
|--------|---------|-----------|
| `GET` | `/health` | Health check (sem autenticação) |
| `POST` | `/` | Chamadas MCP (requer Bearer token) |

### Exemplo de chamada via curl

```bash
# Health check
curl http://localhost:3333/health

# Chamar tool buscar_trilha
curl -X POST http://localhost:3333 \
  -H "Authorization: Bearer meu-token-secreto" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"buscar_trilha","arguments":{"termo":"java","formato":"completo"}}}'
```

### Registrar no Bob como servidor remoto

```json
{
  "mcpServers": {
    "dio-explorer-remote": {
      "url": "https://seu-servidor.com",
      "headers": {
        "Authorization": "Bearer ${env:DIO_MCP_API_KEY}"
      }
    }
  }
}
```

---

## Tools disponíveis

| Tool | Parâmetros | Descrição |
|------|-----------|-----------|
| `buscar_trilha` | `termo`, `formato` | Busca trilhas por tecnologia/nome |
| `listar_trilhas` | — | Lista todas as trilhas disponíveis |
| `gerar_desafio` | `aluno_nome`, `aluno_email`, `tecnologia`, `salvar_arquivo` | Gera desafio prático para o aluno |
| `emitir_certificado` | `aluno_nome`, `aluno_email`, `tecnologia`, `salvar_arquivo` | Emite certificado de conclusão |

## Resources disponíveis

| URI | Descrição |
|-----|-----------|
| `dio://trilhas` | Catálogo completo em JSON |
| `dio://trilhas/{id}` | Trilha específica por ID |

## Prompts disponíveis

| Prompt | Parâmetros | Descrição |
|--------|-----------|-----------|
| `explorar_trilha` | `tecnologia`, `nivel_aluno` | Apresenta trilha de forma didática |
| `onboarding_aluno` | `nome`, `email`, `tecnologia` | Fluxo completo: trilha + desafio + certificado |

---

## Segurança

- **Desenvolvimento local:** deixe `MCP_API_KEY` vazio — o servidor roda sem auth.
- **Produção:** defina `MCP_API_KEY` com um token forte (`openssl rand -hex 32`).
- **HTTPS:** forneça `MCP_HTTPS_CERT` e `MCP_HTTPS_KEY` para ativar TLS.
- O endpoint `/health` é sempre público (sem autenticação).

---

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `MCP_TRANSPORT` | `stdio` | `stdio` ou `http` |
| `MCP_PORT` | `3333` | Porta HTTP |
| `MCP_HOST` | `0.0.0.0` | Host de escuta |
| `MCP_API_KEY` | _(vazio)_ | Bearer token (obrigatório em produção) |
| `MCP_HTTPS_CERT` | _(vazio)_ | Caminho do certificado TLS |
| `MCP_HTTPS_KEY` | _(vazio)_ | Caminho da chave TLS |
| `DIO_DATA_PATH` | _(automático)_ | Caminho para `trilhas_dio.json` |
| `DIO_OUTPUT_DIR` | _(automático)_ | Diretório de saída de arquivos gerados |
