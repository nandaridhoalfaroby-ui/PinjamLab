// app/api/cek/route.ts - Nomor + Nama harus cocok!
import { supabaseRahasia } from "@/lib/supabase";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const nomor = url.searchParams.get("nomor"); const nama = url.searchParams.get("nama") || "";
  const { data } = await supabaseRahasia().from("peminjaman").select("*, ruang(nama,lokasi)").eq("id", Number(nomor)).single();
  if (!data) return NextResponse.json({ error: "Nomor tidak ditemukan!" }, { status: 404 });
  if (data.peminjam.toLowerCase() !== nama.trim().toLowerCase()) return NextResponse.json({ error: "Nama peminjam tidak cocok dengan nomor ini!" }, { status: 403 });
  return NextResponse.json({ data });
}