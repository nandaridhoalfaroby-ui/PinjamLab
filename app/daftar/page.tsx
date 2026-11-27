// app/daftar/page.tsx - Register PinjamLab - BARU! Request guru!
// Abis daftar, nama langsung muncul di dropdown /pinjam!

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DaftarPage() {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [daftar, setDaftar] = useState<any[]>([]);
  const [pesan, setPesan] = useState("");
  const router = useRouter();

  useEffect(() => {
    setDaftar(JSON.parse(localStorage.getItem("pinjamlab-anggota") || "[]"));
  }, []);

  const kirim = (e: any) => {
    e.preventDefault();
    const n = nama.trim();
    if (n.length < 3 || n.length > 40) { setPesan("Nama harus 3-40 huruf!"); return; }
    if (!kelas.trim()) { setPesan("Kelas wajib diisi! Ex: XII-RPL 1"); return; }
    const lama = JSON.parse(localStorage.getItem("pinjamlab-anggota") || "[]");
    if (lama.some((a: any) => a.nama.toLowerCase() === n.toLowerCase())) {
      setPesan(`Nama "${n}" udah terdaftar! Langsung pilih di dropdown /pinjam aja!`);
      return;
    }
    const baru = [{ nama: n, kelas: kelas.trim(), waktu: new Date().toISOString() }, ...lama].slice(0, 100);
    localStorage.setItem("pinjamlab-anggota", JSON.stringify(baru));
    setDaftar(baru);
    // 👈 Langsung balik ke /pinjam + namanya udah kepilih!
    router.push(`/pinjam?nama=${encodeURIComponent(n)}`);
  };

  const input: any = { width: "100%", minWidth: 0, padding: 13, borderRadius: 14, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none", boxSizing: "border-box", fontSize: 14 };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <style>{`@media (max-width: 900px) { .daftar-wrap { grid-template-columns: minmax(0,1fr) !important; } }`}</style>
      <div style={{ background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777,#F59E0B)", borderRadius: 28, padding: "30px 24px", border: "1px solid rgba(255,255,255,0.25)" }}>
        <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>✍️ REGISTER PINJAMLAB • GRATIS • 10 DETIK!</span>
        <h1 style={{ fontSize: 34, fontWeight: 900, color: "white", margin: "14px 0 0", lineHeight: 1.1 }}>Daftar Dulu,<br /><span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Biar Namamu Muncul!</span></h1>
        <p style={{ color: "#DDD6FE", maxWidth: 600 }}>Abis daftar, namamu langsung muncul di dropdown Nama Peminjam di /pinjam! Gak perlu ketik ulang!</p>
      </div>

      <div className="daftar-wrap" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 14, marginTop: 16, alignItems: "start" }}>
        <form onSubmit={kirim} style={{ background: "linear-gradient(135deg,#1E103A,#2E1065)", border: "1px solid #7C3AED", borderRadius: 24, padding: 24, boxSizing: "border-box", minWidth: 0 }}>
          <b style={{ color: "white", fontSize: 18 }}>✍️ Formulir Register</b>
          <label style={{ display: "block", fontWeight: 800, fontSize: 13, margin: "16px 0 6px", color: "white" }}>👤 Nama Lengkap * (3-40 huruf)</label>
          <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="ex: Rina" style={input} />
          <label style={{ display: "block", fontWeight: 800, fontSize: 13, margin: "14px 0 6px", color: "white" }}>🏫 Kelas *</label>
          <input value={kelas} onChange={(e) => setKelas(e.target.value)} placeholder="ex: XII-RPL 1" style={input} />
          {pesan && <p style={{ color: "#FDE68A", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", padding: "10px 12px", borderRadius: 12, fontWeight: 700, fontSize: 13 }}>{pesan}</p>}
          <button style={{ width: "100%", marginTop: 18, background: "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6)", color: "white", border: "none", borderRadius: 999, padding: "14px", fontWeight: 900, cursor: "pointer", fontSize: 15 }}>✨ Daftar & Lanjut Pinjam →</button>
          <p style={{ textAlign: "center", color: "#A78BFA", fontSize: 11, marginTop: 10 }}>Namamu cuma disimpen di HP ini + dipake buat dropdown. Gak dibagikan!</p>
          <Link href="/pinjam" style={{ display: "block", textAlign: "center", marginTop: 8, color: "white", fontWeight: 800, fontSize: 13 }}>← Balik ke Pinjam</Link>
        </form>

        <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 24, padding: 18, minWidth: 0, boxSizing: "border-box" }}>
          <b style={{ color: "white" }}>👥 Udah Terdaftar ({daftar.length})</b>
          <p style={{ color: "#C4B5FD", fontSize: 12 }}>Nama-nama ini yang muncul di dropdown /pinjam!</p>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {daftar.length === 0 ? (
              <p style={{ color: "#C4B5FD", fontSize: 13 }}>Belum ada yang daftar di HP ini. Jadi yang pertama!</p>
            ) : daftar.slice(0, 20).map((a: any, i: number) => (
              <Link key={i} href={`/pinjam?nama=${encodeURIComponent(a.nama)}`} style={{ background: "#120826", border: "1px solid #7C3AED", borderRadius: 14, padding: "10px 12px", textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span><b style={{ color: "white" }}>{a.nama}</b><div style={{ color: "#C4B5FD", fontSize: 11 }}>{a.kelas || "-"}</div></span>
                <span style={{ color: "#FBBF24", fontWeight: 900, fontSize: 12 }}>Pilih →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}