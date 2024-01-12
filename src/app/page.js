"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ children }) {
  const router = useRouter();
  useEffect(() => {
    router.push("/pages/assistence");
    router.refresh();
  });
  return <div></div>;
}
