// app/cek/page.tsx - Cek Status - VERSI JUARA 1 DUNIA!
// FIX: Card "Coba Contoh Cepet" DIHAPUS TOTAL! Gak ada data contoh lagi!
// UPGRADE: Auto-isi dari URL + Riwayat 5 cek terakhir + Anti-offside tablet!

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Riwayat = { nomor: string; nama: string; waktu: string };

export default function CekPage() {
  const [nomor, setNomor] = useState("");
  const [nama, setNama] = useState("");
  const [hasil, setHasil] = useState<any>(null);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [riwayat, setRiwayat] = useState<Riwayat[]>([]);

  // 👈 Ambil riwayat + auto-isi dari URL (?nomor= & ?nama=)
  useEffect(() => {
    try { setRiwayat(JSON.parse(localStorage.getItem("pinjamlab-cek") || "[]")); } catch {}
    const p = new URLSearchParams(window.location.search);
    if (p.get("nomor")) setNomor(p.get("nomor") || "");
    if (p.get("nama")) setNama(decodeURIComponent(p.get("nama") || ""));
  }, []);

  async function cek(nomorC?: string, namaC?: string) {
    const n = (nomorC ?? nomor).trim();
    const nm = (namaC ?? nama).trim();
    if (!n || !nm) {
      setPesan("Isi nomor + nama dulu ya! Dua-duanya wajib!");
      setHasil(null);
      return;
    }
    setPesan("");
    setHasil(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/cek?nomor=${n}&nama=${encodeURIComponent(nm)}`);
      const d = await res.json();
      if (!res.ok) setPesan(d.error || "Tidak ditemukan!");
      else {
        setHasil(d.data);
        // 👈 Simpan ke riwayat (maks 5)
        const baru = [{ nomor: n, nama: nm, waktu: new Date().toISOString() }, ...riwayat.filter((r) => !(r.nomor === n && r.nama.toLowerCase() === nm.toLowerCase()))].slice(0, 5);
        setRiwayat(baru);
        try { localStorage.setItem("pinjamlab-cek", JSON.stringify(baru)); } catch {}
      }
    } catch {
      setPesan("Gagal cek status! Cek internet kamu!");
    }
    setLoading(false);
  }

  const hapusRiwayat = () => {
    setRiwayat([]);
    try { localStorage.removeItem("pinjamlab-cek"); } catch {}
  };

  const input: any = {
    width: "100%", maxWidth: "100%", minWidth: 0,
    padding: 14, borderRadius: 14, border: "1px solid #7C3AED",
    background: "#120826", color: "white", outline: "none", fontSize: 15, boxSizing: "border-box",
  };

  const warnaStatus =
    hasil?.status === "disetujui"
      ? { bg: "#14532D", border: "#22C55E", teks: "#BBF7D0", icon: "✅", judul: "DISETUJUI! Selamat!" }
      : hasil?.status === "ditolak"
      ? { bg: "#7F1D1D", border: "#EF4444", teks: "#FECACA", icon: "❌", judul: "DITOLAK! Maaf ya!" }
      : { bg: "#92400E", border: "#F59E0B", teks: "#FDE68A", icon: "⏳", judul: "MENUNGGU! Sabar ya!" };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <style>{`
        .cek-wrap { display: grid; grid-template-columns: minmax(0,1.1fr) minmax(0,0.9fr); gap: 14px; margin-top: 16px; align-items: start; width: 100%; }
        .cek-wrap > div { min-width: 0; }
        @media (max-width: 900px) { .cek-wrap { grid-template-columns: minmax(0,1fr) !important; } }
      `}</style>

      {/* ============ 1. HERO ============ */}
      <div style={{ background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777,#F59E0B)", borderRadius: 28, padding: "30px 24px", border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 20px 60px rgba(109,40,217,0.4)", position: "relative", overflow: "hidden", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", top: -30, right: -20, width: 160, height: 160, background: "radial-gradient(circle,#FBBF24,transparent 70%)", opacity: 0.6, borderRadius: "50%", filter: "blur(10px)" }} />
        <div style={{ position: "relative" }}>
          <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>🔍 CEK STATUS • NOMOR + NAMA HARUS COCOK!</span>
          <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.05, margin: "14px 0 0", color: "white" }}>
            Cek Status<br />
            <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pinjamanmu!</span>
          </h1>
          <p style={{ color: "#DDD6FE", maxWidth: 620, lineHeight: 1.6 }}>
            Masukkan <b style={{ color: "white" }}>nomor peminjaman + nama peminjam</b>! Harus cocok persis, kalau beda, gak akan muncul! Nomornya dikasih pas kamu selesai pinjam!
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
            <Link href="/pinjam" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "11px 20px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>📝 Belum Pinjam? Pinjam Dulu →</Link>
            <Link href="/peminjaman" style={{ background: "rgba(0,0,0,0.35)", color: "white", padding: "11px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13, border: "1px solid rgba(255,255,255,0.4)" }}>📅 Lihat Jadwal</Link>
          </div>
        </div>
      </div>

      {/* ============ 2. 3 STATUS DIJELASIN ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, marginTop: 14 }}>
        {[
          ["⏳", "MENUNGGU", "Lagi dicek admin! Sabar ya, 1x24 jam!", "linear-gradient(135deg,#F59E0B,#EF4444)"],
          ["✅", "DISETUJUI", "Yeay! Ruang udah jadi milikmu di jam itu!", "linear-gradient(135deg,#10B981,#22D3EE)"],
          ["❌", "DITOLAK", "Maaf! Alasannya keliatan di bawah! Coba pinjam jam lain!", "linear-gradient(135deg,#EF4444,#EC4899)"],
        ].map(([icon, judul, desc, bg]) => (
          <div key={judul} style={{ background: bg, borderRadius: 18, padding: 14, color: "white" }}>
            <div style={{ fontSize: 22 }}>{icon}</div>
            <b style={{ display: "block", marginTop: 6, fontSize: 14 }}>{judul}</b>
            <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>

      <div className="cek-wrap">
        {/* ============ 3. FORM CEK ============ */}
        <div style={{ background: "linear-gradient(135deg,#1E103A,#2E1065)", border: "1px solid #7C3AED", borderRadius: 24, padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.3)", boxSizing: "border-box", overflow: "hidden" }}>
          <b style={{ color: "white", fontSize: 18 }}>🔍 Formulir Cek Status</b>
          <p style={{ color: "#C4B5FD", fontSize: 12, margin: "4px 0 0" }}>Isi dua-duanya! Kalau salah satu beda, gak akan muncul!</p>

          <label style={{ fontWeight: 800, fontSize: 13, display: "block", marginTop: 16, color: "white" }}>🔢 Nomor Peminjaman *</label>
          <input value={nomor} onChange={(e) => setNomor(e.target.value)} onKeyDown={(e) => e.key === "Enter" && cek()} placeholder="ex: 1" inputMode="numeric" style={{ ...input, marginTop: 6 }} />
          <p style={{ color: "#A78BFA", fontSize: 11, margin: "6px 0 0" }}>Nomornya ada di struk / pesan sukses pas kamu selesai pinjam! Ex: 1, 2, 3...</p>

          <label style={{ fontWeight: 800, fontSize: 13, display: "block", marginTop: 16, color: "white" }}>👤 Nama Peminjam *</label>
          <input value={nama} onChange={(e) => setNama(e.target.value)} onKeyDown={(e) => e.key === "Enter" && cek()} placeholder="ex: Rina" style={{ ...input, marginTop: 6 }} />
          <p style={{ color: "#A78BFA", fontSize: 11, margin: "6px 0 0" }}>Harus SAMA PERSIS kayak pas pinjam! Huruf besar / kecil gak ngaruh, tapi namanya harus sama!</p>

          <button
            onClick={() => cek()}
            disabled={loading}
            style={{ width: "100%", marginTop: 16, background: loading ? "#4C1D95" : "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6)", color: "white", border: "none", borderRadius: 999, padding: "14px", fontWeight: 900, cursor: loading ? "wait" : "pointer", fontSize: 15, boxShadow: "0 10px 30px rgba(236,72,153,0.4)" }}
          >
            {loading ? "⏳ Mengecek..." : "🔍 Cek Status Sekarang →"}
          </button>

          {/* 👈 CONTOH CEPET UDAH DIHAPUS DI SINI! DIGANTI RIWAYAT ASLI LO! */}
          {riwayat.length > 0 && (
            <div style={{ marginTop: 14, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 14, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <b style={{ color: "white", fontSize: 12 }}>🕘 Terakhir Kamu Cek:</b>
                <button type="button" onClick={hapusRiwayat} style={{ background: "transparent", border: "none", color: "#FCA5A5", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>Hapus ✕</button>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {riwayat.map((r) => (
                  <button key={`${r.nomor}-${r.nama}`} type="button" onClick={() => { setNomor(r.nomor); setNama(r.nama); cek(r.nomor, r.nama); }} style={{ background: "#120826", border: "1px solid #7C3AED", color: "white", padding: "7px 12px", borderRadius: 999, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
                    #{r.nomor} • {r.nama}
                  </button>
                ))}
              </div>
              <p style={{ color: "#C4B5FD", fontSize: 11, margin: "8px 0 0" }}>Klik salah satu buat cek lagi, gak usah ketik ulang!</p>
            </div>
          )}

          {pesan && (
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.5)", color: "#FCA5A5", padding: "12px 14px", borderRadius: 14, fontWeight: 700, fontSize: 13, marginTop: 14 }}>
              ⚠ {pesan}
              <div style={{ fontWeight: 400, fontSize: 12, marginTop: 4, color: "#FECACA" }}>Cek lagi: Nomornya bener? Namanya sama persis kayak pas pinjam? Coba huruf besar/kecilnya!</div>
            </div>
          )}
        </div>

        {/* ============ 4. HASIL ============ */}
        <div style={{ minWidth: 0 }}>
          {!hasil && !pesan && (
            <div style={{ background: "#1E103A", border: "1px dashed #7C3AED", borderRadius: 24, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 40 }}>🔍</div>
              <b style={{ color: "white" }}>Belum Ada Hasil</b>
              <p style={{ color: "#C4B5FD", fontSize: 13, lineHeight: 1.6 }}>Isi nomor + nama di kiri, terus klik Cek Status! Hasilnya bakal muncul di sini, super jelas!</p>
              <Link href="/pinjam" style={{ display: "inline-block", marginTop: 10, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>📝 Pinjam Dulu →</Link>
            </div>
          )}

          {hasil && (
            <div style={{ background: warnaStatus.bg, border: `1px solid ${warnaStatus.border}`, borderRadius: 24, padding: 20, boxShadow: "0 16px 40px rgba(0,0,0,0.3)", overflowWrap: "anywhere" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 28 }}>{warnaStatus.icon}</span>
                <span style={{ background: "white", color: "#120826", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999 }}>NOMOR {hasil.id}</span>
              </div>
              <b style={{ color: "white", fontSize: 20, display: "block", marginTop: 10 }}>{warnaStatus.judul}</b>
              <p style={{ color: warnaStatus.teks, fontSize: 13, margin: "6px 0 0" }}>
                {hasil.status === "disetujui" && "Yeay! Ruang udah resmi jadi milikmu di jam itu! Datang tepat waktu ya!"}
                {hasil.status === "menunggu" && "Sabar ya! Admin lagi ngecek pengajuanmu! Cek lagi nanti!"}
                {hasil.status === "ditolak" && "Jangan sedih! Coba pinjam jam / tanggal lain yang masih kosong!"}
              </p>
              <div style={{ background: "#120826", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: 14, marginTop: 14, fontSize: 13, lineHeight: 1.9 }}>
                <div>🏫 <b style={{ color: "white" }}>{hasil.ruang?.nama}</b> • 📍 {hasil.ruang?.lokasi}</div>
                <div>👤 Peminjam: <b style={{ color: "white" }}>{hasil.peminjam}</b></div>
                <div>📝 Keperluan: {hasil.keperluan}</div>
                <div>📅 Tanggal: <b style={{ color: "white" }}>{hasil.tanggal}</b></div>
                <div>🕐 Jam: <b style={{ color: "white" }}>{hasil.mulai} - {hasil.selesai}</b></div>
                <div>👥 Jumlah Orang: <b style={{ color: "white" }}>{hasil.jumlah_orang} orang</b></div>
                <div>Status: <b style={{ color: warnaStatus.teks }}>{hasil.status.toUpperCase()}</b></div>
              </div>
              {hasil.status === "ditolak" && (
                <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: 12, marginTop: 12, color: "white", fontSize: 13, lineHeight: 1.6 }}>
                  <b>📢 Alasan Ditolak:</b><br />{hasil.alasan_tolak || "-"}
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                {hasil.status === "ditolak" && (<Link href="/pinjam" style={{ flex: 1, textAlign: "center", background: "white", color: "#7F1D1D", padding: "11px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>📝 Pinjam Lagi →</Link>)}
                {hasil.status === "disetujui" && (<Link href="/peminjaman" style={{ flex: 1, textAlign: "center", background: "white", color: "#14532D", padding: "11px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>📅 Lihat Jadwal →</Link>)}
                <Link href="/ruang" style={{ flex: 1, textAlign: "center", background: "rgba(0,0,0,0.3)", color: "white", padding: "11px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13, border: "1px solid rgba(255,255,255,0.4)" }}>🏫 Ruang</Link>
              </div>
            </div>
          )}

          <div style={{ background: "linear-gradient(135deg,#2E1065,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 24, padding: 16, marginTop: 12 }}>
            <b style={{ color: "white" }}>💡 Kenapa Gak Ketemu?</b>
            <ul style={{ color: "#DDD6FE", fontSize: 12, lineHeight: 1.8, paddingLeft: 16, margin: "8px 0 0" }}>
              <li>Nomornya salah ketik? Cek struk pas pinjam!</li>
              <li>Namanya beda? Harus sama persis kayak pas pinjam!</li>
              <li>Baru aja pinjam? Coba tunggu 5 detik, terus cek lagi!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}