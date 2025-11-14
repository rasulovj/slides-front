import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/success")
  ) {
    return NextResponse.next();
  }

  const guestOnlyRoutes = ["/", "/login", "/register"];

  // Private routes
  const protectedRoutes = ["/workspace", "/profile", "/settings"];

  if (token && guestOnlyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/workspace/slides", req.url));
  }

  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
