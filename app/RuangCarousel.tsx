// app/RuangCarousel.tsx - Carousel Otomatis + Gambar EventKu - VERSI JUARA 1 DUNIA!
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function RuangCarousel({ list }: { list: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;
    const timer = setInterval(() => {
      if (pause) return;
      const el = ref.current;
      if (!el) return;
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

  const iconRuang = (jenis: string, nama: string) => {
    if (nama.toLowerCase().includes("komputer")) return "💻";
    if (nama.toLowerCase().includes("ipa")) return "🧪";
    if (nama.toLowerCase().includes("bahasa")) return "🗣";
    if (jenis === "lab") return "🔬";
    if (jenis === "kelas") return "📚";
    if (jenis === "aula") return "🎤";
    return "🏫";
  };

  const warnaJenis: any = {
    lab: "linear-gradient(135deg,#F472B6,#A855F7)",
    kelas: "linear-gradient(135deg,#60A5FA,#22D3EE)",
    aula: "linear-gradient(135deg,#FBBF24,#F97316)",
  };

  // 👈 INI DIA! KAYAK EVENTKU! LANGSUNG DARI UNSPLASH!
  const gambarRuang = (jenisR: string, nama: string) => {
    const n = nama.toLowerCase();
    if (n.includes("komputer")) return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop";
    if (n.includes("ipa")) return "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop";
    if (n.includes("bahasa")) return "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop";
    if (jenisR === "lab") return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop";
    if (jenisR === "kelas") return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop";
    if (jenisR === "aula") return "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop";
  };

  const geser = (arah: number) => {
    ref.current?.scrollBy({ left: arah * 300, behavior: "smooth" });
  };

  if (list.length === 0) {
    return (
      <div style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>😢</div>
        <b style={{ color: "white" }}>Belum ada ruang aktif</b>
        <p style={{ color: "#C4B5FD", fontSize: 13 }}>Cek Supabase kamu, udah di-RUN SQL-nya belum?</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 10 }}>
        <div>
          <span style={{ background: "linear-gradient(90deg,#22D3EE,#10B981)", color: "white", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>🏫 RUANG TERSEDIA</span>
          <h2 style={{ color: "white", fontSize: 30, fontWeight: 900, margin: "10px 0 0" }}>Pilih Ruang Favoritmu! ({list.length})</h2>
          <p style={{ color: "#C4B5FD", margin: "6px 0 0" }}>Geser otomatis! Klik kartu-nya buat liat jadwal + pinjam langsung!</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/ruang" style={{ background: "#1E103A", border: "1px solid #7C3AED", color: "white", padding: "10px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>Semua Ruang →</Link>
          <button onClick={() => geser(-1)} style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(0,0,0,0.35)", color: "white", fontSize: 18, cursor: "pointer", fontWeight: 900 }}>‹</button>
          <button onClick={() => geser(1)} style={{ width: 42, height: 42, borderRadius: "50%", border: "none", background: "linear-gradient(90deg,#F59E0B,#EC4899)", color: "white", fontSize: 18, cursor: "pointer", fontWeight: 900 }}>›</button>
        </div>
      </div>

      <div ref={ref} onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} onTouchStart={() => setPause(true)} onTouchEnd={() => setPause(false)} style={{ display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 8, marginTop: 16, scrollbarWidth: "none" }}>
        {list.map((r: any) => (
          <Link key={r.id} href={`/ruang/${r.id}`} style={{ minWidth: 280, maxWidth: 280, flexShrink: 0, scrollSnapAlign: "start", textDecoration: "none", color: "white", background: "linear-gradient(180deg,#2E1065,#1E103A)", border: "1px solid #4C1D95", borderRadius: 24, overflow: "hidden", display: "block", boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }}>
            <div style={{ position: "relative" }}>
              <img src={gambarRuang(r.jenis, r.nama)} alt={r.nama} style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(18,8,38,0.9))", display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "12px 14px" }}>
                <span style={{ fontSize: 26, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.4)", width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{iconRuang(r.jenis, r.nama)}</span>
                <span style={{ background: warnaJenis[r.jenis] || warnaJenis.kelas, color: "white", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)" }}>{r.jenis.toUpperCase()} • ✅ AKTIF</span>
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <b style={{ fontSize: 20, display: "block", lineHeight: 1.2 }}>{r.nama}</b>
              <div style={{ color: "#C4B5FD", fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
                📍 {r.lokasi}
                <br />
                👥 Kapasitas <b style={{ color: "white" }}>{r.kapasitas} orang</b> • 🕐 07:00 - 17:00
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Maks 3 Jam</span>
                <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Maks 60 Hari</span>
                <span style={{ background: "#120826", border: "1px solid #7C3AED", color: "#DDD6FE", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>Bukan Sabtu/Minggu</span>
              </div>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, background: "linear-gradient(90deg,#F59E0B,#EC4899)", padding: "11px 14px", borderRadius: 999, fontWeight: 900, fontSize: 13 }}>
                Lihat Jadwal & Pinjam <span>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 10 }}>
        <span style={{ color: pause ? "#FBBF24" : "#A78BFA", fontSize: 12, fontWeight: 800 }}>{pause ? "⏸ Dijeda - Lagi Dilihat!" : "▶ Geser Otomatis..."}</span>
        <div style={{ display: "flex", gap: 5 }}>
          {list.map((_: any, i: number) => (
            <span key={i} style={{ width: i === index ? 22 : 8, height: 8, borderRadius: 999, background: i === index ? "linear-gradient(90deg,#F59E0B,#EC4899)" : "rgba(255,255,255,0.25)", display: "block", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}