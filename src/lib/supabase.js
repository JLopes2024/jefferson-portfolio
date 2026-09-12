import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL

const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseConfig =
  Boolean(
    supabaseUrl &&
    supabaseKey
  )

if (!hasSupabaseConfig) {
  console.error(
    'Supabase não configurado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY ou VITE_SUPABASE_ANON_KEY.',
  )
}

export const supabase =
  hasSupabaseConfig
    ? createClient(
        supabaseUrl,
        supabaseKey,
      )
    : null