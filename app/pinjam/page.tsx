// app/pinjam/page.tsx
"use client";
import { useActionState, useEffect, useState } from "react";
import { ajukanPinjam } from "@/app/actions";
import Link from "next/link";

export default function PinjamPage({ searchParams }: any) {
  const [ruangList, setRuangList] = useState<any[]>([]);
  const [hasil, kirim, sedang] = useActionState(ajukanPinjam, { sukses: false, galat: {}, isian: {}, pesan: "" } as any);
  useEffect(() => {
    fetch("/api/ruang").then((r) => r.json()).then((d) => setRuangList(d.ruang || []));
  }, []);
  const input: any = { width: "100%", padding: 13, borderRadius: 14, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none", boxSizing: "border-box" };
  const label: any = { display: "block", fontWeight: 800, fontSize: 13, margin: "14px 0 6px" };
  const err = (t: string) => hasil.galat?.[t] ? <p style={{ color: "#FCA5A5", fontSize: 13, fontWeight: 700 }}>⚠ {hasil.galat[t]}</p> : null;
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 900 }}>Ajukan Peminjaman 📝</h1>
      <p style={{ color: "#C4B5FD" }}>Isi dengan benar. Tanggal maks 60 hari ke depan, bukan Sabtu/Minggu, jam 07:00-17:00, durasi maks 3 jam!</p>
      {hasil.sukses && <div style={{ background: "#14532D", border: "1px solid #22C55E", padding: 16, borderRadius: 14, marginTop: 16, fontWeight: 800 }}>✅ {hasil.pesan} <Link href="/cek" style={{ color: "white" }}>Cek Status di sini →</Link></div>}
      {hasil.galat?.umum && <p style={{ color: "#FCA5A5" }}>{hasil.galat.umum}</p>}
      <form action={kirim} style={{ background: "linear-gradient(135deg,#1E103A,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 22, padding: 24, maxWidth: 640, marginTop: 16 }}>
        <label style={label}>🏫 Ruang *</label>
        <select name="ruang_id" defaultValue={hasil.isian?.ruang_id || ""} style={input}>
          <option value="">-- Pilih Ruang --</option>
          {ruangList.map((r: any) => <option key={r.id} value={r.id}>{r.nama} (Kapasitas {r.kapasitas})</option>)}
        </select>
        {err("ruang_id")}
        <label style={label}>👤 Nama Peminjam * (3-40 huruf)</label>
        <input name="peminjam" defaultValue={hasil.isian?.peminjam || ""} placeholder="ex: Rina" style={input} />{err("peminjam")}
        <label style={label}>📝 Keperluan * (5-120 huruf)</label>
        <input name="keperluan" defaultValue={hasil.isian?.keperluan || ""} placeholder="ex: Praktikum Excel" style={input} />{err("keperluan")}
        <label style={label}>📅 Tanggal *</label>
        <input name="tanggal" type="date" defaultValue={hasil.isian?.tanggal || ""} style={input} />{err("tanggal")}
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}><label style={label}>🕐 Mulai *</label><input name="mulai" type="time" defaultValue={hasil.isian?.mulai || "08:00"} style={input} /></div>
          <div style={{ flex: 1 }}><label style={label}>🕐 Selesai *</label><input name="selesai" type="time" defaultValue={hasil.isian?.selesai || "10:00"} style={input} /></div>
        </div>
        {err("jam")}
        <label style={label}>👥 Jumlah Orang *</label>
        <input name="jumlah_orang" type="number" min={1} defaultValue={hasil.isian?.jumlah_orang || ""} placeholder="ex: 25" style={input} />{err("jumlah_orang")}
        <button disabled={sedang} style={{ width: "100%", marginTop: 20, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", border: "none", borderRadius: 999, padding: "14px", fontWeight: 900, cursor: "pointer" }}>{sedang ? "⏳ Mengirim..." : "✨ Ajukan Peminjaman →"}</button>
      </form>
    </div>
  );
}