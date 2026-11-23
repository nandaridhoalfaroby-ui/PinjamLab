// app/admin/ruang/page.tsx - Kelola Ruang - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!

import { supabaseRahasia } from "@/lib/supabase";
import { pastikanAdmin } from "@/lib/sesi";
import { simpanRuang, toggleRuang } from "@/app/actions";
import { keluar } from "@/app/login/actions";
import Link from "next/link";
import HapusButton from "./HapusButton";

export const dynamic = "force-dynamic";

export default async function AdminRuang({
  searchParams,
}: {
  searchParams: Promise<{ info?: string; galat?: string }>;
}) {
  await pastikanAdmin();
  const p = await searchParams;
  const { data } = await supabaseRahasia()
    .from("ruang")
    .select("*")
    .order("id");
  const list = data || [];

  const totalRuang = list.length;
  const totalAktif = list.filter((r: any) => r.aktif).length;
  const totalNonaktif = list.filter((r: any) => !r.aktif).length;
  const totalLab = list.filter((r: any) => r.jenis === "lab").length;
  const totalKelas = list.filter((r: any) => r.jenis === "kelas").length;
  const totalAula = list.filter((r: any) => r.jenis === "aula").length;
  const totalKapasitas = list.reduce((a: number, r: any) => a + (Number(r.kapasitas) || 0), 0);

  const input: any = {
    width: "100%",
    padding: 13,
    borderRadius: 14,
    border: "1px solid #7C3AED",
    background: "#120826",
    color: "white",
    outline: "none",
    fontSize: 14,
    boxSizing: "border-box",
  };

  const gradJenis = (jenis: string) =>
    jenis === "lab"
      ? "linear-gradient(135deg,#8B5CF6,#22D3EE)"
      : jenis === "kelas"
      ? "linear-gradient(135deg,#F59E0B,#EC4899)"
      : "linear-gradient(135deg,#10B981,#22D3EE)";

  const iconJenis = (jenis: string) =>
    jenis === "lab" ? "💻" : jenis === "kelas" ? "📚" : "🎭";

  return (
    <div>
      {/* ============ 1. HERO ============ */}
      <div
        style={{
          background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777)",
          borderRadius: 28,
          padding: "28px 24px",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 20px 60px rgba(109,40,217,0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -20, width: 160, height: 160, background: "radial-gradient(circle,#FBBF24,transparent 70%)", opacity: 0.6, borderRadius: "50%", filter: "blur(10px)" }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
          <div>
            <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>🏫 KELOLA RUANG • ADMIN ONLY!</span>
            <h1 style={{ fontSize: 34, fontWeight: 900, margin: "14px 0 0", color: "white", lineHeight: 1.1 }}>
              Kelola Ruang,
              <br />
              <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Tambah & Atur!
              </span>
            </h1>
            <p style={{ color: "#DDD6FE", margin: "8px 0 0", maxWidth: 560, lineHeight: 1.6 }}>
              Ada <b style={{ color: "white" }}>{totalRuang} ruang</b> • <b style={{ color: "#86EFAC" }}>{totalAktif} aktif</b> • <b style={{ color: "#FCA5A5" }}>{totalNonaktif} nonaktif</b> • Total kapasitas <b style={{ color: "white" }}>{totalKapasitas} orang</b>!
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/admin" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "12px 20px", borderRadius: 999, fontWeight: 900, textDecoration: "none", boxShadow: "0 8px 24px rgba(236,72,153,0.4)" }}>← Kembali ke Admin</Link>
            <Link href="/ruang" style={{ background: "rgba(0,0,0,0.3)", color: "white", padding: "12px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>🏫 Lihat Ruang</Link>
            <form action={keluar}>
              <button style={{ background: "white", color: "#991B1B", border: "none", borderRadius: 999, padding: "12px 18px", fontWeight: 900, cursor: "pointer" }}>🚪 Keluar</button>
            </form>
          </div>
        </div>
      </div>

      {/* ============ 2. PESAN ============ */}
      {p.info && (
        <div style={{ background: "linear-gradient(135deg,#14532D,#15803D)", border: "1px solid #22C55E", padding: 14, borderRadius: 16, fontWeight: 800, marginTop: 14, color: "white" }}>
          ✅ {p.info}
        </div>
      )}
      {p.galat && (
        <div style={{ background: "linear-gradient(135deg,#7F1D1D,#991B1B)", border: "1px solid #EF4444", padding: 14, borderRadius: 16, fontWeight: 800, marginTop: 14, color: "white" }}>
          ⚠ {p.galat}
        </div>
      )}

      {/* ============ 3. STATISTIK ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 10, marginTop: 14 }}>
        {[
          ["🏫", `${totalRuang} Ruang`, "Total Semua", "linear-gradient(135deg,#8B5CF6,#EC4899)"],
          ["✅", `${totalAktif} Aktif`, "Bisa Dipinjam!", "linear-gradient(135deg,#10B981,#22D3EE)"],
          ["❌", `${totalNonaktif} Nonaktif`, "Disembunyikan", "linear-gradient(135deg,#EF4444,#EC4899)"],
          ["💻", `${totalLab} Lab`, "Lab Komputer", "linear-gradient(135deg,#8B5CF6,#22D3EE)"],
          ["📚", `${totalKelas} Kelas`, "Ruang Kelas", "linear-gradient(135deg,#F59E0B,#EC4899)"],
          ["🎭", `${totalAula} Aula`, "Aula / Serbaguna", "linear-gradient(135deg,#10B981,#22D3EE)"],
        ].map(([icon, judul, sub, bg]) => (
          <div key={judul} style={{ background: bg, borderRadius: 18, padding: 14, color: "white" }}>
            <div style={{ fontSize: 22 }}>{icon}</div>
            <b style={{ display: "block", marginTop: 4, fontSize: 14 }}>{judul}</b>
            <div style={{ fontSize: 11, opacity: 0.9 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 14, marginTop: 16, alignItems: "start" }}>
        {/* ============ 4. FORM TAMBAH ============ */}
        <form
          action={simpanRuang}
          style={{ background: "linear-gradient(135deg,#1E103A,#2E1065)", border: "1px solid #7C3AED", borderRadius: 24, padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.3)", position: "sticky", top: 12 }}
        >
          <b style={{ color: "white", fontSize: 18 }}>➕ Tambah Ruang Baru</b>
          <p style={{ color: "#C4B5FD", fontSize: 12, margin: "4px 0 0" }}>Isi semua! Nama harus unik, 3-40 huruf!</p>

          <label style={{ fontWeight: 800, fontSize: 13, display: "block", marginTop: 16, color: "white" }}>🏫 Nama Ruang *</label>
          <input name="nama" placeholder="ex: Lab Komputer 1" style={{ ...input, marginTop: 6 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
            <div>
              <label style={{ fontWeight: 800, fontSize: 13, display: "block", color: "white" }}>🎯 Jenis *</label>
              <select name="jenis" defaultValue="lab" style={{ ...input, marginTop: 6 }}>
                <option value="lab">💻 Lab</option>
                <option value="kelas">📚 Kelas</option>
                <option value="aula">🎭 Aula</option>
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 800, fontSize: 13, display: "block", color: "white" }}>👥 Kapasitas *</label>
              <input name="kapasitas" type="number" min={1} placeholder="ex: 30" style={{ ...input, marginTop: 6 }} />
            </div>
          </div>

          <label style={{ fontWeight: 800, fontSize: 13, display: "block", marginTop: 12, color: "white" }}>📍 Lokasi *</label>
          <input name="lokasi" placeholder="ex: Gedung A Lantai 2" style={{ ...input, marginTop: 6 }} />

          <button style={{ width: "100%", marginTop: 16, background: "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6)", color: "white", border: "none", borderRadius: 999, padding: "14px", fontWeight: 900, cursor: "pointer", fontSize: 15, boxShadow: "0 10px 30px rgba(236,72,153,0.4)" }}>
            ✨ Tambah Ruang →
          </button>

          <div style={{ marginTop: 12, background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 14, padding: 12 }}>
            <b style={{ color: "white", fontSize: 12 }}>💡 Aturan Soal (Validasi):</b>
            <ul style={{ color: "#A5F3FC", fontSize: 11, lineHeight: 1.7, paddingLeft: 14, margin: "6px 0 0" }}>
              <li>Nama 3-40 huruf, harus unik!</li>
              <li>Kapasitas harus &gt; 0!</li>
              <li>Jenis cuma lab / kelas / aula!</li>
              <li>Ruang baru otomatis AKTIF!</li>
            </ul>
          </div>
        </form>

        {/* ============ 5. DAFTAR RUANG ============ */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ color: "white", fontSize: 19, fontWeight: 900, margin: 0 }}>Daftar Ruang ({list.length})</h2>
            <span style={{ background: "#1E103A", border: "1px solid #4C1D95", color: "#C4B5FD", fontSize: 11, padding: "6px 10px", borderRadius: 999, fontWeight: 700 }}>Klik Nonaktifkan buat sembunyikan!</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12, marginTop: 12 }}>
            {list.length === 0 ? (
              <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 20, padding: 22, textAlign: "center", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 36 }}>🏫</div>
                <b style={{ color: "white" }}>Belum Ada Ruang!</b>
                <p style={{ color: "#C4B5FD", fontSize: 13 }}>Tambah ruang pertama kamu di kiri!</p>
              </div>
            ) : (
              list.map((r: any) => (
                <div key={r.id} style={{ background: "linear-gradient(180deg,#2E1065,#1E103A)", border: "1px solid #4C1D95", borderRadius: 22, overflow: "hidden", opacity: r.aktif ? 1 : 0.75 }}>
                  {/* HEADER KARTU PER JENIS */}
                  <div style={{ background: gradJenis(r.jenis), padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 26 }}>{iconJenis(r.jenis)}</span>
                    <span style={{ background: "rgba(0,0,0,0.25)", color: "white", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)" }}>
                      {r.aktif ? "✅ AKTIF" : "❌ NONAKTIF"}
                    </span>
                  </div>
                  <div style={{ padding: 16 }}>
                    <b style={{ color: "white", fontSize: 16 }}>{r.nama}</b>
                    <div style={{ color: "#C4B5FD", fontSize: 12, marginTop: 6, lineHeight: 1.7 }}>
                      📍 {r.lokasi}
                      <br />
                      👥 Kapasitas: <b style={{ color: "white" }}>{r.kapasitas} orang</b>
                      <br />
                      🎯 Jenis: <b style={{ color: "white" }}>{r.jenis.toUpperCase()}</b> • ID: {r.id}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                      <form action={toggleRuang} style={{ flex: 1 }}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="aktif" value={String(r.aktif)} />
                        <button style={{ width: "100%", background: r.aktif ? "linear-gradient(135deg,#F59E0B,#EF4444)" : "linear-gradient(135deg,#10B981,#22D3EE)", color: "white", border: "none", borderRadius: 999, padding: "9px", fontWeight: 900, cursor: "pointer", fontSize: 12 }}>
                          {r.aktif ? "⏸ Nonaktifkan" : "▶ Aktifkan"}
                        </button>
                      </form>
                      <HapusButton id={r.id} nama={r.nama} />
                    </div>
                    {!r.aktif && (
                      <p style={{ color: "#FCA5A5", fontSize: 11, margin: "10px 0 0" }}>Ruang ini disembunyikan dari /ruang & /pinjam!</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: 12, background: "linear-gradient(135deg,#2E1065,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 18, padding: 14 }}>
            <b style={{ color: "white", fontSize: 13 }}>⚠ Hati-hati Hapus!</b>
            <p style={{ color: "#DDD6FE", fontSize: 12, margin: "6px 0 0", lineHeight: 1.6 }}>
              Kalau ruang dihapus, <b style={{ color: "white" }}>semua peminjaman ruang itu ikut kehapus</b> (cascade)! Mending <b style={{ color: "white" }}>Nonaktifkan</b> aja kalau cuma mau sembunyikan sementara!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}