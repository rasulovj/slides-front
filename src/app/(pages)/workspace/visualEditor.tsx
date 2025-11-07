// components/workspace/VisualSlideEditor.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Slide } from "@/types";
import ContentEditable from "react-contenteditable";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Image,
  Type,
  Palette,
} from "lucide-react";

interface VisualSlideEditorProps {
  slide: Slide;
  theme: any;
  onUpdate: (updates: Partial<Slide>) => void;
}

export default function VisualSlideEditor({
  slide,
  theme,
  onUpdate,
}: VisualSlideEditorProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [localTitle, setLocalTitle] = useState(slide.title);
  const [localContent, setLocalContent] = useState(slide.content);

  useEffect(() => {
    setLocalTitle(slide.title);
    setLocalContent(slide.content);
  }, [slide.id]);

  const handleTitleBlur = () => {
    if (localTitle !== slide.title) {
      onUpdate({ title: localTitle });
    }
  };

  const handleContentBlur = (index: number, value: string) => {
    const newContent = [...localContent];
    newContent[index] = value;
    setLocalContent(newContent);
    onUpdate({ content: newContent });
  };

  const addContentItem = () => {
    const newContent = [...localContent, "New bullet point"];
    setLocalContent(newContent);
    onUpdate({ content: newContent });
  };

  const removeContentItem = (index: number) => {
    const newContent = localContent.filter((_, i) => i !== index);
    setLocalContent(newContent);
    onUpdate({ content: newContent });
  };

  const getSlideStyles = () => {
    const baseStyles = {
      width: "100%",
      aspectRatio: "16/9",
      borderRadius: "12px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      overflow: "hidden",
      position: "relative" as const,
    };

    switch (slide.type) {
      case "title":
      case "closing":
        return {
          ...baseStyles,
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
        };
      default:
        return {
          ...baseStyles,
          background: theme.colors.background,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Formatting Toolbar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 border-r pr-2">
          <Button variant="ghost" size="sm" title="Bold">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Italic">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Underline">
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 border-r pr-2">
          <Button variant="ghost" size="sm" title="Align Left">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Align Center">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Align Right">
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 border-r pr-2">
          <Button variant="ghost" size="sm" title="Add List">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Add Image">
            <Image className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" title="Text Size">
            <Type className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Colors">
            <Palette className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Visual Slide Canvas */}
      <div style={getSlideStyles()}>
        {/* Title Slide Layout */}
        {slide.type === "title" && (
          <div className="h-full flex flex-col items-center justify-center text-center p-16">
            <ContentEditable
              html={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onClick={() => setSelectedElement("title")}
              className={`text-6xl font-bold text-white mb-6 outline-none cursor-text transition-all ${
                selectedElement === "title"
                  ? "ring-2 ring-white/50 rounded-lg p-4"
                  : ""
              }`}
              style={{
                fontFamily: theme.fonts.heading,
                minHeight: "80px",
              }}
            />

            {localContent[0] && (
              <ContentEditable
                html={localContent[0]}
                onChange={(e) => {
                  const newContent = [...localContent];
                  newContent[0] = e.target.value;
                  setLocalContent(newContent);
                }}
                onBlur={() => handleContentBlur(0, localContent[0])}
                onClick={() => setSelectedElement("subtitle")}
                className={`text-3xl text-white/90 outline-none cursor-text transition-all ${
                  selectedElement === "subtitle"
                    ? "ring-2 ring-white/50 rounded-lg p-4"
                    : ""
                }`}
                style={{
                  fontFamily: theme.fonts.body,
                  minHeight: "50px",
                }}
              />
            )}
          </div>
        )}

        {/* Content Slide Layout */}
        {slide.type === "content" && (
          <div className="h-full p-16">
            {/* Title Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-24 flex items-center px-16"
              style={{ background: theme.colors.primary }}
            >
              <ContentEditable
                html={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onClick={() => setSelectedElement("title")}
                className={`text-4xl font-bold text-white outline-none cursor-text transition-all ${
                  selectedElement === "title"
                    ? "ring-2 ring-white/50 rounded-lg p-2"
                    : ""
                }`}
                style={{
                  fontFamily: theme.fonts.heading,
                }}
              />
            </div>

            {/* Content Area */}
            <div className="mt-24 pt-12 space-y-6">
              {localContent.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <span
                    className="text-3xl font-bold mt-1"
                    style={{ color: theme.colors.primary }}
                  >
                    •
                  </span>
                  <ContentEditable
                    html={item}
                    onChange={(e) => {
                      const newContent = [...localContent];
                      newContent[index] = e.target.value;
                      setLocalContent(newContent);
                    }}
                    onBlur={() => handleContentBlur(index, localContent[index])}
                    onClick={() => setSelectedElement(`content-${index}`)}
                    className={`flex-1 text-2xl outline-none cursor-text transition-all ${
                      selectedElement === `content-${index}`
                        ? "ring-2 ring-teal-500 rounded-lg p-2"
                        : ""
                    }`}
                    style={{
                      fontFamily: theme.fonts.body,
                      color: theme.colors.text,
                      minHeight: "40px",
                    }}
                  />
                  <button
                    onClick={() => removeContentItem(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addContentItem}
                className="mt-4"
              >
                + Add Bullet Point
              </Button>
            </div>
          </div>
        )}

        {/* Stats Slide Layout */}
        {slide.type === "stats" && (
          <div className="h-full p-16">
            <ContentEditable
              html={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={handleTitleBlur}
              className="text-5xl font-bold mb-12 outline-none cursor-text"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.text,
              }}
            />

            <div className="space-y-10">
              {(slide.stats || []).map((stat, index) => (
                <div key={index} className="flex items-start gap-8">
                  <div
                    className="text-7xl font-bold"
                    style={{
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.heading,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-3xl font-semibold mb-2"
                      style={{
                        color: theme.colors.text,
                        fontFamily: theme.fonts.heading,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="text-xl"
                      style={{
                        color: theme.colors.textLight,
                        fontFamily: theme.fonts.body,
                      }}
                    >
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Slide Notes */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Speaker Notes
        </label>
        <textarea
          value={slide.notes || ""}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Add notes for this slide..."
        />
      </div>
    </div>
  );
}
