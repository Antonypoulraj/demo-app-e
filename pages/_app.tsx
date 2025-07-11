import type { AppProps } from "next/app";
import "../styles/globals.css"; // ✅ assuming you moved it to /styles/

import { AuthProvider } from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  );
}
