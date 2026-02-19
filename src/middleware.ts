import { NextRequest, NextResponse } from "next/server";
import { allowedEmails } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("user")?.value;
  const url = req.nextUrl.pathname;

  // Nếu chưa login mà vào trang quản trị => về /
  if (!userCookie && (url.startsWith("/dashboard") || url.startsWith("/activities")))
    return NextResponse.redirect(new URL("/", req.url));

  // Nếu đã login và đang ở root "/" => chuyển sang /admin
  if (userCookie && url === "/") {
    try {
      const user = JSON.parse(userCookie);
      if (allowedEmails.includes(user.email))
        return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      // cookie hỏng => cho tiếp tục để tránh loop
      return NextResponse.next();
    }
  }

  // Kiểm tra quyền khi truy cập trang quản trị
  if (userCookie && (url.startsWith("/dashboard") || url.startsWith("/activities"))) {
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
        return NextResponse.redirect(new URL("/dashboard", req.url));
      else return NextResponse.redirect(new URL("/", req.url));
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  const res = NextResponse.next();

  // Hạn chế browser cache cho các route quản trị để tránh back-forward cache giữ màn hình cũ
  if (url.startsWith("/dashboard") || url.startsWith("/activities")) {
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
  }

  return res;
}

export const config = { matcher: ["/dashboard/:path*", "/activities/:path*", "/login", "/"] };
