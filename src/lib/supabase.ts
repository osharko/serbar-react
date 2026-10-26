import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Il client viene creato solo quando serve (pagina /mypage), così il resto
 * del sito funziona anche senza variabili d'ambiente configurate.
 * URL e publishable key sono pubblici: la sicurezza è nelle policy RLS.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase non configurato: mancano VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY'
    );
  }

  client = createClient(url, key, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
    },
  });

  return client;
}
