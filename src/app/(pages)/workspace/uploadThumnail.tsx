import { useEffect, useRef, useState } from "react";
import { useThumbnailGenerator } from "@/app/(pages)/workspace/thumnailGenerator";
import { useUpdateDraftThumbnail } from "@/services/draftServices";
import SlidePreviewForThumbnail from "./slidePreviewForThumnail";
import { Slide } from "@/types";
import { Loader2 } from "lucide-react";

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
}: ThumbnailUploaderProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateThumbnail } = useThumbnailGenerator();
  const updateThumbnailMutation = useUpdateDraftThumbnail();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!theme || !previewRef.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      generateAndUpload();
    }, 2000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [slide, theme]);

  const generateAndUpload = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const thumbnailBase64 = await generateThumbnail(previewRef.current);
      await updateThumbnailMutation.mutateAsync({
        draftId,
        thumbnail: thumbnailBase64,
      });
    } catch (error) {
      console.error("Failed to generate thumbnail:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <SlidePreviewForThumbnail ref={previewRef} slide={slide} theme={theme} />
    </div>
  );
}
