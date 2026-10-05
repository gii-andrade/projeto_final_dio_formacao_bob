# 🎓 Documentação Completa do Projeto: DIO Explorer & Formação IBM Bob

> **Projeto Final da Formação IBM Bob — Digital Innovation One (DIO)**  
> **Autor(a):** Giovanna de Andrade  
> **Versão:** 1.0.0  
> **Status:** Concluído & Validado  

---

## 📑 Sumário

1. [Visão Geral e Propósito](#-visão-geral-e-propósito)
2. [Arquitetura do Ecossistema](#-arquitetura-do-ecossistema)
3. [Componentes do IBM Bob](#-componentes-do-ibm-bob)
   - [Custom Commands (`.bob/commands/`)](#custom-commands)
   - [Custom Skills (`.bob/skills/`)](#custom-skills)
   - [Configuração MCP (`.bob/mcp.json`)](#configuração-mcp)
4. [Servidor MCP (`dio_explorer/mcp`)](#-servidor-mcp-dio-explorer)
   - [Tools Registradas](#tools-disponíveis)
   - [Resources Registrados](#resources-disponíveis)
   - [Prompts MCP](#prompts-mcp-registrados)
   - [Transportes Suportados (stdio, HTTP, HTTPS)](#modos-de-transporte)
5. [Guia de Prompts Utilizados e Padrões de Engenharia de Prompt](#-catálogo-de-prompts-e-engenharia-de-prompt)
6. [Modos de Uso e Fluxos Práticos](#-modos-de-uso-e-fluxos-passo-a-passo)
7. [Boas Práticas e Dicas de Uso](#-dicas-de-uso-e-boas-práticas)
8. [Insights Estratégicos para Futuros Profissionais](#-insights-para-futuros-profissionais-de-ia-e-engenharia-de-software)

---

## 🌟 Visão Geral e Propósito

O **DIO Explorer** é uma solução completa de engenharia de software e inteligência artificial voltada para integrar agentes de IA (como o **IBM Bob**) a plataformas de educação técnica (como a **Digital Innovation One - DIO**).

O ecossistema permite que o assistente inteligente:
1. **Consulte trilhas educacionais** com metadados detalhados (XP, módulos, duração, requisitos, badges).
2. **Gere desafios práticos sob medida** por nível de senioridade (Iniciante, Intermediário, Avançado).
3. **Emita certificados de conclusão digitais** com identificadores únicos rastreáveis e exportação em formato `.txt`.
4. **Comunique-se por Model Context Protocol (MCP)** em múltiplos transportes (`stdio` para processos locais e `HTTP/HTTPS` com autenticação Bearer para ambientes em nuvem).

---

## 🏗️ Arquitetura do Ecossistema

```mermaid
flowchart TD
    subgraph Usuario_Dev[Usuário / Desenvolvedor]
        A[Interface IBM Bob / Chat]
        B[Comandos Slash: /trilha, /desafio, /certificado]
    end

    subgraph Bob_Runtime[IBM Bob Runtime Engine]
        C[MCP Client / Stdio Transport]
        D[Skills & Custom Commands Engine]
        E[Context & Prompt Manager]
    end

    subgraph DIO_MCP_Server[Servidor MCP dio-explorer]
        F[Index & Bootstrap]
        G[McpServer v2 Core]
        subgraph Tools[MCP Tools]
            T1[buscar_trilha]
            T2[listar_trilhas]
            T3[gerar_desafio]
            T4[emitir_certificado]
        end
        subgraph Resources[MCP Resources]
            R1[dio://trilhas]
            R2[dio://trilhas/{id}]
        end
        subgraph Prompts[MCP Prompts]
            P1[explorar_trilha]
            P2[onboarding_aluno]
        end
    end

    subgraph Data_Storage[Armazenamento & Saídas]
        DB[(trilhas_dio.json)]
        OUT[docs/ *.txt]
    end

    A --> B
    B --> D
    D --> E
    E --> C
    C <-->|JSON-RPC Stdio / HTTP| F
    F --> G
    G --> Tools
    G --> Resources
    G --> Prompts
    Tools --> DB
    Tools --> OUT
    Resources --> DB
```

---

## 🧩 Componentes do IBM Bob

### Custom Commands
Localizados em [`.bob/commands/`](.bob/commands/):

1. [`/trilha <tecnologia>`](.bob/commands/trilha.md):
   - **Descrição:** Extrai o plano de estudos detalhado da tecnologia solicitada.
   - **Metadados:** Argumento posicional `$1`.
2. [`/desafio <tecnologia> <nivel>`](.bob/commands/desafio.md):
   - **Descrição:** Cria dinamicamente um desafio prático de programação contextualizado.
   - **Metadados:** Argumentos posicionais `$1` (tecnologia) e `$2` (nível).
3. [`/certificado <seu-nome> <trilha>`](.bob/commands/certificado.md):
   - **Descrição:** Monta a estrutura formal do certificado com hash de autenticação e histórico de módulos.

### Custom Skills
Localizados em [`.bob/skills/`](.bob/skills/):
- [`trilha/SKILL.md`](.bob/skills/trilha/SKILL.md): Instruções determinísticas para formatação do plano de estudos em Markdown.
- [`desafio/SKILL.md`](.bob/skills/desafio/SKILL.md): Diretrizes pedagógicas com critérios de avaliação, dicas e tabela de recompensas de XP.
- [`certificado/SKILL.md`](.bob/skills/certificado/SKILL.md): Template corporativo de certificação fictícia com citação inspiradora e ID digital.

### Configuração MCP
Arquivo [`./.bob/mcp.json`](.bob/mcp.json):
```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": [
        "${workspaceFolder}/dio_explorer/mcp/build/index.js"
      ],
      "env": {
        "DIO_DATA_PATH": "${workspaceFolder}/dio_explorer/data/trilhas_dio.json",
        "DIO_OUTPUT_DIR": "${workspaceFolder}/dio_explorer/docs"
      }
    }
  }
}
```

---

## ⚙️ Servidor MCP (dio-explorer)

O servidor foi implementado em **TypeScript moderno**, utilizando a biblioteca oficial `@modelcontextprotocol/sdk` e validação com `zod`.

### Tools Disponíveis

| Tool | Argumentos | Descrição |
|---|---|---|
| `buscar_trilha` | `termo: string`, `formato?: "resumo" \| "completo"` | Localiza trilhas por correspondência parcial ou exata no nome/tecnologia. |
| `listar_trilhas` | *(nenhum)* | Retorna uma lista de todas as trilhas cadastradas na base. |
| `gerar_desafio` | `aluno_nome: string`, `aluno_email: string`, `tecnologia: string`, `salvar_arquivo?: boolean` | Gera enunciado, requisitos e regras de pontuação, podendo salvar em `docs/`. |
| `emitir_certificado` | `aluno_nome: string`, `aluno_email: string`, `tecnologia: string`, `salvar_arquivo?: boolean` | Emite o certificado digital com ID único rastreável. |

### Resources Disponíveis
- `dio://trilhas`: Catálogo JSON completo com todas as formações.
- `dio://trilhas/{id}`: Consulta pontual a uma trilha específica (ex: `dio://trilhas/trilha-001`).

### Prompts MCP Registrados
- `explorar_trilha`: Prepara o LLM para atuar como mentor e apresentar o curso.
- `onboarding_aluno`: Conduz uma jornada de ponta a ponta (busca de trilha, emissão de desafio e certificação).

### Modos de Transporte

1. **Stdio (Padrão para IBM Bob local):**
   ```bash
   node dio_explorer/mcp/build/index.js
   ```
2. **HTTP Local (Desenvolvimento):**
   ```bash
   MCP_TRANSPORT=http MCP_PORT=3333 node dio_explorer/mcp/build/index.js
   ```
3. **HTTP/HTTPS com Autenticação Bearer (Produção):**
   ```bash
   MCP_TRANSPORT=http MCP_PORT=443 MCP_API_KEY="seu-token-secreto" MCP_HTTPS_CERT="/etc/ssl/cert.pem" MCP_HTTPS_KEY="/etc/ssl/key.pem" node dio_explorer/mcp/build/index.js
   ```

---

## 📝 Catálogo de Prompts e Engenharia de Prompt

### 1. Prompt de Extração de Trilha (`/trilha`)
```markdown
Leia o arquivo dio_explorer/data/trilhas_dio.json e procure a trilha cuja tecnologia ou nome contenha "$1".
Gere um plano de estudos formatado em Markdown com:
- Informações Gerais (Duração, Módulos, XP, Certificado)
- Módulos com frase motivacional curta
- Badges e XP requerido
- Dica personalizada de estudo (2-3 frases)
- Próximo passo sugerindo o /desafio
```
*Técnica aplicada:* **Few-Shot Structure Enforcement** — O agente recebe a tabela e os cabeçalhos fixos, garantindo respostas padronizadas e sem alucinações de formato.

### 2. Prompt de Criação de Desafio (`/desafio`)
```markdown
Gere um desafio de código aleatório com base na tecnologia "$1" e no nível "$2".
Níveis aceitos: iniciante, intermediário, avançado.
Estrutura:
- Descrição prática e realista
- Requisitos funcionais em formato de checklist (- [ ])
- 2 Dicas sem entregar a resposta
- 2 Casos de teste de Entrada e Saída
- Critérios de avaliação e Recompensa em XP
```
*Técnica aplicada:* **Role-Based Task Constraint** — O prompt define explicitamente fronteiras de complexidade cognitiva baseadas no nível escolhido.

### 3. Prompt de Certificação (`/certificado`)
```markdown
Gere um certificado fictício de conclusão em Markdown para o usuário "$1" que concluiu "$2".
Cruze as informações com o arquivo de dados para obter duração real, XP e módulos.
Inclua código de validação único, citação inspiradora e mensagem calorosa para redes sociais.
```
*Técnica aplicada:* **Grounding & Data Augmentation** — Obriga a IA a basear os dados de módulos e badges nos registros do JSON real antes de preencher o layout.

---

## 🕹️ Modos de Uso e Fluxos Passo a Passo

### Cenário A: Estudante descobrindo uma nova tecnologia
1. O usuário digita no chat:
   ```text
   /trilha python
   ```
2. O IBM Bob aciona a tool `buscar_trilha` ou lê o template do comando `trilha.md`, retornando o plano de estudos detalhado da *Formação Full Stack Python & Django*.

### Cenário B: Treinamento prático e avaliação
1. O usuário digita no chat:
   ```text
   /desafio Java intermediario
   ```
2. O IBM Bob constrói um desafio de código (por exemplo, construir uma API REST com Spring Boot para controle de estoque), estipula os requisitos em checklist e a pontuação estimada.

### Cenário C: Conclusão e emissão do certificado
1. O usuário digita no chat:
   ```text
   /certificado "Giovanna de Andrade" "Java"
   ```
2. O sistema gera a visualização do certificado centralizado, contendo todas as badges conquistadas e o código hash `DIO-2025-XXXXXX`.

### Cenário D: Execução programática via Tools MCP
1. O modelo é instruído:
   ```text
   Gere um desafio para o aluno Carlos Silva (carlos@exemplo.com) em Kubernetes e salve em disco.
   ```
2. O Bob invoca a tool `mcp__dio-explorer__gerar_desafio` com `salvar_arquivo: true`.
3. O arquivo é gerado e gravado automaticamente em `dio_explorer/docs/desafio_carlos_kubernetes.txt`.

---

## 💡 Dicas de Uso e Boas Práticas

1. **Variáveis Dinâmicas no MCP:**
   - Sempre utilize `${workspaceFolder}` no `.bob/mcp.json` para garantir que o projeto seja portável entre diferentes sistemas operacionais e máquinas de desenvolvedores.
2. **Separação de Camadas:**
   - Mantenha a inteligência das ferramentas no servidor MCP (`tools/`) e as regras visuais/instruções comportamentais nas **Skills** (`.bob/skills/`). Isso desacopla a lógica de dados da apresentação.
3. **Validação Estrita de Esquema:**
   - Utilize bibliotecas como `zod` em todos os parâmetros das tools. Isso impede que o modelo passe parâmetros incorretos ou tipos inválidos.
4. **Idempotência e Tratamento de Erros:**
   - Ferramentas de geração de arquivos devem garantir caminhos sanitizados e tratamento de fallback para evitar quebras de execução quando pastas não existirem.

---

## 🚀 Insights para Futuros Profissionais de IA e Engenharia de Software

1. **O poder do Model Context Protocol (MCP):**
   - O MCP é o novo padrão para conectar modelos de linguagem a sistemas legados, bancos de dados e APIs externas. Aprender a escrever servidores MCP robustos é uma das habilidades mais valorizadas na engenharia de IA moderna.
2. **Engenharia de Contexto sobre Fine-Tuning:**
   - A combinação de **MCP Tools + Context Resources + Formatação Guiada (Skills)** entrega resultados mais precisos, baratos e fáceis de manter do que o treinamento ou fine-tuning de modelos para casos de uso corporativos.
3. **Observabilidade e Testabilidade:**
   - Servidores MCP precisam de testes unitários (como demonstrado na suíte Jest em `dio_explorer/tests/`) e endpoints de health check para monitoramento em produção.
4. **Design Centrado no Usuário (UI/UX em Chat):**
   - Respostas geradas por IA devem ser estruturadas com elementos visuais de fácil leitura: tabelas, badges, emojis contextuais e blocos bem delimitados de código e ação.

---
*Documento gerado como registro integral do ecossistema desenvolvido na Formação IBM Bob.*
