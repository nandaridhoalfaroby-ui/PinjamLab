// app/layout.tsx - Layout PinjamLab - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!
// STYLE SAMA PERSIS KAYAK ASLI! Gelap + kaca + gradasi! Cuma nav-nya sekarang BISA NYALA!

import "./globals.css";
import Link from "next/link";
import SplashScreen from "./SplashScreen"; // 👈 BARU! Buat splash screen!
import NavLink from "./NavLink"; // 👈 WAJIB ADA! Kalau file ini gak ada, layout.tsx PASTI ERROR!

export const metadata = {
  title: "PinjamLab - Pinjam Ruang & Lab Tanpa Ribet!",
  description: "Pinjam ruang & lab dalam 30 detik! Colorful, modern, memukau, rapi!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          background: "#120826",
          color: "white",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* 👈 BARU! SPLASH SCREEN - Muncul 2.2 detik pas pertama buka! */}
        <SplashScreen />

        {/* ============ 1. BAR PENGUMUMAN ATAS - PALING ATAS! ============ */}
        <div
          style={{
            background: "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6,#22D3EE,#10B981)",
            color: "white",
            textAlign: "center",
            padding: "8px 12px",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          🎉 PINJAMLAB SUDAH ONLINE! &nbsp;•&nbsp; Pinjam Ruang Dalam 30 Detik! &nbsp;•&nbsp; Jam 07:00 - 17:00 • Maks 3 Jam • Bukan Sabtu / Minggu &nbsp;•&nbsp;{" "}
          <Link href="/pinjam" prefetch={true} style={{ color: "white", textDecoration: "underline", fontWeight: 900 }}>
            Pinjam Sekarang →
          </Link>
        </div>

        {/* ============ 2. HEADER SUPER MODERN - KACA + GRADASI ============ */}
        <header
          style={{
            background: "linear-gradient(135deg,#120826 0%,#2E1065 40%,#6D28D9 70%,#DB2777 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {/* LOGO 3D */}
            <Link
              href="/"
              prefetch={true}
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: "linear-gradient(135deg,#FBBF24,#F472B6,#A78BFA)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  boxShadow: "0 8px 24px rgba(236,72,153,0.5)",
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                🧪
              </span>
              <span>
                <b style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1, display: "block" }}>
                  Pinjam<span style={{ background: "linear-gradient(90deg,#FBBF24,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Lab</span>
                </b>
                <span style={{ fontSize: 10, color: "#DDD6FE", fontWeight: 700, letterSpacing: 1.2 }}>
                  PINJAM RUANG & LAB
                </span>
              </span>
              <span
                style={{
                  background: "#22C55E",
                  color: "white",
                  fontSize: 10,
                  fontWeight: 900,
                  padding: "4px 8px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                ● ONLINE
              </span>
            </Link>

            {/* NAVIGASI - CUMA INI YANG GUE UBAH! DARI <Link> JADI <NavLink>! */}
            <nav style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
              <NavLink href="/">🏠 Beranda</NavLink>
              <NavLink href="/ruang">🏫 Ruang</NavLink>
              <NavLink href="/peminjaman">📅 Jadwal</NavLink>
              <NavLink href="/cek">🔍 Cek Status</NavLink>
              <Link
                href="/pinjam"
                prefetch={true}
                style={{
                  background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: 13,
                  textDecoration: "none",
                  boxShadow: "0 8px 22px rgba(236,72,153,0.45)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                📝 Pinjam →
              </Link>
              <Link
                href="/admin"
                prefetch={true}
                style={{
                  background: "white",
                  color: "#4C1D95",
                  padding: "10px 16px",
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: 13,
                  textDecoration: "none",
                  boxShadow: "0 8px 22px rgba(255,255,255,0.25)",
                  whiteSpace: "nowrap",
                }}
              >
                🎛 Admin
              </Link>
            </nav>
          </div>

          {/* NAV KEDUA - BAWAH HEADER BIAR LEBIH RAPI + LENGKAP */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                maxWidth: 1180,
                margin: "0 auto",
                padding: "8px 18px",
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                alignItems: "center",
                fontSize: 12,
                color: "#DDD6FE",
              }}
            >
              <span style={{ fontWeight: 800, color: "white" }}>⚡ Cepat:</span>
              <Link href="/ruang?jenis=lab" prefetch={true} style={{ color: "#FBCFE8", textDecoration: "none", fontWeight: 700 }}>🔬 Lab</Link>
              <span>•</span>
              <Link href="/ruang?jenis=kelas" prefetch={true} style={{ color: "#BFDBFE", textDecoration: "none", fontWeight: 700 }}>📚 Kelas</Link>
              <span>•</span>
              <Link href="/ruang?jenis=aula" prefetch={true} style={{ color: "#FDE68A", textDecoration: "none", fontWeight: 700 }}>🎤 Aula</Link>
              <span>•</span>
              <Link href="/peminjaman" prefetch={true} style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>📅 Jadwal Disetujui</Link>
              <span style={{ marginLeft: "auto", background: "rgba(255,255,255,0.15)", padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", fontWeight: 700, color: "white" }}>
                🕐 Jam Pinjam: 07:00 - 17:00 • Maks 3 Jam
              </span>
            </div>
          </div>
        </header>

        {/* ============ 3. ISI HALAMAN ============ */}
        <main
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "26px 16px 20px",
            minHeight: "70vh",
          }}
        >
          {children}
        </main>

        {/* ============ 4. FOOTER SUPER LENGKAP - 4 KOLOM! ============ */}
        <footer
          style={{
            background: "linear-gradient(180deg,#1E103A,#0A031A)",
            borderTop: "1px solid #4C1D95",
            marginTop: 30,
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "36px 18px 18px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 24,
            }}
          >
            {/* KOLOM 1 - LOGO + DESKRIPSI */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#FBBF24,#F472B6,#A78BFA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🧪</span>
                <b style={{ fontSize: 20, color: "white" }}>PinjamLab</b>
              </div>
              <p style={{ color: "#C4B5FD", fontSize: 13, lineHeight: 1.7 }}>
                Aplikasi Peminjaman Ruang & Laboratorium. Pinjam dalam 30 detik, cek status online, tanpa buku catatan lagi!
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {["📸", "🎵", "▶", "💬"].map((e, i) => (
                  <span key={i} style={{ width: 36, height: 36, borderRadius: 999, background: "#2E1065", border: "1px solid #7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>{e}</span>
                ))}
              </div>
            </div>

            {/* KOLOM 2 - MENU CEPAT */}
            <div>
              <b style={{ color: "white", fontSize: 14 }}>⚡ MENU CEPAT</b>
              <div style={{ display: "grid", gap: 8, marginTop: 12, fontSize: 13 }}>
                <Link href="/" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🏠 Beranda</Link>
                <Link href="/ruang" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🏫 Daftar Ruang</Link>
                <Link href="/pinjam" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>📝 Ajukan Peminjaman</Link>
                <Link href="/peminjaman" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>📅 Jadwal Publik</Link>
                <Link href="/cek" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🔍 Cek Status</Link>
              </div>
            </div>

            {/* KOLOM 3 - RUANG */}
            <div>
              <b style={{ color: "white", fontSize: 14 }}>🏫 RUANG</b>
              <div style={{ display: "grid", gap: 8, marginTop: 12, fontSize: 13 }}>
                <Link href="/ruang?jenis=lab" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🔬 Lab Komputer & IPA</Link>
                <Link href="/ruang?jenis=kelas" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>📚 Kelas</Link>
                <Link href="/ruang?jenis=aula" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🎤 Aula Utama</Link>
                <Link href="/admin/ruang" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🎛 Kelola Ruang (Admin)</Link>
              </div>
            </div>

            {/* KOLOM 4 - ATURAN PINJAM */}
            <div style={{ background: "linear-gradient(135deg,#2E1065,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 18, padding: 16 }}>
              <b style={{ color: "white", fontSize: 14 }}>📋 ATURAN PINJAM</b>
              <ul style={{ color: "#DDD6FE", fontSize: 12, lineHeight: 1.8, paddingLeft: 16, margin: "10px 0 0" }}>
                <li>🕐 Jam 07:00 - 17:00</li>
                <li>⏳ Durasi maks 3 jam</li>
                <li>📅 Maks 60 hari ke depan</li>
                <li>🚫 Bukan Sabtu / Minggu</li>
                <li>👥 Gak boleh melebihi kapasitas</li>
                <li>⚠ Gak boleh bentrok yang disetujui</li>
              </ul>
              <Link href="/pinjam" prefetch={true} style={{ display: "block", textAlign: "center", marginTop: 12, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "10px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>
                Pinjam Sekarang →
              </Link>
            </div>
          </div>

          {/* BAWAH FOOTER */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 18px", textAlign: "center" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "center", fontSize: 12, color: "#A78BFA" }}>
              <span>© 2026 <b style={{ color: "white" }}>PinjamLab</b> • Pinjam Ruang & Lab • Dibuat untuk Final Project Junior Web Developer 🏆</span>
              <span style={{ display: "flex", gap: 10 }}>
                <Link href="/login" prefetch={true} style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>🔑 Login Admin</Link>
                <span>•</span>
                <Link href="/admin" prefetch={true} style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>🎛 Dashboard</Link>
                <span>•</span>
                <span>💜 Dibuat dengan Next.js + Supabase</span>
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}