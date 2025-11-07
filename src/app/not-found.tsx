import Link from "next/link";
import { Button } from "@/components";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <div className="bg-muted/30 rounded-full p-6 mb-6">
        <Frown className="w-12 h-12 text-muted-foreground" />
      </div>

      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Sorry, we couldn’t find the page you’re looking for. It might have been
        removed, renamed, or it never existed.
      </p>

      <div className="flex items-center gap-3">
        <Button asChild className="rounded-full px-6">
          <Link href="/">Go Home</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="rounded-full px-6 border-muted-foreground/30"
        >
          <Link href="/workspace/slides">Back to Workspace</Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        Error code: <span className="font-mono">404</span>
      </p>
    </div>
  );
}
