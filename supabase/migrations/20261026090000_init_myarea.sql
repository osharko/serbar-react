-- Area riservata MyPage: schema, RLS e RPC
-- Le cinture/gradi NON sono seedati qui: si gestiscono da Supabase Studio
-- (tabella public.grades), così i dati non finiscono nel repo pubblico.

-- ---------------------------------------------------------------------------
-- Tabelle
-- ---------------------------------------------------------------------------

-- Catalogo dei gradi (pubblico: i ruoli non sono un segreto)
create table if not exists public.grades (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  label      text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Anagrafica soci: contiene le email, quindi resta privata (nessun grant)
create table if not exists public.members (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  display_name text not null,
  grade_id     uuid references public.grades(id) on delete set null,
  is_admin     boolean not null default false,
  active       boolean not null default true,
  auth_user_id uuid unique references auth.users(id) on delete set null,
  created_at   timestamptz not null default now()
);

create unique index if not exists members_email_lower_idx
  on public.members (lower(email));

-- Profilo applicativo: nessuna email, leggibile solo dal proprietario
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  member_id    uuid unique references public.members(id) on delete cascade,
  display_name text not null,
  grade_id     uuid references public.grades(id) on delete set null,
  is_admin     boolean not null default false,
  created_at   timestamptz not null default now()
);

-- Contenuti didattici: playlist o singoli video YouTube
create table if not exists public.resources (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('playlist', 'video')),
  youtube_id  text not null,
  title       text not null,
  description text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  unique (kind, youtube_id)
);

-- Many-to-many grado <-> contenuto: un contenuto può servire più gradi
create table if not exists public.grade_resources (
  grade_id    uuid not null references public.grades(id) on delete cascade,
  resource_id uuid not null references public.resources(id) on delete cascade,
  sort_order  integer not null default 0,
  primary key (grade_id, resource_id)
);

-- ---------------------------------------------------------------------------
-- Trigger: al primo login Google associa l'utente al socio tramite email
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  m public.members%rowtype;
begin
  select *
    into m
    from public.members
   where lower(email) = lower(new.email)
     and active
   limit 1;

  -- Email non censita: nessun profilo, quindi nessun contenuto.
  if m.id is null then
    return new;
  end if;

  insert into public.profiles (id, member_id, display_name, grade_id, is_admin)
  values (new.id, m.id, m.display_name, m.grade_id, m.is_admin)
  on conflict (id) do update
    set member_id    = excluded.member_id,
        display_name = excluded.display_name,
        grade_id     = excluded.grade_id,
        is_admin     = excluded.is_admin;

  update public.members
     set auth_user_id = new.id
   where id = m.id;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RPC: grado + contenuti dell'utente in una sola chiamata
-- ---------------------------------------------------------------------------

create or replace function public.get_my_area()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'display_name', p.display_name,
    'is_admin', p.is_admin,
    'grade', case
      when g.id is null then null
      else jsonb_build_object('slug', g.slug, 'label', g.label)
    end,
    'resources', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'kind', r.kind,
          'youtube_id', r.youtube_id,
          'title', r.title,
          'description', r.description
        )
        order by gr.sort_order, r.sort_order, r.title
      )
      from public.grade_resources gr
      join public.resources r on r.id = gr.resource_id
      where gr.grade_id = p.grade_id
    ), '[]'::jsonb)
  )
  from public.profiles p
  left join public.grades g on g.id = p.grade_id
  where p.id = auth.uid();
$$;

revoke all on function public.get_my_area() from public, anon;
grant execute on function public.get_my_area() to authenticated;

-- ---------------------------------------------------------------------------
-- RLS e grant
-- ---------------------------------------------------------------------------

alter table public.grades          enable row level security;
alter table public.members         enable row level security;
alter table public.profiles        enable row level security;
alter table public.resources       enable row level security;
alter table public.grade_resources enable row level security;

-- Nessun accesso diretto via API alle tabelle private
revoke all on public.members         from anon, authenticated;
revoke all on public.resources       from anon, authenticated;
revoke all on public.grade_resources from anon, authenticated;
revoke all on public.profiles        from anon, authenticated;
revoke all on public.grades          from anon, authenticated;

-- Il catalogo gradi è pubblico (serve anche al ping keepalive)
grant select on public.grades to anon, authenticated;

-- Il profilo è leggibile solo dal proprietario
grant select on public.profiles to authenticated;

-- Contenuti: accessibili solo se il grado corrisponde a quello dell'utente
grant select on public.resources to authenticated;
grant select on public.grade_resources to authenticated;

drop policy if exists "grades are public" on public.grades;
create policy "grades are public"
  on public.grades for select
  to anon, authenticated
  using (true);

drop policy if exists "own profile" on public.profiles;
create policy "own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "resources of my grade" on public.resources;
create policy "resources of my grade"
  on public.resources for select
  to authenticated
  using (
    exists (
      select 1
        from public.grade_resources gr
        join public.profiles p on p.grade_id = gr.grade_id
       where gr.resource_id = resources.id
         and p.id = auth.uid()
    )
  );

drop policy if exists "grade resources of my grade" on public.grade_resources;
create policy "grade resources of my grade"
  on public.grade_resources for select
  to authenticated
  using (
    exists (
      select 1
        from public.profiles p
       where p.id = auth.uid()
         and p.grade_id = grade_resources.grade_id
    )
  );

-- members non ha policy: nessun accesso se non da service_role/Studio.
