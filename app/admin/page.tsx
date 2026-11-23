import { supabaseRahasia } from "@/lib/supabase";
import { pastikanAdmin } from "@/lib/sesi";
import { setujuiPeminjaman, tolakPeminjaman } from "@/app/actions";
import { tglIndo } from "@/lib/validasi";
import { keluar } from "@/app/login/actions";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string; info?: string; galat?: string }> }) {
  await pastikanAdmin();
  const p = await searchParams; const filter = p.status || "Semua";
  let q = supabaseRahasia().from("peminjaman").select("*, ruang(nama,lokasi)").order("dibuat", { ascending: false });
  if (filter !== "Semua") q = q.eq("status", filter);
  const { data } = await q; const list = data || [];
  const totalMenunggu = list.filter((x: any) => x.status === "menunggu").length;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div><h1 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Dashboard Admin 🎛</h1><p style={{ color: "#C4B5FD", margin: "4px 0 0" }}>Kelola permohonan peminjaman • {totalMenunggu} menunggu persetujuan</p></div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/admin/ruang" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>🏫 Kelola Ruang</Link>
          <form action={keluar}><button style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: 999, padding: "10px 18px", fontWeight: 800, cursor: "pointer" }}>Keluar →</button></form>
        </div>
      </div>
      {p.info && <p style={{ background: "#14532D", padding: 12, borderRadius: 12, fontWeight: 800 }}>✅ {p.info}</p>}
      {p.galat && <p style={{ background: "#7F1D1D", padding: 12, borderRadius: 12, fontWeight: 800 }}>⚠ {p.galat}</p>}
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {["Semua","menunggu","disetujui","ditolak"].map((s) => (
          <Link key={s} href={`/admin${s === "Semua" ? "" : `?status=${s}`}`} style={{ padding: "8px 16px", borderRadius: 999, fontWeight: 800, fontSize: 13, textDecoration: "none", color: filter === s ? "white" : "#C4B5FD", background: filter === s ? "linear-gradient(90deg,#F59E0B,#EC4899)" : "#1E103A", border: "1px solid #4C1D95" }}>{s === "Semua" ? "🏠 Semua" : s.toUpperCase()}</Link>
        ))}
      </div>
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {list.length === 0 ? <div style={{ background: "#1E103A", padding: 24, borderRadius: 18, textAlign: "center", color: "#C4B5FD" }}>Belum ada permohonan.</div> : list.map((x: any) => (
          <div key={x.id} style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 20, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div><b>Nomor {x.id} • {x.ruang?.nama}</b><div style={{ color: "#C4B5FD", fontSize: 13 }}>👤 {x.peminjam} • 📅 {tglIndo(x.tanggal)} • 🕐 {x.mulai}-{x.selesai} • 👥 {x.jumlah_orang} orang • 📝 {x.keperluan}</div>
              {x.status === "ditolak" && <div style={{ color: "#FCA5A5", fontSize: 13 }}>Alasan ditolak: {x.alasan_tolak}</div>}</div>
              <span style={{ padding: "6px 12px", borderRadius: 999, fontWeight: 800, fontSize: 12, height: "fit-content", background: x.status === "disetujui" ? "#14532D" : x.status === "ditolak" ? "#7F1D1D" : "#92400E", color: "white" }}>{x.status.toUpperCase()}</span>
            </div>
            {x.status === "menunggu" && (
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
                <form action={setujuiPeminjaman}><input type="hidden" name="id" value={x.id} /><button style={{ background: "#22C55E", color: "white", border: "none", borderRadius: 999, padding: "8px 16px", fontWeight: 900, cursor: "pointer" }}>✅ Setujui</button></form>
                <form action={tolakPeminjaman} style={{ display: "flex", gap: 6 }}>
                  <input type="hidden" name="id" value={x.id} />
                  <input name="alasan_tolak" placeholder="Alasan tolak (min 5 huruf) *" style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none" }} />
                  <button style={{ background: "#EF4444", color: "white", border: "none", borderRadius: 999, padding: "8px 16px", fontWeight: 900, cursor: "pointer" }}>❌ Tolak</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}