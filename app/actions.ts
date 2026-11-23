// app/actions.ts - Server Actions - VERSI LENGKAP!
// - /admin & /admin/ruang -> 1 argumen (formData) + redirect
// - /pinjam -> 2 argumen (prev, formData) + return state, buat useActionState!
// JANGAN DIHAPUS SATU PUN, SEMUA DIPAKE!

"use server";

import { supabaseRahasia } from "@/lib/supabase";
import { pastikanAdmin } from "@/lib/sesi";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// ============ 0. AJUKAN PINJAM (buat /pinjam, pake useActionState!) ============
// INI YANG TADI HILANG! Makanya error ts(2305)!
// Signature HARUS (prev, formData), return { sukses, galat, isian, pesan }
export async function ajukanPinjam(prev: any, formData: FormData) {
  const isian: any = {
    ruang_id: String(formData.get("ruang_id") || ""),
    peminjam: String(formData.get("peminjam") || ""),
    keperluan: String(formData.get("keperluan") || ""),
    tanggal: String(formData.get("tanggal") || ""),
    mulai: String(formData.get("mulai") || ""),
    selesai: String(formData.get("selesai") || ""),
    jumlah_orang: String(formData.get("jumlah_orang") || ""),
  };

  const galat: any = {};

  // --- Validasi dasar ---
  const ruang_id = Number(isian.ruang_id);
  if (!ruang_id) galat.ruang_id = "Pilih ruang dulu ya!";
  if (!isian.peminjam || isian.peminjam.trim().length < 3 || isian.peminjam.trim().length > 40)
    galat.peminjam = "Nama peminjam harus 3-40 huruf!";
  if (!isian.keperluan || isian.keperluan.trim().length < 5 || isian.keperluan.trim().length > 120)
    galat.keperluan = "Keperluan harus 5-120 huruf!";
  if (!isian.tanggal) galat.tanggal = "Tanggal wajib diisi!";
  if (!isian.mulai || !isian.selesai) galat.jam = "Jam mulai & selesai wajib diisi!";
  const jumlah_orang = Number(isian.jumlah_orang);
  if (!jumlah_orang || jumlah_orang < 1) galat.jumlah_orang = "Jumlah orang minimal 1!";

  if (Object.keys(galat).length > 0) {
    return { sukses: false, galat, isian, pesan: "" };
  }

  // --- Validasi tanggal: bukan kemarin, maks 60 hari ke depan, bukan Sabtu/Minggu ---
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);
  const tglPinjam = new Date(isian.tanggal + "T00:00:00");
  const selisihHari = Math.round((tglPinjam.getTime() - hariIni.getTime()) / (1000 * 60 * 60 * 24));

  if (selisihHari < 0) galat.tanggal = "Tanggal gak boleh kemarin! Pilih hari ini / ke depan!";
  if (selisihHari > 60) galat.tanggal = "Tanggal maks 60 hari ke depan!";
  const hari = tglPinjam.getDay(); // 0 = Minggu, 6 = Sabtu
  if (hari === 0 || hari === 6) galat.tanggal = "Gak boleh Sabtu / Minggu! Pilih Senin-Jumat!";

  // --- Validasi jam: 07:00-17:00, durasi maks 3 jam, selesai > mulai ---
  const keMenit = (j: string) => {
    const [h, m] = j.split(":").map(Number);
    return h * 60 + m;
  };
  const mulaiM = keMenit(isian.mulai);
  const selesaiM = keMenit(isian.selesai);
  if (mulaiM < 7 * 60 || selesaiM > 17 * 60) galat.jam = "Jam pinjam cuma 07:00 - 17:00!";
  if (selesaiM <= mulaiM) galat.jam = "Jam selesai harus lebih besar dari jam mulai!";
  if (selesaiM - mulaiM > 3 * 60) galat.jam = "Durasi maks 3 jam!";

  if (Object.keys(galat).length > 0) {
    return { sukses: false, galat, isian, pesan: "" };
  }

  const sb = supabaseRahasia();

  // --- Validasi kapasitas ---
  const { data: ruang } = await sb.from("ruang").select("*").eq("id", ruang_id).single();
  if (!ruang) {
    return { sukses: false, galat: { ruang_id: "Ruang tidak ditemukan!" }, isian, pesan: "" };
  }
  if (!ruang.aktif) {
    return { sukses: false, galat: { ruang_id: "Ruang ini lagi nonaktif! Pilih ruang lain!" }, isian, pesan: "" };
  }
  if (jumlah_orang > Number(ruang.kapasitas)) {
    return {
      sukses: false,
      galat: { jumlah_orang: `Kapasitas ${ruang.nama} cuma ${ruang.kapasitas} orang! Kamu isi ${jumlah_orang}!` },
      isian,
      pesan: "",
    };
  }

  // --- Validasi bentrok: gak boleh bentrok sama yang sudah DISETUJUI ---
  const { data: bentrok } = await sb
    .from("peminjaman")
    .select("id")
    .eq("ruang_id", ruang_id)
    .eq("tanggal", isian.tanggal)
    .eq("status", "disetujui")
    .lt("mulai", isian.selesai)
    .gt("selesai", isian.mulai);

  if (bentrok && bentrok.length > 0) {
    return {
      sukses: false,
      galat: { umum: `BENTROK! Jam itu sudah dibooking (Nomor ${bentrok[0].id} sudah disetujui)! Pilih jam lain!` },
      isian,
      pesan: "",
    };
  }

  // --- Simpan! ---
  const { data, error } = await sb
    .from("peminjaman")
    .insert({
      ruang_id,
      peminjam: isian.peminjam.trim(),
      keperluan: isian.keperluan.trim(),
      tanggal: isian.tanggal,
      mulai: isian.mulai,
      selesai: isian.selesai,
      jumlah_orang,
      status: "menunggu",
    })
    .select("id")
    .single();

  if (error) {
    return { sukses: false, galat: { umum: "Gagal kirim: " + error.message }, isian, pesan: "" };
  }

  revalidatePath("/admin");
  revalidatePath("/peminjaman");

  return {
    sukses: true,
    galat: {},
    isian: {},
    pesan: `Yeay! Pengajuanmu berhasil! Nomor peminjaman kamu: ${data?.id}. Simpan nomor ini! Cek statusnya di /cek pake nomor ${data?.id} + nama "${isian.peminjam.trim()}"!`,
  };
}

