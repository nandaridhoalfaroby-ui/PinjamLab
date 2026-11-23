// app/cek/page.tsx
"use client";
import { useState } from "react";
export default function CekPage() {
  const [nomor, setNomor] = useState(""); const [nama, setNama] = useState("");
  const [hasil, setHasil] = useState<any>(null); const [pesan, setPesan] = useState("");
  async function cek() {
    setPesan(""); setHasil(null);
    const res = await fetch(`/api/cek?nomor=${nomor}&nama=${encodeURIComponent(nama)}`);
    const d = await res.json();
    if (!res.ok) setPesan(d.error || "Tidak ditemukan!");
    else setHasil(d.data);
  }
  const input: any = { width: "100%", padding: 13, borderRadius: 14, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none" };
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 900 }}>Cek Status 🔍</h1>
      <p style={{ color: "#C4B5FD" }}>Masukkan nomor peminjaman + nama peminjam. Harus cocok persis, kalau beda, gak akan muncul! (Sesuai soal!)</p>
      <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 24, maxWidth: 520, marginTop: 16 }}>
        <label style={{ fontWeight: 800, fontSize: 13 }}>🔢 Nomor Peminjaman *</label>
        <input value={nomor} onChange={(e) => setNomor(e.target.value)} placeholder="ex: 1" style={{ ...input, marginTop: 6 }} />
        <label style={{ fontWeight: 800, fontSize: 13, display: "block", marginTop: 14 }}>👤 Nama Peminjam *</label>
        <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="ex: Rina" style={{ ...input, marginTop: 6 }} />
        <button onClick={cek} style={{ width: "100%", marginTop: 16, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", border: "none", borderRadius: 999, padding: "13px", fontWeight: 900, cursor: "pointer" }}>🔍 Cek Status</button>
        {pesan && <p style={{ color: "#FCA5A5", fontWeight: 700 }}>{pesan}</p>}
        {hasil && (
          <div style={{ background: "#120826", border: "1px solid #7C3AED", borderRadius: 14, padding: 16, marginTop: 16 }}>
            <b>Nomor {hasil.id} • {hasil.ruang?.nama}</b>
            <div style={{ color: "#C4B5FD", fontSize: 13 }}>📅 {hasil.tanggal} • 🕐 {hasil.mulai}-{hasil.selesai} • 👥 {hasil.jumlah_orang} orang</div>
            <div style={{ marginTop: 8 }}>Status: <b style={{ color: hasil.status === "disetujui" ? "#86EFAC" : hasil.status === "ditolak" ? "#FCA5A5" : "#FBBF24" }}>{hasil.status.toUpperCase()}</b></div>
            {hasil.status === "ditolak" && <p style={{ color: "#FCA5A5" }}>Alasan ditolak: {hasil.alasan_tolak || "-"}</p>}
          </div>
        )}
      </div>
    </div>
  );
}