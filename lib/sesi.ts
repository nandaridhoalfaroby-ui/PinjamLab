// lib/sesi.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function cekAdmin() { const c = await cookies(); return c.get("admin")?.value === "ya"; }
export async function pastikanAdmin() { if (!(await cekAdmin())) redirect("/login?dari=/admin"); }