"use client";

import { use, useState, useCallback } from "react";
import {
  Loader2,
  Palette,
  Plus,
  Trash2,
  ChevronLeft,
  Settings,
  Eye,
  Download,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SlideRenderer, ThemeSelector } from "../components";
import { useDraft, useUpdateDraft } from "@/services";
import { getTheme } from "@/lib/themes";
import { SlidePDF } from "@/lib/themes/export";
import { exportPDFAsPPTX } from "@/lib/themes/exportPPTX";

export default function SlideEditor({
  params,
}: {
  params: Promise<{ draftId: string }>;
}) {
  const { draftId } = use(params);
  const { data: draft, isLoading, isError } = useDraft(draftId);
  const updateDraftMutation = useUpdateDraft(draftId);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isExportingPPTX, setIsExportingPPTX] = useState(false);

  const handleThemeSelect = useCallback(
    (themeSlug: string) => {
      if (!draft) return;
      updateDraftMutation.mutate(
        {
          title: draft.title,
          slides: draft.slides,
          themeSlug: themeSlug,
        },
        {
          onSuccess: () => {
            setShowThemeSelector(false);
            toast.success("Theme updated successfully");
          },
          onError: () => toast.error("Failed to update theme"),
        }
      );
    },
    [draft, updateDraftMutation]
  );

  const handleExportPPTX = async () => {
    if (!draft || !theme) {
      toast.error("Cannot export: Missing draft or theme");
      return;
    }

    setIsExportingPPTX(true);
    try {
      // toast.loading("Converting to PPTX...", { id: "pptx-export" });

      // await exportPDFAsPPTX({
      //   slides: draft.slides,
      //   theme: theme.config,
      //   themeId: draft.themeSlug,
      //   title: draft.title,
      //   draftId: draftId,
      //   SlidePDFComponent: SlidePDF,
      // });

      toast.dismiss("pptx-export");
      toast.success("PPTX exported successfully!");
    } catch (error: any) {
      toast.dismiss("pptx-export");
      toast.error(error.message || "Failed to export PPTX");
      console.error("Export error:", error);
    } finally {
      setIsExportingPPTX(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );

  if (isError || !draft)
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Failed to load presentation
      </div>
    );

  const slides = draft.slides;
  const theme = getTheme(draft.themeSlug);
  const activeSlide = slides?.[activeSlideIndex];

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <h1 className="text-lg font-semibold text-gray-900">
            {draft.title || "Untitled Presentation"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium">
            {updateDraftMutation.isPending ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                Saving...
              </span>
            ) : (
              "All changes saved"
            )}
          </span>
          <div className="h-6 w-px bg-gray-200" />
          <button
            onClick={() => toast.info("Preview mode coming soon")}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>

          {theme && slides.length > 0 ? (
            <PDFDownloadLink
              document={
                <SlidePDF
                  slides={slides}
                  theme={theme.config}
                  themeId={draft.themeSlug}
                />
              }
              fileName={`${draft.title || "presentation"}.pdf`}
            >
              {({ loading }) => (
                <button
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  <Download className="w-4 h-4" />
                  {loading ? "Generating PDF..." : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>
          ) : (
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed"
              disabled
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          )}

          {theme && slides.length > 0 ? (
            <button
              onClick={handleExportPPTX}
              disabled={isExportingPPTX}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExportingPPTX ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              {isExportingPPTX ? "Exporting..." : "Export PPTX"}
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-400 opacity-50 cursor-not-allowed rounded-lg"
              disabled
            >
              <FileText className="w-4 h-4" />
              Export PPTX
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
            <h2 className="font-semibold text-gray-900 text-sm">Slides</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowThemeSelector(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Change Theme"
              >
                <Palette className="w-4 h-4 text-gray-600 hover:text-gray-900" />
              </button>
              <button
                onClick={() => setShowThemeSelector(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4 text-gray-600 hover:text-gray-900" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
            {draft?.slides?.map((slide, index) => (
              <div
                key={slide.id}
                onClick={() => setActiveSlideIndex(index)}
                className={`group relative cursor-pointer rounded-lg border-2 transition-all overflow-hidden ${
                  index === activeSlideIndex
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className="w-full bg-gray-100"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <SlideRenderer
                    slide={slide}
                    themeId={draft.themeSlug}
                    isEditing={false}
                  />
                </div>

                <div className="absolute top-1 left-1 bg-gray-900/60 text-white text-xs font-semibold px-2 py-1 rounded">
                  {index + 1}
                </div>

                {index === activeSlideIndex && (
                  <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    Active
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-3 flex gap-2">
            <button
              onClick={() => toast.info("Add slide logic here")}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Slide
            </button>
            <button
              onClick={() => toast.info("Delete slide logic here")}
              className="flex items-center justify-center gap-2 py-2 px-3 text-red-600 hover:bg-red-50 border border-red-200 text-sm font-medium rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </aside>

        <main className="flex-1 grid place-content-center p-6 bg-gray-50">
          <div
            className="relative bg-white rounded-xl shadow-2xl overflow-hidden"
            style={{
              aspectRatio: "16 / 9",
              width: "100%",
              maxWidth: "min(1280px, 90vw)",
              height: "auto",
            }}
          >
            {activeSlide ? (
              <SlideRenderer
                slide={activeSlide}
                themeId={draft.themeSlug}
                isEditing
              />
            ) : (
              <div className="grid place-content-center h-full text-gray-500">
                No slide selected
              </div>
            )}
          </div>
        </main>
      </div>

      {showThemeSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[85vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900">Choose Theme</h2>
            </div>
            <div className="p-6">
              <ThemeSelector
                selectedThemeId={draft.themeSlug}
                onSelectTheme={handleThemeSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
