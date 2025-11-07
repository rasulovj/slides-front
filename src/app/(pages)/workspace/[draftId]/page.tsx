// app/workspace/[draftId]/page.tsx
"use client";

import { use } from "react";
import PresentationEditor from "@/app/(pages)/workspace/presentationEditor";

export default function WorkspacePage({
  params,
}: {
  params: Promise<{ draftId: string }>;
}) {
  const { draftId } = use(params);

  return <PresentationEditor draftId={draftId} />;
}
