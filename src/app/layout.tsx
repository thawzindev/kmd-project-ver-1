import type { Metadata } from "next";
import { Inter, Kanit, Raleway, Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Providers from "@/components/layouts/Providers";

const inter = Kanit({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "GP-11",
  description: "GP-11",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
