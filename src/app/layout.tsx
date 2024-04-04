import type { Metadata } from "next";
import { Inter, Kanit, Raleway, Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layouts/Providers";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Kanit({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "EduGateways",
  description: "Next generation of education platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-C7XN8LWL9C" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
