import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import MultipleContextProvider from "@/context";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MultipleContextProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-1 flex-col h-screen overflow-hidden">
              <Navbar />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </MultipleContextProvider>
  );
}
