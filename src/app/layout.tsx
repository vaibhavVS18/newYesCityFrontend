"use client";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-white text-gray-800  w-full">
        <Navbar />
        <main>{children}</main>

        {/* Show footer only on home page "/" */}
        {pathname === "/" && <Footer />}
      </body>
    </html>
  );
}
