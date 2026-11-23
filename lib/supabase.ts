// lib/supabase.ts - 2 client: publik (baca ruang) + rahasia (semua, lewat server!)
import { createClient } from "@supabase/supabase-js";
export function supabasePublik() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
export function supabaseRahasia() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!);
}