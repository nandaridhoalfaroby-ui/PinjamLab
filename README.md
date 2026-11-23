# PinjamLab - Aplikasi Peminjaman Ruang & Laboratorium

## Cara Jalanin di Lokal (localhost)
1. `npm install`
2. Copy `.env.local` (lihat contoh di atas)
3. Jalankan SQL di Supabase (lihat file SQL di atas)
4. `npm run dev` -> buka http://localhost:3000

## Cara Deploy ke Vercel
1. Push ke GitHub
2. Import di Vercel, isi Environment Variables (6 kunci Supabase + ADMIN_PASSWORD + SESSION_SECRET)
3. Deploy -> buka link Vercel-nya

## Alur Utama
- Pengguna: Beranda -> Lihat Ruang -> Pinjam -> Cek Status (nomor + nama harus cocok)
- Admin: Login (admin123) -> Admin (Setujui/Tolak) -> Kelola Ruang

## Alur Bisnis
- Pengajuan dicek: tanggal (bukan kemarin, maks 60 hari, bukan Sabtu/Minggu), jam (07:00-17:00, maks 3 jam), kapasitas, bentrok dengan yang disetujui.
- Dua permohonan yang bentrok boleh sama-sama menunggu. Saat admin menyetujui satu, yang lain akan ditolak karena bentrok saat mau disetujui.
- Menolak wajib alasan min 5 huruf, peminjam bisa lihat alasannya di /cek.

## Hak Akses (RLS)
- `ruang`: publik (publishable) hanya baca, rahasia (secret) baca/tambah/ubah/hapus.
- `peminjaman`: publik tidak ada akses, rahasia baca/tambah/ubah/hapus. Semua akses peminjaman lewat Server Action pake kunci rahasia.

## Masalah yang Ditemukan & Perbaikan
- `useSearchParams` bikin build Vercel gagal prerender -> diganti `window.location` di `useEffect`.
- `Turbopack` gagal di 【entity-Windows¦canonical_name=Windows】 karena SWC rusak -> pake `next build --webpack`.
- `Cannot find @tailwindcss/postcss` -> install `tailwindcss` + `@tailwindcss/postcss` + benerin `postcss.config.mjs`.
- `"use client"` harus baris pertama -> pisah `page.tsx` (server) + `LoginForm.tsx` (client).

## Jawaban Pertanyaan Wawancara (Siap Ditanya Dosen!)
- Kenapa RLS peminjaman publik 0 akses? Biar nama peminjam + data pengajuan gak bisa diintip orang lewat API publik. Semua lewat server.
- Kenapa cek bentrok cuma sama yang disetujui? Biar 2 permohonan yang bentrok boleh sama-sama menunggu, sesuai soal.
- Kenapa tanggal maks 60 hari? Biar gak ada yang booking jauh-jauh hari sampai penuh.