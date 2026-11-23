// app/ruang/page.tsx - Daftar Ruang + GAMBAR UNSPLASH KAYAK EVENTKU! - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!

import { supabasePublik } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DaftarRuang({
  searchParams,
}: {
  searchParams: Promise<{ jenis?: string }>;
}) {
  const p = await searchParams;
  const jenis = p.jenis || "Semua";

  // Ambil SEMUA ruang aktif buat hitung jumlah per jenis
  const { data: semua } = await supabasePublik()
    .from("ruang")
    .select("*")
    .eq("aktif", true);
  const all = semua || [];

  const hitung = (j: string) =>
    j === "Semua" ? all.length : all.filter((x: any) => x.jenis === j).length;

  let q = supabasePublik().from("ruang").select("*").eq("aktif", true);
  if (jenis !== "Semua") q = q.eq("jenis", jenis);
  const { data } = await q;
  const list = data || [];

  // 👈 BARU! KAYAK EVENTKU! GAMBAR LANGSUNG DARI UNSPLASH! GAK PERLU DOWNLOAD!
  const gambarRuang = (jenisR: string, nama: string) => {
    const n = nama.toLowerCase();
    if (n.includes("komputer")) return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop";
    if (n.includes("ipa")) return "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop";
    if (n.includes("bahasa")) return "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop";
    if (jenisR === "lab") return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop";
    if (jenisR === "kelas") return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop";
    if (jenisR === "aula") return "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop";
  };

  const iconRuang = (jenisR: string, nama: string) => {
    if (nama.toLowerCase().includes("komputer")) return "💻";
    if (nama.toLowerCase().includes("ipa")) return "🧪";
    if (nama.toLowerCase().includes("bahasa")) return "🗣";
    if (jenisR === "lab") return "🔬";
    if (jenisR === "kelas") return "📚";
    if (jenisR === "aula") return "🎤";
    return "🏫";
  };

  const warnaJenis: any = {
    lab: "linear-gradient(135deg,#F472B6,#A855F7)",
    kelas: "linear-gradient(135deg,#60A5FA,#22D3EE)",
    aula: "linear-gradient(135deg,#FBBF24,#F97316)",
  };

  const filterList = [
    { key: "Semua", label: "🏠 Semua Ruang", desc: "Semua jenis", grad: "linear-gradient(135deg,#8B5CF6,#EC4899)" },
    { key: "lab", label: "🔬 Lab", desc: "Lab Komputer, IPA, Bahasa", grad: "linear-gradient(135deg,#F472B6,#A855F7)" },
    { key: "kelas", label: "📚 Kelas", desc: "Kelas belajar", grad: "linear-gradient(135deg,#60A5FA,#22D3EE)" },
    { key: "aula", label: "🎤 Aula", desc: "Aula besar", grad: "linear-gradient(135deg,#FBBF24,#F97316)" },
  ];

  return (
    <div>
      {/* ============ 1. HERO + GAMBAR UNSPLASH! 👈 BARU! ============ */}
      <div style={{ borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 20px 60px rgba(109,40,217,0.4)", position: "relative" }}>
        <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop" alt="Ruang PinjamLab" style={{ width: "100%", height: 300, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(18,8,38,0.2), rgba(18,8,38,0.92))", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px 26px" }}>
          <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999, width: "fit-content" }}>🏫 DAFTAR RUANG • {all.length} RUANG AKTIF</span>
          <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.05, margin: "14px 0 0", color: "white" }}>
            Pilih Ruang,
            <br />
            <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sesuai Kebutuhanmu!
            </span>
          </h1>
          <p style={{ color: "#DDD6FE", maxWidth: 640, lineHeight: 1.6, margin: "10px 0 0" }}>
            Saring jenis di bawah, URL-nya berubah jadi <b style={{ color: "white" }}>/ruang?jenis=lab</b> — sesuai soal! Klik kartu-nya buat liat jadwal + pinjam langsung!
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
            <Link href="/pinjam" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "12px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>📝 Pinjam Sekarang →</Link>
            <Link href="/peminjaman" style={{ background: "rgba(0,0,0,0.35)", color: "white", padding: "12px 20px", borderRadius: 999, fontWeight: 800, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>📅 Lihat Jadwal</Link>
          </div>
        </div>
      </div>

      {/* ============ 2. STATISTIK KECIL ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginTop: 14 }}>
        {[
          ["🏠", `${hitung("Semua")} Ruang`, "Total Aktif", "linear-gradient(135deg,#8B5CF6,#EC4899)"],
          ["🔬", `${hitung("lab")} Lab`, "Lab Komputer, IPA, Bahasa", "linear-gradient(135deg,#F472B6,#A855F7)"],
          ["📚", `${hitung("kelas")} Kelas`, "Kelas Belajar", "linear-gradient(135deg,#60A5FA,#22D3EE)"],
          ["🎤", `${hitung("aula")} Aula`, "Aula Besar", "linear-gradient(135deg,#FBBF24,#F97316)"],
        ].map(([icon, judul, sub, bg]) => (
          <div key={judul} style={{ background: bg, borderRadius: 18, padding: 14, color: "white" }}>
            <div style={{ fontSize: 22 }}>{icon}</div>
            <b style={{ display: "block", marginTop: 4 }}>{judul}</b>
            <div style={{ fontSize: 11, opacity: 0.9 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ============ 3. FILTER - KARTU BUKAN CUMA TOMBOL! ============ */}
      <div style={{ marginTop: 22 }}>
        <b style={{ color: "white", fontSize: 16 }}>🎯 Saring Jenis Ruang:</b>
        <p style={{ color: "#C4B5FD", fontSize: 13, margin: "4px 0 0" }}>Klik salah satu, halaman langsung berubah + URL-nya berubah!</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, marginTop: 12 }}>
          {filterList.map((f) => {
            const aktif = jenis === f.key;
            return (
              <Link
                key={f.key}
                href={`/ruang${f.key === "Semua" ? "" : `?jenis=${f.key}`}`}
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
                {aktif && (
                  <span style={{ position: "absolute", top: 10, right: 10, background: "white", color: "#6D28D9", fontSize: 10, fontWeight: 900, padding: "3px 8px", borderRadius: 999 }}>✓ AKTIF</span>
                )}
                <b style={{ fontSize: 15 }}>{f.label}</b>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>{f.desc}</div>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ background: "rgba(0,0,0,0.25)", padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 900 }}>{hitung(f.key)} ruang</span>
                  <span style={{ fontWeight: 900 }}>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ============ 4. HASIL ============ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
        <h2 style={{ color: "white", fontSize: 22, fontWeight: 900, margin: 0 }}>
          Menampilkan <span style={{ color: "#FBBF24" }}>{list.length} ruang</span>
          {jenis !== "Semua" ? <> jenis <span style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{jenis.toUpperCase()}</span></> : " semua jenis"}
        </h2>
        <span style={{ background: "#1E103A", border: "1px solid #4C1D95", color: "#C4B5FD", fontSize: 12, padding: "6px 12px", borderRadius: 999, fontWeight: 700 }}>
          🔗 URL: /ruang{jenis !== "Semua" ? `?jenis=${jenis}` : ""}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14, marginTop: 14 }}>
        {list.length === 0 ? (
          <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 28, gridColumn: "1 / -1", textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>😢</div>
            <b style={{ color: "white" }}>Gak ada ruang jenis {jenis} yang aktif</b>
            <p style={{ color: "#C4B5FD", fontSize: 13 }}>Coba pilih jenis lain, atau cek di Admin!</p>
            <Link href="/ruang" style={{ display: "inline-block", marginTop: 10, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>🏠 Lihat Semua Ruang</Link>
          </div>
        ) : (
          list.map((r: any) => (
            <div key={r.id} style={{ background: "linear-gradient(180deg,#2E1065,#1E103A)", border: "1px solid #4C1D95", borderRadius: 24, overflow: "hidden", boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }}>
              {/* 👈 BARU! FOTO UNSPLASH DI ATAS KARTU! KAYAK EVENTKU! */}
              <div style={{ position: "relative" }}>
                <img src={gambarRuang(r.jenis, r.nama)} alt={r.nama} style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(18,8,38,0.85))", display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "12px 14px" }}>
                  <span style={{ fontSize: 28, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.4)", width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {iconRuang(r.jenis, r.nama)}
                  </span>
                  <span style={{ background: warnaJenis[r.jenis] || warnaJenis.kelas, color: "white", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)" }}>
                    {r.jenis.toUpperCase()} • ✅ AKTIF
                  </span>
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <Link href={`/ruang/${r.id}`} style={{ textDecoration: "none", color: "white" }}>
                  <b style={{ fontSize: 20, display: "block", lineHeight: 1.2 }}>{r.nama}</b>
                </Link>
                <div style={{ color: "#C4B5FD", fontSize: 13, marginTop: 6, lineHeight: 1.7 }}>
                  📍 {r.lokasi}
                  <br />
                  👥 Kapasitas <b style={{ color: "white" }}>{r.kapasitas} orang</b> • 🕐 07:00 - 17:00
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                  <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Maks 3 Jam</span>
                  <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Maks 60 Hari</span>
                  <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Bukan Sabtu/Minggu</span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  <Link href={`/ruang/${r.id}`} style={{ flex: 1, textAlign: "center", background: "#120826", border: "1px solid #7C3AED", color: "white", padding: "11px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>
                    Detail →
                  </Link>
                  <Link href={`/pinjam?ruang_id=${r.id}`} style={{ flex: 1, textAlign: "center", background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "11px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>
                    📝 Pinjam
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ============ 5. CTA BAWAH + GAMBAR UNSPLASH! 👈 BARU! ============ */}
      <div style={{ marginTop: 24, borderRadius: 24, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.4)" }}>
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop" alt="Pinjam Sekarang" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(245,158,11,0.9), rgba(236,72,153,0.9), rgba(139,92,246,0.9))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <h3 style={{ color: "white", fontSize: 24, fontWeight: 900, margin: 0 }}>Udah Nemu Ruang Favoritmu? 🎯</h3>
          <p style={{ color: "white", opacity: 0.95, fontSize: 13 }}>Langsung ajukan sekarang, jangan sampai keburu dipinjam orang lain!</p>
          <Link href="/pinjam" style={{ display: "inline-block", marginTop: 10, background: "#120826", color: "white", padding: "12px 26px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>📝 Pinjam Sekarang →</Link>
        </div>
      </div>
    </div>
  );
}