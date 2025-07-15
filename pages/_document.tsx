import { Html, Head, Main, NextScript } from "next/document";
import { geistSans, geistMono } from "./_app"; // ✅ import the exported fonts

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
