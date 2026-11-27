// app/ThemeToggle.tsx - Tombol Gelap / Terang PRO!
// Kesimpen di localStorage! Buka lagi besok tetep inget!

"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [tema, setTema] = useState<"gelap" | "terang">("gelap");
  const [udahSiap, setUdahSiap] = useState(false);

  useEffect(() => {
    // 👈 Baca tema yang kesimpen! Kalau belum ada, pake gelap (default PinjamLab)!
    const simpan = localStorage.getItem("pinjamlab-tema");
    const awal = simpan === "terang" ? "terang" : "gelap";
    setTema(awal);
    document.documentElement.dataset.tema = awal;
    setUdahSiap(true);
  }, []);

  const ganti = () => {
    const baru = tema === "gelap" ? "terang" : "gelap";
    setTema(baru);
    document.documentElement.dataset.tema = baru;
    localStorage.setItem("pinjamlab-tema", baru);
  };

  return (
    <button
      onClick={ganti}
      aria-label={tema === "gelap" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      title={tema === "gelap" ? "☀️ Ganti ke Terang" : "🌙 Ganti ke Gelap"}
      style={{
        width: 46,
        height: 46,
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.5)",
        background: tema === "gelap"
          ? "linear-gradient(135deg,#FBBF24,#F472B6)"
          : "linear-gradient(135deg,#312E81,#7C3AED)",
        color: "white",
        fontSize: 20,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 22px rgba(0,0,0,0.3)",
        transition: "transform 0.2s, background 0.3s",
        flexShrink: 0,
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1) rotate(12deg)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1) rotate(0deg)")}
    >
      {/* 👈 Kalau belum siap, tampilkan bulan dulu biar gak kedip! */}
      {!udahSiap ? "🌙" : tema === "gelap" ? "🌙" : "☀️"}
    </button>
  );
}