import { supabaseRahasia } from "@/lib/supabase";
import { tglIndo } from "@/lib/validasi";
export const dynamic = "force-dynamic";
export default async function JadwalPublik() {
  const { data } = await supabaseRahasia().from("peminjaman").select("*, ruang(nama,lokasi)").eq("status", "disetujui").order("tanggal");
  const list = data || [];
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 900 }}>Jadwal Peminjaman 📅</h1>
      <p style={{ color: "#C4B5FD" }}>Hanya yang sudah disetujui yang ditampilkan di sini. Nama peminjam disembunyikan!</p>
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {list.length === 0 ? <div style={{ background: "#1E103A", padding: 24, borderRadius: 18, textAlign: "center", color: "#C4B5FD" }}>Belum ada jadwal yang disetujui.</div> : list.map((p: any) => (
          <div key={p.id} style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 18, padding: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div><b>{p.ruang?.nama}</b><div style={{ color: "#C4B5FD", fontSize: 13 }}>📍 {p.ruang?.lokasi} • 📅 {tglIndo(p.tanggal)} • 🕐 {p.mulai}-{p.selesai} • 👥 {p.jumlah_orang} orang</div></div>
            <span style={{ background: "#14532D", color: "#BBF7D0", padding: "6px 12px", borderRadius: 999, fontWeight: 800, fontSize: 12, height: "fit-content" }}>✅ DISETUJUI</span>
          </div>
        ))}
      </div>
    </div>
  );
}