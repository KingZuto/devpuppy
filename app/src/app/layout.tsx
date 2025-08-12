import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import PageTransition from "../components/PageTransition";
import ThemeToggle from "../components/ThemeToggle";
import FloatingAWSCharacters from "../components/FloatingAWSCharacters";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 relative transition-colors duration-300`}
        suppressHydrationWarning={true}
      >
        {/* 떠다니는 AWS 캐릭터들 */}
        <FloatingAWSCharacters />
        
        <div className="flex min-h-screen">
          <Sidebar />
          <PageTransition>{children}</PageTransition>
        </div>
        <ThemeToggle />
      </body>
    </html>
  );
}