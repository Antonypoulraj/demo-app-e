// src/pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push("/Login");
  }, [router]);
  return null;
}
