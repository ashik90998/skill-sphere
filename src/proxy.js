import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const token = getSessionCookie(request.headers, {
    cookiePrefix: "better-auth",
    cookieName: "session_token",
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/update-profile", "/cours/:path*"],
};

