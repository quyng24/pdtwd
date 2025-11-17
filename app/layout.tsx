import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panda Taekwondo – CLB võ thuật dành cho mọi lứa tuổi",
  description: "Câu lạc bộ Taekwondo Panda tại Hà Nội – Nhận tuyển thêm võ sinh từ 5 tuổi trở lên. Lớp học chất lượng, môi trường thân thiện, huấn luyện viên nhiều kinh nghiệm",
  keywords: [
    "Taekwondo",
    "CLB Taekwondo",
    "võ thuật",
    "học võ",
    "Panda Taekwondo",
    "tuyển võ sinh"
  ],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Panda Taekwondo",
    description:
      "CLB Taekwondo Panda – Tuyển thêm võ sinh. Môi trường thân thiện, rèn luyện thể lực & kỷ luật.",
    url: "https://pandataekwondo.com",
    siteName: "Panda Taekwondo",
    images: [
      {
        url: "/og/img-share-open-drap.jpg",
        width: 1200,
        height: 630,
         alt: "Panda Taekwondo – Ảnh quảng cáo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
