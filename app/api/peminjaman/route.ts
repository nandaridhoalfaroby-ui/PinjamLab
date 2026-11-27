// app/api/peminjaman/route.ts - FIX! Jadwal ngambil dari sini!
// Kemarin: return [] kosong! Sekarang: ambil langsung dari Supabase, sama kayak Admin!

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  try {
    const sb = supabase();

    // 👈 Coba 1: peminjaman + join ruang (kayak Admin!)
    const { data, error } = await sb
      .from("peminjaman")
      .select("*, ruang:ruang_id (id, nama, lokasi, kapasitas, jenis)")
      .order("tanggal", { ascending: true })
      .order("mulai", { ascending: true });

    if (error) {
      console.error("API peminjaman error:", error);
      // 👈 Coba 2: tanpa join, kalau relasi ruang error!
      const { data: data2, error: err2 } = await sb
        .from("peminjaman")
        .select("*")
        .order("tanggal", { ascending: true });
      if (err2) return NextResponse.json({ peminjaman: [], data: [], error: err2.message }, { status: 500 });
      return NextResponse.json({ peminjaman: data2 || [], data: data2 || [], total: (data2 || []).length });
    }

    // 👈 Normalisasi biar frontend gak bingung: ruang bisa object / null!
    const bersih = (data || []).map((p: any) => ({
      ...p,
      // kalau join gagal, ruang jadi null -> ambil dari kolom cadangan
      ruang: p.ruang || (p.ruang_nama ? { nama: p.ruang_nama, lokasi: p.lokasi || p.ruang_lokasi || "-" } : null),
    }));

    return NextResponse.json({ peminjaman: bersih, data: bersih, total: bersih.length });
  } catch (e: any) {
    return NextResponse.json({ peminjaman: [], data: [], error: String(e?.message || e) }, { status: 500 });
  }
}