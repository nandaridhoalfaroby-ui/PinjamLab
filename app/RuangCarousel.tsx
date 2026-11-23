// app/RuangCarousel.tsx - Carousel Ruang Otomatis - VERSI JUARA 1 DUNIA!
// Geser otomatis kayak Netflix! Bisa swipe, bisa klik panah, pause pas di-hover!

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function RuangCarousel({ list }: { list: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);
  const [index, setIndex] = useState(0);

  // 👈 OTOMATIS GESER TIAP 2.5 DETIK!
  useEffect(() => {
    if (list.length <= 1) return;
    const timer = setInterval(() => {
      if (pause) return;
      const el = ref.current;
      if (!el) return;

      // Kalau udah mentok kanan, balik ke kiri!
      const mentok = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      if (mentok) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        setIndex(0);
      } else {
        el.scrollBy({ left: 300, behavior: "smooth" });
        setIndex((i) => Math.min(i + 1, list.length - 1));
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [pause, list.length]);

  const gambarRuang = (jenisR: string, nama: string) => {
    const n = String(nama || "").toLowerCase();
    if (n.includes("komputer")) return "/lab-komputer.jpg";
    if (n.includes("ipa")) return "/lab-ipa.jpg";
    if (n.includes("bahasa")) return "/lab-bahasa.jpg";
    if (jenisR === "lab") return "/lab-komputer.jpg";
    if (jenisR === "kelas") return "/kelas.jpg";
    if (jenisR === "aula") return "/aula.jpg";
    return "/kelas.jpg";
  };

  const iconRuang = (jenisR: string, nama: string) => {
    const n = String(nama || "").toLowerCase();
    if (n.includes("komputer")) return "💻";
    if (n.includes("ipa")) return "🧪";
    if (n.includes("bahasa")) return "🗣";
    if (jenisR === "lab") return "🔬";
    if (jenisR === "kelas") return "📚";
    if (jenisR === "aula") return "🎤";
    return "🏫";
  };

  const warnaJenis: any = {
    lab: "linear-gradient(135deg,#F472B6,#A855F7)",
    kelas: "linear-gradient(135deg,#60A5FA,#22D3EE)",
    aula: "linear-gradient(135deg,#FBBF24,#F97316)",
  };

  const geser = (arah: number) => {
    ref.current?.scrollBy({ left: arah * 300, behavior: "smooth" });
  };

  if (list.length === 0) {
    return (
      <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>😢</div>
        <b style={{ color: "white" }}>Belum ada ruang aktif!</b>
        <p style={{ color: "#C4B5FD", fontSize: 13 }}>Coba cek di Admin!</p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER + PANAH */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <div>
          <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999 }}>⭐ RUANG TERSEDIA</span>
          <h2 style={{ color: "white", fontSize: 24, fontWeight: 900, margin: "10px 0 0" }}>
            Pilih Ruang Favoritmu! ({list.length})
          </h2>
          <p style={{ color: "#C4B5FD", fontSize: 13, margin: "4px 0 0" }}>Geser otomatis! Klik kartu-nya buat liat jadwal + pinjam langsung!</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/ruang" style={{ background: "#1E103A", border: "1px solid #7C3AED", color: "white", padding: "10px 16px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>Semua Ruang →</Link>
          <button onClick={() => geser(-1)} style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(0,0,0,0.35)", color: "white", fontSize: 18, cursor: "pointer", fontWeight: 900 }}>‹</button>
          <button onClick={() => geser(1)} style={{ width: 42, height: 42, borderRadius: "50%", border: "none", background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", fontSize: 18, cursor: "pointer", fontWeight: 900, boxShadow: "0 8px 22px rgba(236,72,153,0.45)" }}>›</button>
        </div>
      </div>

      {/* 👈 CAROUSEL-NYA! */}
      <div
        ref={ref}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
        onTouchStart={() => setPause(true)}
        onTouchEnd={() => setPause(false)}
        style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 8,
          scrollbarWidth: "none",
        }}
      >
        {list.map((r: any) => (
          <div
            key={r.id}
            style={{
              minWidth: 280,
              maxWidth: 280,
              background: "linear-gradient(180deg,#2E1065,#1E103A)",
              border: "1px solid #4C1D95",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
          >
            {/* FOTO */}
            <div style={{ position: "relative" }}>
              <img src={gambarRuang(r.jenis, r.nama)} alt={r.nama} style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(18,8,38,0.85))", display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "10px 12px" }}>
                <span style={{ fontSize: 24, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.4)", width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {iconRuang(r.jenis, r.nama)}
                </span>
                <span style={{ background: warnaJenis[r.jenis] || warnaJenis.kelas, color: "white", fontSize: 10, fontWeight: 900, padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)" }}>
                  {String(r.jenis || "").toUpperCase()} • ✅ AKTIF
                </span>
              </div>
            </div>

            <div style={{ padding: 16 }}>
              <b style={{ color: "white", fontSize: 17, display: "block", lineHeight: 1.2 }}>{r.nama}</b>
              <div style={{ color: "#C4B5FD", fontSize: 12, marginTop: 6, lineHeight: 1.7 }}>
                📍 {r.lokasi}
                <br />
                👥 Kapasitas <b style={{ color: "white" }}>{r.kapasitas} orang</b> • 🕐 07:00 - 17:00
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 10, fontWeight: 800, padding: "4px 8px", borderRadius: 999 }}>Maks 3 Jam</span>
                <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 10, fontWeight: 800, padding: "4px 8px", borderRadius: 999 }}>Maks 60 Hari</span>
                <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 10, fontWeight: 800, padding: "4px 8px", borderRadius: 999 }}>Bukan Sabtu/Minggu</span>
              </div>
              <Link href={`/ruang/${r.id}`} style={{ display: "block", textAlign: "center", marginTop: 12, background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", padding: "11px", borderRadius: 999, fontWeight: 900, textDecoration: "none", fontSize: 13 }}>
                Lihat Jadwal & Pinjam →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* DOTS + STATUS */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 10 }}>
        <span style={{ color: pause ? "#FBBF24" : "#A78BFA", fontSize: 12, fontWeight: 800 }}>
          {pause ? "⏸ Dijeda - Lagi Dilihat!" : "▶ Geser Otomatis..."}
        </span>
        <div style={{ display: "flex", gap: 5 }}>
          {list.map((_: any, i: number) => (
            <span key={i} style={{ width: i === index ? 22 : 8, height: 8, borderRadius: 999, background: i === index ? "linear-gradient(90deg,#F59E0B,#EC4899)" : "rgba(255,255,255,0.25)", display: "block", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}