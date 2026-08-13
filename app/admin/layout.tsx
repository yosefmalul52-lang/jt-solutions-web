import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Google_Sans } from "next/font/google";
import "./admin.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

export const metadata: Metadata = {
  title: "JT Admin",
  description: "לוח ניהול לידים ומשימות - JT Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className={googleSans.variable}>{children}</div>;
}
