// components/workspace/ThumbnailUploader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useThumbnailGenerator } from "@/app/(pages)/workspace/thumnailGenerator";
import { useUpdateDraftThumbnail } from "@/services/draftServices";
import SlidePreviewForThumbnail from "./slidePreviewForThumnail";
import { Slide } from "@/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ThumbnailUploaderProps {
  draftId: string;
  slide: Slide;
  theme: any;
  currentThumbnail?: string | null;
}

export default function ThumbnailUploader({
  draftId,
  slide,
  theme,
  currentThumbnail,
}: ThumbnailUploaderProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateThumbnail } = useThumbnailGenerator();
  const updateThumbnailMutation = useUpdateDraftThumbnail();

  useEffect(() => {
    // Auto-generate thumbnail if not exists
    if (!currentThumbnail && previewRef.current && theme) {
      generateAndUpload();
    }
  }, [currentThumbnail, theme]);

  const generateAndUpload = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    try {
      // Wait a bit for fonts to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate thumbnail
      const thumbnailBase64 = await generateThumbnail(previewRef.current);

      // Upload to backend (which uploads to Cloudinary)
      await updateThumbnailMutation.mutateAsync({
        draftId,
        thumbnail: thumbnailBase64,
      });

      toast.success("Thumbnail generated successfully");
    } catch (error) {
      console.error("Failed to generate thumbnail:", error);
      toast.error("Failed to generate thumbnail");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
      {isGenerating && (
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 z-50">
          <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
          <span className="text-sm font-medium">Generating thumbnail...</span>
        </div>
      )}

      <SlidePreviewForThumbnail ref={previewRef} slide={slide} theme={theme} />
    </div>
  );
}
