"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AuthSuccessContent() {
  const params = useSearchParams();

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      Cookies.set("access_token", accessToken);
      Cookies.set("refresh_token", refreshToken);

      window.location.href = "/";
    }
  }, [params]);

  return <div>Signing in...</div>;
}
