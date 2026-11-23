// app/pinjam/page.tsx - Ajukan Peminjaman - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!

"use client";
import { useActionState, useEffect, useState } from "react";
import { ajukanPinjam } from "@/app/actions";
import Link from "next/link";

export default function PinjamPage() {
  const [ruangList, setRuangList] = useState<any[]>([]);
  const [hasil, kirim, sedang] = useActionState(ajukanPinjam, {
    sukses: false,
    galat: {},
    isian: {},
    pesan: "",
  } as any);

  // Buat preview langsung saat ngetik
  const [preview, setPreview] = useState({
    ruang_id: "",
    peminjam: "",
    keperluan: "",
    tanggal: "",
    mulai: "08:00",
    selesai: "10:00",
    jumlah_orang: "",
  });

  useEffect(() => {
    fetch("/api/ruang")
      .then((r) => r.json())
      .then((d) => setRuangList(d.ruang || []));
    // Kalau dari /pinjam?ruang_id=1, langsung isi preview-nya!
    const id = new URLSearchParams(window.location.search).get("ruang_id");
    if (id) setPreview((p) => ({ ...p, ruang_id: id }));
  }, []);

  const ruangTerpilih = ruangList.find((r: any) => String(r.id) === String(preview.ruang_id));

  const input: any = {
    width: "100%",
    padding: 13,
    borderRadius: 14,
    border: "1px solid #7C3AED",
    background: "#120826",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
    fontSize: 14,
  };
  const label: any = { display: "block", fontWeight: 800, fontSize: 13, margin: "14px 0 6px", color: "white" };
  const err = (t: string) =>
    hasil.galat?.[t] ? (
      <p style={{ color: "#FCA5A5", fontSize: 13, fontWeight: 700, margin: "6px 0 0", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", padding: "8px 10px", borderRadius: 10 }}>
        ⚠ {hasil.galat[t]}
      </p>
    ) : null;

  const ubah = (k: string, v: string) => setPreview((p) => ({ ...p, [k]: v }));

  return (
    <div>
      {/* ============ 1. HERO ============ */}
      <div
        style={{
          background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777,#F59E0B)",
          borderRadius: 28,
          padding: "30px 24px",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 20px 60px rgba(109,40,217,0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -20, width: 160, height: 160, background: "radial-gradient(circle,#FBBF24,transparent 70%)", opacity: 0.6, borderRadius: "50%", filter: "blur(10px)" }} />
        <div style={{ position: "relative" }}>
          <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>📝 AJUKAN PEMINJAMAN • 30 DETIK BERES!</span>
          <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.05, margin: "14px 0 0", color: "white" }}>
            Pinjam Ruang,
            <br />
            <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Tanpa Ribet!
            </span>
          </h1>
          <p style={{ color: "#DDD6FE", maxWidth: 620, lineHeight: 1.6 }}>
            Isi dengan benar ya! Tanggal maks 60 hari ke depan, bukan Sabtu/Minggu, jam 07:00-17:00, durasi maks 3 jam, gak boleh melebihi kapasitas!
          </p>
          {/* 3 LANGKAH */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
            {[
              ["1", "Pilih Ruang"],
              ["2", "Isi Formulir"],
              ["3", "Cek Status di /cek"],
            ].map(([no, txt]) => (
              <span key={no} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontSize: 12, fontWeight: 800, padding: "6px 12px", borderRadius: 999 }}>
                <b style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", padding: "2px 7px", borderRadius: 999, marginRight: 6 }}>{no}</b> {txt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ============ 2. PESAN SUKSES / GAGAL ============ */}
      {hasil.sukses && (
        <div style={{ background: "linear-gradient(135deg,#14532D,#15803D)", border: "1px solid #22C55E", padding: 20, borderRadius: 20, marginTop: 16, boxShadow: "0 12px 30px rgba(34,197,94,0.3)" }}>
          <div style={{ fontSize: 28 }}>🎉</div>
          <b style={{ color: "white", fontSize: 17 }}>Pengajuan Berhasil Dikirim!</b>
          <p style={{ color: "#BBF7D0", margin: "6px 0 0", lineHeight: 1.6 }}>{hasil.pesan}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <Link href="/cek" style={{ background: "white", color: "#14532D", padding: "10px 18px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>🔍 Cek Status Sekarang →</Link>
            <Link href="/peminjaman" style={{ background: "rgba(0,0,0,0.25)", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13, border: "1px solid rgba(255,255,255,0.4)" }}>📅 Lihat Jadwal</Link>
          </div>
        </div>
      )}
      {hasil.galat?.umum && (
        <p style={{ color: "#FCA5A5", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", padding: 12, borderRadius: 12, fontWeight: 700 }}>⚠ {hasil.galat.umum}</p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.7fr", gap: 14, marginTop: 16, alignItems: "start" }}>
        {/* ============ 3. FORMULIR ============ */}
        <form
          action={kirim}
          style={{
            background: "linear-gradient(135deg,#1E103A,#2E1065)",
            border: "1px solid #7C3AED",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 16px 50px rgba(0,0,0,0.3)",
          }}
        >
          <b style={{ color: "white", fontSize: 18 }}>📝 Formulir Peminjaman</b>
          <p style={{ color: "#C4B5FD", fontSize: 12, margin: "4px 0 0" }}>Yang ada tanda * wajib diisi! Isi dengan benar biar langsung disetujui admin!</p>

          <label style={label}>🏫 Ruang *</label>
          <select
            name="ruang_id"
            value={preview.ruang_id}
            onChange={(e) => ubah("ruang_id", e.target.value)}
            style={input}
          >
            <option value="">-- Pilih Ruang --</option>
            {ruangList.map((r: any) => (
              <option key={r.id} value={r.id}>
                {r.nama} (Kapasitas {r.kapasitas} • {r.jenis})
              </option>
            ))}
          </select>
          {err("ruang_id")}
          {ruangTerpilih && (
            <div style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.4)", padding: "10px 12px", borderRadius: 12, marginTop: 8, color: "#A5F3FC", fontSize: 12 }}>
              ✅ Kamu pilih <b style={{ color: "white" }}>{ruangTerpilih.nama}</b> • 📍 {ruangTerpilih.lokasi} • 👥 Kapasitas maks {ruangTerpilih.kapasitas} orang • Jenis {ruangTerpilih.jenis}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={label}>👤 Nama Peminjam * (3-40 huruf)</label>
              <input name="peminjam" value={preview.peminjam} onChange={(e) => ubah("peminjam", e.target.value)} placeholder="ex: Rina" style={input} />
              {err("peminjam")}
            </div>
            <div>
              <label style={label}>👥 Jumlah Orang *</label>
              <input name="jumlah_orang" type="number" min={1} value={preview.jumlah_orang} onChange={(e) => ubah("jumlah_orang", e.target.value)} placeholder="ex: 25" style={input} />
              {err("jumlah_orang")}
            </div>
          </div>

          <label style={label}>📝 Keperluan * (5-120 huruf)</label>
          <input name="keperluan" value={preview.keperluan} onChange={(e) => ubah("keperluan", e.target.value)} placeholder="ex: Praktikum Excel" style={input} />
          {err("keperluan")}
          <div style={{ color: "#A78BFA", fontSize: 11, marginTop: 4 }}>{preview.keperluan.length} / 120 huruf • Minimal 5 huruf!</div>

          <label style={label}>📅 Tanggal *</label>
          <input name="tanggal" type="date" value={preview.tanggal} onChange={(e) => ubah("tanggal", e.target.value)} style={{ ...input, colorScheme: "dark" }} />
          {err("tanggal")}

          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={label}>🕐 Mulai *</label>
              <input name="mulai" type="time" value={preview.mulai} onChange={(e) => ubah("mulai", e.target.value)} style={{ ...input, colorScheme: "dark" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={label}>🕐 Selesai *</label>
              <input name="selesai" type="time" value={preview.selesai} onChange={(e) => ubah("selesai", e.target.value)} style={{ ...input, colorScheme: "dark" }} />
            </div>
          </div>
          {err("jam")}

          <button
            disabled={sedang}
            style={{
              width: "100%",
              marginTop: 20,
              background: sedang ? "#4C1D95" : "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6)",
              color: "white",
              border: "none",
              borderRadius: 999,
              padding: "15px",
              fontWeight: 900,
              cursor: sedang ? "wait" : "pointer",
              fontSize: 15,
              boxShadow: "0 10px 30px rgba(236,72,153,0.4)",
            }}
          >
            {sedang ? "⏳ Mengirim... Sabar ya!" : "✨ Ajukan Peminjaman →"}
          </button>
          <p style={{ textAlign: "center", color: "#A78BFA", fontSize: 11, marginTop: 10 }}>Dengan mengajukan, kamu setuju aturan pinjam PinjamLab • Admin akan cek dalam 1x24 jam!</p>
        </form>

        {/* ============ 4. PREVIEW + ATURAN ============ */}
        <div style={{ display: "grid", gap: 12 }}>
          {/* PREVIEW LANGSUNG */}
          <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 24, padding: 18 }}>
            <b style={{ color: "white" }}>👀 Preview Pengajuanmu</b>
            <p style={{ color: "#C4B5FD", fontSize: 12, margin: "4px 0 0" }}>Ini yang bakal dilihat admin!</p>
            <div style={{ background: "#120826", border: "1px solid #7C3AED", borderRadius: 16, padding: 14, marginTop: 12, fontSize: 13, lineHeight: 1.8 }}>
              <div>🏫 <b style={{ color: "white" }}>{ruangTerpilih ? ruangTerpilih.nama : "(Belum pilih ruang)"}</b></div>
              <div>👤 <b style={{ color: "white" }}>{preview.peminjam || "(Belum isi nama)"}</b></div>
              <div>📝 {preview.keperluan || "(Belum isi keperluan)"}</div>
              <div>📅 {preview.tanggal || "(Belum pilih tanggal)"}</div>
              <div>🕐 {preview.mulai} - {preview.selesai}</div>
              <div>👥 {preview.jumlah_orang || "-"} orang {ruangTerpilih ? `(Maks ${ruangTerpilih.kapasitas})` : ""}</div>
              <div style={{ marginTop: 8 }}><span style={{ background: "#92400E", color: "white", fontSize: 11, fontWeight: 900, padding: "4px 10px", borderRadius: 999 }}>⏳ MENUNGGU</span></div>
            </div>
          </div>

          {/* ATURAN */}
          <div style={{ background: "linear-gradient(135deg,#2E1065,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 24, padding: 18 }}>
            <b style={{ color: "white" }}>📋 Aturan Pinjam (Biar Gak Ditolak!)</b>
            <ul style={{ color: "#DDD6FE", fontSize: 13, lineHeight: 1.9, paddingLeft: 16, margin: "10px 0 0" }}>
              <li>📅 Bukan kemarin, maks 60 hari ke depan</li>
              <li>🚫 Gak boleh Sabtu / Minggu</li>
              <li>🕐 Jam 07:00 - 17:00</li>
              <li>⏳ Durasi maks 3 jam</li>
              <li>👥 Gak boleh melebihi kapasitas</li>
              <li>⚠️ Gak boleh bentrok yang disetujui</li>
            </ul>
          </div>

          {/* TIPS */}
          <div style={{ background: "linear-gradient(135deg,#F59E0B,#EC4899)", borderRadius: 24, padding: 18, border: "1px solid rgba(255,255,255,0.4)" }}>
            <b style={{ color: "white" }}>💡 Tips Biar Cepet Disetujui!</b>
            <p style={{ color: "white", fontSize: 13, lineHeight: 1.7, margin: "8px 0 0" }}>Cek dulu jadwal di <Link href="/peminjaman" style={{ color: "white", fontWeight: 900 }}>📅 Jadwal Publik</Link>, pilih jam yang masih kosong! Tulis keperluan yang jelas, ex: “Praktikum Excel Kelas 12-A”!</p>
            <Link href="/ruang" style={{ display: "block", textAlign: "center", marginTop: 12, background: "white", color: "#DB2777", padding: "10px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>🏫 Lihat Ruang Dulu →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}