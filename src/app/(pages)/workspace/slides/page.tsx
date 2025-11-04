"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid2X2, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Yerlarni Takroriy Ekinlar Ekishga Tayyorlash",
    image: "/fake.webp",
    viewed: "8 hours ago",
  },
  {
    id: 2,
    title: "Qisqa Rotatsiyali Almashlab Ekish Tizimi",
    image: "/fake.webp",
    viewed: "12 days ago",
  },
  {
    id: 3,
    title: "Yerni Kuzgi Bug'doy va G'o'za Ekishga Tayyorlash",
    image: "/fake.webp",
    viewed: "12 days ago",
  },
  {
    id: 4,
    title: "Yerlarni Takroriy Ekinlar Ekishga Tayyorlash",
    image: "/fake.webp",
    viewed: "8 hours ago",
  },
  {
    id: 5,
    title: "Qisqa Rotatsiyali Almashlab Ekish Tizimi",
    image: "/fake.webp",
    viewed: "12 days ago",
  },
  {
    id: 6,
    title: "Yerni Kuzgi Bug'doy va G'o'za Ekishga Tayyorlash",
    image: "/fake.webp",
    viewed: "12 days ago",
  },
  {
    id: 7,
    title: "Yerlarni Takroriy Ekinlar Ekishga Tayyorlash",
    image: "/fake.webp",
    viewed: "8 hours ago",
  },
  {
    id: 8,
    title: "Qisqa Rotatsiyali Almashlab Ekish Tizimi",
    image: "/fake.webp",
    viewed: "12 days ago",
  },
  {
    id: 9,
    title: "Yerni Kuzgi Bug'doy va G'o'za Ekishga Tayyorlash",
    image: "/fake.webp",
    viewed: "12 days ago",
  },
];

const Slides = () => {
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
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-card rounded-lg shadow-sm hover:shadow-md transition border overflow-hidden"
          >
            <div className="relative w-full h-40">
              <Image
                src={slide.image}
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
