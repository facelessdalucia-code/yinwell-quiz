# Yinwell Quiz — static site

Quiz de acupressão (EN/US) com tracking de funil embutido (fetch pro Google Apps Script).
Saiu do Claude Artifact porque o Artifact bloqueia qualquer fetch externo via CSP — aqui não tem essa restrição.

## Deploy no Render
1. Criar um repo no GitHub (ex: `yinwell-quiz`), subir este `index.html` nele.
2. No Render: **New → Static Site**, conectar esse repo.
3. Build command: (vazio) — Publish directory: `.` (raiz)
4. Deploy. Render dá uma URL tipo `https://yinwell-quiz.onrender.com` — pode apontar um domínio próprio depois se quiser.
5. Trocar o link usado na automação do Instagram (DM) pra essa nova URL.

## Tracking
O botão CTA continua indo pro mesmo link do Stripe. Os eventos (`landed`, `quiz_started`, `answered_*`, `result_shown`, `cta_clicked`) continuam gravando na mesma planilha do Google Sheets — nenhuma mudança de código necessária, só o lugar onde o HTML está hospedado.
