# Encontro no Refeitório

## Estrutura
```
index.html          → página do convite (a que a pessoa vê)
admin.html           → página pra você ver as respostas à distância
api/responder.js     → recebe o clique e grava no banco
api/respostas.js     → devolve as respostas (protegida por senha)
package.json         → dependência do banco (Vercel KV)
```

## Como colocar no ar (passo a passo)

1. **Suba esta pasta pro GitHub** (ou importe direto o zip no painel da Vercel:
   New Project → Deploy).

2. **Crie o banco de dados na Vercel:**
   - No painel do projeto, vá em **Storage** → **Create Database** → escolha
     **KV** (ou "Upstash for Redis", que é o que a Vercel usa por baixo).
   - Depois de criar, clique em **Connect Project** e conecte ao seu projeto.
   - Isso já injeta automaticamente as variáveis de ambiente que o
     `@vercel/kv` precisa (`KV_REST_API_URL`, `KV_REST_API_TOKEN` etc.) —
     não precisa copiar nada manualmente.

3. **Defina a senha da área de respostas:**
   - Vá em **Settings** → **Environment Variables**.
   - Adicione uma variável chamada `ADMIN_SECRET` com o valor que você quiser
     (ex: `minhasenha123`). Essa é a senha pra ver as respostas.

4. **Faça o deploy** (ou re-deploy, se já tinha feito antes de adicionar o
   banco/variável).

5. **Pronto!** A página principal fica em:
   ```
   https://seu-projeto.vercel.app/
   ```
   E pra ver as respostas de qualquer lugar:
   ```
   https://seu-projeto.vercel.app/admin.html?secret=minhasenha123
   ```
   (ou sem o `?secret=...` na URL, e digitando a senha na hora no campo da
   página)

## Observação
Cada "Não" só é registrado na primeira tentativa de recusa (os clones que
fogem depois não geram registros repetidos), e o "Sim" é registrado quando
a pessoa aceita.
