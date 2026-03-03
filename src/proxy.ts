import { NextRequest, NextResponse } from "next/server";
import { allowedEmails } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const userCookie = req.cookies.get("user")?.value;
  const url = req.nextUrl.pathname;

  if (!userCookie && (url.startsWith("/dashboard") || url.startsWith("/activities")))
    return NextResponse.redirect(new URL("/", req.url));

  if (userCookie && url === "/") {
    try {
      const user = JSON.parse(userCookie);
      if (allowedEmails.includes(user.email))
        return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (userCookie && (url.startsWith("/dashboard") || url.startsWith("/activities"))) {
    try {
      const user = JSON.parse(userCookie);
      if (!allowedEmails.includes(user.email))
        return NextResponse.redirect(new URL("/", req.url));
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (userCookie && url.startsWith("/login")) {
    try {
      const user = JSON.parse(userCookie);
      if (allowedEmails.includes(user.email))
        return NextResponse.redirect(new URL("/dashboard", req.url));
      else return NextResponse.redirect(new URL("/", req.url));
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  const res = NextResponse.next();

  if (url.startsWith("/dashboard") || url.startsWith("/activities")) {
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
  }

  return res;
}

export const config = { matcher: ["/dashboard/:path*", "/activities/:path*", "/login", "/"] };
