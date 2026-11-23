// app/peminjaman/page.tsx - Jadwal Publik - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!

import { supabaseRahasia } from "@/lib/supabase";
import { tglIndo } from "@/lib/validasi";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function JadwalPublik() {
  const { data } = await supabaseRahasia()
    .from("peminjaman")
    .select("*, ruang(nama,lokasi,jenis)")
    .eq("status", "disetujui")
    .order("tanggal")
    .order("mulai");
  const list = data || [];

  // Kelompokkan per tanggal biar kayak kalender, rapi banget!
  const perTanggal: Record<string, any[]> = {};
  for (const p of list) {
    if (!perTanggal[p.tanggal]) perTanggal[p.tanggal] = [];
    perTanggal[p.tanggal].push(p);
  }
  const tanggalList = Object.keys(perTanggal).sort();

  const iconRuang = (jenis: string, nama: string) => {
    if (nama?.toLowerCase().includes("komputer")) return "💻";
    if (nama?.toLowerCase().includes("ipa")) return "🧪";
    if (nama?.toLowerCase().includes("bahasa")) return "🗣️";
    if (jenis === "lab") return "🔬";
    if (jenis === "kelas") return "📚";
    if (jenis === "aula") return "🎤";
    return "🏫";
  };

  const warnaJenis: any = {
    lab: "linear-gradient(135deg,#F472B6,#A855F7)",
    kelas: "linear-gradient(135deg,#60A5FA,#22D3EE)",
    aula: "linear-gradient(135deg,#FBBF24,#F97316)",
  };

  // Hitung total jam yang dipinjam
  const totalJam = list.length;
  const totalOrang = list.reduce((a: number, p: any) => a + (p.jumlah_orang || 0), 0);
  const totalRuang = new Set(list.map((p: any) => p.ruang_id)).size;

  return (
    <div>
      {/* ============ 1. HERO ============ */}
      <div
        style={{
          background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777,#F59E0B)",
          borderRadius: 28,
          padding: "32px 26px",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 20px 60px rgba(109,40,217,0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -20, width: 160, height: 160, background: "radial-gradient(circle,#FBBF24,transparent 70%)", opacity: 0.6, borderRadius: "50%", filter: "blur(10px)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -20, width: 180, height: 180, background: "radial-gradient(circle,#22D3EE,transparent 70%)", opacity: 0.5, borderRadius: "50%", filter: "blur(12px)" }} />
        <div style={{ position: "relative" }}>
          <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>📅 JADWAL PUBLIK • HANYA YANG DISETUJUI</span>
          <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.05, margin: "14px 0 0", color: "white" }}>
            Jadwal Peminjaman,
            <br />
            <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Biar Gak Bentrok!
            </span>
          </h1>
          <p style={{ color: "#DDD6FE", maxWidth: 640, lineHeight: 1.6 }}>
            Hanya yang sudah <b style={{ color: "white" }}>DISETUJUI</b> yang ditampilkan di sini! Nama peminjam <b style={{ color: "white" }}>DISEMBUNYIKAN</b> biar privasi aman, sesuai soal! Cek dulu sebelum pinjam, biar gak bentrok!
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
            <Link href="/pinjam" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "12px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>📝 Pinjam Ruang →</Link>
            <Link href="/cek" style={{ background: "rgba(0,0,0,0.35)", color: "white", padding: "12px 20px", borderRadius: 999, fontWeight: 800, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>🔍 Cek Statusmu</Link>
          </div>
        </div>
      </div>

      {/* ============ 2. STATISTIK ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginTop: 14 }}>
        {[
          ["📅", `${list.length} Jadwal`, "Sudah Disetujui", "linear-gradient(135deg,#10B981,#22D3EE)"],
          ["🏫", `${totalRuang} Ruang`, "Dipakai", "linear-gradient(135deg,#8B5CF6,#EC4899)"],
          ["👥", `${totalOrang} Orang`, "Total Peserta", "linear-gradient(135deg,#F59E0B,#EF4444)"],
          ["🛡️", "Privasi Aman", "Nama Disembunyikan", "linear-gradient(135deg,#3B82F6,#8B5CF6)"],
        ].map(([icon, judul, sub, bg]) => (
          <div key={judul} style={{ background: bg, borderRadius: 20, padding: 16, color: "white" }}>
            <div style={{ fontSize: 24 }}>{icon}</div>
            <b style={{ display: "block", marginTop: 6, fontSize: 16 }}>{judul}</b>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ============ 3. JADWAL PER TANGGAL - KAYAK KALENDER! ============ */}
      <div style={{ marginTop: 24 }}>
        {list.length === 0 ? (
          <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 24, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🎉</div>
            <b style={{ color: "white", fontSize: 18 }}>Belum Ada Jadwal yang Disetujui!</b>
            <p style={{ color: "#C4B5FD", fontSize: 13 }}>Semua ruang masih kosong! Jadi orang pertama yang pinjam!</p>
            <Link href="/pinjam" style={{ display: "inline-block", marginTop: 12, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "12px 24px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>📝 Pinjam Sekarang →</Link>
          </div>
        ) : (
          tanggalList.map((tgl) => {
            const items = perTanggal[tgl];
            const d = new Date(tgl + "T00:00:00");
            const hari = d.toLocaleDateString("id-ID", { weekday: "long" });
            const tglAngka = d.getDate();
            const bulan = d.toLocaleDateString("id-ID", { month: "long" });
            return (
              <div key={tgl} style={{ marginBottom: 18 }}>
                {/* HEADER TANGGAL */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#F59E0B,#EC4899)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0, boxShadow: "0 8px 24px rgba(236,72,153,0.4)" }}>
                    <b style={{ fontSize: 20, lineHeight: 1 }}>{tglAngka}</b>
                    <span style={{ fontSize: 10, fontWeight: 800 }}>{bulan.toUpperCase().slice(0, 3)}</span>
                  </span>
                  <div>
                    <b style={{ color: "white", fontSize: 18 }}>{tglIndo(tgl)}</b>
                    <div style={{ color: "#C4B5FD", fontSize: 12 }}>{hari} • {items.length} jadwal • {items.reduce((a: number, p: any) => a + (p.jumlah_orang || 0), 0)} orang</div>
                  </div>
                  <span style={{ marginLeft: "auto", background: "#1E103A", border: "1px solid #4C1D95", color: "#C4B5FD", fontSize: 11, padding: "6px 12px", borderRadius: 999, fontWeight: 800 }}>{items.length} JADWAL</span>
                </div>

                {/* KARTU PER JADWAL */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
                  {items.map((p: any) => (
                    <div key={p.id} style={{ background: "linear-gradient(180deg,#2E1065,#1E103A)", border: "1px solid #4C1D95", borderRadius: 22, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
                      <div style={{ background: warnaJenis[p.ruang?.jenis] || warnaJenis.kelas, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 28 }}>{iconRuang(p.ruang?.jenis, p.ruang?.nama || "")}</span>
                        <span style={{ background: "rgba(0,0,0,0.25)", color: "white", fontSize: 11, fontWeight: 900, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)" }}>{p.ruang?.jenis?.toUpperCase() || "RUANG"}</span>
                      </div>
                      <div style={{ padding: 16 }}>
                        <b style={{ color: "white", fontSize: 17, display: "block" }}>{p.ruang?.nama}</b>
                        <div style={{ color: "#C4B5FD", fontSize: 12, lineHeight: 1.7, marginTop: 6 }}>
                          📍 {p.ruang?.lokasi}
                          <br />
                          🕐 <b style={{ color: "white" }}>{p.mulai} - {p.selesai}</b> • 👥 {p.jumlah_orang} orang
                          <br />
                          🔒 <span style={{ color: "#A78BFA" }}>Nama peminjam disembunyikan</span>
                        </div>
                        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                          <span style={{ background: "#14532D", color: "#BBF7D0", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999 }}>✅ DISETUJUI</span>
                          <Link href={`/ruang/${p.ruang_id}`} style={{ background: "#120826", border: "1px solid #7C3AED", color: "white", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 999, textDecoration: "none" }}>Detail Ruang →</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ============ 4. CTA BAWAH ============ */}
      <div style={{ marginTop: 8, background: "linear-gradient(135deg,#F59E0B,#EC4899,#8B5CF6)", borderRadius: 24, padding: 24, textAlign: "center", border: "1px solid rgba(255,255,255,0.4)" }}>
        <h3 style={{ color: "white", fontSize: 22, fontWeight: 900, margin: 0 }}>Lihat Jam Kosong? Langsung Sikat! 🚀</h3>
        <p style={{ color: "white", opacity: 0.9, fontSize: 13 }}>Jangan sampai jam kosong itu keburu diambil orang lain!</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
          <Link href="/pinjam" style={{ background: "#120826", color: "white", padding: "12px 26px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>📝 Pinjam Sekarang →</Link>
          <Link href="/ruang" style={{ background: "white", color: "#DB2777", padding: "12px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>🏫 Lihat Ruang</Link>
        </div>
      </div>
    </div>
  );
}