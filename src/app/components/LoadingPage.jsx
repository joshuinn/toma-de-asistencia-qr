"use client";
import Router, { useRouter, usePathname } from "next/navigation";
import React, { Component, useEffect, useState } from "react";

function LoadingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading]= useState(true)
  const path = usePathname()
  useEffect(() => {
   setIsLoading(true)
    console.log("some");
   return setIsLoading(true)
  }, [path]);
  return isLoading
}

export default LoadingPage