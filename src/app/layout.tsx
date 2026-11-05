import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// 1. Import your Navbar and Footer components
import Navbar from "@/component/Navbar";
import Footer from "@/component/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HANDTOGETHER",
  description: "Together for a Better Tomorrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white">
        {/* 2. Navbar is rendered at the top of every route */}
        <Navbar />

        {/* 3. The current page content loads here in the middle */}
        <main className="flex-1">
          {children}
        </main>

        {/* 4. Footer is rendered at the bottom of every route */}
        <Footer />

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}