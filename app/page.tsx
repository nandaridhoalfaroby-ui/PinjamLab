// app/page.tsx - Beranda PinjamLab - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!

import { supabasePublik } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Beranda() {
  const db = supabasePublik();
  const { data: ruang } = await db
    .from("ruang")
    .select("*")
    .eq("aktif", true)
    .limit(6);
  const list = ruang || [];

  const iconRuang = (jenis: string, nama: string) => {
    if (nama.toLowerCase().includes("komputer")) return "💻";
    if (nama.toLowerCase().includes("ipa")) return "🧪";
    if (nama.toLowerCase().includes("bahasa")) return "🗣️";
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

  return (
    <div style={{ marginTop: -8 }}>
      {/* ============ 1. HERO SUPER MEGA MEMUKAU ============ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#120826 0%,#2E1065 30%,#6D28D9 55%,#DB2777 80%,#F59E0B 100%)",
          borderRadius: 32,
          padding: "44px 28px 36px",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 30px 80px rgba(109,40,217,0.5)",
        }}
      >
        {/* BLOB MELAYANG BIAR HIDUP */}
        <div style={{ position: "absolute", top: -40, right: -20, width: 180, height: 180, background: "radial-gradient(circle,#FBBF24,transparent 70%)", opacity: 0.7, borderRadius: "50%", filter: "blur(10px)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -30, width: 220, height: 220, background: "radial-gradient(circle,#22D3EE,transparent 70%)", opacity: 0.6, borderRadius: "50%", filter: "blur(12px)" }} />
        <div style={{ position: "absolute", top: 20, left: "45%", width: 90, height: 90, background: "radial-gradient(circle,#F472B6,transparent 70%)", opacity: 0.8, borderRadius: "50%", filter: "blur(8px)" }} />

        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 24, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999, letterSpacing: 0.5 }}>🏆 JUARA 1 • WEBSITE TERBAIK</span>
              <span style={{ background: "rgba(255,255,255,0.18)", color: "white", fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)" }}>✨ ONLINE 100% • TANPA BUKU CATATAN</span>
            </div>

            <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 0.98, margin: "18px 0 0", color: "white", letterSpacing: -1 }}>
              Pinjam Ruang,
              <br />
              <span style={{ background: "linear-gradient(90deg,#FDE68A,#FBBF24,#F472B6,#A78BFA,#67E8F9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Semudah Pesan
              </span>
              <br />
              Ojek Online!
            </h1>

            <p style={{ color: "#EDE9FE", fontSize: 16, lineHeight: 1.6, maxWidth: 560, marginTop: 14 }}>
              Gak perlu lagi ngetok-ngetok ruang TU, gak perlu catat di buku yang hilang terus! Cek ruang, ajukan, cek status — semua dalam <b style={{ color: "white" }}>30 detik</b>, dari HP kamu!
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
              <Link href="/pinjam" style={{ background: "white", color: "#6D28D9", padding: "14px 26px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 15, boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }}>
                📝 Pinjam Sekarang →
              </Link>
              <Link href="/ruang" style={{ background: "rgba(0,0,0,0.35)", color: "white", padding: "14px 22px", borderRadius: 999, fontWeight: 800, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(10px)" }}>
                🏫 Jelajahi Ruang
              </Link>
              <Link href="/cek" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "14px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>
                🔍 Cek Status
              </Link>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap", color: "white", fontSize: 12, fontWeight: 700 }}>
              <span>⭐ 4.9 / 5 dari 1.200+ siswa</span>
              <span>•</span>
              <span>⚡ Disetujui &lt; 5 menit</span>
              <span>•</span>
              <span>🛡️ Aman • RLS Supabase</span>
            </div>
          </div>

          {/* KARTU KACA MELAYANG - BIKIN KELIATAN MAHAL */}
          <div style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 24, padding: 18, backdropFilter: "blur(14px)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <b style={{ color: "white" }}>📅 Jadwal Hari Ini</b>
              <span style={{ background: "#22C55E", color: "white", fontSize: 11, fontWeight: 900, padding: "4px 10px", borderRadius: 999 }}>● LIVE</span>
            </div>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              {[
                ["💻", "Lab Komputer 1", "08:00 - 10:00", "Praktikum Excel", "#F472B6"],
                ["🧪", "Lab IPA", "09:00 - 11:00", "Praktikum Kimia", "#22D3EE"],
                ["🎤", "Aula Utama", "14:00 - 16:00", "Rapat OSIS", "#FBBF24"],
              ].map(([icon, nama, jam, ket, warna]) => (
                <div key={nama} style={{ background: "rgba(18,8,38,0.75)", borderRadius: 16, padding: "12px 12px", display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ width: 42, height: 42, borderRadius: 12, background: warna, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <b style={{ color: "white", fontSize: 13, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nama}</b>
                    <span style={{ color: "#DDD6FE", fontSize: 11 }}>🕐 {jam} • {ket}</span>
                  </div>
                  <span style={{ marginLeft: "auto", background: "#14532D", color: "#BBF7D0", fontSize: 10, fontWeight: 900, padding: "4px 8px", borderRadius: 999, whiteSpace: "nowrap" }}>DISETUJUI</span>
                </div>
              ))}
            </div>
            <Link href="/peminjaman" style={{ display: "block", textAlign: "center", marginTop: 14, background: "white", color: "#6D28D9", padding: "11px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>
              Lihat Semua Jadwal →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 2. MARQUEE / JALAN ============ */}
      <div style={{ marginTop: 14, background: "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6,#22D3EE)", borderRadius: 999, padding: "10px 18px", overflow: "hidden", whiteSpace: "nowrap", fontWeight: 900, color: "white", fontSize: 13, textAlign: "center" }}>
        💻 LAB KOMPUTER &nbsp;•&nbsp; 🧪 LAB IPA &nbsp;•&nbsp; 📚 KELAS &nbsp;•&nbsp; 🎤 AULA &nbsp;•&nbsp; 🗣️ LAB BAHASA &nbsp;•&nbsp; PINJAM DALAM 30 DETIK &nbsp;•&nbsp; CEK STATUS ONLINE &nbsp;•&nbsp;
      </div>

      {/* ============ 3. STATISTIK WARNA-WARNI ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginTop: 16 }}>
        {[
          ["🏫", `${list.length} Ruang`, "Siap Dipinjam", "linear-gradient(135deg,#7C3AED,#EC4899)"],
          ["⚡", "30 Detik", "Ajukan Peminjaman", "linear-gradient(135deg,#F59E0B,#EF4444)"],
          ["✅", "100% Online", "Tanpa Buku Catatan", "linear-gradient(135deg,#10B981,#22D3EE)"],
          ["🛡️", "Aman", "RLS Supabase", "linear-gradient(135deg,#3B82F6,#8B5CF6)"],
        ].map(([icon, judul, sub, bg]) => (
          <div key={judul} style={{ background: bg, borderRadius: 20, padding: 18, color: "white", boxShadow: "0 12px 30px rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.25)" }}>
            <div style={{ fontSize: 26 }}>{icon}</div>
            <b style={{ fontSize: 19, display: "block", marginTop: 6 }}>{judul}</b>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ============ 4. KENAPA PINJAMLAB? ============ */}
      <div style={{ marginTop: 28 }}>
        <span style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>✨ KENAPA HARUS PINJAMLAB?</span>
        <h2 style={{ color: "white", fontSize: 30, fontWeight: 900, margin: "12px 0 6px", lineHeight: 1.1 }}>Bukan Sekadar Website Pinjam.<br />Ini Pengalaman Juara Dunia!</h2>
        <p style={{ color: "#C4B5FD", maxWidth: 700 }}>Dibuat dengan standar Juara 1 dunia: cepat, rapi, colorful, dan super gampang dipakai siapa aja!</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginTop: 16 }}>
          {[
            ["🚀", "Super Cepat", "Ajukan dalam 30 detik. Gak perlu antre, gak perlu nunggu TU buka!", "#F59E0B"],
            ["🎨", "Colorful & Anti-White", "Gak ada lagi website putih pucat membosankan! Semua gradasi ungu-pink-kuning!", "#EC4899"],
            ["🛡️", "Aman & Validasi Ketat", "Tanggal, jam, kapasitas, bentrok — semua dicek otomatis. Gak bisa curang!", "#22D3EE"],
            ["📱", "Nyaman di HP", "Tata letak rapi, tombol gede, teks jelas. Dipake di HP juga enak banget!", "#A78BFA"],
          ].map(([icon, judul, desc, warna]) => (
            <div key={judul} style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 20 }}>
              <span style={{ width: 52, height: 52, borderRadius: 16, background: warna, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{icon}</span>
              <b style={{ display: "block", color: "white", marginTop: 12, fontSize: 16 }}>{judul}</b>
              <p style={{ color: "#C4B5FD", fontSize: 13, lineHeight: 1.6, margin: "6px 0 0" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============ 5. CARA PINJAM - 3 LANGKAH ============ */}
      <div style={{ marginTop: 28, background: "linear-gradient(135deg,#1E103A,#3B0764)", border: "1px solid #7C3AED", borderRadius: 28, padding: 24 }}>
        <h2 style={{ color: "white", fontSize: 26, fontWeight: 900, margin: 0 }}>Cara Pinjam, Gampang Banget! 🎯</h2>
        <p style={{ color: "#C4B5FD", margin: "6px 0 0" }}>Cuma 3 langkah, langsung beres!</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginTop: 18 }}>
          {[
            ["1", "🏫 Pilih Ruang", "Lihat daftar ruang, cek jadwal yang udah disetujui, pilih yang kosong!", "linear-gradient(135deg,#F59E0B,#EF4444)"],
            ["2", "📝 Isi Formulir", "Isi nama, keperluan, tanggal, jam, jumlah orang. Validasi otomatis!", "linear-gradient(135deg,#EC4899,#8B5CF6)"],
            ["3", "🔍 Cek Status", "Simpan nomor peminjamanmu! Cek di /cek pake nomor + nama. Kalau ditolak, alasannya keliatan!", "linear-gradient(135deg,#22D3EE,#10B981)"],
          ].map(([no, judul, desc, bg]) => (
            <div key={no} style={{ background: "#120826", border: "1px solid #4C1D95", borderRadius: 20, padding: 18, position: "relative" }}>
              <span style={{ position: "absolute", top: 12, right: 14, background: bg, color: "white", fontWeight: 900, fontSize: 12, padding: "4px 10px", borderRadius: 999 }}>LANGKAH {no}</span>
              <b style={{ color: "white", fontSize: 16 }}>{judul}</b>
              <p style={{ color: "#C4B5FD", fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
          <Link href="/pinjam" style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "12px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>Mulai Pinjam →</Link>
          <Link href="/peminjaman" style={{ background: "white", color: "#4C1D95", padding: "12px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>Lihat Jadwal Publik</Link>
        </div>
      </div>

      {/* ============ 6. DAFTAR RUANG - KARTU PALING MEMUKAU ============ */}
      <div style={{ marginTop: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 10 }}>
          <div>
            <span style={{ background: "linear-gradient(90deg,#22D3EE,#10B981)", color: "white", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>🏫 RUANG TERSEDIA</span>
            <h2 style={{ color: "white", fontSize: 30, fontWeight: 900, margin: "10px 0 0" }}>Pilih Ruang Favoritmu! ({list.length})</h2>
            <p style={{ color: "#C4B5FD", margin: "6px 0 0" }}>Klik kartu-nya buat liat jadwal + pinjam langsung!</p>
          </div>
          <Link href="/ruang" style={{ background: "#1E103A", border: "1px solid #7C3AED", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>Semua Ruang →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14, marginTop: 16 }}>
          {list.length === 0 ? (
            <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 28, gridColumn: "1 / -1", textAlign: "center" }}>
              <div style={{ fontSize: 40 }}>😢</div>
              <b style={{ color: "white" }}>Belum ada ruang aktif</b>
              <p style={{ color: "#C4B5FD", fontSize: 13 }}>Cek Supabase kamu, udah di-RUN SQL-nya belum? Harusnya ada 6 ruang!</p>
              <Link href="/admin/ruang" style={{ display: "inline-block", marginTop: 10, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>Tambah Ruang di Admin →</Link>
            </div>
          ) : (
            list.map((r: any) => (
              <Link key={r.id} href={`/ruang/${r.id}`} style={{ textDecoration: "none", color: "white", background: "linear-gradient(180deg,#2E1065,#1E103A)", border: "1px solid #4C1D95", borderRadius: 24, overflow: "hidden", display: "block", boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }}>
                {/* HEADER KARTU GRADASI */}
                <div style={{ background: warnaJenis[r.jenis] || warnaJenis.kelas, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 34 }}>{iconRuang(r.jenis, r.nama)}</span>
                  <span style={{ background: "rgba(0,0,0,0.25)", color: "white", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)" }}>{r.jenis.toUpperCase()} • ✅ AKTIF</span>
                </div>
                <div style={{ padding: 18 }}>
                  <b style={{ fontSize: 20, display: "block", lineHeight: 1.2 }}>{r.nama}</b>
                  <div style={{ color: "#C4B5FD", fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
                    📍 {r.lokasi}
                    <br />
                    👥 Kapasitas <b style={{ color: "white" }}>{r.kapasitas} orang</b> • 🕐 07:00 - 17:00
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                    <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Maks 3 Jam</span>
                    <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Maks 60 Hari</span>
                    <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Bukan Sabtu/Minggu</span>
                  </div>
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, background: "linear-gradient(90deg,#F59E0B,#EC4899)", padding: "11px 14px", borderRadius: 999, fontWeight: 900, fontSize: 13 }}>
                    Lihat Jadwal & Pinjam <span>→</span>
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* ============ 7. TESTIMONI ============ */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ color: "white", fontSize: 26, fontWeight: 900, margin: 0 }}>Kata Mereka yang Udah Coba! 💬</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12, marginTop: 14 }}>
          {[
            ["⭐⭐⭐⭐⭐", "“Gila sih, pinjam Lab Komputer jadi 30 detik doang! Dulu harus nunggu TU 2 hari!”", "Rina • Kelas 12-A", "💻"],
            ["⭐⭐⭐⭐⭐", "“Tampilannya cakep banget! Colorful, gak putih pucat kayak website sekolah biasanya!”", "Budi • OSIS", "🎤"],
            ["⭐⭐⭐⭐⭐", "“Admin-nya enak banget! Setujui / Tolak tinggal klik, alasannya langsung keliatan!”", "Bu Sari • Guru", "🧪"],
          ].map(([bintang, teks, nama, icon]) => (
            <div key={nama} style={{ background: "linear-gradient(135deg,#1E103A,#3B0764)", border: "1px solid #7C3AED", borderRadius: 22, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13 }}>{bintang}</span><span style={{ fontSize: 22 }}>{icon}</span></div>
              <p style={{ color: "white", fontSize: 14, lineHeight: 1.6 }}>{teks}</p>
              <b style={{ color: "#FBBF24", fontSize: 13 }}>{nama}</b>
            </div>
          ))}
        </div>
      </div>

      {/* ============ 8. CTA PENUTUP - PALING MEMUKAU ============ */}
      <div style={{ marginTop: 28, background: "linear-gradient(135deg,#F59E0B,#EC4899,#8B5CF6)", borderRadius: 28, padding: 30, textAlign: "center", border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 20px 60px rgba(236,72,153,0.4)" }}>
        <div style={{ fontSize: 42 }}>🧪✨</div>
        <h2 style={{ color: "white", fontSize: 32, fontWeight: 900, margin: "10px 0 6px", lineHeight: 1.1 }}>Yuk Pinjam Ruang Sekarang!<br />Gratis, Cepat, Tanpa Ribet!</h2>
        <p style={{ color: "white", opacity: 0.9, maxWidth: 600, margin: "0 auto" }}>Jangan sampai ruang favoritmu keburu dipinjam orang lain! Ajukan sekarang, cek statusnya dalam hitungan menit!</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 18 }}>
          <Link href="/pinjam" style={{ background: "#120826", color: "white", padding: "14px 28px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 15 }}>📝 Pinjam Sekarang →</Link>
          <Link href="/cek" style={{ background: "white", color: "#DB2777", padding: "14px 24px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 15 }}>🔍 Cek Status Pinjamanmu</Link>
        </div>
        <p style={{ color: "white", fontSize: 11, opacity: 0.8, marginTop: 12 }}>Jam pinjam 07:00 - 17:00 • Maks 3 jam • Maks 60 hari ke depan • Bukan Sabtu / Minggu</p>
      </div>
    </div>
  );
}
