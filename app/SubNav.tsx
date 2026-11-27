// app/SubNav.tsx - SUBNAV = NAMA + GAYA SAMA PERSIS KAYAK NAVBAR!
// Pakai komponen NavLink yang SAMA kayak Navbar atas!
// Jadi aktifnya, warnanya, bentuknya, namanya 100% SAMA!

"use client";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NavLink from "./NavLink"; // 👈 PAKAI NAVLINK YANG SAMA KAYAK NAVBAR!

function SubNavIsi() {
  const pathname = usePathname();
  const search = useSearchParams();
  const jenis = (search.get("jenis") || "").toLowerCase();

  // 👈 DI BERANDA + ADMIN + LOGIN, SUBNAV HILANG!
  if (pathname === "/" || pathname.startsWith("/admin") || pathname.startsWith("/login")) return null;
  if (!["/ruang", "/peminjaman", "/cek", "/pinjam"].some((p) => pathname === p || pathname.startsWith(p + "/"))) return null;

  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.18)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "8px 18px", display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center", boxSizing: "border-box" }}>
        <span style={{ fontWeight: 900, color: "white", fontSize: 12, whiteSpace: "nowrap" }}>⚡ Cepat:</span>

        {/* 👈 INI NAMANYA UDAH SAMA PERSIS KAYAK NAVBAR! Pake NavLink yang sama! */}
        <NavLink href="/ruang">🏫 Ruang</NavLink>
        <NavLink href="/peminjaman">📅 Jadwal</NavLink>
        <NavLink href="/cek">🔍 Cek Status</NavLink>
        <NavLink href="/pinjam">📝 Pinjam</NavLink>

        {/* 👈 FILTER JENIS RUANG - Cuma muncul kalau lagi di /ruang! */}
        {/* Ini tetep Lab / Kelas / Aula, soalnya ini filter, bukan menu! */}
        {pathname === "/ruang" && (
          <>
            <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 900 }}>•</span>
            <NavLink href="/ruang?jenis=lab">🔬 Lab</NavLink>
            <NavLink href="/ruang?jenis=kelas">📚 Kelas</NavLink>
            <NavLink href="/ruang?jenis=aula">🎤 Aula</NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default function SubNav() {
  return (<Suspense fallback={null}><SubNavIsi /></Suspense>);
}