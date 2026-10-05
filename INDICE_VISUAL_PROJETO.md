# 🗺️ Índice Visual do Projeto — Formação IBM Bob (DIO)

> Guia visual de navegação rápida e referência da arquitetura do projeto.

---

## 📚 Documentação Principal

| Documento | Descrição | Link |
|-----------|-----------|------|
| 📖 **Documentação Completa** | Guia técnico completo do projeto, arquitetura, MCP e boas práticas | [`PROJETO_DOCUMENTACAO.md`](PROJETO_DOCUMENTACAO.md) |
| 📘 **README Principal** | Visão geral, início rápido e comandos | [`README.md`](README.md) |
| ⚡ **Comandos Slash** | Guia rápido dos comandos de barra integrados ao Bob | [`COMANDOS_SLASH.md`](COMANDOS_SLASH.md) |
| 🤖 **Servidor MCP** | Documentação técnica do servidor MCP `dio-explorer` | [`dio_explorer/mcp/README.md`](dio_explorer/mcp/README.md) |

---

## 🎯 Por Onde Começar?

### 👨‍💻 Sou Desenvolvedor Iniciante
```
1. Leia: README.md
2. Teste no chat do Bob: /trilha Python
3. Pratique: /desafio Python Iniciante
4. Emita seu certificado: /certificado "Seu Nome" "Python"
```

### 🚀 Sou Desenvolvedor Experiente
```
1. Leia: PROJETO_DOCUMENTACAO.md
2. Explore a CLI/Comandos: dio_explorer/src/commands/
3. Verifique os Testes Unitários: dio_explorer/tests/
4. Analise a arquitetura MCP: dio_explorer/mcp/src/
```

### 🎓 Quero Aprender sobre MCP (Model Context Protocol)
```
1. Leia: dio_explorer/mcp/README.md
2. Estude a configuração do Bob: .bob/mcp.json
3. Inspecione Tools, Resources e Prompts em: dio_explorer/mcp/src/
4. Execute os testes com: npm test (dentro de dio_explorer/)
```

---

## 📂 Estrutura Visual do Projeto

```
🏠 projeto_final_dio_formacao_bob/
│
├── 📁 .bob/                          ← Configurações e extensões do IBM Bob
│   ├── 📁 commands/                  ← Comandos Slash Markdown (/trilha, /desafio, /certificado)
│   ├── 📁 skills/                    ← Bob Skills com instruções detalhadas
│   └── 📄 mcp.json                   ← Registro de conexão do MCP Server local
│
├── 📁 dio_explorer/                  ← Núcleo do Projeto DIO Explorer
│   │
│   ├── 📁 data/                      ← Base de dados educacional
│   │   └── 📄 trilhas_dio.json       ← Catálogo de trilhas técnicas
│   │
│   ├── 📁 docs/                      ← Certificados e artefatos gerados
│   │
│   ├── 📁 mcp/                       ← 🤖 SERVIDOR MCP (Model Context Protocol)
│   │   ├── 📁 src/                   ← Código fonte TypeScript do servidor MCP
│   │   ├── 📄 package.json           ← Dependências do servidor MCP
│   │   └── 📄 README.md              ← Documentação do servidor MCP
│   │
│   ├── 📁 src/                       ← Código TypeScript da CLI / Utilitários
│   │   ├── 📁 commands/              ← Lógica de execução dos comandos
│   │   └── 📁 utils/                 ← Validadores, formatadores e handlers de erro
│   │
│   ├── 📁 tests/                     ← ✅ SUÍTE DE TESTES UNITÁRIOS (Jest + ts-jest)
│   │   ├── 📁 fixtures/              ← Mocks e dados de teste
│   │   └── 📁 unit/                  ← Testes de trilha, desafio, certificado, etc.
│   │
│   └── 📄 package.json               ← Dependências e scripts de teste do projeto
│
├── 📄 COMANDOS_SLASH.md              ← Guia dos comandos slash
├── 📄 INDICE_VISUAL_PROJETO.md        ← Este índice visual
├── 📄 PROJETO_DOCUMENTACAO.md        ← Documentação técnica completa
└── 📄 README.md                      ← Visão geral e introdução
```

---

## 🎯 Comandos Disponíveis

### 1️⃣ Comando `/trilha`

```bash
/trilha Python
```

**Retorna:**
- 📊 Informações detalhadas da trilha (duração, nível, XP)
- 🏆 Badges conquistáveis
- 📚 Módulos e ementa formatada
- 📝 Roteiro de estudos prático

**Arquivo:** [`.bob/commands/trilha.md`](.bob/commands/trilha.md) | Código: [`dio_explorer/src/commands/trilha.ts`](dio_explorer/src/commands/trilha.ts)

---

### 2️⃣ Comando `/desafio`

```bash
/desafio Python Intermediário
```

**Retorna:**
- 📝 Descrição do desafio com contexto de negócio
- ✅ Requisitos técnicos obrigatórios
- 💡 Dicas de implementação e boas práticas
- 🏆 Recompensa em XP

**Arquivo:** [`.bob/commands/desafio.md`](.bob/commands/desafio.md) | Código: [`dio_explorer/src/commands/desafio.ts`](dio_explorer/src/commands/desafio.ts)

---

### 3️⃣ Comando `/certificado`

```bash
/certificado "Maria Silva" "Python"
```

**Retorna:**
- 🎓 Certificado oficial formatado em Markdown
- 📜 Código de autenticidade único e data de conclusão
- 💾 Opção de persistência em arquivo de texto na pasta `docs/`

**Arquivo:** [`.bob/commands/certificado.md`](.bob/commands/certificado.md) | Código: [`dio_explorer/src/commands/certificado.ts`](dio_explorer/src/commands/certificado.ts)

---

## 🛠️ Ferramentas MCP (`dio-explorer`)

| Ferramenta | Descrição | Exemplo no Bob |
|------------|-----------|----------------|
| `buscar_trilha` | Busca trilhas por tecnologia ou palavra-chave | *"Bob, busque informações sobre a trilha de Java"* |
| `listar_trilhas` | Lista todas as trilhas disponíveis na plataforma | *"Bob, quais trilhas estão disponíveis na DIO?"* |
| `gerar_desafio` | Gera desafio prático com XP e critérios de aceite | *"Bob, gere um desafio para o aluno Carlos em Python"* |
| `emitir_certificado` | Emite certificado com hash único e exporta em arquivo | *"Bob, emita o certificado de Docker para Ana"* |

---

## 📊 Estatísticas e Destaques

```
┌───────────────────────────────────────────────┐
│              ESTATÍSTICAS DO PROJETO          │
├───────────────────────────────────────────────┤
│ Padrão de Integração:    Model Context Protocol│
│ Transporte MCP:          stdio & HTTP/HTTPS   │
│ Linguagem:               TypeScript (Node.js) │
│ Framework de Testes:     Jest + ts-jest       │
│ Suíte de Testes:         65 testes unitários  │
│ Taxa de Aprovação:       100%                 │
│ Slash Commands:          3 (/trilha, /desafio,│
│                             /certificado)     │
│ MCP Tools Registradas:   4 ferramentas        │
│ MCP Resources:           2 rotas URI          │
│ MCP Prompts:             2 prompts integrados │
└───────────────────────────────────────────────┘
```

---

<div align="center">

**Projeto Final desenvolvido para a Formação IBM Bob na Digital Innovation One (DIO)** 🚀

</div>