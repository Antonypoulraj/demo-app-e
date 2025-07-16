// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";
import { geistSans, geistMono } from "./_app"; // OR re-import here if necessary

export default function Document() {
  return (
    <Html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
