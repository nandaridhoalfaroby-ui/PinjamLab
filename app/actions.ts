// app/actions.ts
"use server";
import { supabaseRahasia } from "@/lib/supabase";
import { cekTanggal, cekJam, bentrok } from "@/lib/validasi";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function ajukanPinjam(_prev: any, form: FormData) {
  const ruang_id = Number(form.get("ruang_id"));
  const peminjam = String(form.get("peminjam") || "").trim();
  const keperluan = String(form.get("keperluan") || "").trim();
  const tanggal = String(form.get("tanggal") || "");
  const mulai = String(form.get("mulai") || "");
  const selesai = String(form.get("selesai") || "");
  const jumlah_orang = Number(form.get("jumlah_orang"));
  const isian = { ruang_id, peminjam, keperluan, tanggal, mulai, selesai, jumlah_orang };
  const galat: any = {};
  if (peminjam.length < 3 || peminjam.length > 40) galat.peminjam = "Nama peminjam 3-40 huruf, wajib!";
  if (keperluan.length < 5 || keperluan.length > 120) galat.keperluan = "Keperluan 5-120 huruf, wajib!";
  const eTgl = cekTanggal(tanggal); if (eTgl) galat.tanggal = eTgl;
  const eJam = cekJam(mulai, selesai); if (eJam) galat.jam = eJam;
  if (jumlah_orang <= 0) galat.jumlah_orang = "Jumlah orang harus > 0!";
  if (Object.keys(galat).length) return { sukses: false, galat, isian, pesan: "" };

  const db = supabaseRahasia();
  const { data: ruang } = await db.from("ruang").select("*").eq("id", ruang_id).single();
  if (!ruang) return { sukses: false, galat: { ruang_id: "Ruang tidak ditemukan!" }, isian, pesan: "" };
  if (!ruang.aktif) return { sukses: false, galat: { ruang_id: "Ruang ini sedang nonaktif!" }, isian, pesan: "" };
  if (jumlah_orang > ruang.kapasitas) return { sukses: false, galat: { jumlah_orang: `Melebihi kapasitas! Kapasitas ${ruang.nama} cuma ${ruang.kapasitas} orang!` }, isian, pesan: "" };

  // Cek bentrok sama yang SUDAH DISETUJUI aja (yang menunggu boleh sama-sama menunggu, kata soal!)
  const { data: bentrokList } = await db.from("peminjaman").select("*").eq("ruang_id", ruang_id).eq("tanggal", tanggal).eq("status", "disetujui");
  for (const b of bentrokList || []) {
    if (bentrok(mulai, selesai, b.mulai, b.selesai)) {
      return { sukses: false, galat: { jam: `Bentrok! ${ruang.nama} sudah dipinjam ${b.mulai}-${b.selesai} di tanggal itu. Coba jam lain!` }, isian, pesan: "" };
    }
  }

  const { data, error } = await db.from("peminjaman").insert({ ruang_id, peminjam, keperluan, tanggal, mulai, selesai, jumlah_orang, status: "menunggu" }).select("id").single();
  if (error) return { sukses: false, galat: { umum: error.message }, isian, pesan: "" };
  revalidatePath("/admin"); revalidatePath("/peminjaman");
  return { sukses: true, galat: {}, isian, pesan: `Pengajuan berhasil! Nomor peminjaman kamu: ${data.id}. Simpan nomor ini buat cek status di /cek!`, nomor: data.id };
}

export async function setujuiPeminjaman(form: FormData) {
  const id = Number(form.get("id"));
  const db = supabaseRahasia();
  const { data: p } = await db.from("peminjaman").select("*").eq("id", id).single();
  if (!p) redirect("/admin?galat=Peminjaman tidak ditemukan");
  // Cek bentrok lagi pas mau setujui (kata soal: menyetujui 1, yang lain ditolak karena bentrok!)
  const { data: lain } = await db.from("peminjaman").select("*").eq("ruang_id", p.ruang_id).eq("tanggal", p.tanggal).eq("status", "disetujui");
  for (const b of lain || []) {
    if (b.id !== p.id && bentrok(p.mulai, p.selesai, b.mulai, b.selesai)) {
      redirect("/admin?galat=Bentrok! Sudah ada yang disetujui di jam itu!");
    }
  }
  await db.from("peminjaman").update({ status: "disetujui", alasan_tolak: null }).eq("id", id);
  revalidatePath("/admin"); revalidatePath("/peminjaman"); revalidatePath("/cek");
  redirect("/admin?info=Peminjaman disetujui!");
}

export async function tolakPeminjaman(_prev: any, form: FormData) {
  const id = Number(form.get("id"));
  const alasan = String(form.get("alasan_tolak") || "").trim();
  if (alasan.length < 5) return { sukses: false, pesan: "Menolak wajib disertai alasan minimal 5 huruf!" };
  const db = supabaseRahasia();
  await db.from("peminjaman").update({ status: "ditolak", alasan_tolak: alasan }).eq("id", id);
  revalidatePath("/admin");
  return { sukses: true, pesan: "Peminjaman ditolak!" };
}

export async function simpanRuang(_prev: any, form: FormData) {
  const nama = String(form.get("nama") || "").trim();
  const jenis = String(form.get("jenis") || "");
  const kapasitas = Number(form.get("kapasitas"));
  const lokasi = String(form.get("lokasi") || "").trim();
  const galat: any = {};
  if (nama.length < 3 || nama.length > 40) galat.nama = "Nama ruang 3-40 huruf, wajib!";
  if (!["lab","kelas","aula"].includes(jenis)) galat.jenis = "Jenis harus lab / kelas / aula!";
  if (kapasitas <= 0) galat.kapasitas = "Kapasitas harus > 0!";
  if (!lokasi) galat.lokasi = "Lokasi wajib!";
  if (Object.keys(galat).length) return { sukses: false, galat, pesan: "" };
  const db = supabaseRahasia();
  const { error } = await db.from("ruang").insert({ nama, jenis, kapasitas, lokasi, aktif: true });
  if (error) return { sukses: false, galat: { nama: "Nama ruang sudah ada / gagal simpan: " + error.message }, pesan: "" };
  revalidatePath("/admin/ruang"); revalidatePath("/ruang"); revalidatePath("/");
  return { sukses: true, galat: {}, pesan: "Ruang berhasil ditambah!" };
}

export async function toggleRuang(form: FormData) {
  const id = Number(form.get("id")); const aktif = form.get("aktif") === "true";
  await supabaseRahasia().from("ruang").update({ aktif: !aktif }).eq("id", id);
  revalidatePath("/admin/ruang"); revalidatePath("/ruang"); revalidatePath("/");
  redirect("/admin/ruang?info=Status ruang diubah!");
}
export async function hapusRuang(form: FormData) {
  const id = Number(form.get("id"));
  await supabaseRahasia().from("ruang").delete().eq("id", id);
  revalidatePath("/admin/ruang"); revalidatePath("/");
  redirect("/admin/ruang?info=Ruang dihapus!");
}