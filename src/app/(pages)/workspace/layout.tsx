"use client";

import {
  SidebarInset,
  SidebarProvider,
  AppSidebar,
  SiteHeader,
} from "@/components";
import { usePathname } from "next/navigation";
import { ReactNode, CSSProperties } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isEditorPage = /^\/workspace\/[a-f0-9]{24}$/.test(pathname);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      {!isEditorPage && <AppSidebar variant="inset" />}

      <SidebarInset>
        {!isEditorPage && <SiteHeader />}

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <main className={isEditorPage ? "" : "p-6"}>{children}</main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
