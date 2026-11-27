// app/layout.tsx - Layout PinjamLab - VERSI JUARA 1 DUNIA + TOMBOL 3 MODE!
// FIX GAMBAR ILANG: div[style*="background"] GAK BOLEH ditimpa gradasi!
// Soalnya div gambar pake background-image, ketimpa biru = foto ilang!
// FIX TERANG: Tulisan di luar card = BIRU TUA, di dalam card = PUTIH!
// URUTAN MODE: Default dulu -> Terang -> Gelap -> balik Default!

import "./globals.css";
import Link from "next/link";
import SplashScreen from "./SplashScreen";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import SubNav from "./SubNav";

export const metadata = {
  title: "PinjamLab - Pinjam Ruang & Lab Tanpa Ribet!",
  description: "Pinjam ruang & lab dalam 30 detik! Colorful, modern, memukau, rapi! Ada 3 mode: Default, Terang, Gelap!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("pinjamlab-tema");if(t!=="terang"&&t!=="gelap")t="default";document.documentElement.dataset.tema=t;}catch(e){document.documentElement.dataset.tema="default";}})();`,
          }}
        />
        <style>{`
          :root, [data-tema="default"] {
            --bg: #120826; --bg-2: #1E103A; --bg-3: #2E1065;
            --teks: #FFFFFF; --teks-redup: #DDD6FE; --teks-redup-2: #C4B5FD;
            --garis: #4C1D95; --kaca: rgba(255,255,255,0.08);
            --aksen: #EC4899; --aksen-2: #F59E0B;
          }

          /* ===== MODE 2: TERANG = Background PUTIH, Card BIRU! ===== */
          /* 👈 FIX GAMBAR: Cuma header/footer/section yang ditimpa biru! div[style*="background"] JANGAN! Biar background-image foto GAK ketimpa! */
          [data-tema="terang"] body { background: #FFFFFF !important; color: #1E3A8A !important; }
          [data-tema="terang"] main { background: #FFFFFF !important; color: #1E3A8A !important; }
          [data-tema="terang"] main h1, [data-tema="terang"] main h2, [data-tema="terang"] main h3,
          [data-tema="terang"] main p, [data-tema="terang"] main b, [data-tema="terang"] main li,
          [data-tema="terang"] main span, [data-tema="terang"] main div { color: #1E3A8A !important; }
          [data-tema="terang"] header,
          [data-tema="terang"] footer,
          [data-tema="terang"] section {
            background: linear-gradient(135deg,#1D4ED8 0%,#2563EB 45%,#60A5FA 100%) !important;
            border-color: #93C5FD !important;
            box-shadow: 0 10px 30px rgba(37,99,235,0.25) !important;
          }
          /* Tulisan di dalam header/footer/section/card yang background-nya GELAP: PUTIH! */
          [data-tema="terang"] header h1, [data-tema="terang"] header b, [data-tema="terang"] header span, [data-tema="terang"] header p,
          [data-tema="terang"] footer h1, [data-tema="terang"] footer b, [data-tema="terang"] footer p, [data-tema="terang"] footer li, [data-tema="terang"] footer span, [data-tema="terang"] footer div,
          [data-tema="terang"] section h1, [data-tema="terang"] section h2, [data-tema="terang"] section h3, [data-tema="terang"] section p, [data-tema="terang"] section b, [data-tema="terang"] section li, [data-tema="terang"] section span, [data-tema="terang"] section div,
          [data-tema="terang"] div[style*="background"] h1, [data-tema="terang"] div[style*="background"] h2, [data-tema="terang"] div[style*="background"] h3,
          [data-tema="terang"] div[style*="background"] p, [data-tema="terang"] div[style*="background"] b, [data-tema="terang"] div[style*="background"] li,
          [data-tema="terang"] div[style*="background"] span, [data-tema="terang"] div[style*="background"] div { color: #FFFFFF !important; }
          /* 👈 KECUALI div GAMBAR: teks di atas foto tetep PUTIH + ada shadow biar kebaca, tapi background-image-nya JANGAN ditimpa! */
          [data-tema="terang"] div[style*="background-image"] { background-color: transparent !important; }
          [data-tema="terang"] span[style*="background: white"], [data-tema="terang"] a[style*="background: white"], [data-tema="terang"] a[style*="background: rgb(255"], [data-tema="terang"] button[style*="background: white"] { background: #FFFFFF !important; color: #1D4ED8 !important; }
          [data-tema="terang"] span[style*="background: white"] *, [data-tema="terang"] a[style*="background: white"] * { color: #1D4ED8 !important; }
          [data-tema="terang"] span[style*="WebkitTextFillColor"], [data-tema="terang"] b span[style*="WebkitTextFillColor"] { -webkit-text-fill-color: transparent !important; color: transparent !important; }
          [data-tema="terang"] .teks-putih { color: #FFFFFF !important; }
          [data-tema="terang"] .bg-gelap { background: linear-gradient(135deg,#1D4ED8,#60A5FA) !important; border-color: #93C5FD !important; }

          /* ===== MODE 3: GELAP = Background HITAM, Card HIJAU TUA! ===== */
          /* 👈 SAMA: div[style*="background"] JANGAN ditimpa, biar foto GAK ilang! */
          [data-tema="gelap"] body { background: #000000 !important; color: #DCFCE7 !important; }
          [data-tema="gelap"] main { background: #000000 !important; }
          [data-tema="gelap"] header,
          [data-tema="gelap"] footer,
          [data-tema="gelap"] section {
            background: linear-gradient(135deg,#022C22 0%,#052E16 45%,#14532D 80%,#166534 100%) !important;
            border-color: #14532D !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
          }
          [data-tema="gelap"] main h1, [data-tema="gelap"] main h2, [data-tema="gelap"] main p, [data-tema="gelap"] main b, [data-tema="gelap"] main li, [data-tema="gelap"] main div { color: #DCFCE7 !important; }
          [data-tema="gelap"] header h1, [data-tema="gelap"] header b, [data-tema="gelap"] footer b { color: #DCFCE7 !important; }
          [data-tema="gelap"] div[style*="background-image"] { background-color: transparent !important; }
          [data-tema="gelap"] span[style*="background: white"],
          [data-tema="gelap"] span[style*="background:#FFFFFF"],
          [data-tema="gelap"] span[style*="background: rgb(255"],
          [data-tema="gelap"] a[style*="background: white"],
          [data-tema="gelap"] a[style*="background: rgb(255"],
          [data-tema="gelap"] button[style*="background: white"] { background: #FFFFFF !important; color: #052E16 !important; }
          [data-tema="gelap"] span[style*="background: #22C55E"], [data-tema="gelap"] span[style*="background:#22C55E"],
          [data-tema="gelap"] span[style*="background: #14532D"], [data-tema="gelap"] span[style*="background:#14532D"] { color: #FFFFFF !important; }
          [data-tema="gelap"] span[style*="WebkitTextFillColor"], [data-tema="gelap"] b span[style*="WebkitTextFillColor"] { -webkit-text-fill-color: transparent !important; color: transparent !important; }
          [data-tema="gelap"] main > div > h2, [data-tema="gelap"] main > div > p { color: #DCFCE7 !important; }
          [data-tema="gelap"] .teks-putih { color: #DCFCE7 !important; }
          [data-tema="gelap"] .bg-gelap { background: linear-gradient(135deg,#052E16,#14532D) !important; border-color: #14532D !important; }

          .kartu-hover { transition: transform 0.2s, box-shadow 0.2s; }
          .kartu-hover:hover { transform: translateY(-5px); box-shadow: 0 18px 40px rgba(109,40,217,0.25) !important; }
        `}</style>
      </head>
      <body style={{ margin: 0, background: "#120826", color: "white", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", minHeight: "100vh" }}>
        <SplashScreen />
        <div style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6,#22D3EE,#10B981)", color: "white", textAlign: "center", padding: "8px 12px", fontSize: 12, fontWeight: 800, letterSpacing: 0.3, position: "relative", zIndex: 60 }}>
          🎉 PINJAMLAB SUDAH ONLINE! &nbsp;•&nbsp; Pinjam Ruang Dalam 30 Detik! &nbsp;•&nbsp;{" "}
          <Link href="/pinjam" prefetch={true} style={{ color: "white", textDecoration: "underline", fontWeight: 900 }}>Pinjam Sekarang →</Link>
        </div>
        <header style={{ background: "linear-gradient(135deg,#120826 0%,#2E1065 40%,#6D28D9 70%,#DB2777 100%)", borderBottom: "1px solid rgba(255,255,255,0.2)", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <Link href="/" prefetch={true} style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg,#FBBF24,#F472B6,#A78BFA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 8px 24px rgba(236,72,153,0.5)", border: "1px solid rgba(255,255,255,0.4)" }}>🧪</span>
              <span>
                <b style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1, display: "block" }}>Pinjam<span style={{ background: "linear-gradient(90deg,#FBBF24,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Lab</span></b>
                <span style={{ fontSize: 10, color: "#DDD6FE", fontWeight: 700, letterSpacing: 1.2 }}>PINJAM RUANG & LAB</span>
              </span>
              <span style={{ background: "#22C55E", color: "white", fontSize: 10, fontWeight: 900, padding: "4px 8px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)" }}>● ONLINE</span>
            </Link>
            <nav style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
              <NavLink href="/">🏠 Beranda</NavLink>
              <NavLink href="/ruang">🏫 Ruang</NavLink>
              <NavLink href="/peminjaman">📅 Jadwal</NavLink>
              <NavLink href="/cek">🔍 Cek Status</NavLink>
              <Link href="/pinjam" prefetch={true} style={{ background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 900, fontSize: 13, textDecoration: "none", boxShadow: "0 8px 22px rgba(236,72,153,0.45)", border: "1px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>📝 Pinjam →</Link>
              <Link href="/admin" prefetch={true} style={{ background: "white", color: "#4C1D95", padding: "10px 16px", borderRadius: 999, fontWeight: 900, fontSize: 13, textDecoration: "none", boxShadow: "0 8px 22px rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>🎛 Admin</Link>
              <ThemeToggle />
            </nav>
          </div>
          <SubNav />
        </header>
        <main style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 16px 20px", minHeight: "70vh" }}>{children}</main>
        <footer style={{ background: "linear-gradient(180deg,#1E103A,#0A031A)", borderTop: "1px solid #4C1D95", marginTop: 30 }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "36px 18px 18px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#FBBF24,#F472B6,#A78BFA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🧪</span>
                <b style={{ fontSize: 20, color: "white" }}>PinjamLab</b>
              </div>
              <p style={{ color: "#C4B5FD", fontSize: 13, lineHeight: 1.7 }}>Aplikasi Peminjaman Ruang & Laboratorium. Pinjam dalam 30 detik, cek status online, tanpa buku catatan lagi! Ada mode Gelap & Terang!</p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {["📸", "🎵", "▶", "💬"].map((e, i) => (<span key={i} style={{ width: 36, height: 36, borderRadius: 999, background: "#2E1065", border: "1px solid #7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>{e}</span>))}
                <ThemeToggle />
              </div>
            </div>
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
            <div>
              <b style={{ color: "white", fontSize: 14 }}>🏫 RUANG</b>
              <div style={{ display: "grid", gap: 8, marginTop: 12, fontSize: 13 }}>
                <Link href="/ruang?jenis=lab" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🔬 Lab Komputer & IPA</Link>
                <Link href="/ruang?jenis=kelas" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>📚 Kelas</Link>
                <Link href="/ruang?jenis=aula" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🎤 Aula Utama</Link>
                <Link href="/admin/ruang" prefetch={true} style={{ color: "#C4B5FD", textDecoration: "none" }}>🎛 Kelola Ruang (Admin)</Link>
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg,#2E1065,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 18, padding: 16 }}>
              <b style={{ color: "white", fontSize: 14 }}>📋 ATURAN PINJAM</b>
              <ul style={{ color: "#DDD6FE", fontSize: 12, lineHeight: 1.8, paddingLeft: 16, margin: "10px 0 0" }}>
                <li>🕐 Jam 07:00 - 17:00</li><li>⏳ Durasi maks 3 jam</li><li>📅 Maks 60 hari ke depan</li><li>🚫 Bukan Sabtu / Minggu</li><li>👥 Gak boleh melebihi kapasitas</li><li>⚠ Gak boleh bentrok yang disetujui</li>
              </ul>
              <Link href="/pinjam" prefetch={true} style={{ display: "block", textAlign: "center", marginTop: 12, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "10px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>Pinjam Sekarang →</Link>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 18px", textAlign: "center" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "center", fontSize: 12, color: "#A78BFA" }}>
              <span>© 2026 <b style={{ color: "white" }}>PinjamLab</b> • Pinjam Ruang & Lab • Dibuat untuk Final Project Junior Web Developer 🏆</span>
              <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Link href="/login" prefetch={true} style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>🔑 Login Admin</Link><span>•</span>
                <Link href="/admin" prefetch={true} style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>🎛 Dashboard</Link><span>•</span>
                <span>💜 Dibuat dengan Next.js + Supabase</span>
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}