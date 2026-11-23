// components/LoginForm.tsx - Login Admin - VERSI JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [sandi, setSandi] = useState("");
  const [lihat, setLihat] = useState(false);
  const [error, setError] = useState("");
  const [salah, setSalah] = useState(0);
  const [dari, setDari] = useState("/admin");
  const router = useRouter();

  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get("dari");
    if (d) setDari(d);
  }, []);

  function masuk() {
    if (!sandi.trim()) {
      setError("Kata sandi belum diisi! Isi dulu ya!");
      return;
    }
    if (sandi === "admin123") {
      document.cookie = "admin=ya; path=/; max-age=86400";
      localStorage.setItem("admin", "ya");
      router.push(dari);
      router.refresh();
    } else {
      const baru = salah + 1;
      setSalah(baru);
      setError(
        baru >= 3
          ? "Udah 3x salah! Coba ingat-ingat lagi, sandinya admin123! Atau tanya ke admin sekolah!"
          : "Kata sandi salah! Coba lagi ya! (Petunjuk: admin123)"
      );
      setSandi("");
    }
  }

  function isiDemo() {
    setSandi("admin123");
    setError("");
  }

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: 16,
        alignItems: "stretch",
      }}
    >
      {/* ============ KIRI - HERO ============ */}
      <div
        style={{
          background: "linear-gradient(135deg,#120826,#2E1065,#6D28D9,#DB2777,#F59E0B)",
          borderRadius: 28,
          padding: "32px 28px",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 20px 60px rgba(109,40,217,0.4)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -20, width: 160, height: 160, background: "radial-gradient(circle,#FBBF24,transparent 70%)", opacity: 0.6, borderRadius: "50%", filter: "blur(10px)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -20, width: 180, height: 180, background: "radial-gradient(circle,#22D3EE,transparent 70%)", opacity: 0.5, borderRadius: "50%", filter: "blur(12px)" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ background: "white", color: "#6D28D9", fontSize: 11, fontWeight: 900, padding: "6px 12px", borderRadius: 999 }}>🎛 AREA ADMIN</span>
            <span style={{ background: "rgba(0,0,0,0.3)", color: "white", fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)" }}>🛡️ HANYA ADMIN</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
            <span style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#FBBF24,#F472B6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: "1px solid rgba(255,255,255,0.4)" }}>🧪</span>
            <div>
              <b style={{ color: "white", fontSize: 22, display: "block", lineHeight: 1 }}>PinjamLab</b>
              <span style={{ color: "#DDD6FE", fontSize: 11, fontWeight: 700 }}>PINJAM RUANG & LAB</span>
            </div>
          </div>

          <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.1, margin: "18px 0 0", color: "white" }}>
            Selamat Datang
            <br />
            Kembali, <span style={{ background: "linear-gradient(90deg,#FDE68A,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Admin! 👋</span>
          </h1>
          <p style={{ color: "#DDD6FE", lineHeight: 1.6, maxWidth: 480 }}>
            Masuk untuk kelola ruang & peminjaman. Setujui, tolak, tambah ruang — semua dari 1 dashboard yang super colorful!
          </p>

          <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
            {[
              ["✅", "Setujui / Tolak Peminjaman", "1 klik langsung beres!"],
              ["🏫", "Kelola Ruang", "Tambah, aktifkan, nonaktifkan, hapus!"],
              ["📊", "Lihat Semua Permohonan", "Saring menunggu / disetujui / ditolak!"],
            ].map(([icon, judul, desc]) => (
              <div key={judul} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 16, padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div>
                  <b style={{ color: "white", fontSize: 13, display: "block" }}>{judul}</b>
                  <span style={{ color: "#DDD6FE", fontSize: 12 }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", color: "white", fontSize: 12, fontWeight: 700 }}>
          <span>⭐ 4.9 / 5</span><span>•</span><span>🛡️ Aman • RLS Supabase</span><span>•</span><span>⚡ Cepat</span>
        </div>
      </div>

      {/* ============ KANAN - FORM LOGIN ============ */}
      <div
        style={{
          background: "linear-gradient(135deg,#1E103A,#2E1065)",
          border: "1px solid #7C3AED",
          borderRadius: 28,
          padding: 28,
          boxShadow: "0 16px 50px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <span style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#F59E0B,#EC4899)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 30, boxShadow: "0 10px 30px rgba(236,72,153,0.4)", border: "1px solid rgba(255,255,255,0.4)" }}>🔑</span>
          <h2 style={{ color: "white", fontSize: 24, fontWeight: 900, margin: "14px 0 4px" }}>Masuk ke Admin</h2>
          <p style={{ color: "#C4B5FD", fontSize: 13, margin: 0 }}>Masukkan kata sandi admin untuk lanjut ke dashboard!</p>
        </div>

        <label style={{ fontWeight: 800, fontSize: 13, marginTop: 20, display: "block", color: "white" }}>🔑 KATA SANDI ADMIN *</label>
        <div style={{ position: "relative", marginTop: 8 }}>
          <input
            type={lihat ? "text" : "password"}
            value={sandi}
            onChange={(e) => { setSandi(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && masuk()}
            placeholder="••••••••"
            autoFocus
            style={{
              width: "100%",
              padding: "14px 48px 14px 16px",
              borderRadius: 999,
              border: error ? "1px solid #EF4444" : "1px solid #7C3AED",
              background: "#120826",
              color: "white",
              outline: "none",
              fontSize: 15,
              boxSizing: "border-box",
            }}
          />
          <button
            type="button"
            onClick={() => setLihat(!lihat)}
            style={{ position: "absolute", right: 6, top: 6, background: "#2E1065", border: "1px solid #7C3AED", color: "white", borderRadius: 999, padding: "7px 12px", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
          >
            {lihat ? "🙈 Sembunyi" : "👁️ Lihat"}
          </button>
        </div>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.5)", color: "#FCA5A5", padding: "12px 14px", borderRadius: 14, fontWeight: 700, fontSize: 13, marginTop: 12 }}>
            ⚠ {error}
          </div>
        )}

        {salah > 0 && !error.includes("3x") && (
          <p style={{ color: "#FBBF24", fontSize: 12, fontWeight: 700 }}>Udah {salah}x salah! Coba klik tombol demo di bawah!</p>
        )}

        <button
          onClick={masuk}
          style={{ width: "100%", marginTop: 14, background: "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6)", color: "white", border: "none", borderRadius: 999, padding: "14px", fontWeight: 900, cursor: "pointer", fontSize: 15, boxShadow: "0 10px 30px rgba(236,72,153,0.4)" }}
        >
          🔓 Masuk ke Admin →
        </button>

        <button
          type="button"
          onClick={isiDemo}
          style={{ width: "100%", marginTop: 10, background: "white", color: "#4C1D95", border: "none", borderRadius: 999, padding: "12px", fontWeight: 900, cursor: "pointer", fontSize: 13 }}
        >
          ✨ Isi Sandi Demo (admin123)
        </button>

        <div style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.4)", borderRadius: 14, padding: "12px 14px", marginTop: 14, color: "#A5F3FC", fontSize: 12, lineHeight: 1.6 }}>
          💡 <b style={{ color: "white" }}>Buat Demo / Presentasi:</b> Klik tombol <b style={{ color: "white" }}>“Isi Sandi Demo”</b> di atas, terus klik <b style={{ color: "white" }}>Masuk</b>! Sandinya <b style={{ color: "white" }}>admin123</b>!
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <Link href="/" style={{ flex: 1, textAlign: "center", background: "#120826", border: "1px solid #7C3AED", color: "white", padding: "11px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>🏠 Beranda</Link>
          <Link href="/ruang" style={{ flex: 1, textAlign: "center", background: "#120826", border: "1px solid #7C3AED", color: "white", padding: "11px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>🏫 Ruang</Link>
          <Link href="/cek" style={{ flex: 1, textAlign: "center", background: "#120826", border: "1px solid #7C3AED", color: "white", padding: "11px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>🔍 Cek</Link>
        </div>

        <p style={{ textAlign: "center", color: "#A78BFA", fontSize: 11, marginTop: 14 }}>
          Bukan admin? <Link href="/pinjam" style={{ color: "white", fontWeight: 800 }}>Pinjam ruang aja di sini →</Link>
        </p>
      </div>
    </div>
  );
}