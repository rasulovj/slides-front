"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/shared";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/workspace") ||
    pathname.includes("/create");

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <main className="">{children}</main>
    </div>
  );
}
