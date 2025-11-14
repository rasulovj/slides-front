"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { IconPresentationAnalytics } from "@tabler/icons-react";
import { useUserDrafts } from "@/services";

const Slides = () => {
  const { data } = useUserDrafts();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-3">
          <Link href="/create">
            <Button className="rounded-full bg-primary text-white hover:bg-primary/80">
              + Create new
            </Button>
          </Link>

          <Button variant="outline" className="rounded-full">
            + Import
          </Button>
        </div>

        <div className="text-muted-foreground font-medium">My documents</div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="h-14">
              <TableHead className="w-[40%]">Name</TableHead>
              <TableHead>Opened</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((item: any) => (
              <TableRow
                key={item.id}
                className="cursor-pointer transition hover:bg-muted/50 h-14"
              >
                {/* Name */}
                <TableCell className="flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-100">
                    <IconPresentationAnalytics
                      stroke={1.5}
                      className="text-orange-600"
                    />
                  </div>

                  <Link
                    href={`/workspace/${item.id}`}
                    className="hover:underline underline-offset-2"
                  >
                    {item.title}
                  </Link>
                </TableCell>

                {/* Last opened */}
                <TableCell className="text-muted-foreground">
                  {item.lastEditedAt ? formatDate(item.lastEditedAt) : "-"}
                </TableCell>

                {/* Owner */}
                <TableCell className="text-muted-foreground">Me</TableCell>

                {/* Status */}
                <TableCell>
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    Draft
                  </Badge>
                </TableCell>

                {/* More Menu */}
                <TableCell className="text-right">
                  <button className="p-2 rounded-md hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Slides;
