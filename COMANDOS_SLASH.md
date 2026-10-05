# ⚡ Guia Rápido de Comandos Slash (IBM Bob)

Este guia explica como interagir com o ecossistema do **DIO Explorer** através dos comandos de barra (*Slash Commands*) configurados no IBM Bob.

---

## 📋 Comandos Disponíveis

| Comando | Descrição | Sintaxe |
|---------|-----------|---------|
| `/trilha` | Consulta informações e ementa completa de uma trilha DIO | `/trilha <tecnologia>` |
| `/desafio` | Cria um desafio prático de código adaptado ao nível | `/desafio <tecnologia> [nivel]` |
| `/certificado` | Emite um certificado digital com código de autenticidade | `/certificado "<Nome Aluno>" "<Tecnologia>"` |

---

## 🔍 Detalhes e Exemplos de Uso

### 1. `/trilha`
Exibe os módulos, carga horária, badges disponíveis e roteiro de estudo para a tecnologia informada.

**Exemplos:**
```bash
/trilha Python
/trilha Java
/trilha React
/trilha Kubernetes
```

---

### 2. `/desafio`
Gera desafios práticos com contexto, critérios de aceitação e dicas de desenvolvimento.

**Níveis aceitos:**
- `Iniciante` / `Básico`
- `Intermediário`
- `Avançado`

**Exemplos:**
```bash
/desafio Python Iniciante
/desafio JavaScript Intermediário
/desafio Docker Avançado
```

---

### 3. `/certificado`
Gera um certificado de conclusão com código de validação único rastreável.

**Exemplos:**
```bash
/certificado "Giovanna de Andrade" "Python"
/certificado "Carlos Eduardo" "Java"
```

---

## 🔗 Arquivos de Configuração
- Definição dos comandos: [`.bob/commands/`](.bob/commands/)
- Skills do Bob: [`.bob/skills/`](.bob/skills/)
- Servidor MCP: [`dio_explorer/mcp/`](dio_explorer/mcp/)
