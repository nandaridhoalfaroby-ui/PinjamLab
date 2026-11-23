// app/admin/ruang/HapusButton.tsx - Tombol Hapus + Confirm - CLIENT COMPONENT!
// Ini file-nya WAJIB dipisah, karena confirm() cuma bisa di Client!

"use client";
import { hapusRuang } from "@/app/actions";

export default function HapusButton({ id, nama }: { id: number; nama: string }) {
  return (
    <form
      action={hapusRuang}
      onSubmit={(e) => {
        if (!confirm(`Yakin hapus "${nama}"? Peminjaman ruang ini ikut kehapus!`)) {
          e.preventDefault();
        }
      }}
      style={{ flex: 1 }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        style={{
          width: "100%",
          background: "linear-gradient(135deg,#EF4444,#EC4899)",
          color: "white",
          border: "none",
          borderRadius: 999,
          padding: "9px",
          fontWeight: 900,
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        🗑 Hapus
      </button>
    </form>
  );
}