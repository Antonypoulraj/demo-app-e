// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-red-100`}>
          <Component {...pageProps} />
        </div>
      </DataProvider>
    </AuthProvider>
  );
}
