import { supabasePublik } from "@/lib/supabase";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function DaftarRuang({ searchParams }: { searchParams: Promise<{ jenis?: string }> }) {
  const p = await searchParams; const jenis = p.jenis || "Semua";
  let q = supabasePublik().from("ruang").select("*").eq("aktif", true);
  if (jenis !== "Semua") q = q.eq("jenis", jenis);
  const { data } = await q; const list = data || [];
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 900 }}>Daftar Ruang 🏫</h1>
      <p style={{ color: "#C4B5FD" }}>Saring jenis (URL): pilih di bawah, URL-nya berubah jadi <b style={{ color: "white" }}>/ruang?jenis=lab</b></p>
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        {["Semua","lab","kelas","aula"].map((j) => (
          <Link key={j} href={`/ruang${j === "Semua" ? "" : `?jenis=${j}`}`} style={{ padding: "8px 16px", borderRadius: 999, fontWeight: 800, fontSize: 13, textDecoration: "none", color: jenis === j ? "white" : "#C4B5FD", background: jenis === j ? "linear-gradient(90deg,#F59E0B,#EC4899)" : "#1E103A", border: "1px solid #4C1D95" }}>{j === "Semua" ? "🏠 Semua" : j.toUpperCase()}</Link>
        ))}
      </div>
      <p style={{ color: "#C4B5FD", marginTop: 14 }}>Menampilkan <b style={{ color: "#FBBF24" }}>{list.length} ruang</b> {jenis !== "Semua" ? `jenis ${jenis}` : ""}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginTop: 12 }}>
        {list.map((r: any) => (
          <Link key={r.id} href={`/ruang/${r.id}`} style={{ textDecoration: "none", color: "white", background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 20, padding: 18, display: "block" }}>
            <b style={{ fontSize: 19 }}>{r.nama}</b><div style={{ color: "#C4B5FD", fontSize: 13 }}>📍 {r.lokasi} • 👥 {r.kapasitas} orang • {r.jenis}</div>
            <span style={{ display: "inline-block", marginTop: 12, background: "#7C3AED", padding: "8px 14px", borderRadius: 999, fontWeight: 800, fontSize: 13 }}>Detail →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}