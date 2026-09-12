create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  category text not null,
  image_url text,
  github_url text,
  demo_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists projects_category_idx
  on public.projects (category);

create index if not exists projects_featured_created_idx
  on public.projects (featured desc, created_at desc);

alter table public.projects enable row level security;

drop policy if exists "Projetos visiveis publicamente" on public.projects;

create policy "Projetos visiveis publicamente"
on public.projects
for select
to anon, authenticated
using (true);

insert into public.projects
  (title, slug, description, category, github_url, demo_url, featured)
values
  (
    'Painel de Estudos',
    'painel-de-estudos',
    'Dashboard responsivo para organizar trilhas, progresso e conteúdo de aprendizagem.',
    'Educação',
    null,
    null,
    true
  ),
  (
    'Landing Page Conversão',
    'landing-page-conversao',
    'Landing page focada em mensagem clara, hierarquia visual e chamada para ação.',
    'Landing pages',
    null,
    null,
    true
  ),
  (
    'Mini Ferramenta Web',
    'mini-ferramenta-web',
    'Ferramenta digital simples, rápida e pensada para resolver uma tarefa específica.',
    'Ferramentas',
    null,
    null,
    false
  )
on conflict (slug) do nothing;
