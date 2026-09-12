# Portfolio React + Supabase

Portfólio responsivo inspirado em uma estética editorial escura com verde-limão,
projetos consumidos do Supabase e um mini laboratório de código no final da página.

## 1. Instalar

```bash
npm install
npm run dev
```

## 2. Personalizar conteúdo

Edite:

- `src/data/profile.js`
- `src/data/projects.js` (fallback local)

## 3. Conectar Supabase

1. Crie um projeto no Supabase.
2. Abra SQL Editor.
3. Execute `supabase/schema.sql`.
4. Copie `.env.example` para `.env`.
5. Preencha:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

6. Reinicie `npm run dev`.

Sem `.env`, o site continua funcionando com os projetos locais.

## 4. Build

```bash
npm run build
```

A pasta final será `dist`.

## 5. Deploy rápido

### Vercel
- importe o repositório GitHub;
- framework: Vite;
- build command: `npm run build`;
- output: `dist`;
- adicione as duas variáveis `VITE_SUPABASE_*` se estiver usando Supabase.

### Netlify
- build command: `npm run build`;
- publish directory: `dist`.

## Segurança do Supabase

A chave `anon` pode ficar no frontend quando o RLS está configurado corretamente.
Nunca coloque `service_role` dentro do React/Vite.
