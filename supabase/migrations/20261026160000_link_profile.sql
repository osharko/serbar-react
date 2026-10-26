-- Auto-riparazione del profilo: se un socio viene censito in members DOPO
-- aver già fatto il primo login, il trigger on_auth_user_created non è più
-- scattato. Questa funzione, chiamata dalla pagina /mypage, crea il profilo
-- al primo caricamento successivo (solo per l'utente autenticato e solo se
-- la sua email è presente in members).

create or replace function public.link_my_profile()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid    uuid := auth.uid();
  uemail text;
  m      public.members%rowtype;
begin
  if uid is null then
    return null;
  end if;

  -- Profilo già presente: nessuna scrittura, restituisce l'area.
  if exists (select 1 from public.profiles where id = uid) then
    return public.get_my_area();
  end if;

  select email into uemail from auth.users where id = uid;
  if uemail is null then
    return null;
  end if;

  select *
    into m
    from public.members
   where lower(email) = lower(uemail)
     and active
   limit 1;

  -- Email non censita: nessun profilo, la pagina mostra "accesso non abilitato".
  if m.id is null then
    return null;
  end if;

  insert into public.profiles (
    id, member_id, display_name, first_name, last_name, grade_id, is_admin
  )
  values (
    uid, m.id, m.display_name, m.first_name, m.last_name, m.grade_id, m.is_admin
  )
  on conflict (id) do update
    set member_id    = excluded.member_id,
        display_name = excluded.display_name,
        first_name   = excluded.first_name,
        last_name    = excluded.last_name,
        grade_id     = excluded.grade_id,
        is_admin     = excluded.is_admin;

  update public.members
     set auth_user_id = uid
   where id = m.id;

  return public.get_my_area();
end;
$$;

revoke all on function public.link_my_profile() from public, anon;
grant execute on function public.link_my_profile() to authenticated;
