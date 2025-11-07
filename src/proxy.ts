import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  const guestOnlyRoutes = ["/", "/login", "/register"];

  if (token && guestOnlyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/workspace/slides", req.url));
  }

  if (!token && !guestOnlyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
