# Ser.Bar. — sito web

Sito della scuola di Kung Fu Ser.Bar. (San Benedetto del Tronto): single page React + Vite, ospitata su GitHub Pages con dominio custom `serbar.it`.

## Stack

- React 19 + TypeScript + Vite (rolldown-vite)
- Tailwind CSS 4
- React Router (SPA, una sola route pubblica)
- Deploy statico su GitHub Pages via GitHub Actions
- Supabase per l'area riservata (`/mypage`): auth Google + Postgres con RLS

## Sviluppo locale

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run lint
npm run format
```

Node 22 o superiore.

## Deploy

Il sito viene pubblicato automaticamente ad ogni push su `main` dal workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Non c'è nulla da committare in `dist/`: build e publish avvengono su GitHub.

- Produzione: https://serbar.it
- Anteprima GitHub Pages: `https://osharko.github.io/serbar-react/` (redirige su serbar.it quando il custom domain è attivo)
- Il `base` di Vite è calcolato automaticamente da `configure-pages` (`/serbar-react/` in anteprima, `/` su dominio custom)

## Infrastruttura e provider

| Ambito | Provider | Dettagli / dashboard |
|---|---|---|
| Registrazione dominio | **Infomaniak** (CH) | `serbar.it`, scadenza 2027-10-25; transfer `.it` completato |
| DNS | **Infomaniak** | nameserver `ns11/ns12.infomaniak.ch`; zona gestita nel Manager Infomaniak. Record: 4 `A` GitHub su `@`, `CNAME www → osharko.github.io`, TXT Google Search Console |
| Hosting statico | **GitHub Pages** | repo pubblico [`osharko/serbar-react`](https://github.com/osharko/serbar-react); source: GitHub Actions |
| CI/CD | **GitHub Actions** | `.github/workflows/deploy.yml` (build + deploy Pages) |
| Login / identità | **Google Cloud** | OAuth Client di tipo Web, progetto `serbar`; redirect `https://kplbjkiaogqmephfpygg.supabase.co/auth/v1/callback` |
| Auth + database | **Supabase** (EU) | progetto `kplbjkiaogqmephfpygg`, regione `eu-central-2` (Zurich), piano Free. Provider Google ON, provider Email OFF (nessun SMTP) |
| Email transazionale | nessuno | magic link disabilitato: l'accesso avviene solo con Google |

Link diretti:

- Supabase → Authentication: https://supabase.com/dashboard/project/kplbjkiaogqmephfpygg/auth/providers
- Supabase → SQL Editor: https://supabase.com/dashboard/project/kplbjkiaogqmephfpygg/sql
- Google Cloud → Credentials: https://console.cloud.google.com/auth/clients
- Infomaniak → Domini: https://manager.infomaniak.com/v3/ng/other/domain

## Chiavi e segreti

- `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_…`): **pubbliche**, possono stare nel frontend.
- La `sb_secret_…` di Supabase (ex `service_role`) e il `client_secret` Google **non devono mai** finire nel repo, nel frontend o nei log: solo password manager.
- Il Personal Access Token Supabase (`sbp_…`) serve solo per operazioni via Management API e va revocato dopo l'uso.
- Il repo è pubblico: nessun dato personale (email dei soci, URL di contenuti riservati) va committato.

## Database e migrazioni

Le migrazioni SQL stanno in [`supabase/migrations/`](supabase/migrations) e vengono applicate da Supabase all'aggiornamento del branch di produzione (integrazione GitHub del progetto). Regole:

- una migrazione già applicata non si modifica: se ne aggiunge una nuova;
- le migrazioni non contengono dati personali né URL riservati;
- i dati (gradi, soci, contenuti) si gestiscono da Supabase Studio, non da file committati.

L'area riservata usa:

- `grades` — catalogo dei gradi (pubblico)
- `members` — soci con email e grado (privata, nessun accesso via API)
- `profiles` — profilo applicativo, leggibile solo dal proprietario
- `resources` / `grade_resources` — playlist/video YouTube associati ai gradi
- `get_my_area()` — RPC che restituisce grado + contenuti dell'utente autenticato

## Piano Free Supabase

I progetti Free vanno in pausa dopo 7 giorni di attività DB insufficiente. È previsto un ping giornaliero via GitHub Actions (`.github/workflows/supabase-keepalive.yml`); attenzione: GitHub disabilita i workflow schedulati dopo 60 giorni di inattività del repository.

## Riferimenti

- Migrazione hosting: issue [#2](https://github.com/osharko/serbar-react/issues/2)
- Area riservata / login: issue [#3](https://github.com/osharko/serbar-react/issues/3)
