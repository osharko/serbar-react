import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { getSupabase } from '../../lib/supabase';

interface Grade {
  slug: string;
  label: string;
}

interface Resource {
  kind: 'playlist' | 'video';
  youtube_id: string;
  title: string;
  description: string | null;
}

interface Area {
  display_name: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
  grade: Grade | null;
  resources: Resource[];
}

let supabase: SupabaseClient | null = null;
let configError: string | null = null;
try {
  supabase = getSupabase();
} catch (error) {
  configError = (error as Error).message;
}

const BRAND = 'var(--color-brand-primary)';

// I colori delle cinture vivono nel tema (src/index.css, classi .grade-*).
const GRADE_CLASSES: Record<string, string> = {
  bianca: 'grade-bianca',
  giallo: 'grade-giallo',
  arancio: 'grade-arancio',
  rosso: 'grade-rosso',
  verde: 'grade-verde',
  blu: 'grade-blu',
  indaco: 'grade-indaco',
  'nero-1': 'grade-nero-1',
  'nero-2': 'grade-nero-2',
  'nero-3': 'grade-nero-3',
  'nero-4': 'grade-nero-4',
  'nero-5': 'grade-nero-5',
  maestro: 'grade-maestro',
};

function embedUrl(resource: Resource) {
  return resource.kind === 'playlist'
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${resource.youtube_id}`
    : `https://www.youtube-nocookie.com/embed/${resource.youtube_id}`;
}

export function MyPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [area, setArea] = useState<Area | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase || !session) {
      setArea(undefined);
      return;
    }

    let active = true;
    setArea(undefined);
    setError(null);

    supabase
      .rpc('get_my_area')
      .then(({ data, error: rpcError }) => {
        if (!active) return;
        if (rpcError) {
          setError(rpcError.message);
          setArea(null);
          return;
        }
        setArea((data as Area | null) ?? null);
      });

    return () => {
      active = false;
    };
  }, [session]);

  const login = async () => {
    if (!supabase) return;
    const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}mypage`;
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: { prompt: 'select_account' },
      },
    });
    if (authError) setError(authError.message);
  };

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setArea(undefined);
  };

  // Esce e riapre il selettore account Google: utile quando si è entrati
  // con l'email sbagliata.
  const switchAccount = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    await login();
  };

  if (configError) {
    return (
      <Centered>
        <p className="text-sm" style={{ color: '#b91c1c' }}>
          {configError}
        </p>
      </Centered>
    );
  }

  if (loadingSession) {
    return (
      <Centered>
        <p className="text-sm opacity-70">Caricamento…</p>
      </Centered>
    );
  }

  if (!session) {
    const oauthError = new URLSearchParams(window.location.search).get(
      'error_description'
    );

    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: BRAND }}
      >
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center">
          <h1
            className="text-2xl font-bold font-kungfu mb-2"
            style={{ color: BRAND }}
          >
            Area riservata
          </h1>
          <p
            className="text-sm mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Accedi con l'account Google con cui sei registrato in palestra.
          </p>

          {(oauthError || error) && (
            <p className="text-xs mb-4" style={{ color: '#b91c1c' }}>
              {oauthError ?? error}
            </p>
          )}

          <button
            onClick={login}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-semibold transition hover:opacity-90"
            style={{ backgroundColor: BRAND, color: 'var(--color-white)' }}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google.svg"
              alt=""
              className="w-5 h-5"
            />
            Accedi con Google
          </button>

          <Link
            to="/"
            className="inline-block mt-6 text-xs opacity-60 hover:opacity-100"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            ← Torna al sito
          </Link>
        </div>
      </div>
    );
  }

  if (area === undefined) {
    return (
      <Centered>
        <p className="text-sm opacity-70">Caricamento del profilo…</p>
      </Centered>
    );
  }

  if (area === null) {
    const email = session.user.email ?? 'email non disponibile';

    return (
      <Centered>
        <div className="text-center max-w-sm">
          <h1
            className="text-xl font-bold font-kungfu mb-3"
            style={{ color: BRAND }}
          >
            Accesso non abilitato
          </h1>
          <p
            className="text-sm mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            L'email{' '}
            <span className="font-semibold break-all" style={{ color: BRAND }}>
              {email}
            </span>{' '}
            non è censita nei sistemi. Contattare la rappresentante della
            palestra per ulteriori informazioni.
          </p>
          {error && (
            <p className="text-xs mb-4" style={{ color: '#b91c1c' }}>
              {error}
            </p>
          )}
          <button
            onClick={switchAccount}
            className="w-full px-4 py-3 rounded-lg font-semibold mb-3 transition hover:opacity-90"
            style={{ backgroundColor: BRAND, color: 'var(--color-white)' }}
          >
            Accedi con un altro account
          </button>
          <button
            onClick={logout}
            className="text-sm underline opacity-70 hover:opacity-100"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Esci
          </button>
        </div>
      </Centered>
    );
  }

  const gradeClass = area.grade
    ? (GRADE_CLASSES[area.grade.slug] ?? 'grade-default')
    : 'grade-default';
  const fullName =
    [area.last_name, area.first_name].filter(Boolean).join(' ') ||
    area.display_name;

  return (
    <div
      className={`min-h-screen flex flex-col ${gradeClass}`}
      style={{
        backgroundColor: 'var(--grade-bg)',
        color: 'var(--grade-text)',
      }}
    >
      <header className="flex justify-end p-4">
        <button
          onClick={logout}
          className="px-3 py-1.5 rounded border text-sm transition hover:opacity-80"
          style={{ borderColor: 'var(--grade-text)', color: 'var(--grade-text)' }}
        >
          Esci
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="text-base md:text-xl opacity-80">Benvenuto</p>
        <h1 className="text-4xl md:text-6xl font-bold mt-2 font-kungfu">
          {fullName}
        </h1>
        {area.grade && (
          <p className="mt-4 text-sm md:text-base opacity-80">
            {area.grade.label}
          </p>
        )}
      </main>

      {area.resources.length > 0 && (
        <section className="px-4 pb-12 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {area.resources.map((resource) => (
              <article
                key={`${resource.kind}-${resource.youtube_id}`}
                className="rounded-lg overflow-hidden bg-black/20"
              >
                <div className="aspect-video">
                  <iframe
                    src={embedUrl(resource)}
                    title={resource.title}
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h2 className="text-sm font-semibold px-3 py-2">
                  {resource.title}
                </h2>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className="p-4 text-center">
        <Link
          to="/"
          className="text-xs opacity-70 hover:opacity-100"
          style={{ color: 'var(--grade-text)' }}
        >
          ← Torna al sito
        </Link>
      </footer>
    </div>
  );
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--color-background-light)' }}
    >
      {children}
    </div>
  );
}
