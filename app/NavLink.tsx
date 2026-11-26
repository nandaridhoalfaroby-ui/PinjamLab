// app/NavLink.tsx - VERSI GELAP! BUKAN PASTEL!

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const aktif = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      prefetch={true}
      style={{
        background: aktif
          ? "linear-gradient(90deg,#F59E0B,#EC4899)" // 👈 AKTIF: oranye-pink!
          : "rgba(18,8,38,0.85)", // 👈 GAK AKTIF: kaca gelap!
        color: "white",
        padding: "9px 14px",
        borderRadius: 999,
        fontWeight: 900,
        fontSize: 13,
        textDecoration: "none",
        border: aktif ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.18)",
        display: "flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
        backdropFilter: "blur(10px)",
        transform: aktif ? "translateY(-2px)" : "translateY(0)",
        boxShadow: aktif ? "0 8px 22px rgba(236,72,153,0.55)" : "none",
        transition: "all 0.15s ease",
      }}
    >
      {aktif && (
        <span style={{ width: 8, height: 8, background: "white", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
      )}
      {children}
    </Link>
  );
}