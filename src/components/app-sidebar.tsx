"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconFileWord,
  IconHeadset,
  IconInnerShadowTop,
  IconPresentationAnalytics,
  IconReport,
  IconTemplate,
  IconTrash,
} from "@tabler/icons-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

const data = {
  user: {
    name: "Jamshidbek",
    email: "jamshidbek@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Slides",
      url: "/workspace/slides",
      icon: IconPresentationAnalytics,
    },
    {
      title: "Templates",
      url: "/workspace/templates",
      icon: IconTemplate,
    },
    {
      title: "Trash",
      url: "/workspace/trash",
      icon: IconTrash,
    },
  ],
  documents: [
    {
      name: "Support",
      url: "/workspace/support",
      icon: IconHeadset,
    },
    {
      name: "Reports",
      url: "/workspace/reports",
      icon: IconReport,
    },
    {
      name: "Docs",
      url: "/workspace/docs",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props} className="">
      <SidebarHeader className="px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-linear-to-r from-teal-500 to-teal-700">
            <IconInnerShadowTop className="size-5 text-white" />
          </div>
          <span className="font-semibold text-xl">SlideMind</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between py-4">
        <div>
          <SidebarMenu>
            <div className="px-4 pb-2 text-xs uppercase text-muted-foreground font-medium">
              Main
            </div>
            {data.navMain.map((item) => {
              const isActive = pathname.startsWith(item.url);
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-2 text-lg font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="size-5" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>

          <div className="border-t my-4 mx-4" />

          <SidebarMenu>
            <div className="px-4 pb-2 text-xs uppercase text-muted-foreground font-medium">
              More
            </div>
            {data.documents.map((item) => {
              const isActive = pathname.startsWith(item.url);
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-2 text-lg font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="size-5" />
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
