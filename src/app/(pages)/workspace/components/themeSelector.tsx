// components/theme/ThemeSelector.tsx
"use client";

import { useState } from "react";
import { getAllThemes, getThemesByCategory } from "@/lib/themes";
import { Check, Lock, Sparkles } from "lucide-react";

interface ThemeSelectorProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
  userIsPremium?: boolean;
}

export function ThemeSelector({
  selectedThemeId,
  onSelectTheme,
  userIsPremium = false,
}: ThemeSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allThemes = getAllThemes();
  const categories = [
    "all",
    "professional",
    "creative",
    "minimal",
    "bold",
    "dark",
  ];

  const filteredThemes =
    selectedCategory === "all"
      ? allThemes
      : getThemesByCategory(selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredThemes.map((theme) => {
          const isSelected = theme.config.id === selectedThemeId;
          const isLocked = theme.config.isPremium && !userIsPremium;

          return (
            <button
              key={theme.config.id}
              onClick={() => {
                if (!isLocked) {
                  onSelectTheme(theme.config.id);
                }
              }}
              disabled={isLocked}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 ${
                isSelected
                  ? "border-teal-500 shadow-lg ring-4 ring-teal-200"
                  : "border-gray-200 hover:border-teal-300"
              } ${
                isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {/* Preview */}
              <div
                className="aspect-video relative"
                style={{ background: theme.config.colors.background }}
              >
                {/* Mini preview of theme */}
                <div
                  className="absolute inset-0 p-4"
                  style={{
                    background: `linear-gradient(135deg, ${theme.config.colors.primary} 0%, ${theme.config.colors.secondary} 100%)`,
                  }}
                >
                  <div className="text-white text-xs font-bold">
                    {theme.config.name}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                    {[
                      theme.config.colors.primary,
                      theme.config.colors.secondary,
                      theme.config.colors.accent,
                    ].map((color, idx) => (
                      <div
                        key={idx}
                        className="h-2 flex-1 rounded"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-teal-500 rounded-full p-1.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}

                {/* Premium Badge */}
                {theme.config.isPremium && (
                  <div className="absolute top-2 left-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-semibold">
                    {isLocked ? (
                      <Lock className="h-3 w-3" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                    Premium
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {theme.config.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {theme.config.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
