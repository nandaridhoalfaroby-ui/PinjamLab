import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/admin")) return NextResponse.next();
  if (req.cookies.get("admin")?.value === "ya") return NextResponse.next();
  const url = req.nextUrl.clone(); url.pathname = "/login"; url.searchParams.set("dari", path);
  return NextResponse.redirect(url);
}
export const config = { matcher: ["/admin/:path*"] };