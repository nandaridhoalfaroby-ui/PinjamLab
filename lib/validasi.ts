// lib/validasi.ts - SEMUA ATURAN WAJIB DI SOAL!
export function cekTanggal(tanggal: string): string | null {
  if (!tanggal) return "Tanggal wajib diisi";
  const t = new Date(tanggal + "T00:00:00");
  const hariIni = new Date(); hariIni.setHours(0,0,0,0);
  if (t < hariIni) return "Tanggal tidak boleh kemarin / sudah lewat!";
  const maks = new Date(hariIni); maks.setDate(maks.getDate() + 60);
  if (t > maks) return "Tanggal paling jauh 60 hari ke depan!";
  const hari = t.getDay(); // 0=Minggu, 6=Sabtu
  if (hari === 0 || hari === 6) return "Tidak boleh pinjam Sabtu / Minggu!";
  return null;
}
export function cekJam(mulai: string, selesai: string): string | null {
  if (mulai < "07:00" || selesai > "17:00") return "Jam pinjam hanya 07:00 - 17:00!";
  if (selesai <= mulai) return "Jam selesai harus setelah jam mulai!";
  const [jm, mm] = mulai.split(":").map(Number);
  const [js, ms] = selesai.split(":").map(Number);
  const durasi = (js*60+ms) - (jm*60+mm);
  if (durasi > 180) return "Durasi paling lama 3 jam!";
  if (durasi <= 0) return "Durasi tidak valid!";
  return null;
}
export function bentrok(aMulai: string, aSelesai: string, bMulai: string, bSelesai: string) {
  return aMulai < bSelesai && bMulai < aSelesai;
}
export function tglIndo(t: string) { return new Date(t+"T00:00:00").toLocaleDateString("id-ID", { weekday:"long", day:"numeric", month:"long", year:"numeric" }); }