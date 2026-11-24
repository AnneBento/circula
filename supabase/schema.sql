-- ============================================================================
-- CIRCULA - Schema PostgreSQL + Supabase Realtime (Hackathon Estação Tecnológica 2026)
-- Conformidade LGPD (Item 8.4): Apenas dados sintéticos de demonstração.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- 1. Ecopontos Centralizados (Gestão AMMA / CONSERCE)
create table if not exists public.ecopontos (
  id uuid primary key default uuid_generate_v4(),
  codigo text unique not null,
  nome text not null,
  bairro text not null,
  endereco text not null,
  horario text not null,
  materiais_aceitos text[] not null default '{"Cobre/Fios","Metais","Eletrônicos","Plástico Limpo","Papelão"}',
  capacidade_atual_kg numeric(10,2) not null default 0,
  capacidade_maxima_kg numeric(10,2) not null default 500,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2. Cidadãos Participantes (Dados sintéticos)
create table if not exists public.cidadaos (
  id uuid primary key default uuid_generate_v4(),
  codigo_entrega text unique not null,
  nome_ficticio text not null,
  bairro text not null,
  pontos integer not null default 0,
  nivel integer not null default 1 check (nivel between 1 and 3),
  total_kg_entregue numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

-- 3. Depósitos Validados Presencialmente pelo Catador
create table if not exists public.depositos (
  id uuid primary key default uuid_generate_v4(),
  cidadao_id uuid references public.cidadaos(id) on delete cascade,
  ecoponto_id uuid references public.ecopontos(id) on delete set null,
  catador_operador text not null,
  categoria_material text not null check (
    categoria_material in ('Cobre/Fios', 'Metais', 'Eletrônicos', 'Plástico Limpo', 'Papelão')
  ),
  peso_kg numeric(10,2) not null check (peso_kg > 0),
  pontos_gerados integer not null,
  renda_catador_brl numeric(10,2) not null,
  economia_ppp_brl numeric(10,2) not null,
  inspecao_limpa boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4. Vitrine de Vouchers e Benefícios
create table if not exists public.vouchers (
  id uuid primary key default uuid_generate_v4(),
  titulo text not null,
  parceiro text not null,
  categoria text not null check (categoria in ('Educação', 'Entretenimento', 'Comércio Local')),
  desconto text not null,
  nivel_minimo integer not null default 1 check (nivel_minimo between 1 and 3),
  custo_pontos integer not null default 100,
  ativo boolean not null default true
);

-- Habilitar Row Level Security (RLS) com políticas abertas para demonstração do MVP
alter table public.ecopontos enable row level security;
alter table public.cidadaos enable row level security;
alter table public.depositos enable row level security;
alter table public.vouchers enable row level security;

create policy "Leitura publica ecopontos" on public.ecopontos for select using (true);
create policy "Insercao ecopontos gestao" on public.ecopontos for insert with check (true);
create policy "Atualizacao ecopontos" on public.ecopontos for update using (true);

create policy "Leitura publica cidadaos" on public.cidadaos for select using (true);
create policy "Atualizacao cidadaos" on public.cidadaos for update using (true);

create policy "Leitura publica depositos" on public.depositos for select using (true);
create policy "Insercao depositos catador" on public.depositos for insert with check (true);

create policy "Leitura publica vouchers" on public.vouchers for select using (true);

-- Habilitar Realtime
alter publication supabase_realtime add table public.ecopontos;
alter publication supabase_realtime add table public.cidadaos;
alter publication supabase_realtime add table public.depositos;

-- Dados iniciais sintéticos (Quixadá/CE)
insert into public.ecopontos (codigo, nome, bairro, endereco, horario, capacidade_atual_kg, capacidade_maxima_kg) values
  ('QXD-01', 'Ecoponto Praça José de Barros', 'Centro', 'Praça José de Barros, s/n - Centro, Quixadá', 'Seg a Sáb • 07h às 17h', 185, 500),
  ('QXD-02', 'Ecoponto IFCE / Cedro', 'Combate', 'Av. José de Freitas Queiroz, 5000 - Combate', 'Seg a Sex • 08h às 18h', 240, 600),
  ('QXD-03', 'Ecoponto Campo Novo', 'Campo Novo', 'Rua Rodrigues Júnior, 1120 - Campo Novo', 'Seg a Sáb • 07h30 às 16h30', 310, 450)
on conflict (codigo) do nothing;

insert into public.cidadaos (codigo_entrega, nome_ficticio, bairro, pontos, nivel, total_kg_entregue) values
  ('QXD-2026', 'Mariana Silva (Demo)', 'Centro', 420, 2, 18.5),
  ('QXD-8841', 'Carlos Eduardo (Demo)', 'Campo Novo', 980, 3, 44.0)
on conflict (codigo_entrega) do nothing;

insert into public.vouchers (titulo, parceiro, categoria, desconto, nivel_minimo, custo_pontos) values
  ('15% OFF em Livros e Papelaria', 'Livraria Monólitos', 'Comércio Local', '15% OFF', 1, 100),
  ('Ingresso Meia-Entrada Cultural', 'Cine Teatro Quixadá', 'Entretenimento', '50% OFF', 2, 250),
  ('Bolsa 30% Curso Técnico & TI', 'Instituto Educa Sertão', 'Educação', '30% OFF', 2, 300),
  ('Vale-Feira Produtos Regionais', 'Associação Feira Limpa', 'Comércio Local', 'R$ 25,00', 3, 500)
on conflict do nothing;
