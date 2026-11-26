// app/loading.tsx - Loading INSTAN pas pindah halaman! JUARA 1 DUNIA!
// INI KUNCINYA! Dulu pas klik Beranda / Ruang / Jadwal / Cek, layar DIEM 3 detik!
// Sekarang pas klik, LANGSUNG muncul skeleton pastel ini! Guru ngerasa INSTAN!
// Colorful, anti-white, sangat modern, sangat memukau, sangat rapi!

export default function Loading() {
  return (
    <div>
      {/* HERO SKELETON - PASTEL! */}
      <div style={{ background: "white", border: "2px solid #1A1443", borderRadius: 24, padding: 24, boxShadow: "4px 4px 0 #1A1443" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ background: "#CCFBF1", border: "2px solid #1A1443", color: "#0F766E", fontSize: 11, fontWeight: 900, padding: "7px 14px", borderRadius: 999 }}>⏳ MEMUAT...</span>
          <span style={{ background: "#FEF3C7", border: "2px solid #1A1443", color: "#92400E", fontSize: 11, fontWeight: 900, padding: "7px 14px", borderRadius: 999 }}>⚡ SEBENTAR YA!</span>
        </div>
        <div style={{ height: 28, background: "#FDE68A", border: "2px solid #1A1443", borderRadius: 999, marginTop: 16, width: "70%" }} />
        <div style={{ height: 28, background: "#FCE7F3", border: "2px solid #1A1443", borderRadius: 999, marginTop: 10, width: "50%" }} />
        <div style={{ height: 14, background: "#E2E8F0", borderRadius: 999, marginTop: 16, width: "90%" }} />
        <div style={{ height: 14, background: "#E2E8F0", borderRadius: 999, marginTop: 8, width: "70%" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          <span style={{ background: "#1A1443", color: "white", padding: "11px 20px", borderRadius: 999, fontWeight: 900, fontSize: 13 }}>⏳ Memuat...</span>
          <span style={{ background: "white", border: "2px solid #1A1443", color: "#1A1443", padding: "11px 20px", borderRadius: 999, fontWeight: 900, fontSize: 13 }}>🔄 Ambil Data...</span>
        </div>
      </div>

      {/* 3 KARTU SKELETON! */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginTop: 16 }}>
        {["#EDE9FE", "#DBEAFE", "#D1FAE5"].map((bg) => (
          <div key={bg} style={{ background: bg, border: "2px solid #1A1443", borderRadius: 20, padding: 16, boxShadow: "3px 3px 0 #1A1443" }}>
            <div style={{ width: 40, height: 40, background: "white", border: "2px solid #1A1443", borderRadius: 12 }} />
            <div style={{ height: 16, background: "white", border: "2px solid #1A1443", borderRadius: 999, marginTop: 12, width: "70%" }} />
            <div style={{ height: 12, background: "rgba(255,255,255,0.8)", borderRadius: 999, marginTop: 8, width: "50%" }} />
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", color: "#64748B", fontSize: 12, fontWeight: 700, marginTop: 16 }}>
        ⏳ Lagi ambil data terbaru dari database... Sebentar ya! ⚡
      </p>
    </div>
  );
}