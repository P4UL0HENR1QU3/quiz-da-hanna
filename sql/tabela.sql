-- Tabela do ranking do Quiz da Hanna.
-- Cole tudo no SQL Editor do Supabase e clique em Run.

create table if not exists public.pontuacoes (
  id          uuid primary key,
  nome        text        not null check (char_length(nome) between 1 and 24),
  genero      text        not null check (char_length(genero) <= 24),
  sexualidade text        not null check (char_length(sexualidade) <= 24),
  pontos      integer     not null check (pontos between 0 and 100000),
  acertos     integer     not null check (acertos between 0 and 100),
  total       integer     not null check (total between 1 and 100),
  ms          integer     not null check (ms >= 0),
  criado_em   timestamptz not null default now()
);

-- Ordena o ranking sem varrer a tabela inteira.
create index if not exists pontuacoes_ranking_idx
  on public.pontuacoes (pontos desc, ms asc);

-- A chave "anon" fica visível no navegador, então quem protege são estas
-- regras: qualquer um lê e insere; ninguém altera nem apaga.
alter table public.pontuacoes enable row level security;

drop policy if exists "todos podem ler"      on public.pontuacoes;
drop policy if exists "todos podem inserir"  on public.pontuacoes;

create policy "todos podem ler"
  on public.pontuacoes for select
  using (true);

create policy "todos podem inserir"
  on public.pontuacoes for insert
  with check (true);

-- Sem policy de update e de delete, essas operações ficam bloqueadas
-- para a chave anon. Para limpar o ranking, use o SQL Editor:
--   delete from public.pontuacoes;
