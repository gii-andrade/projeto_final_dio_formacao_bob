---
name: desafio
description: Gera um desafio de código aleatório baseado na tecnologia e nível escolhidos
metadata:
  user-invocable: true
  disable-model-invocation: true
  argument-hint: <tecnologia> <nivel>
---

Gere um **desafio de código aleatório** com base na tecnologia "$1" e no nível "$2".

Os níveis aceitos são: `iniciante`, `intermediario` (ou `intermediário`) e `avancado` (ou `avançado`).

Monte o desafio seguindo **exatamente** esta estrutura em Markdown:

# ⚔️ Desafio de Código — <Tecnologia> | Nível: <Nível>

---

## 📋 Descrição do Desafio

Descreva um problema prático, realista e interessante que o dev precisa resolver usando a tecnologia informada. O problema deve ser condizente com o nível:
- **Iniciante:** conceitos básicos, funções simples, estruturas de controle
- **Intermediário:** uso de bibliotecas, APIs, orientação a objetos, manipulação de dados
- **Avançado:** arquitetura, performance, padrões de projeto, integração de sistemas

---

## 🎯 Requisitos

Liste de 3 a 5 requisitos funcionais que a solução deve atender (use checkboxes markdown: `- [ ]`).

---

## 💡 Dicas

Forneça 2 dicas úteis (sem entregar a solução) que ajudem o dev a começar.

---

## 🧪 Exemplos de Entrada e Saída

Mostre pelo menos 2 exemplos concretos de entrada e saída esperada para o problema.

---

## ⭐ Critérios de Avaliação

Liste 3 critérios de qualidade que uma boa solução deve ter (ex: eficiência, legibilidade, tratamento de erros).

---

## 🏆 Recompensa Estimada

| XP       | Dificuldade   | Tempo estimado |
|----------|---------------|----------------|
| <valor>  | <nivel>       | <X> minutos    |

---

## 🚀 Pronto para começar?

Implemente sua solução e, quando terminar, use `/certificado <seu nome> <trilha>` para gerar seu certificado!

---

Gere um desafio **criativo e diferente** a cada chamada — varie o tipo de problema (algoritmos, manipulação de dados, API, CLI, etc.) de acordo com a tecnologia informada. Se a tecnologia "$1" não for reconhecida, informe o usuário e sugira tecnologias disponíveis nas trilhas do arquivo `dio_explorer/data/trilhas_dio.json`.
