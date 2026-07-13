import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { clinicNode } from "@/lib/schema";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

export const viewport = {
  themeColor: "#002C48",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://midlandeye.com"),
  manifest: "/site.webmanifest",
  title: {
    default: "Private Eye Hospital in Solihull | Midland Eye Clinic",
    template: "%s | Midland Eye",
  },
  openGraph: {
    siteName: "Midland Eye",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/images/2024_11_ME-primary-logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col pb-14 lg:pb-0" suppressHydrationWarning>
        <SmoothScroll />
        <UtilityBar />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <StickyMobileBar />
        <JsonLd data={clinicNode()} />
      </body>
    </html>
  );
}
