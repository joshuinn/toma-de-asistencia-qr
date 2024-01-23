"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ children }) {
  const router = useRouter();
  useEffect(() => {
    router.push("/pages/assistence"); //redireccion a la pagina principal
    router.refresh();
  });
  return <div></div>;
}
