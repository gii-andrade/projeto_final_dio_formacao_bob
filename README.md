# 🚀 Projeto Final — Formação IBM Bob (DIO)

> **Ecossistema Inteligente de Aprendizado & Servidor MCP da DIO**
> Desenvolvido durante a Formação IBM Bob na Digital Innovation One (DIO).

---

## 📚 Navegação & Documentação

- 🗺️ **[Índice Visual do Projeto](INDICE_VISUAL_PROJETO.md)** — Mapa visual completo do repositório, diretórios e estatísticas.
- 📖 **[Guia Completo do Projeto e Documentação Técnica](PROJETO_DOCUMENTACAO.md)** — Detalhes de arquitetura, MCP, catálogo de prompts e lições aprendidas.
- ⚡ **[Guia de Comandos Slash](COMANDOS_SLASH.md)** — Referência rápida de uso dos comandos `/trilha`, `/desafio` e `/certificado`.

---

## 🎯 O que é o projeto?

O **DIO Explorer** integra o **IBM Bob** com o ecossistema educacional da DIO através do **Model Context Protocol (MCP)**, permitindo:
- 🗺️ Explorar trilhas de formação técnica detalhadas.
- ⚔️ Gerar desafios práticos dinâmicos sob medida para cada nível.
- 🎓 Emitir certificados de conclusão com validação digital.

---

## 🛠️ Comandos Slash Disponíveis

- `/trilha <tecnologia>`: Exibe plano de estudo completo com módulos, badges e XP.
- `/desafio <tecnologia> <nivel>`: Gera um desafio prático de código com critérios de avaliação.
- `/certificado <seu-nome> <trilha>`: Emite um certificado digital em Markdown com código de validação.

---

## ⚙️ Servidor MCP (dio-explorer)

O servidor MCP está localizado na pasta [`dio_explorer/mcp/`](dio_explorer/mcp/) e expõe:
- **Tools**: `buscar_trilha`, `listar_trilhas`, `gerar_desafio`, `emitir_certificado`.
- **Resources**: `dio://trilhas`, `dio://trilhas/{id}`.
- **Prompts**: `explorar_trilha`, `onboarding_aluno`.
- **Transportes**: `stdio`, `http` e `https` (com autenticação Bearer Token).
