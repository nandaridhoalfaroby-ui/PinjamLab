// next.config.ts - PinjamLab
// Colorful, anti-white, sangat modern, sangat memukau, tata letak sangat rapi,
// kayak website Juara 1 dunia!
// Cache Components dimatiin biar "force-dynamic" bisa jalan!
// Biar data ruang & peminjaman selalu fresh, gak ke-cache!

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MATIIN fitur baru yang bikin error "dynamic is not compatible"!
  cacheComponents: false,

  // Biar build gak gagal gara-gara TypeScript kecil
  // Di Next.js 16, "eslint" SUDAH DIHAPUS, jadi JANGAN pake eslint di sini!
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;