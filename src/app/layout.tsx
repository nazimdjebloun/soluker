import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Header from "@/components/header";
    import { QueryProvider } from "./providers";
    const geistSans = Geist({
      variable: "--font-geist-sans",
      subsets: ["latin"],
    });

    const geistMono = Geist_Mono({
      variable: "--font-geist-mono",
      subsets: ["latin"],
    });

    export const metadata: Metadata = {
      title: "Soluker",
      description: "Production des produits paramedicales et cosmetiques",
    };

    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <ClerkProvider>
          <html lang="en" suppressHydrationWarning>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              {/* <header className="flex justify-end items-center p-4 gap-4 h-16 bg-amber-200">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
              {/* <Header /> */}
              <ThemeProvider defaultTheme="light" enableSystem={false}>
                <QueryProvider>{children}</QueryProvider>
              </ThemeProvider>
            </body>
          </html>
        </ClerkProvider>
      );
    }
