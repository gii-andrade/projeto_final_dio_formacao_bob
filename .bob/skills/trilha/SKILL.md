---
name: trilha
description: >-
  Exibe o plano de estudos completo de uma trilha DIO a partir do nome da
  tecnologia
metadata:
  user-invocable: true
  disable-model-invocation: true
  argument-hint: <tecnologia>
---

Leia o arquivo `dio_explorer/data/trilhas_dio.json` e procure a trilha cuja tecnologia ou nome contenha "$1" (busca case-insensitive e parcial — ex: "python", "kubernetes", "machine learning").

Com os dados encontrados, gere um plano de estudos formatado em Markdown seguindo **exatamente** esta estrutura:

# 📚 Plano de Estudos — <nome da trilha>

> <descrição da trilha>

---

## 🏷️ Informações Gerais

| Campo                  | Valor                      |
|------------------------|----------------------------|
| 🎯 Tecnologias         | <tecnologia>               |
| 📊 Nível               | <nivel>                    |
| ⏱️ Duração estimada    | <duracao_estimada_horas>h  |
| 🧩 Total de módulos    | <numero_de_modulos>        |
| ⭐ XP Total            | <xp_total> XP              |
| 🎓 Certificado         | Sim / Não                  |

---

## 🗺️ Módulos da Trilha

Para cada módulo, exiba no formato:
**Módulo X — <nome do módulo>**
_(uma frase motivacional curta e relevante sobre o conteúdo do módulo)_

---

## 🏅 Badges que você vai conquistar

Para cada badge, exiba:
<icone> **<nome>** — <descrição>
_(XP necessário: <xp_requerido>)_

---

## 💡 Dica de estudo

Gere uma dica personalizada de 2-3 frases com base no nível e nas tecnologias da trilha.

---

## 🚀 Próximo passo

Convide o usuário a usar `/desafio <tecnologia> <nivel>` para testar seus conhecimentos com um desafio prático.

---

Se nenhuma trilha for encontrada para a tecnologia "$1", informe educadamente que a trilha não foi encontrada e liste as tecnologias disponíveis no arquivo.
