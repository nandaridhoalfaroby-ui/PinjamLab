// app/layout.tsx
import "./globals.css";
import Link from "next/link";
export const metadata = { title: "PinjamLab - Pinjam Ruang & Lab" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id"><body style={{ margin: 0, background: "#120826", color: "white", fontFamily: "system-ui" }}>
      <header style={{ background: "linear-gradient(90deg,#7C3AED,#EC4899,#F59E0B)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ color: "white", textDecoration: "none", fontWeight: 900, fontSize: 20 }}>🧪 PinjamLab</Link>
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[["/","🏠 Beranda"],["/ruang","🏫 Ruang"],["/pinjam","📝 Pinjam"],["/peminjaman","📅 Jadwal"],["/cek","🔍 Cek Status"],["/admin","🎛 Admin"]].map(([href, label]) => (
            <Link key={href} href={href} style={{ background: "#120826", color: "white", padding: "8px 14px", borderRadius: 999, fontWeight: 800, fontSize: 13, textDecoration: "none" }}>{label}</Link>
          ))}
        </nav>
      </header>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 60px" }}>{children}</main>
      <footer style={{ textAlign: "center", color: "#C4B5FD", padding: "20px", fontSize: 12 }}>PinjamLab • Pinjam Ruang & Lab • Dibuat untuk Final Project Junior Web Developer</footer>
    </body></html>
  );
}