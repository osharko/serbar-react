-- Nome/cognome per la pagina riservata.
-- I colori delle cinture NON stanno nel DB: sono gestiti dal tema CSS
-- (src/index.css, classi .grade-*).

alter table public.members   add column if not exists first_name text;
alter table public.members   add column if not exists last_name  text;
alter table public.profiles  add column if not exists first_name text;
alter table public.profiles  add column if not exists last_name  text;

-- Backfill nome/cognome dai display_name esistenti ("Nome Cognome")
update public.members
   set last_name  = (regexp_match(display_name, '(\S+)\s*$'))[1],
       first_name = btrim(regexp_replace(display_name, '\s+\S+\s*$', ''))
 where display_name is not null;

-- Trigger: copia anche nome/cognome nel profilo
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

  if m.id is null then
    return new;
  end if;

  insert into public.profiles (
    id, member_id, display_name, first_name, last_name, grade_id, is_admin
  )
  values (
    new.id, m.id, m.display_name, m.first_name, m.last_name, m.grade_id, m.is_admin
  )
  on conflict (id) do update
    set member_id    = excluded.member_id,
        display_name = excluded.display_name,
        first_name   = excluded.first_name,
        last_name    = excluded.last_name,
        grade_id     = excluded.grade_id,
        is_admin     = excluded.is_admin;

  update public.members
     set auth_user_id = new.id
   where id = m.id;

  return new;
end;
$$;

-- RPC: nome/cognome + grado (slug e label) + contenuti
create or replace function public.get_my_area()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'display_name', p.display_name,
    'first_name', p.first_name,
    'last_name', p.last_name,
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
