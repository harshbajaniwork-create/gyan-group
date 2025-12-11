import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { BackToTop } from "@/components/back-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gyan Group",
    template: "%s | Gyan Group",
  },
  description:
    "Gyan Group is a leader in Chemical Technology, manufacturing Pharma, API, Pigment, Dyes, Perfumery, and Agro intermediates.",
  keywords: [
    "Gyan Group",
    "Chemical Technology",
    "Pharma Intermediates",
    "Pharma and API Intermediates",
    "Pigment",
    "Pigment Intermediates",
    "Dyes",
    "Dye",
    "Dye Intermediates",
    "Manufacturing",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
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
        <Toaster />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
