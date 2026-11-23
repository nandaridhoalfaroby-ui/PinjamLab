// app/page.tsx - Beranda PinjamLab
// Colorful, anti-white, sangat modern, sangat memukau, tata letak sangat rapi!

import { supabasePublik } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Beranda() {
  const db = supabasePublik();
  const { data: ruang } = await db
    .from("ruang")
    .select("*")
    .eq("aktif", true)
    .limit(6);
  const list = ruang || [];

  return (
    <div>
      {/* HERO - UNGU PINK KUNING GRADASI! */}
      <div
        style={{
          background: "linear-gradient(135deg,#1E103A,#4C1D95,#7C3AED,#EC4899)",
          borderRadius: 28,
          padding: 36,
          border: "1px solid #7C3AED",
          boxShadow: "0 20px 60px rgba(124,58,237,0.4)",
        }}
      >
        <span
          style={{
            background: "linear-gradient(90deg,#F59E0B,#EC4899)",
            color: "white",
            fontSize: 11,
            fontWeight: 900,
            padding: "6px 12px",
            borderRadius: 999,
            letterSpacing: 1,
          }}
        >
          🧪 PINJAMLAB • PINJAM RUANG & LAB
        </span>
        <h1
          style={{
            fontSize: 46,
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "16px 0 0",
            color: "white",
          }}
        >
          Pinjam Ruang,
          <br />
          <span
            style={{
              background: "linear-gradient(90deg,#FBBF24,#F472B6,#A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tanpa Ribet!
          </span>
        </h1>
        <p style={{ color: "#DDD6FE", fontSize: 16, maxWidth: 600 }}>
          Cek ruang yang tersedia, ajukan peminjaman, cek statusnya. Semua
          online, gak perlu catat di buku lagi! Cepat, rapi, dan memukau!
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
          <Link
            href="/pinjam"
            style={{
              background: "linear-gradient(90deg,#F59E0B,#EC4899)",
              color: "white",
              padding: "13px 24px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(236,72,153,0.4)",
            }}
          >
            📝 Pinjam Sekarang →
          </Link>
          <Link
            href="/ruang"
            style={{
              background: "#120826",
              color: "white",
              padding: "13px 24px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              border: "1px solid #A78BFA",
            }}
          >
            🏫 Lihat Ruang
          </Link>
          <Link
            href="/cek"
            style={{
              background: "white",
              color: "#4C1D95",
              padding: "13px 24px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            🔍 Cek Status
          </Link>
        </div>
      </div>

      {/* STATISTIK KECIL BIAR KELIATAN JUARA DUNIA */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: 12,
          marginTop: 18,
        }}
      >
        {[
          ["🏫", `${list.length} Ruang`, "Siap Dipinjam"],
          ["⚡", "Online 100%", "Tanpa Buku Catatan"],
          ["🛡", "Aman", "RLS Supabase"],
        ].map(([icon, judul, sub]) => (
          <div
            key={judul}
            style={{
              background: "#1E103A",
              border: "1px solid #4C1D95",
              borderRadius: 18,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24 }}>{icon}</div>
            <b style={{ color: "white" }}>{judul}</b>
            <div style={{ color: "#C4B5FD", fontSize: 12 }}>{sub}</div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 28, color: "white" }}>
        Ruang Tersedia ({list.length})
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          gap: 14,
          marginTop: 12,
        }}
      >
        {list.length === 0 ? (
          <div
            style={{
              background: "#1E103A",
              border: "1px solid #4C1D95",
              borderRadius: 20,
              padding: 24,
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#C4B5FD",
            }}
          >
            Belum ada ruang aktif. Cek Supabase kamu, udah di-RUN SQL-nya belum?
          </div>
        ) : (
          list.map((r: any) => (
            <Link
              key={r.id}
              href={`/ruang/${r.id}`}
              style={{
                textDecoration: "none",
                color: "white",
                background: "linear-gradient(135deg,#1E103A,#2E1065)",
                border: "1px solid #4C1D95",
                borderRadius: 22,
                padding: 18,
                display: "block",
              }}
            >
              <span
                style={{
                  background:
                    r.jenis === "lab"
                      ? "#FBCFE8"
                      : r.jenis === "kelas"
                      ? "#BFDBFE"
                      : "#FDE68A",
                  color: "#120826",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {r.jenis.toUpperCase()}
              </span>
              <b style={{ display: "block", fontSize: 19, marginTop: 10 }}>{r.nama}</b>
              <div style={{ color: "#C4B5FD", fontSize: 13 }}>
                📍 {r.lokasi} • 👥 Kapasitas {r.kapasitas} orang
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: 13,
                }}
              >
                Lihat Jadwal →
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}