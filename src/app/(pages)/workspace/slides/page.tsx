"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Tabs, TabsList, TabsTrigger } from "@/components";
import { cn } from "@/lib";
import { Grid2X2, List } from "lucide-react";
import { useUserDrafts } from "@/services";

const Slides = () => {
  const { data } = useUserDrafts();
  // console.log(data.);

  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-3">
          <Link href={"/create"}>
            <Button className="bg-primary hover:bg-primary/80 text-white rounded-full">
              + Create new
            </Button>
          </Link>
          <Button variant="outline" className="rounded-full">
            + Import
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Tabs defaultValue="recent" className="hidden sm:flex">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="recent">Recently viewed</TabsTrigger>
              <TabsTrigger value="created">Created by you</TabsTrigger>
              <TabsTrigger value="fav">Favorites</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-1 border rounded-full p-1 bg-muted">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-2 rounded-full transition",
                view === "grid" && "bg-background shadow"
              )}
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-2 rounded-full transition",
                view === "list" && "bg-background shadow"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "gap-6",
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            : "flex flex-col"
        )}
      >
        {data?.map((slide: any) => (
          <div
            key={slide.id}
            className="bg-card rounded-lg shadow-sm hover:shadow-md transition border overflow-hidden"
          >
            <div className="relative w-full h-40">
              <Image
                src={slide.thumbnail}
                alt={slide.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1">
                {slide.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Created by you
              </p>
              <p className="text-xs text-muted-foreground">
                Last viewed {slide.viewed}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slides;
