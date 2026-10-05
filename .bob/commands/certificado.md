---
description: Gera um certificado fictício em Markdown com o nome do usuário e a trilha concluída
argument-hint: <seu-nome> <trilha>
---

Gere um **certificado fictício de conclusão** em Markdown para o usuário chamado "$1" que concluiu a trilha "$2".

Consulte o arquivo `dio_explorer/data/trilhas_dio.json` para encontrar a trilha que corresponda a "$2" (busca parcial e case-insensitive). Use os dados reais da trilha encontrada (nome, tecnologia, duração, XP, nível). Se não encontrar correspondência, use os dados informados pelo usuário diretamente.

Gere o certificado seguindo **exatamente** esta estrutura:

---

<div align="center">

# 🎓 CERTIFICADO DE CONCLUSÃO

### Digital Innovation One — DIO

---

**Certificamos que**

# $1

**concluiu com êxito a**

## <nome completo da trilha>

---

📅 **Data de conclusão:** <data atual no formato DD de MÊS de ANO>

🕐 **Carga horária:** <duracao_estimada_horas> horas

📊 **Nível:** <nivel>

⚙️ **Tecnologias dominadas:** <tecnologia>

⭐ **XP conquistado:** <xp_total> XP

---

### Módulos concluídos

<liste todos os módulos da trilha, cada um com um ✅ na frente>

---

### Badges conquistadas

<liste todas as badges da trilha no formato: ICONE **NOME** — XP_REQUERIDO XP>

---

> *"A educação é a arma mais poderosa que você pode usar para mudar o mundo."*
> — Nelson Mandela

---

**Assinatura Digital**

    Certificado ID: DIO-<ano>-<número aleatório de 6 dígitos>
    Emitido por: Digital Innovation One (fictício)
    Válido como: Projeto Final — Formação IBM Bob

</div>

---

Após o certificado, adicione uma mensagem de parabéns calorosa e personalizada (2-3 frases) incentivando o usuário a continuar aprendendo e a compartilhar a conquista no LinkedIn.
