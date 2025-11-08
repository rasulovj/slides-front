// components/workspace/PresentationEditor.tsx
"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components";
import {
  Download,
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  GripVertical,
  Loader2,
} from "lucide-react";
import {
  useAddSlide,
  useDeleteSlide,
  useDraft,
  useGeneratePPTX,
  useReorderSlides,
  useTheme,
  useUpdateDraft,
  useUpdateSlide,
} from "@/services";
import { Slide } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import SlidePreview from "./slidePreview";
import SlideEditor from "./slideEditor";
import VisualSlideEditor from "./visualEditor";
import ThumbnailUploader from "./uploadThumnail";

export default function PresentationEditor({ draftId }: { draftId: string }) {
  const router = useRouter();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [localTitle, setLocalTitle] = useState("");

  const { data: draft, isLoading, isError, error } = useDraft(draftId);
  const updateDraftMutation = useUpdateDraft(draftId);
  const updateSlideMutation = useUpdateSlide(draftId);
  const addSlideMutation = useAddSlide(draftId);
  const deleteSlideMutation = useDeleteSlide(draftId);
  const reorderSlidesMutation = useReorderSlides(draftId);
  const generatePPTXMutation = useGeneratePPTX();
  const { data: themeData } = useTheme(draft?.themeSlug || "");

  const debouncedTitle = useDebounce(localTitle, 1000);

  useEffect(() => {
    if (draft?.title) {
      startTransition(() => {
        setLocalTitle(draft.title);
      });
    }
  }, [draft?.title]);

  const handleSaveDraft = useCallback(() => {
    if (!draft) return;

    updateDraftMutation.mutate(
      {
        title: localTitle,
        slides: draft.slides,
      },
      {
        onSuccess: () => {
          toast.success("Draft saved successfully", { duration: 2000 });
        },
        onError: () => {
          toast.error("error", { duration: 2000 });
        },
      }
    );
  }, [draft, localTitle, updateDraftMutation]);

  useEffect(() => {
    if (debouncedTitle && debouncedTitle !== draft?.title) {
      handleSaveDraft();
    }
  }, [debouncedTitle, draft?.title, handleSaveDraft]);

  const handleUpdateSlide = useCallback(
    (slideId: string, updates: Partial<Slide>) => {
      updateSlideMutation.mutate(
        { slideId, data: updates },
        {
          onError: () => {
            toast.error("Draft not saved successfully", { duration: 2000 });
          },
        }
      );
    },
    [updateSlideMutation]
  );

  const handleAddSlide = useCallback(() => {
    addSlideMutation.mutate(
      {
        position: currentSlideIndex + 1,
        type: "content",
      },
      {
        onSuccess: () => {
          setCurrentSlideIndex(currentSlideIndex + 1);
          toast.success("Draft saved successfully", { duration: 2000 });
        },
        onError: () => {
          toast.error("Draft not saved successfully", { duration: 2000 });
        },
      }
    );
  }, [addSlideMutation, currentSlideIndex]);

  const handleDeleteSlide = useCallback(
    (slideId: string) => {
      if (!draft || draft.slides.length <= 1) {
        toast.error("Draft not saved successfully", { duration: 2000 });
        return;
      }

      deleteSlideMutation.mutate(slideId, {
        onSuccess: () => {
          if (currentSlideIndex >= draft.slides.length - 1) {
            setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
          }
          toast.success("Draft saved successfully", { duration: 2000 });
        },
        onError: () => {
          toast.error("Draft not saved successfully", { duration: 2000 });
        },
      });
    },
    [draft, currentSlideIndex, deleteSlideMutation]
  );

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination || !draft) return;

      const items = Array.from(draft.slides);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      reorderSlidesMutation.mutate(
        {
          slideOrder: items.map((s) => s.id),
        },
        {
          onError: () => {
            toast.error("Draft not saved successfully", { duration: 2000 });
          },
        }
      );
    },
    [draft, reorderSlidesMutation]
  );

  const handleGeneratePPTX = useCallback(() => {
    generatePPTXMutation.mutate(draftId, {
      onSuccess: () => {
        toast.success("Presentation is being generated", { duration: 2000 });
      },
      onError: (error) => {
        toast.error("error: " + error.message, { duration: 2000 });
      },
    });
  }, [draftId, generatePPTXMutation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-teal-600" />
          <p className="text-gray-600">Loading presentation...</p>
        </div>
      </div>
    );
  }

  if (isError || !draft) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error?.message || "Failed to load draft"}
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const currentSlide = draft.slides[currentSlideIndex];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <input
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 min-w-[300px]"
            placeholder="Untitled Presentation"
          />

          {updateDraftMutation.isPending && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={updateDraftMutation.isPending}
          >
            {updateDraftMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save
          </Button>

          <Button
            size="sm"
            onClick={handleGeneratePPTX}
            disabled={generatePPTXMutation.isPending}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {generatePPTXMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {generatePPTXMutation.isPending ? "Generating..." : "Download PPTX"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Slide Thumbnails */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddSlide}
              className="w-full mb-4"
              disabled={addSlideMutation.isPending}
            >
              {addSlideMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Add Slide
            </Button>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="slides">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {draft.slides.map((slide, index) => (
                      <Draggable
                        key={slide.id}
                        draggableId={slide.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`group relative rounded-lg border-2 transition-all cursor-pointer ${
                              currentSlideIndex === index
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-teal-300"
                            } ${snapshot.isDragging ? "shadow-lg" : ""}`}
                            onClick={() => setCurrentSlideIndex(index)}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                              <GripVertical className="h-4 w-4 text-gray-400" />
                            </div>

                            <div className="p-3">
                              <div className="text-xs text-gray-500 mb-1 font-medium">
                                Slide {index + 1}
                              </div>
                              <SlidePreview slide={slide} />
                            </div>

                            {draft.slides.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSlide(slide.id);
                                }}
                                disabled={deleteSlideMutation.isPending}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-100 disabled:opacity-50 z-10"
                              >
                                {deleteSlideMutation.isPending ? (
                                  <Loader2 className="h-3 w-3 animate-spin text-red-600" />
                                ) : (
                                  <Trash2 className="h-3 w-3 text-red-600" />
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-8 bg-linear-to-br from-gray-50 to-gray-100">
          <div className="max-w-6xl mx-auto">
            {currentSlide && themeData && (
              <VisualSlideEditor
                slide={currentSlide}
                theme={themeData}
                onUpdate={(updates) =>
                  handleUpdateSlide(currentSlide.id, updates)
                }
              />
            )}
            {draft && themeData && !draft.thumbnail && draft.slides[0] && (
              <ThumbnailUploader
                draftId={draftId}
                slide={draft.slides[0]}
                theme={themeData}
                currentThumbnail={draft.thumbnail}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
