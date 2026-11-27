// app/pinjam/page.tsx - Pinjam + KALENDER CUSTOM REAL-TIME!
// Tanggal kemarin = KUNCI! Sabtu/Minggu = KUNCI! >60 hari = KUNCI!
// Dropdown nama + Preview 1 orang + Struk + Anti-offside!
// FIX: Tulisan "0 / 120 huruf" DIHAPUS! Validasi tetep jalan via error server!

"use client";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { ajukanPinjam } from "@/app/actions";
import Link from "next/link";

type Anggota = { nama: string; kelas?: string; totalPinjam?: number };

const keISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const tambahHari = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export default function PinjamPage() {
  const [ruangList, setRuangList] = useState<any[]>([]);
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([]);
  const [namaLain, setNamaLain] = useState(false);
  const [hasil, kirim, sedang] = useActionState(ajukanPinjam, { sukses: false, galat: {}, isian: {}, pesan: "" } as any);
  const [udahCopy, setUdahCopy] = useState(false);
  const strukRef = useRef<HTMLDivElement>(null);
  const [bukaKalender, setBukaKalender] = useState(false);
  const [bulanLihat, setBulanLihat] = useState(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), 1); });
  const [pesanTanggal, setPesanTanggal] = useState("");

  const [preview, setPreview] = useState({
    ruang_id: "", peminjam: "", keperluan: "", tanggal: "",
    mulai: "08:00", selesai: "10:00", jumlah_orang: "",
  });

  const hariIni = useMemo(() => { const n = new Date(); n.setHours(0, 0, 0, 0); return n; }, []);
  const maksTanggal = useMemo(() => tambahHari(hariIni, 60), [hariIni]);
  const minISO = keISO(hariIni);
  const maxISO = keISO(maksTanggal);

  useEffect(() => {
    fetch("/api/ruang").then((r) => r.json()).then((d) => setRuangList(d.ruang || [])).catch(() => {});
    const ambilNama = async () => {
      const dariRegister: Anggota[] = JSON.parse(localStorage.getItem("pinjamlab-anggota") || "[]");
      let dariPinjam: Anggota[] = [];
      try {
        const res = await fetch("/api/peminjaman");
        const d = await res.json();
        const list = d.peminjaman || d.data || [];
        const hitung: Record<string, number> = {};
        list.forEach((p: any) => { if (p.peminjam) hitung[String(p.peminjam).trim()] = (hitung[String(p.peminjam).trim()] || 0) + 1; });
        dariPinjam = Object.entries(hitung).map(([nama, totalPinjam]) => ({ nama, totalPinjam }));
      } catch {}
      const gabung = new Map<string, Anggota>();
      [...dariRegister, ...dariPinjam].forEach((a) => {
        const key = a.nama.trim().toLowerCase();
        if (!key) return;
        const lama = gabung.get(key);
        gabung.set(key, { nama: a.nama.trim(), kelas: a.kelas || lama?.kelas || "", totalPinjam: (lama?.totalPinjam || 0) + (a.totalPinjam || 0) });
      });
      setAnggotaList([...gabung.values()].sort((a, b) => a.nama.localeCompare(b.nama)));
    };
    ambilNama();
    const id = new URLSearchParams(window.location.search).get("ruang_id");
    if (id) setPreview((p) => ({ ...p, ruang_id: id }));
    const baruDaftar = new URLSearchParams(window.location.search).get("nama");
    if (baruDaftar) setPreview((p) => ({ ...p, peminjam: decodeURIComponent(baruDaftar) }));
  }, []);

  const nomorDariPesan = hasil.pesan?.match(/Nomor peminjaman kamu:\s*(\d+)/)?.[1] || "";
  const ruangTerpilih = ruangList.find((r: any) => String(r.id) === String(preview.ruang_id));
  const anggotaTerpilih = anggotaList.find((a) => a.nama.toLowerCase() === preview.peminjam.trim().toLowerCase());

  useEffect(() => {
    if (hasil.sukses && nomorDariPesan) {
      try {
        const lama = JSON.parse(localStorage.getItem("pinjamlab-riwayat") || "[]");
        const baru = [{ nomor: nomorDariPesan, nama: preview.peminjam, tanggal: preview.tanggal, ruang: ruangTerpilih?.nama || "", waktu: new Date().toISOString() }, ...lama].slice(0, 5);
        localStorage.setItem("pinjamlab-riwayat", JSON.stringify(baru));
      } catch {}
      strukRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasil.sukses]);

  const cekTanggal = (d: Date): { boleh: boolean; alasan: string } => {
    const x = new Date(d); x.setHours(0, 0, 0, 0);
    if (x < hariIni) return { boleh: false, alasan: "Tanggal udah lewat!" };
    if (x > maksTanggal) return { boleh: false, alasan: "Maks 60 hari ke depan!" };
    if (x.getDay() === 0) return { boleh: false, alasan: "Minggu libur!" };
    if (x.getDay() === 6) return { boleh: false, alasan: "Sabtu libur!" };
    return { boleh: true, alasan: "" };
  };

  const pilihTanggal = (d: Date) => {
    const c = cekTanggal(d);
    if (!c.boleh) { setPesanTanggal(`❌ ${c.alasan}`); return; }
    setPesanTanggal("");
    setPreview((p) => ({ ...p, tanggal: keISO(d) }));
    setBukaKalender(false);
  };

  const pilihCepat = (label: string) => {
    if (label === "Hari Ini") pilihTanggal(hariIni);
    if (label === "Besok") pilihTanggal(tambahHari(hariIni, 1));
    if (label === "Senin Depan") {
      let d = tambahHari(hariIni, 1);
      while (d.getDay() !== 1) d = tambahHari(d, 1);
      pilihTanggal(d);
    }
  };

  const kotakKalender = useMemo(() => {
    const pertama = new Date(bulanLihat.getFullYear(), bulanLihat.getMonth(), 1);
    const awal = tambahHari(pertama, -pertama.getDay());
    return Array.from({ length: 42 }, (_, i) => tambahHari(awal, i));
  }, [bulanLihat]);

  const tanggalTerpilih = preview.tanggal ? new Date(preview.tanggal + "T00:00:00") : null;
  const labelTanggal = tanggalTerpilih
    ? `${namaHari[tanggalTerpilih.getDay()]}, ${tanggalTerpilih.getDate()} ${namaBulan[tanggalTerpilih.getMonth()]} ${tanggalTerpilih.getFullYear()}`
    : "Pilih tanggal...";

  const copyNomor = async () => { try { await navigator.clipboard.writeText(nomorDariPesan); setUdahCopy(true); setTimeout(() => setUdahCopy(false), 2000); } catch {} };
  const printStruk = () => window.print();
  const input: any = { width: "100%", maxWidth: "100%", minWidth: 0, padding: 13, borderRadius: 14, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none", boxSizing: "border-box", fontSize: 14 };
  const label: any = { display: "block", fontWeight: 800, fontSize: 13, margin: "14px 0 6px", color: "white" };
  const err = (t: string) => hasil.galat?.[t] ? (<p style={{ color: "#FCA5A5", fontSize: 13, fontWeight: 700, margin: "6px 0 0", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", padding: "8px 10px", borderRadius: 10, overflowWrap: "anywhere" }}>⚠ {hasil.galat[t]}</p>) : null;
  const ubah = (k: string, v: string) => setPreview((p) => ({ ...p, [k]: v }));
  const pilihNama = (v: string) => { if (v === "__LAIN__") { setNamaLain(true); ubah("peminjam", ""); return; } setNamaLain(false); ubah("peminjam", v); };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <style>{`
        .pinjam-wrap { display: grid; grid-template-columns: 1.5fr 0.7fr; gap: 14px; margin-top: 16px; align-items: start; width: 100%; max-width: 100%; }
        .pinjam-dua { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 12px; width: 100%; }
        .pinjam-jam { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 12px; width: 100%; }
        .pinjam-dua > div, .pinjam-jam > div { min-width: 0; }
        .pinjam-form input, .pinjam-form select { min-width: 0 !important; max-width: 100% !important; }
        .kal-grid { display: grid; grid-template-columns: repeat(7, minmax(0,1fr)); gap: 5px; }
        @media (max-width: 900px) { .pinjam-wrap { grid-template-columns: minmax(0,1fr) !important; } }
        @media (max-width: 480px) { .pinjam-dua, .pinjam-jam { grid-template-columns: minmax(0,1fr) !important; } .pinjam-form { padding: 16px !important; } }
        @media print { body * { visibility: hidden; } #struk-pinjam, #struk-pinjam * { visibility: visible; } #struk-pinjam { position: absolute; left: 0; top: 0; width: 100%; } .no-print { display: none !important; } }
      `}</style>

      <div className="no-print" style={{ background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777,#F59E0B)", borderRadius: 28, padding: "30px 24px", border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 20px 60px rgba(109,40,217,0.4)", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
        <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999, display: "inline-block" }}>📅 KALENDER REAL-TIME • TANGGAL LEWAT & SABTU/MINGGU TERKUNCI!</span>
        <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.05, margin: "14px 0 0", color: "white" }}>Pinjam Ruang,<br /><span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tanpa Ribet!</span></h1>
        <p style={{ color: "#DDD6FE", maxWidth: 620, lineHeight: 1.6 }}>Hari ini: <b style={{ color: "white" }}>{namaHari[hariIni.getDay()]}, {hariIni.getDate()} {namaBulan[hariIni.getMonth()]} {hariIni.getFullYear()}</b> • Tanggal kemarin udah kekunci, Sabtu/Minggu juga kekunci!</p>
      </div>

      {hasil.sukses && (
        <div ref={strukRef} id="struk-pinjam" style={{ marginTop: 16, background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 50px rgba(0,0,0,0.35)", color: "#111827" }}>
          <div style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6)", padding: "16px 20px", textAlign: "center", color: "white" }}><div style={{ fontSize: 28 }}>🧪</div><b style={{ fontSize: 20 }}>PinjamLab</b><div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 800 }}>BUKTI PENGAJUAN PEMINJAMAN</div></div>
          <div style={{ padding: "18px 20px", textAlign: "center", borderBottom: "2px dashed #E5E7EB" }}>
            <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 800 }}>NOMOR PEMINJAMAN KAMU</div>
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, color: "#6D28D9" }}>#{nomorDariPesan || "?"}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>Simpan nomor ini! Buat cek status di <b>/cek</b></div>
          </div>
          <div style={{ padding: "16px 20px", fontSize: 14, lineHeight: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><span>🏫 Ruang</span><b>{ruangTerpilih?.nama || preview.ruang_id}</b></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><span>👤 Peminjam</span><b>{preview.peminjam}</b></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><span>📝 Keperluan</span><b style={{ textAlign: "right", maxWidth: "55%" }}>{preview.keperluan}</b></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><span>📅 Tanggal</span><b>{labelTanggal}</b></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><span>🕐 Jam</span><b>{preview.mulai} - {preview.selesai}</b></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><span>👥 Jumlah</span><b>{preview.jumlah_orang} orang</b></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><span>Status</span><b style={{ background: "#FEF3C7", color: "#92400E", padding: "2px 10px", borderRadius: 999, fontSize: 12 }}>⏳ MENUNGGU</b></div>
          </div>
          <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, flexWrap: "wrap" }} className="no-print">
            <button onClick={copyNomor} style={{ flex: 1, background: "#111827", color: "white", border: "none", padding: "12px", borderRadius: 999, fontWeight: 900, cursor: "pointer" }}>{udahCopy ? "✅ Udah Ke-copy!" : `📋 Copy Nomor #${nomorDariPesan}`}</button>
            <button onClick={printStruk} style={{ flex: 1, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", border: "none", padding: "12px", borderRadius: 999, fontWeight: 900, cursor: "pointer" }}>🖨 Print / Simpan PDF</button>
          </div>
          <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, flexWrap: "wrap" }} className="no-print">
            <Link href="/cek" style={{ flex: 1, textAlign: "center", background: "#6D28D9", color: "white", padding: "12px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>🔍 Cek Status Sekarang →</Link>
            <Link href="/peminjaman" style={{ flex: 1, textAlign: "center", background: "#F3F4F6", color: "#111827", padding: "12px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>📅 Lihat Jadwal</Link>
          </div>
        </div>
      )}
      {hasil.galat?.umum && <p style={{ color: "#FCA5A5", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", padding: 12, borderRadius: 12, fontWeight: 700 }}>⚠ {hasil.galat.umum}</p>}

      <div className="pinjam-wrap no-print">
        <form action={kirim} className="pinjam-form" style={{ background: "linear-gradient(135deg,#1E103A,#2E1065)", border: "1px solid #7C3AED", borderRadius: 24, padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.3)", width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box", overflow: "hidden" }}>
          <b style={{ color: "white", fontSize: 18 }}>📝 Formulir Peminjaman</b>
          <p style={{ color: "#C4B5FD", fontSize: 12, margin: "4px 0 0" }}>Pilih namamu di dropdown! Kalau belum ada, daftar dulu!</p>
          <label style={label}>🏫 Ruang *</label>
          <select name="ruang_id" value={preview.ruang_id} onChange={(e) => ubah("ruang_id", e.target.value)} style={input}>
            <option value="">-- Pilih Ruang --</option>
            {ruangList.map((r: any) => (<option key={r.id} value={r.id}>{r.nama} (Kapasitas {r.kapasitas} • {r.jenis})</option>))}
          </select>
          {err("ruang_id")}
          {ruangTerpilih && (<div style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.4)", padding: "10px 12px", borderRadius: 12, marginTop: 8, color: "#A5F3FC", fontSize: 12 }}>✅ Kamu pilih <b style={{ color: "white" }}>{ruangTerpilih.nama}</b> • 📍 {ruangTerpilih.lokasi} • 👥 Kapasitas maks {ruangTerpilih.kapasitas} orang</div>)}

          <div className="pinjam-dua">
            <div>
              <label style={label}>👤 Nama Peminjam *</label>
              {!namaLain ? (
                <select name="peminjam" value={preview.peminjam} onChange={(e) => pilihNama(e.target.value)} style={input}>
                  <option value="">-- Pilih Namamu --</option>
                  {anggotaList.map((a) => (<option key={a.nama.toLowerCase()} value={a.nama}>{a.nama}{a.kelas ? ` • ${a.kelas}` : ""}{a.totalPinjam ? ` • ${a.totalPinjam}x pinjam` : ""}</option>))}
                  <option value="__LAIN__">✏️ Nama lain / ketik manual...</option>
                </select>
              ) : (
                <input name="peminjam" value={preview.peminjam} onChange={(e) => ubah("peminjam", e.target.value)} placeholder="Ketik namamu (3-40 huruf)" style={input} autoFocus />
              )}
              {err("peminjam")}
              {anggotaTerpilih && !namaLain && (
                <div style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.4)", padding: "10px 12px", borderRadius: 12, marginTop: 8, color: "#BBF7D0", fontSize: 12 }}>
                  ✅ <b style={{ color: "white" }}>{anggotaTerpilih.nama}</b>{anggotaTerpilih.kelas ? ` • ${anggotaTerpilih.kelas}` : ""} • Udah {anggotaTerpilih.totalPinjam || 0}x pinjam!
                </div>
              )}
              <div style={{ marginTop: 8, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 12, padding: "10px 12px", fontSize: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#FDE68A" }}>😕 Namamu belum ada di daftar?</span><br />
                <Link href="/daftar" style={{ color: "white", fontWeight: 900, textDecoration: "underline" }}>✍️ Belum Register PinjamLab? Daftar di sini →</Link>
              </div>
              {namaLain && (<button type="button" onClick={() => { setNamaLain(false); ubah("peminjam", ""); }} style={{ marginTop: 8, background: "transparent", border: "1px solid #7C3AED", color: "#DDD6FE", padding: "7px 12px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: "pointer" }}>← Balik ke dropdown</button>)}
            </div>
            <div>
              <label style={label}>👥 Jumlah Orang *</label>
              <input name="jumlah_orang" type="number" min={1} value={preview.jumlah_orang} onChange={(e) => ubah("jumlah_orang", e.target.value)} placeholder="ex: 25" style={input} />
              {err("jumlah_orang")}
              <div style={{ color: "#A78BFA", fontSize: 11, marginTop: 6 }}>Ini jumlah rombonganmu! Preview di kanan tetep cuma 1 peminjam (kamu)!</div>
            </div>
          </div>

          <label style={label}>📝 Keperluan * (5-120 huruf)</label>
          <input name="keperluan" value={preview.keperluan} onChange={(e) => ubah("keperluan", e.target.value)} placeholder="ex: Praktikum Excel" style={input} maxLength={120} />
          {err("keperluan")}
          {/* 👈 TULISAN "0 / 120 huruf" DI SINI UDAH DIHAPUS! Validasi tetep jalan lewat err() di atas! */}

          <label style={label}>📅 Tanggal * — Klik buat buka kalender!</label>
          <input type="hidden" name="tanggal" value={preview.tanggal} />
          <button type="button" onClick={() => setBukaKalender((v) => !v)} style={{ ...input, textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{preview.tanggal ? `📅 ${labelTanggal}` : "📅 Pilih tanggal..."}</span>
            <span>{bukaKalender ? "▲" : "▼"}</span>
          </button>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
            {["Hari Ini", "Besok", "Senin Depan"].map((t) => (
              <button key={t} type="button" onClick={() => pilihCepat(t)} style={{ background: "rgba(139,92,246,0.2)", border: "1px solid #8B5CF6", color: "white", padding: "6px 12px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: "pointer" }}>⚡ {t}</button>
            ))}
            <span style={{ color: "#A78BFA", fontSize: 11, alignSelf: "center" }}>Hari ini: {keISO(hariIni)} • Maks: {maxISO}</span>
          </div>

          {bukaKalender && (
            <div style={{ background: "#120826", border: "1px solid #7C3AED", borderRadius: 18, padding: 14, marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <button type="button" onClick={() => setBulanLihat((b) => new Date(b.getFullYear(), b.getMonth() - 1, 1))} style={{ background: "#2E1065", border: "1px solid #7C3AED", color: "white", width: 34, height: 34, borderRadius: 10, cursor: "pointer", fontWeight: 900 }}>‹</button>
                <b style={{ color: "white", fontSize: 15 }}>{namaBulan[bulanLihat.getMonth()]} {bulanLihat.getFullYear()}</b>
                <button type="button" onClick={() => setBulanLihat((b) => new Date(b.getFullYear(), b.getMonth() + 1, 1))} style={{ background: "#2E1065", border: "1px solid #7C3AED", color: "white", width: 34, height: 34, borderRadius: 10, cursor: "pointer", fontWeight: 900 }}>›</button>
              </div>
              <div className="kal-grid" style={{ marginBottom: 6 }}>
                {["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"].map((h, i) => (
                  <div key={h} style={{ textAlign: "center", fontSize: 11, fontWeight: 900, color: i === 0 || i === 6 ? "#FCA5A5" : "#C4B5FD" }}>{h}</div>
                ))}
              </div>
              <div className="kal-grid">
                {kotakKalender.map((d) => {
                  const iso = keISO(d);
                  const c = cekTanggal(d);
                  const bedaBulan = d.getMonth() !== bulanLihat.getMonth();
                  const dipilih = iso === preview.tanggal;
                  const isHariIni = iso === minISO;
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={!c.boleh}
                      onClick={() => pilihTanggal(d)}
                      title={c.boleh ? `${namaHari[d.getDay()]}, ${d.getDate()} ${namaBulan[d.getMonth()]}` : c.alasan}
                      style={{
                        aspectRatio: "1", borderRadius: 10, border: dipilih ? "2px solid #F59E0B" : isHariIni ? "2px solid #22C55E" : "1px solid transparent",
                        background: !c.boleh ? "rgba(255,255,255,0.05)" : dipilih ? "linear-gradient(135deg,#F59E0B,#EC4899)" : isHariIni ? "rgba(34,197,94,0.2)" : "rgba(139,92,246,0.25)",
                        color: !c.boleh ? "#4B5563" : "white", fontWeight: dipilih || isHariIni ? 900 : 700, fontSize: 13,
                        cursor: !c.boleh ? "not-allowed" : "pointer", opacity: bedaBulan ? 0.35 : 1, textDecoration: !c.boleh ? "line-through" : "none",
                      }}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10, fontSize: 11, color: "#C4B5FD" }}>
                <span>🟣 Bisa dipilih</span><span>🟢 Hari ini</span><span>🟠 Yang dipilih</span><span>⚫ <s>Ke kunci</s> (lewat / Sabtu / Minggu)</span>
              </div>
              {pesanTanggal && <p style={{ color: "#FCA5A5", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", padding: "8px 10px", borderRadius: 10, fontSize: 12, fontWeight: 700, margin: "10px 0 0" }}>{pesanTanggal}</p>}
            </div>
          )}
          {err("tanggal")}

          <div className="pinjam-jam">
            <div><label style={label}>🕐 Mulai *</label><input name="mulai" type="time" value={preview.mulai} onChange={(e) => ubah("mulai", e.target.value)} style={{ ...input, colorScheme: "dark" }} /></div>
            <div><label style={label}>🕐 Selesai *</label><input name="selesai" type="time" value={preview.selesai} onChange={(e) => ubah("selesai", e.target.value)} style={{ ...input, colorScheme: "dark" }} /></div>
          </div>
          {err("jam")}
          <button disabled={sedang} style={{ width: "100%", maxWidth: "100%", marginTop: 20, background: sedang ? "#4C1D95" : "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6)", color: "white", border: "none", borderRadius: 999, padding: "15px", fontWeight: 900, cursor: sedang ? "wait" : "pointer", fontSize: 15, boxShadow: "0 10px 30px rgba(236,72,153,0.4)", boxSizing: "border-box" }}>{sedang ? "⏳ Mengirim... Sabar ya!" : "✨ Ajukan Peminjaman →"}</button>
          <p style={{ textAlign: "center", color: "#A78BFA", fontSize: 11, marginTop: 10 }}>Abis kirim, struk muncul di atas! Simpan nomornya buat cek di /cek!</p>
        </form>

        <div style={{ display: "grid", gap: 12, minWidth: 0, width: "100%", maxWidth: "100%" }}>
          <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 24, padding: 18, minWidth: 0, boxSizing: "border-box", overflowWrap: "anywhere" }}>
            <b style={{ color: "white" }}>👀 Preview Pengajuanmu — 1 Orang!</b>
            <p style={{ color: "#C4B5FD", fontSize: 12, margin: "4px 0 0" }}>Ini cuma buat kamu yang dipilih di dropdown! Bukan semua data!</p>
            <div style={{ background: "#120826", border: "1px solid #7C3AED", borderRadius: 16, padding: 14, marginTop: 12, fontSize: 13, lineHeight: 1.8, overflowWrap: "anywhere" }}>
              <div>🏫 <b style={{ color: "white" }}>{ruangTerpilih ? ruangTerpilih.nama : "(Belum pilih ruang)"}</b></div>
              <div>👤 <b style={{ color: "white" }}>{preview.peminjam || "(Belum pilih nama)"}</b>{anggotaTerpilih?.kelas ? ` • ${anggotaTerpilih.kelas}` : ""}</div>
              <div>📝 {preview.keperluan || "(Belum isi keperluan)"}</div>
              <div>📅 {preview.tanggal ? labelTanggal : "(Belum pilih tanggal)"}</div>
              <div>🕐 {preview.mulai} - {preview.selesai}</div>
              <div>👥 {preview.jumlah_orang || "-"} orang {ruangTerpilih ? `(Maks ${ruangTerpilih.kapasitas})` : ""}</div>
              <div style={{ marginTop: 8 }}><span style={{ background: "#92400E", color: "white", fontSize: 11, fontWeight: 900, padding: "4px 10px", borderRadius: 999 }}>⏳ MENUNGGU</span></div>
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg,#2E1065,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 24, padding: 18, minWidth: 0, boxSizing: "border-box" }}>
            <b style={{ color: "white" }}>📋 Aturan Pinjam</b>
            <ul style={{ color: "#DDD6FE", fontSize: 13, lineHeight: 1.9, paddingLeft: 16, margin: "10px 0 0" }}><li>📅 Hari ini sampai maks 60 hari ke depan</li><li>🚫 Sabtu / Minggu OTOMATIS kekunci di kalender!</li><li>🕐 Jam 07:00 - 17:00</li><li>⏳ Durasi maks 3 jam</li><li>👥 Gak boleh melebihi kapasitas</li></ul>
          </div>
        </div>
      </div>
    </div>
  );
}