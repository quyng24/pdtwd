import { NextRequest, NextResponse } from "next/server";
import { allowedEmails } from "./app/lib/auth";

export function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("user")?.value;
  const url = req.nextUrl.pathname;

  // Nếu chưa login mà vào /admin => về /
  if (!userCookie && url.startsWith("/dashboard"))
    return NextResponse.redirect(new URL("/", req.url));

  // Nếu đã login và đang ở root "/" => chuyển sang /admin
  if (userCookie && url === "/") {
    try {
      const user = JSON.parse(userCookie);
      if (allowedEmails.includes(user.email))
        return NextResponse.redirect(new URL("/admin", req.url));
    } catch {
      // cookie hỏng => cho tiếp tục để tránh loop
      return NextResponse.next();
    }
  }

  // Kiểm tra quyền khi truy cập /admin
  if (userCookie && url.startsWith("/dashboard")) {
    try {
      const user = JSON.parse(userCookie);
      if (!allowedEmails.includes(user.email))
        return NextResponse.redirect(new URL("/", req.url));
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Nếu đã login mà vào /login => redirect tới /admin
  if (userCookie && url.startsWith("/login")) {
    try {
      const user = JSON.parse(userCookie);
      if (allowedEmails.includes(user.email))
        return NextResponse.redirect(new URL("/admin", req.url));
      else return NextResponse.redirect(new URL("/", req.url));
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/login", "/"] };
