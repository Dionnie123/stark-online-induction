import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/api/:path*", // Protect all API routes
    "/dashboard/:path*", // Protect all dashboard routes
    "/((?!_next/static|_next/image|.*\\.png$).*)", // Protect all other routes except static assets
  ],
};

export const runtime = "experimental-edge";
