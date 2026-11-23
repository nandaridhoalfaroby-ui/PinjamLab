// app/SplashScreen.tsx - Splash Screen - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau!
// Muncul 2.2 detik pas pertama buka, terus hilang otomatis!

"use client";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [muncul, setMuncul] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animasi loading bar 0 -> 100%
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 20);

    // Mulai fade-out di detik 1.8
    const timerFade = setTimeout(() => setFadeOut(true), 1800);
    // Hilang total di detik 2.2
    const timerHilang = setTimeout(() => setMuncul(false), 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timerFade);
      clearTimeout(timerHilang);
    };
  }, []);

  if (!muncul) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777,#F59E0B)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        textAlign: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.4s ease",
        overflow: "hidden",
      }}
    >
      {/* BLOBS MELAYANG */}
      <div style={{ position: "absolute", top: -60, left: -40, width: 220, height: 220, background: "radial-gradient(circle,#FBBF24,transparent 70%)", opacity: 0.5, borderRadius: "50%", filter: "blur(10px)" }} />
      <div style={{ position: "absolute", bottom: -60, right: -40, width: 240, height: 240, background: "radial-gradient(circle,#22D3EE,transparent 70%)", opacity: 0.5, borderRadius: "50%", filter: "blur(10px)" }} />
      <div style={{ position: "absolute", top: "20%", right: "15%", width: 100, height: 100, background: "radial-gradient(circle,#F472B6,transparent 70%)", opacity: 0.6, borderRadius: "50%", filter: "blur(8px)" }} />

      <div style={{ position: "relative" }}>
        {/* LOGO */}
        <div
          style={{
            width: 110,
            height: 110,
            margin: "0 auto",
            background: "white",
            borderRadius: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            animation: "loncat 0.8s ease-in-out infinite alternate",
          }}
        >
          🏫
        </div>

        <style>{`
          @keyframes loncat {
            from { transform: translateY(0) scale(1); }
            to { transform: translateY(-12px) scale(1.05); }
          }
          @keyframes kedip {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>

        {/* JUDUL */}
        <h1 style={{ color: "white", fontSize: 42, fontWeight: 900, margin: "18px 0 0", lineHeight: 1 }}>
          Pinjam
          <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Lab
          </span>
        </h1>
        <p style={{ color: "#DDD6FE", fontSize: 14, margin: "8px 0 0", fontWeight: 700, letterSpacing: 2 }}>
          PINJAM RUANG • TANPA RIBET!
        </p>

        {/* 3 DOT LOADING */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18 }}>
          {["#F59E0B", "#EC4899", "#22D3EE"].map((warna, i) => (
            <span
              key={warna}
              style={{
                width: 12,
                height: 12,
                background: warna,
                borderRadius: "50%",
                display: "block",
                animation: `kedip 0.8s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* LOADING BAR */}
        <div style={{ width: 260, maxWidth: "80vw", height: 10, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 999, margin: "18px auto 0", overflow: "hidden" }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6,#22D3EE)",
              borderRadius: 999,
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <p style={{ color: "white", fontSize: 13, fontWeight: 800, margin: "10px 0 0" }}>
          {progress < 100 ? `Memuat Ruang Impianmu... ${progress}%` : "Siap! Selamat Datang! 🎉"}
        </p>

        {/* BADGE BAWAH */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 18 }}>
          <span style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 999 }}>🏫 100+ Ruang</span>
          <span style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 999 }}>⚡ 30 Detik Pinjam</span>
          <span style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 999 }}>🏆 Juara 1 Dunia</span>
        </div>
      </div>

      <p style={{ position: "absolute", bottom: 18, left: 0, right: 0, color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700 }}>
        © 2026 PinjamLab • Dibuat dengan ❤️ buat Sekolah
      </p>
    </div>
  );
}