# PRONTA Engenharia

Site institucional one page para a PRONTA Engenharia, criado com React, Vite, Tailwind CSS e lucide-react.

Repositório: `site-pronta-engenharia`.

## Rodar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar o build:

```bash
npm run preview
```

## Conteúdo editável

Os principais textos, serviços, setores, diferenciais, contatos e domínios ficam em:

```text
src/data/siteData.js
```

Domínio principal configurado: `prontaengenharia.com.br`.

Domínio adicional informado: `prontaengenharia.com`.

## Deploy na Vercel

Ao conectar o repositório na Vercel, ela deve detectar o projeto como Vite automaticamente.

Configurações esperadas:

```text
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Depois do primeiro deploy, configure os domínios `prontaengenharia.com.br` e `prontaengenharia.com` no painel da Vercel e ajuste os DNS conforme as instruções exibidas pela plataforma.

## GitHub

Se o repositório já estiver configurado:

```bash
git status
git add .
git commit -m "Cria site institucional da PRONTA Engenharia"
git push origin main
```

Se a branch principal do repositório tiver outro nome, substitua `main` pelo nome correto.

Se esta pasta ainda não for um repositório Git:

```bash
git init
git add .
git commit -m "Cria site institucional da PRONTA Engenharia"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/site-pronta-engenharia.git
git push -u origin main
```

## Dados pendentes

- Confirmar se o e-mail `pronta@prontaengenharia.com` deve aparecer mesmo com o domínio principal `.com.br`.
- Inserir endereço completo, se desejar publicar.
- Inserir Instagram, se existir e puder ser divulgado.
- Inserir responsável técnico e CREA, se forem autorizados para publicação.
- Substituir a logo por versão SVG ou PNG transparente quando disponível.
- Informar clientes somente se houver autorização formal.
