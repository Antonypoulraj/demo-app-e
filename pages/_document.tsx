import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Preload Geist font manually if needed */}
        <link
          rel="preload"
          href="/fonts/your-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
