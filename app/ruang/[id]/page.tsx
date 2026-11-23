import { supabasePublik, supabaseRahasia } from "@/lib/supabase";
import { tglIndo } from "@/lib/validasi";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function DetailRuang({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: r } = await supabasePublik().from("ruang").select("*").eq("id", Number(id)).single();
  if (!r) notFound();
  // Jadwal disetujui pake kunci rahasia (karena publik gak boleh baca peminjaman!), tapi NAMA PEMINJAM DISEMBUNYIKAN!
  const { data: jadwal } = await supabaseRahasia().from("peminjaman").select("tanggal,mulai,selesai").eq("ruang_id", Number(id)).eq("status", "disetujui").order("tanggal");
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 900 }}>{r.nama}</h1>
      <p style={{ color: "#C4B5FD" }}>📍 {r.lokasi} • 👥 Kapasitas {r.kapasitas} orang • Jenis: {r.jenis} • {r.aktif ? "✅ Aktif" : "❌ Nonaktif"}</p>
      <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 20, padding: 20, marginTop: 16 }}>
        <b>📅 Jadwal yang Sudah Disetujui (Nama peminjam disembunyikan, sesuai soal!)</b>
        {(jadwal || []).length === 0 ? <p style={{ color: "#C4B5FD" }}>Belum ada jadwal yang disetujui. Silakan ajukan!</p> : (
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {(jadwal || []).map((j: any, i: number) => (
              <div key={i} style={{ background: "#120826", border: "1px solid #7C3AED", padding: "10px 14px", borderRadius: 12 }}>📅 {tglIndo(j.tanggal)} • 🕐 {j.mulai} - {j.selesai} • <span style={{ color: "#86EFAC", fontWeight: 800 }}>DISETUJUI</span></div>
            ))}
          </div>
        )}
      </div>
      <Link href={`/pinjam?ruang_id=${r.id}`} style={{ display: "inline-block", marginTop: 16, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "12px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>📝 Pinjam Ruang Ini →</Link>
    </div>
  );
}