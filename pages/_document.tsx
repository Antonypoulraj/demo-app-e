// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";
import { geistSans, geistMono } from "./_app"; // ✅ must move fonts to a shared file or redefine here

export default function Document() {
  return (
    <Html className={`${geistSans.variable} ${geistMono.variable}`}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
