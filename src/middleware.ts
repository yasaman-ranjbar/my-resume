import { AppRoutes } from "@/constant/route";
import { TOKEN_COOKIE_NAME } from "@/lib/auth";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-change-in-production"
);

// Only run middleware on admin routes (matcher must use literal paths)
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin and all sub-routes
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL(AppRoutes.HOME, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      const loginUrl = new URL(AppRoutes.HOME, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
