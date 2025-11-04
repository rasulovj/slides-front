"use client";
import { Navbar } from "@/shared";
import { usePathname } from "next/navigation";

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
    <html lang="en">
      <body>
        <div>
          {!hideNavbar && <Navbar />}

          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}
