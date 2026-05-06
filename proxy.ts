import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!token && (isDashboardPage || isAdminPage)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminPage && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
