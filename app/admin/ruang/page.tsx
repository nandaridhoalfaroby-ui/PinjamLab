import { supabaseRahasia } from "@/lib/supabase";
import { pastikanAdmin } from "@/lib/sesi";
import { simpanRuang, toggleRuang, hapusRuang } from "@/app/actions";
import { keluar } from "@/app/login/actions";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function AdminRuang({ searchParams }: { searchParams: Promise<{ info?: string }> }) {
  await pastikanAdmin();
  const p = await searchParams;
  const { data } = await supabaseRahasia().from("ruang").select("*").order("id");
  const list = data || [];
  const input: any = { width: "100%", padding: 12, borderRadius: 12, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none" };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900 }}>Kelola Ruang 🏫</h1>
        <div style={{ display: "flex", gap: 8 }}><Link href="/admin" style={{ background: "#120826", border: "1px solid #7C3AED", color: "white", padding: "10px 16px", borderRadius: 999, fontWeight: 800, textDecoration: "none" }}>← Kembali ke Admin</Link><form action={keluar}><button style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: 999, padding: "10px 16px", fontWeight: 800, cursor: "pointer" }}>Keluar →</button></form></div>
      </div>
      {p.info && <p style={{ background: "#14532D", padding: 12, borderRadius: 12, fontWeight: 800 }}>✅ {p.info}</p>}
      <form action={simpanRuang} style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 20, padding: 20, marginTop: 16, maxWidth: 640 }}>
        <b>➕ Tambah Ruang Baru</b>
        <input name="nama" placeholder="Nama ruang (3-40 huruf, unik) *" style={{ ...input, marginTop: 12 }} />
        <select name="jenis" defaultValue="lab" style={{ ...input, marginTop: 10 }}><option value="lab">Lab</option><option value="kelas">Kelas</option><option value="aula">Aula</option></select>
        <input name="kapasitas" type="number" min={1} placeholder="Kapasitas (>0) *" style={{ ...input, marginTop: 10 }} />
        <input name="lokasi" placeholder="Lokasi *" style={{ ...input, marginTop: 10 }} />
        <button style={{ width: "100%", marginTop: 14, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", border: "none", borderRadius: 999, padding: "12px", fontWeight: 900, cursor: "pointer" }}>✨ Tambah Ruang</button>
      </form>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12, marginTop: 16 }}>
        {list.map((r: any) => (
          <div key={r.id} style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 18, padding: 16 }}>
            <b>{r.nama}</b><div style={{ color: "#C4B5FD", fontSize: 13 }}>📍 {r.lokasi} • 👥 {r.kapasitas} • {r.jenis} • {r.aktif ? "✅ Aktif" : "❌ Nonaktif"}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              <form action={toggleRuang}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="aktif" value={String(r.aktif)} /><button style={{ background: r.aktif ? "#F59E0B" : "#22C55E", color: "white", border: "none", borderRadius: 999, padding: "6px 12px", fontWeight: 800, cursor: "pointer", fontSize: 12 }}>{r.aktif ? "Nonaktifkan" : "Aktifkan"}</button></form>
              <form action={hapusRuang} onSubmit={(e) => { if (!confirm("Yakin hapus ruang ini? Peminjaman-nya ikut kehapus!")) e.preventDefault(); }}><input type="hidden" name="id" value={r.id} /><button style={{ background: "#EF4444", color: "white", border: "none", borderRadius: 999, padding: "6px 12px", fontWeight: 800, cursor: "pointer", fontSize: 12 }}>🗑 Hapus</button></form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}