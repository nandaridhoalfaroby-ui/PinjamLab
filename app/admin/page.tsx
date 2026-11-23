// app/admin/page.tsx - Dashboard Admin - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!

import { supabaseRahasia } from "@/lib/supabase";
import { pastikanAdmin } from "@/lib/sesi";
import { setujuiPeminjaman, tolakPeminjaman } from "@/app/actions";
import { tglIndo } from "@/lib/validasi";
import { keluar } from "@/app/login/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; info?: string; galat?: string }>;
}) {
  await pastikanAdmin();
  const p = await searchParams;
  const filter = p.status || "Semua";

  // Ambil SEMUA buat hitung statistik (biar gak ke-filter!)
  const { data: semuaData } = await supabaseRahasia()
    .from("peminjaman")
    .select("*, ruang(nama,lokasi)")
    .order("dibuat", { ascending: false });
  const semua = semuaData || [];

  let q = supabaseRahasia()
    .from("peminjaman")
    .select("*, ruang(nama,lokasi)")
    .order("dibuat", { ascending: false });
  if (filter !== "Semua") q = q.eq("status", filter);
  const { data } = await q;
  const list = data || [];

  const totalSemua = semua.length;
  const totalMenunggu = semua.filter((x: any) => x.status === "menunggu").length;
  const totalDisetujui = semua.filter((x: any) => x.status === "disetujui").length;
  const totalDitolak = semua.filter((x: any) => x.status === "ditolak").length;

  const filterList = [
    { key: "Semua", label: "🏠 Semua", desc: `${totalSemua} permohonan`, grad: "linear-gradient(135deg,#8B5CF6,#EC4899)" },
    { key: "menunggu", label: "⏳ Menunggu", desc: `${totalMenunggu} butuh aksi!`, grad: "linear-gradient(135deg,#F59E0B,#EF4444)" },
    { key: "disetujui", label: "✅ Disetujui", desc: `${totalDisetujui} sudah oke!`, grad: "linear-gradient(135deg,#10B981,#22D3EE)" },
    { key: "ditolak", label: "❌ Ditolak", desc: `${totalDitolak} ditolak`, grad: "linear-gradient(135deg,#EF4444,#EC4899)" },
  ];

  return (
    <div>
      {/* ============ 1. HERO ADMIN ============ */}
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
            <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>🎛 DASHBOARD ADMIN • SELAMAT DATANG!</span>
            <h1 style={{ fontSize: 34, fontWeight: 900, margin: "14px 0 0", color: "white", lineHeight: 1.1 }}>
              Kelola Peminjaman,
              <br />
              <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Semudah 1 Klik!
              </span>
            </h1>
            <p style={{ color: "#DDD6FE", margin: "8px 0 0", maxWidth: 560, lineHeight: 1.6 }}>
              {totalMenunggu > 0 ? (
                <>Ada <b style={{ color: "white" }}>{totalMenunggu} permohonan menunggu</b> persetujuanmu! Yuk bereskan sekarang!</>
              ) : (
                <>Semua permohonan sudah beres! Gak ada yang menunggu! Mantap!</>
              )}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/admin/ruang" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "12px 20px", borderRadius: 999, fontWeight: 900, textDecoration: "none", boxShadow: "0 8px 24px rgba(236,72,153,0.4)" }}>🏫 Kelola Ruang →</Link>
            <Link href="/" style={{ background: "rgba(0,0,0,0.3)", color: "white", padding: "12px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>🏠 Lihat Beranda</Link>
            <form action={keluar}>
              <button style={{ background: "white", color: "#991B1B", border: "none", borderRadius: 999, padding: "12px 18px", fontWeight: 900, cursor: "pointer" }}>🚪 Keluar</button>
            </form>
          </div>
        </div>
      </div>

      {/* ============ 2. PESAN INFO / GALAT ============ */}
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

      {/* ============ 3. STATISTIK 4 KOTAK ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginTop: 14 }}>
        {[
          ["📋", `${totalSemua} Total`, "Semua Permohonan", "linear-gradient(135deg,#8B5CF6,#EC4899)"],
          ["⏳", `${totalMenunggu} Menunggu`, "Butuh Aksi Kamu!", "linear-gradient(135deg,#F59E0B,#EF4444)"],
          ["✅", `${totalDisetujui} Disetujui`, "Sudah Oke!", "linear-gradient(135deg,#10B981,#22D3EE)"],
          ["❌", `${totalDitolak} Ditolak`, "Dengan Alasan", "linear-gradient(135deg,#EF4444,#EC4899)"],
        ].map(([icon, judul, sub, bg]) => (
          <div key={judul} style={{ background: bg, borderRadius: 20, padding: 16, color: "white" }}>
            <div style={{ fontSize: 24 }}>{icon}</div>
            <b style={{ display: "block", marginTop: 6, fontSize: 16 }}>{judul}</b>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ============ 4. FILTER JADI KARTU ============ */}
      <div style={{ marginTop: 20 }}>
        <b style={{ color: "white", fontSize: 16 }}>🎯 Saring Status:</b>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10, marginTop: 10 }}>
          {filterList.map((f) => {
            const aktif = filter === f.key;
            return (
              <Link
                key={f.key}
                href={`/admin${f.key === "Semua" ? "" : `?status=${f.key}`}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  background: aktif ? f.grad : "#1E103A",
                  border: aktif ? "1px solid rgba(255,255,255,0.5)" : "1px solid #4C1D95",
                  borderRadius: 18,
                  padding: 14,
                  display: "block",
                  boxShadow: aktif ? "0 10px 30px rgba(236,72,153,0.35)" : "none",
                  position: "relative",
                }}
              >
                {aktif && <span style={{ position: "absolute", top: 10, right: 10, background: "white", color: "#6D28D9", fontSize: 10, fontWeight: 900, padding: "3px 8px", borderRadius: 999 }}>✓ AKTIF</span>}
                <b style={{ fontSize: 14 }}>{f.label}</b>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>{f.desc}</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ============ 5. DAFTAR PERMOHONAN ============ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ color: "white", fontSize: 20, fontWeight: 900, margin: 0 }}>
          Daftar Permohonan ({list.length}) {filter !== "Semua" && <>• <span style={{ color: "#FBBF24" }}>{filter.toUpperCase()}</span></>}
        </h2>
        <span style={{ background: "#1E103A", border: "1px solid #4C1D95", color: "#C4B5FD", fontSize: 12, padding: "6px 12px", borderRadius: 999, fontWeight: 700 }}>
          🔗 URL: /admin{filter !== "Semua" ? `?status=${filter}` : ""}
        </span>
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {list.length === 0 ? (
          <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🎉</div>
            <b style={{ color: "white" }}>Gak Ada Permohonan {filter !== "Semua" ? filter : ""}!</b>
            <p style={{ color: "#C4B5FD", fontSize: 13 }}>Coba pilih filter lain, atau tunggu ada yang pinjam!</p>
            <Link href="/admin" style={{ display: "inline-block", marginTop: 10, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>🏠 Lihat Semua</Link>
          </div>
        ) : (
          list.map((x: any) => (
            <div key={x.id} style={{ background: "linear-gradient(180deg,#2E1065,#1E103A)", border: "1px solid #4C1D95", borderRadius: 22, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
              {/* HEADER KARTU */}
              <div style={{ background: x.status === "menunggu" ? "linear-gradient(135deg,#F59E0B,#EF4444)" : x.status === "disetujui" ? "linear-gradient(135deg,#10B981,#22D3EE)" : "linear-gradient(135deg,#EF4444,#EC4899)", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <b style={{ color: "white" }}>Nomor {x.id} • {x.ruang?.nama}</b>
                <span style={{ background: "rgba(0,0,0,0.25)", color: "white", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)" }}>
                  {x.status === "menunggu" ? "⏳ MENUNGGU" : x.status === "disetujui" ? "✅ DISETUJUI" : "❌ DITOLAK"}
                </span>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, fontSize: 13 }}>
                  <div style={{ background: "#120826", border: "1px solid #4C1D95", borderRadius: 12, padding: 10 }}><span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 800 }}>👤 PEMINJAM</span><br /><b style={{ color: "white" }}>{x.peminjam}</b></div>
                  <div style={{ background: "#120826", border: "1px solid #4C1D95", borderRadius: 12, padding: 10 }}><span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 800 }}>📅 TANGGAL</span><br /><b style={{ color: "white" }}>{tglIndo(x.tanggal)}</b></div>
                  <div style={{ background: "#120826", border: "1px solid #4C1D95", borderRadius: 12, padding: 10 }}><span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 800 }}>🕐 JAM</span><br /><b style={{ color: "white" }}>{x.mulai} - {x.selesai}</b></div>
                  <div style={{ background: "#120826", border: "1px solid #4C1D95", borderRadius: 12, padding: 10 }}><span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 800 }}>👥 JUMLAH</span><br /><b style={{ color: "white" }}>{x.jumlah_orang} orang</b></div>
                </div>
                <div style={{ color: "#C4B5FD", fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
                  📝 <b style={{ color: "white" }}>Keperluan:</b> {x.keperluan}
                  <br />
                  📍 <b style={{ color: "white" }}>Lokasi:</b> {x.ruang?.lokasi}
                </div>
                {x.status === "ditolak" && (
                  <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.5)", color: "#FCA5A5", padding: "10px 12px", borderRadius: 12, fontSize: 13, marginTop: 12 }}>
                    <b>📢 Alasan Ditolak:</b> {x.alasan_tolak}
                  </div>
                )}

                {x.status === "menunggu" && (
                  <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap", alignItems: "stretch", background: "#120826", border: "1px solid #7C3AED", borderRadius: 16, padding: 12 }}>
                    <form action={setujuiPeminjaman} style={{ display: "flex" }}>
                      <input type="hidden" name="id" value={x.id} />
                      <button style={{ background: "linear-gradient(135deg,#10B981,#22D3EE)", color: "white", border: "none", borderRadius: 999, padding: "11px 20px", fontWeight: 900, cursor: "pointer", whiteSpace: "nowrap" }}>✅ Setujui</button>
                    </form>
                    <form action={tolakPeminjaman} style={{ display: "flex", gap: 6, flex: 1, minWidth: 220 }}>
                      <input type="hidden" name="id" value={x.id} />
                      <input name="alasan_tolak" placeholder="Alasan tolak (wajib, min 5 huruf) *" style={{ flex: 1, padding: "10px 12px", borderRadius: 999, border: "1px solid #7C3AED", background: "#1E103A", color: "white", outline: "none", fontSize: 13 }} />
                      <button style={{ background: "linear-gradient(135deg,#EF4444,#EC4899)", color: "white", border: "none", borderRadius: 999, padding: "11px 18px", fontWeight: 900, cursor: "pointer", whiteSpace: "nowrap" }}>❌ Tolak</button>
                    </form>
                  </div>
                )}
                {x.status !== "menunggu" && (
                  <div style={{ marginTop: 12, color: "#A78BFA", fontSize: 12 }}>
                    {x.status === "disetujui" ? "✅ Permohonan ini sudah disetujui. Peminjam bisa liat di /peminjaman!" : "❌ Permohonan ini sudah ditolak. Peminjam bisa liat alasannya di /cek!"}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ============ 6. TIPS ADMIN ============ */}
      <div style={{ marginTop: 18, background: "linear-gradient(135deg,#2E1065,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 20, padding: 16 }}>
        <b style={{ color: "white" }}>💡 Tips Admin Biar Gak Salah!</b>
        <ul style={{ color: "#DDD6FE", fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: "8px 0 0" }}>
          <li><b style={{ color: "white" }}>Bentrok?</b> Kalau ada 2 permohonan yang bentrok, setujui 1 aja! Yang lain otomatis ditolak pas mau disetujui karena bentrok!</li>
          <li><b style={{ color: "white" }}>Tolak wajib alasan!</b> Minimal 5 huruf! Peminjam bisa liat alasannya di /cek!</li>
          <li><b style={{ color: "white" }}>Cek jadwal dulu!</b> Lihat di /peminjaman biar tau jam mana yang udah disetujui!</li>
        </ul>
      </div>
    </div>
  );
}