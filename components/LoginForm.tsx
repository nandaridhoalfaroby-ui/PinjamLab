// components/LoginForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginForm() {
  const [sandi, setSandi] = useState(""); const [error, setError] = useState(""); const [dari, setDari] = useState("/admin");
  const router = useRouter();
  useEffect(() => { const d = new URLSearchParams(window.location.search).get("dari"); if (d) setDari(d); }, []);
  function masuk() {
    if (sandi === "admin123") { document.cookie = "admin=ya; path=/; max-age=86400"; localStorage.setItem("admin", "ya"); router.push(dari); router.refresh(); }
    else setError("Kata sandi salah! Coba lagi.");
  }
  return (
    <div style={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "linear-gradient(135deg,#1E103A,#4C1D95)", border: "1px solid #7C3AED", borderRadius: 24, padding: 28, width: "100%", maxWidth: 440 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>Selamat Datang Kembali, Admin 👋</h1>
        <p style={{ color: "#C4B5FD" }}>Masuk untuk kelola ruang & peminjaman</p>
        <label style={{ fontWeight: 800, fontSize: 13 }}>🔑 KATA SANDI ADMIN *</label>
        <input type="password" value={sandi} onChange={(e) => setSandi(e.target.value)} onKeyDown={(e) => e.key === "Enter" && masuk()} placeholder="••••••••" style={{ width: "100%", padding: 13, borderRadius: 999, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none", marginTop: 8 }} />
        {error && <p style={{ color: "#FCA5A5", fontWeight: 700 }}>⚠ {error}</p>}
        <button onClick={masuk} style={{ width: "100%", marginTop: 14, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", border: "none", borderRadius: 999, padding: "13px", fontWeight: 900, cursor: "pointer" }}>🔓 Masuk ke Admin →</button>
        <p style={{ textAlign: "center", color: "#C4B5FD", fontSize: 12 }}>Coba sandi: <b style={{ color: "white" }}>admin123</b> • <Link href="/" style={{ color: "white" }}>Balik ke Beranda</Link></p>
      </div>
    </div>
  );
}