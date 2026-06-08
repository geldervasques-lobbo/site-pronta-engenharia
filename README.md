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

## Conteúdo editável e área segura

Os principais textos, serviços, setores, diferenciais, contatos e domínios ficam em:

```text
src/data/siteData.js
```

Também existe uma página de edição em:

```text
/editar
```

Com Supabase configurado, ela exige login e salva o conteúdo no banco com Row Level Security. Sem Supabase, ela funciona apenas como rascunho local de desenvolvimento.

Para configurar:

1. Crie um projeto no Supabase.
2. Rode o arquivo `supabase/schema.sql` no SQL Editor.
3. Crie usuários em Authentication > Users.
4. Autorize cada editor inserindo o `user_id` na tabela `editor_profiles`.
5. Configure na Vercel:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Como este projeto usa Vite, as variáveis públicas precisam começar com `VITE_`. Se usar a integração Supabase + Vercel, configure o prefixo público como `VITE_` ou crie essas variáveis manualmente em Project Settings > Environment Variables.

Recomendação de segurança: no Supabase, mantenha o cadastro público desativado e crie os usuários do cliente manualmente em Authentication > Users. Só usuários com registro em `editor_profiles` conseguem salvar alterações.

Depois faça um novo deploy. O cliente poderá entrar em `/editar` com e-mail e senha.

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
