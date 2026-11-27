// app/peminjaman/page.tsx - JADWAL - FIX PAMUNGKAS!
// Kemarin: fetch /api/peminjaman -> di-block server Vercel -> 0 terus!
// Sekarang: fetch LANGSUNG ke Supabase dari browser (kayak Admin!) -> PASTI MUNCUL!

"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Item = {
  id: number; peminjam: string; keperluan: string; tanggal: string;
  mulai: string; selesai: string; jumlah_orang: number;
  status: string; ruang?: { nama: string; lokasi: string } | null;
  ruang_nama?: string; lokasi?: string; alasan_tolak?: string;
};

const keISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const normalTanggal = (t: any) => {
  if (!t) return "";
  const s = String(t).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  return s;
};
const normalStatus = (s: any) => {
  const x = String(s || "").toLowerCase().trim();
  if (["disetujui", "approved", "setuju", "diterima", "acc"].includes(x)) return "disetujui";
  if (["ditolak", "rejected", "tolak"].includes(x)) return "ditolak";
  return "menunggu";
};
const labelTanggal = (iso: string) => {
  const d = new Date(normalTanggal(iso) + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return `${namaHari[d.getDay()]}, ${d.getDate()} ${namaBulan[d.getMonth()]} ${d.getFullYear()}`;
};
const namaRuang = (p: Item) => p.ruang?.nama || p.ruang_nama || "Ruang";
const lokasiRuang = (p: Item) => p.ruang?.lokasi || p.lokasi || "-";

export default function JadwalPage() {
  const [semua, setSemua] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState("");
  const [tab, setTab] = useState<"semua" | "disetujui" | "menunggu" | "ditolak">("semua");
  const [filterWaktu, setFilterWaktu] = useState<"semua" | "hariIni" | "besok" | "mingguIni">("semua");
  const [cari, setCari] = useState("");

  const hariIni = useMemo(() => { const n = new Date(); n.setHours(0, 0, 0, 0); return n; }, []);
  const hariIniISO = keISO(hariIni);
  const besokISO = keISO(new Date(hariIni.getTime() + 86400000));

  useEffect(() => {
    const jalan = async () => {
      // 👈 LANGSUNG KE SUPABASE! GAK LEWAT /api LAGI!
      const { data, error } = await supabase
        .from("peminjaman")
        .select("*, ruang:ruang_id (nama, lokasi)")
        .order("tanggal", { ascending: true })
        .order("mulai", { ascending: true });

      if (error) {
        // 👈 Kalau join ruang error, coba tanpa join!
        setDebug(`Join error: ${error.message} -> coba tanpa join...`);
        const { data: data2, error: err2 } = await supabase
          .from("peminjaman")
          .select("*")
          .order("tanggal", { ascending: true });
        if (err2) { setDebug(`GAGAL TOTAL: ${err2.message} | Cek RLS Supabase di bawah!`); setLoading(false); return; }
        setDebug(`Tanpa join: ${data2?.length || 0} data`);
        setSemua((data2 || []).map((p: any) => ({ ...p, tanggal: normalTanggal(p.tanggal), status: normalStatus(p.status) })));
        setLoading(false);
        return;
      }
      setDebug(`Supabase langsung: ${data?.length || 0} data`);
      setSemua((data || []).map((p: any) => ({ ...p, tanggal: normalTanggal(p.tanggal), status: normalStatus(p.status) })));
      setLoading(false);
    };
    jalan();
  }, []);

  const hasil = useMemo(() => {
    let list = [...semua];
    if (tab !== "semua") list = list.filter((p) => normalStatus(p.status) === tab);
    if (filterWaktu === "hariIni") list = list.filter((p) => p.tanggal === hariIniISO);
    if (filterWaktu === "besok") list = list.filter((p) => p.tanggal === besokISO);
    if (filterWaktu === "mingguIni") {
      const akhir = keISO(new Date(hariIni.getTime() + 7 * 86400000));
      list = list.filter((p) => p.tanggal >= hariIniISO && p.tanggal <= akhir);
    }
    if (cari.trim()) {
      const q = cari.toLowerCase();
      list = list.filter((p) => String(p.peminjam || "").toLowerCase().includes(q) || namaRuang(p).toLowerCase().includes(q) || String(p.keperluan || "").toLowerCase().includes(q));
    }
    return list.sort((a, b) => (a.tanggal + a.mulai).localeCompare(b.tanggal + b.mulai));
  }, [semua, tab, filterWaktu, cari, hariIniISO, besokISO, hariIni]);

  const hitung = {
    semua: semua.length,
    disetujui: semua.filter((p) => normalStatus(p.status) === "disetujui").length,
    menunggu: semua.filter((p) => normalStatus(p.status) === "menunggu").length,
    ditolak: semua.filter((p) => normalStatus(p.status) === "ditolak").length,
  };

  const badge = (st: string) =>
    st === "disetujui"
      ? { bg: "#14532D", border: "#22C55E", teks: "#BBF7D0", label: "✅ DISETUJUI" }
      : st === "ditolak"
      ? { bg: "#7F1D1D", border: "#EF4444", teks: "#FECACA", label: "❌ DITOLAK" }
      : { bg: "#92400E", border: "#F59E0B", teks: "#FDE68A", label: "⏳ MENUNGGU" };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <style>{`
        .jadwal-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(280px,1fr)); gap: 14px; margin-top: 16px; }
        @media (max-width: 480px) { .jadwal-grid { grid-template-columns: minmax(0,1fr) !important; } }
      `}</style>

      <div style={{ background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777,#F59E0B)", borderRadius: 28, padding: "30px 24px", border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 20px 60px rgba(109,40,217,0.4)", boxSizing: "border-box" }}>
        <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>📅 JADWAL • LANGSUNG KE SUPABASE!</span>
        <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.05, margin: "14px 0 0", color: "white" }}>
          Jadwal Ruang<br />
          <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Semua Pengajuan!</span>
        </h1>
        <p style={{ color: "#DDD6FE", maxWidth: 640, lineHeight: 1.6 }}>
          Hari ini: <b style={{ color: "white" }}>{labelTanggal(hariIniISO)}</b> • Nomor 16 yang Menunggu di /cek itu HARUS muncul di sini juga! Klik tab <b style={{ color: "white" }}>⏳ Menunggu</b>!
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <Link href="/pinjam" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "11px 20px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>📝 Pinjam Ruang →</Link>
          <Link href="/admin" style={{ background: "rgba(0,0,0,0.35)", color: "white", padding: "11px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13, border: "1px solid rgba(255,255,255,0.4)" }}>⚙️ Ke Admin</Link>
          <Link href="/cek" style={{ background: "rgba(0,0,0,0.35)", color: "white", padding: "11px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13, border: "1px solid rgba(255,255,255,0.4)" }}>🔍 Cek Status Punyaku</Link>
        </div>
      </div>

      <div style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.4)", borderRadius: 14, padding: "10px 14px", marginTop: 12, fontSize: 12, color: "#A5F3FC", lineHeight: 1.6 }}>
        🔍 <b style={{ color: "white" }}>Debug:</b> {loading ? "Loading..." : debug}
        <br />Total: {hitung.semua} • ✅ {hitung.disetujui} • ⏳ {hitung.menunggu} • ❌ {hitung.ditolak} • Harusnya 16 / 11 / 2 / 2 kayak Admin!
      </div>

      <div style={{ background: "#1E103A", border: "1px solid #7C3AED", borderRadius: 20, padding: 14, marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {([
          ["semua", `📅 Semua (${hitung.semua})`],
          ["disetujui", `✅ Disetujui (${hitung.disetujui})`],
          ["menunggu", `⏳ Menunggu (${hitung.menunggu})`],
          ["ditolak", `❌ Ditolak (${hitung.ditolak})`],
        ] as const).map(([k, txt]) => (
          <button key={k} onClick={() => setTab(k)} style={{ background: tab === k ? "linear-gradient(90deg,#F59E0B,#EC4899)" : "rgba(255,255,255,0.08)", border: tab === k ? "none" : "1px solid #7C3AED", color: "white", padding: "9px 14px", borderRadius: 999, fontWeight: 900, fontSize: 12, cursor: "pointer" }}>{txt}</button>
        ))}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {([
            ["semua", "Semua Waktu"],
            ["hariIni", "⚡ Hari Ini"],
            ["besok", "🌅 Besok"],
            ["mingguIni", "📆 Minggu Ini"],
          ] as const).map(([k, txt]) => (
            <button key={k} onClick={() => setFilterWaktu(k)} style={{ background: filterWaktu === k ? "white" : "transparent", color: filterWaktu === k ? "#120826" : "white", border: "1px solid white", padding: "7px 12px", borderRadius: 999, fontWeight: 800, fontSize: 11, cursor: "pointer" }}>{txt}</button>
          ))}
        </div>
        <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="🔍 Cari nama / ruang / keperluan..." style={{ flex: 1, minWidth: 180, padding: 11, borderRadius: 999, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none", fontSize: 13 }} />
      </div>

      {loading && <p style={{ color: "#C4B5FD", marginTop: 16, fontWeight: 700 }}>⏳ Loading jadwal...</p>}
      {!loading && hasil.length === 0 && (
        <div style={{ background: "#1E103A", border: "1px dashed #7C3AED", borderRadius: 24, padding: 28, textAlign: "center", marginTop: 16 }}>
          <div style={{ fontSize: 44 }}>📅</div>
          <b style={{ color: "white", fontSize: 18 }}>Gak Ada Data Buat Filter Ini</b>
          <p style={{ color: "#C4B5FD", fontSize: 13, lineHeight: 1.6 }}>Liat Debug di atas! Kalau tulisannya GAGAL TOTAL, berarti RLS Supabase nge-block! Jalankan SQL di bawah!</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
            <button onClick={() => { setTab("semua"); setFilterWaktu("semua"); setCari(""); }} style={{ background: "white", color: "#120826", padding: "11px 18px", borderRadius: 999, fontWeight: 900, border: "none", fontSize: 13, cursor: "pointer" }}>🔄 Reset Filter</button>
            <Link href="/pinjam" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "11px 20px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>📝 Pinjam Ruang →</Link>
          </div>
        </div>
      )}

      <div className="jadwal-grid">
        {hasil.map((p) => {
          const st = normalStatus(p.status);
          const b = badge(st);
          return (
            <div key={p.id} style={{ background: "linear-gradient(135deg,#1E103A,#2E1065)", border: "1px solid #7C3AED", borderRadius: 20, padding: 16, overflowWrap: "anywhere" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                <span style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.teks, fontSize: 11, fontWeight: 900, padding: "4px 10px", borderRadius: 999 }}>{b.label}</span>
                <span style={{ background: "white", color: "#120826", fontSize: 11, fontWeight: 900, padding: "4px 10px", borderRadius: 999 }}>#{p.id}</span>
              </div>
              <b style={{ color: "white", fontSize: 17, display: "block", marginTop: 10 }}>🏫 {namaRuang(p)}</b>
              <div style={{ color: "#C4B5FD", fontSize: 12 }}>📍 {lokasiRuang(p)}</div>
              <div style={{ background: "#120826", border: "1px solid #4C1D95", borderRadius: 14, padding: 12, marginTop: 10, fontSize: 13, lineHeight: 1.8, color: "#DDD6FE" }}>
                <div>👤 <b style={{ color: "white" }}>{p.peminjam}</b></div>
                <div>📝 {p.keperluan}</div>
                <div>📅 <b style={{ color: "white" }}>{labelTanggal(p.tanggal)}</b> {p.tanggal === hariIniISO && <span style={{ background: "#22C55E", color: "white", fontSize: 10, padding: "2px 8px", borderRadius: 999, fontWeight: 900 }}>HARI INI!</span>}</div>
                <div>🕐 <b style={{ color: "white" }}>{p.mulai} - {p.selesai}</b></div>
                <div>👥 <b style={{ color: "white" }}>{p.jumlah_orang} orang</b></div>
                {st === "ditolak" && p.alasan_tolak && <div>📢 Alasan: <b style={{ color: "#FCA5A5" }}>{p.alasan_tolak}</b></div>}
              </div>
              <Link href={`/cek?nomor=${p.id}&nama=${encodeURIComponent(p.peminjam)}`} style={{ display: "block", textAlign: "center", marginTop: 10, background: "rgba(255,255,255,0.1)", border: "1px solid #7C3AED", color: "white", padding: "10px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 12 }}>🔍 Lihat Detail di /cek →</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}