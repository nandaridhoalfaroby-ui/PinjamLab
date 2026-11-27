// app/ThemeToggle.tsx - Tombol 3 MODE!
// Default = tetap! Terang = Background PUTIH, Card BIRU!
// Gelap = Background HITAM, Card HIJAU TUA!

"use client";
import { useEffect, useState } from "react";

type Mode = "default" | "terang" | "gelap";

const MODE_BERIKUTNYA: Record<Mode, Mode> = { default: "terang", terang: "gelap", gelap: "default" };
const LABEL: Record<Mode, string> = { default: "🎨 Default", terang: "☀️ Terang", gelap: "🌙 Gelap" };

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("default");
  useEffect(() => {
    const simpan = localStorage.getItem("pinjamlab-tema") as Mode | null;
    if (simpan === "terang" || simpan === "gelap" || simpan === "default") { setMode(simpan); document.documentElement.dataset.tema = simpan; }
    else document.documentElement.dataset.tema = "default";
  }, []);
  const ganti = () => {
    const baru = MODE_BERIKUTNYA[mode];
    setMode(baru); document.documentElement.dataset.tema = baru; localStorage.setItem("pinjamlab-tema", baru);
  };
  return (
    <button onClick={ganti} title={`Mode: ${LABEL[mode]} - Klik untuk ganti!`} style={{
      background: mode === "default" ? "linear-gradient(90deg,#F59E0B,#EC4899)" : mode === "terang" ? "linear-gradient(90deg,#2563EB,#60A5FA)" : "linear-gradient(90deg,#052E16,#166534)",
      color: "white", padding: "10px 16px", borderRadius: 999, fontWeight: 900, fontSize: 13,
      border: mode === "gelap" ? "1px solid #14532D" : "1px solid rgba(255,255,255,0.4)",
      cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
    }}>
      {LABEL[mode]} 🔄
    </button>
  );
}