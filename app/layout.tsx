import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import FaultyTerminalWrapper from "@/components/FaultyTerminalWrapper";
import { AnimationProvider } from "@/components/AnimationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kien Tuong Truong",
  description: "PhD student in Applied Cryptography at ETH Zurich",
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
        <AnimationProvider>
          <TooltipProvider>
            {/* Background Terminal - Fixed across all pages */}
            <FaultyTerminalWrapper />
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </TooltipProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
