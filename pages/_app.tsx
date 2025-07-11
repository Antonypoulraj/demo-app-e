// src/pages/_app.tsx
import type { AppProps } from "next/app";
import "../app/globals.css"; // Tailwind styles

import { AuthProvider } from "../src/contexts/AuthContext";
import { DataProvider } from "../src/contexts/DataContext"; // ✅ Make sure this import path is correct

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  );
}
