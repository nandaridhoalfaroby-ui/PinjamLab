"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function keluar() { const c = await cookies(); c.delete("admin"); redirect("/login"); }