import { supabasePublik } from "@/lib/supabase";
import { NextResponse } from "next/server";
export async function GET() {
  const { data } = await supabasePublik().from("ruang").select("*").eq("aktif", true).order("nama");
  return NextResponse.json({ ruang: data || [] });
}