// app/peminjaman/page.tsx - Jadwal Publik + GAMBAR UNSPLASH KAYAK EVENTKU! - VERSI JUARA 1 DUNIA!
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

  // 👈 BARU! KAYAK EVENTKU! GAMBAR LANGSUNG DARI UNSPLASH! GAK PERLU DOWNLOAD!
  // Karena lo udah pake ruang(nama,jenis), langsung pake p.ruang.nama!
  const gambarRuang = (jenis: string, nama: string) => {
    const n = (nama || "").toLowerCase();
    if (n.includes("komputer")) return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop";
    if (n.includes("ipa")) return "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop";
    if (n.includes("bahasa")) return "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop";
    if (jenis === "lab") return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop";
    if (jenis === "kelas") return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop";
    if (jenis === "aula") return "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop";
  };

  const iconRuang = (jenis: string, nama: string) => {
    if (nama?.toLowerCase().includes("komputer")) return "💻";
    if (nama?.toLowerCase().includes("ipa")) return "🧪";
    if (nama?.toLowerCase().includes("bahasa")) return "🗣";
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
      {/* ============ 1. HERO + GAMBAR UNSPLASH! 👈 BARU! ============ */}
      <div style={{ borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 20px 60px rgba(109,40,217,0.4)", position: "relative" }}>
        <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop" alt="Jadwal PinjamLab" style={{ width: "100%", height: 300, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(18,8,38,0.2), rgba(18,8,38,0.92))", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px 26px" }}>
          <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999, width: "fit-content" }}>📅 JADWAL PUBLIK • HANYA YANG DISETUJUI</span>
          <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.05, margin: "14px 0 0", color: "white" }}>
            Jadwal Peminjaman,
            <br />
            <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Biar Gak Bentrok!
            </span>
          </h1>
          <p style={{ color: "#DDD6FE", maxWidth: 640, lineHeight: 1.6, margin: "10px 0 0" }}>
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
          ["🛡", "Privasi Aman", "Nama Disembunyikan", "linear-gradient(135deg,#3B82F6,#8B5CF6)"],
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
                      {/* 👈 BARU! FOTO UNSPLASH DI ATAS KARTU JADWAL! GANTI HEADER GRADASI! */}
                      <div style={{ position: "relative" }}>
                        <img src={gambarRuang(p.ruang?.jenis, p.ruang?.nama || "")} alt={p.ruang?.nama || "Ruang"} style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(18,8,38,0.85))", display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "12px 14px" }}>
                          <span style={{ fontSize: 26, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.4)", width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {iconRuang(p.ruang?.jenis, p.ruang?.nama || "")}
                          </span>
                          <span style={{ background: warnaJenis[p.ruang?.jenis] || warnaJenis.kelas, color: "white", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)" }}>{p.ruang?.jenis?.toUpperCase() || "RUANG"}</span>
                        </div>
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

      {/* ============ 4. CTA BAWAH + GAMBAR UNSPLASH! 👈 BARU! ============ */}
      <div style={{ marginTop: 8, borderRadius: 24, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.4)" }}>
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop" alt="Pinjam Sekarang" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(245,158,11,0.92), rgba(236,72,153,0.92), rgba(139,92,246,0.92))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <h3 style={{ color: "white", fontSize: 22, fontWeight: 900, margin: 0 }}>Lihat Jam Kosong? Langsung Sikat! 🚀</h3>
          <p style={{ color: "white", opacity: 0.9, fontSize: 13 }}>Jangan sampai jam kosong itu keburu diambil orang lain!</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
            <Link href="/pinjam" style={{ background: "#120826", color: "white", padding: "12px 26px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>📝 Pinjam Sekarang →</Link>
            <Link href="/ruang" style={{ background: "white", color: "#DB2777", padding: "12px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>🏫 Lihat Ruang</Link>
          </div>
        </div>
      </div>
    </div>
  );
}