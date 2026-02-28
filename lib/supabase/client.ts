import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials are missing. Check your environment variables.")
    // Return a proxy that swallows calls to prevent crashes in components
    return new Proxy({} as any, {
      get: () => () => ({ data: null, error: { message: "Supabase not configured" } }),
    })
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