// ============ 1. SETUJUI PEMINJAMAN (buat /admin, 1 argumen!) ============
export async function setujuiPeminjaman(formData: FormData) {
  await pastikanAdmin();
  const id = Number(formData.get("id"));
  const sb = supabaseRahasia();
  const { data: target } = await sb.from("peminjaman").select("*").eq("id", id).single();
  if (!target) redirect("/admin?galat=" + encodeURIComponent("Permohonan tidak ditemukan!"));
  const { data: bentrok } = await sb
    .from("peminjaman")
    .select("id")
    .eq("ruang_id", target.ruang_id)
    .eq("tanggal", target.tanggal)
    .eq("status", "disetujui")
    .neq("id", id)
    .lt("mulai", target.selesai)
    .gt("selesai", target.mulai);
  if (bentrok && bentrok.length > 0) {
    redirect("/admin?galat=" + encodeURIComponent(`Gagal! Bentrok dengan permohonan Nomor ${bentrok[0].id} yang sudah disetujui!`));
  }
  await sb.from("peminjaman").update({ status: "disetujui" }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/peminjaman");
  redirect("/admin?info=" + encodeURIComponent(`Yeay! Permohonan Nomor ${id} berhasil DISETUJUI!`));
}

// ============ 2. TOLAK PEMINJAMAN (buat /admin, 1 argumen!) ============
export async function tolakPeminjaman(formData: FormData) {
  await pastikanAdmin();
  const id = Number(formData.get("id"));
  const alasan = String(formData.get("alasan_tolak") || "").trim();
  if (alasan.length < 5) {
    redirect("/admin?galat=" + encodeURIComponent("Alasan tolak wajib minimal 5 huruf!"));
  }
  await supabaseRahasia().from("peminjaman").update({ status: "ditolak", alasan_tolak: alasan }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/cek");
  redirect("/admin?info=" + encodeURIComponent(`Permohonan Nomor ${id} berhasil DITOLAK!`));
}

// ============ 3. SIMPAN RUANG BARU ============
export async function simpanRuang(formData: FormData) {
  await pastikanAdmin();
  const nama = String(formData.get("nama") || "").trim();
  const jenis = String(formData.get("jenis") || "lab");
  const kapasitas = Number(formData.get("kapasitas"));
  const lokasi = String(formData.get("lokasi") || "").trim();
  if (nama.length < 3 || nama.length > 40) {
    redirect("/admin/ruang?galat=" + encodeURIComponent("Nama ruang harus 3-40 huruf!"));
  }
  if (!["lab", "kelas", "aula"].includes(jenis)) {
    redirect("/admin/ruang?galat=" + encodeURIComponent("Jenis harus lab / kelas / aula!"));
  }
  if (!kapasitas || kapasitas <= 0) {
    redirect("/admin/ruang?galat=" + encodeURIComponent("Kapasitas harus lebih dari 0!"));
  }
  if (!lokasi) {
    redirect("/admin/ruang?galat=" + encodeURIComponent("Lokasi wajib diisi!"));
  }
  const { data: duplikat } = await supabaseRahasia().from("ruang").select("id").ilike("nama", nama);
  if (duplikat && duplikat.length > 0) {
    redirect("/admin/ruang?galat=" + encodeURIComponent(`Nama "${nama}" sudah ada! Pakai nama lain!`));
  }
  const { error } = await supabaseRahasia().from("ruang").insert({ nama, jenis, kapasitas, lokasi, aktif: true });
  if (error) {
    redirect("/admin/ruang?galat=" + encodeURIComponent("Gagal tambah ruang: " + error.message));
  }
  revalidatePath("/admin/ruang");
  revalidatePath("/ruang");
  redirect("/admin/ruang?info=" + encodeURIComponent(`Yeay! Ruang "${nama}" berhasil ditambah!`));
}

// ============ 4. TOGGLE AKTIF / NONAKTIF RUANG ============
export async function toggleRuang(formData: FormData) {
  await pastikanAdmin();
  const id = Number(formData.get("id"));
  const aktifSekarang = String(formData.get("aktif")) === "true";
  await supabaseRahasia().from("ruang").update({ aktif: !aktifSekarang }).eq("id", id);
  revalidatePath("/admin/ruang");
  revalidatePath("/ruang");
  redirect("/admin/ruang?info=" + encodeURIComponent(aktifSekarang ? `Ruang Nomor ${id} berhasil DINONAKTIFKAN!` : `Ruang Nomor ${id} berhasil DIAKTIFKAN!`));
}

// ============ 5. HAPUS RUANG ============
export async function hapusRuang(formData: FormData) {
  await pastikanAdmin();
  const id = Number(formData.get("id"));
  await supabaseRahasia().from("ruang").delete().eq("id", id);
  revalidatePath("/admin/ruang");
  revalidatePath("/ruang");
  redirect("/admin/ruang?info=" + encodeURIComponent(`Ruang Nomor ${id} berhasil DIHAPUS!`));
}

// ============ 6. BUAT PEMINJAMAN (cadangan, 1 argumen) ============
export async function buatPeminjaman(formData: FormData) {
  const ruang_id = Number(formData.get("ruang_id"));
  const peminjam = String(formData.get("peminjam") || "").trim();
  const keperluan = String(formData.get("keperluan") || "").trim();
  const tanggal = String(formData.get("tanggal") || "");
  const mulai = String(formData.get("mulai") || "");
  const selesai = String(formData.get("selesai") || "");
  const jumlah_orang = Number(formData.get("jumlah_orang"));
  if (!ruang_id || !peminjam || !keperluan || !tanggal || !mulai || !selesai || !jumlah_orang) {
    redirect("/pinjam?galat=" + encodeURIComponent("Semua kolom wajib diisi!"));
  }
  const { data, error } = await supabaseRahasia()
    .from("peminjaman")
    .insert({ ruang_id, peminjam, keperluan, tanggal, mulai, selesai, jumlah_orang, status: "menunggu" })
    .select("id")
    .single();
  if (error) {
    redirect("/pinjam?galat=" + encodeURIComponent("Gagal pinjam: " + error.message));
  }
  revalidatePath("/admin");
  revalidatePath("/peminjaman");
  redirect(`/pinjam?info=${encodeURIComponent(`Berhasil! Nomor peminjaman kamu: ${data?.id}. Simpan nomornya buat cek di /cek!`)}`);
}