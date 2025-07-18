import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import PageTransition from "../components/PageTransition";
import ThemeToggle from "../components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevPuppy",
  description: "DevPuppy - Your development companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
        suppressHydrationWarning={true}
      >
        <div className="flex w-full h-full min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100">
          <Sidebar />
          <PageTransition>{children}</PageTransition>
        </div>
        <ThemeToggle />
      </body>
    </html>
  );
}