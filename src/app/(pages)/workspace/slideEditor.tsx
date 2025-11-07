// components/workspace/SlideEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

interface Slide {
  id: string;
  type: string;
  title: string;
  content: string[];
  stats?: { label: string; value: string; description: string }[];
  chartData?: { label: string; value: number }[];
  imageUrl?: string;
  notes?: string;
}

interface SlideEditorProps {
  slide: Slide;
  onUpdate: (updates: Partial<Slide>) => void;
  themeSlug: string;
}

export default function SlideEditor({
  slide,
  onUpdate,
  themeSlug,
}: SlideEditorProps) {
  const [localSlide, setLocalSlide] = useState(slide);

  useEffect(() => {
    setLocalSlide(slide);
  }, [slide.id]);

  const updateField = (field: string, value: unknown) => {
    const updated = { ...localSlide, [field]: value };
    setLocalSlide(updated);
    onUpdate({ [field]: value });
  };

  const updateContent = (index: number, value: string) => {
    const newContent = [...localSlide.content];
    newContent[index] = value;
    updateField("content", newContent);
  };

  const addContentItem = () => {
    updateField("content", [...localSlide.content, ""]);
  };

  const removeContentItem = (index: number) => {
    const newContent = localSlide.content.filter((_, i) => i !== index);
    updateField("content", newContent);
  };

  const addStat = () => {
    const stats = localSlide.stats || [];
    updateField("stats", [
      ...stats,
      { label: "New Stat", value: "0%", description: "Description" },
    ]);
  };

  const updateStat = (index: number, field: string, value: string) => {
    const stats = [...(localSlide.stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    updateField("stats", stats);
  };

  const removeStat = (index: number) => {
    const stats = (localSlide.stats || []).filter((_, i) => i !== index);
    updateField("stats", stats);
  };

  const addChartData = () => {
    const chartData = localSlide.chartData || [];
    updateField("chartData", [...chartData, { label: "Item", value: 0 }]);
  };

  const updateChartData = (index: number, field: string, value: unknown) => {
    const chartData = [...(localSlide.chartData || [])];
    chartData[index] = { ...chartData[index], [field]: value };
    updateField("chartData", chartData);
  };

  const removeChartData = (index: number) => {
    const chartData = (localSlide.chartData || []).filter(
      (_, i) => i !== index
    );
    updateField("chartData", chartData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Slide Preview */}
      <div className="aspect-video bg-linear-to-br from-teal-50 to-cyan-50 border-b border-gray-200 p-12 relative">
        <div className="absolute top-4 right-4">
          <Select
            value={localSlide.type}
            onValueChange={(v) => updateField("type", v)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title Slide</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="stats">Statistics</SelectItem>
              <SelectItem value="chart">Chart</SelectItem>
              <SelectItem value="timeline">Timeline</SelectItem>
              <SelectItem value="closing">Closing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preview rendering based on type */}
        {localSlide.type === "title" && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {localSlide.title}
            </h1>
            {localSlide.content[0] && (
              <p className="text-2xl text-gray-600">{localSlide.content[0]}</p>
            )}
          </div>
        )}

        {localSlide.type === "content" && (
          <div className="h-full">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {localSlide.title}
            </h2>
            <ul className="space-y-4 text-xl">
              {localSlide.content.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-teal-600 mr-3">•</span>
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {localSlide.type === "stats" && (
          <div className="h-full">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {localSlide.title}
            </h2>
            <div className="space-y-6">
              {(localSlide.stats || []).map((stat, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="text-5xl font-bold text-teal-600">
                    {stat.value}
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-900">
                      {stat.label}
                    </div>
                    <div className="text-gray-600">{stat.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add more preview types as needed */}
      </div>

      {/* Editor Tabs */}
      <div className="p-6">
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            {localSlide.type === "stats" && (
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            )}
            {localSlide.type === "chart" && (
              <TabsTrigger value="chart">Chart Data</TabsTrigger>
            )}
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <div>
              <Label htmlFor="title">Slide Title</Label>
              <Input
                id="title"
                value={localSlide.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="mt-1"
                placeholder="Enter slide title"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Content Items</Label>
                <Button variant="outline" size="sm" onClick={addContentItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-2">
                {localSlide.content.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Textarea
                      value={item}
                      onChange={(e) => updateContent(idx, e.target.value)}
                      className="flex-1"
                      rows={2}
                      placeholder={`Content item ${idx + 1}`}
                    />
                    {localSlide.content.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeContentItem(idx)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {(localSlide.type === "image" || localSlide.type === "closing") && (
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="imageUrl"
                    value={localSlide.imageUrl || ""}
                    onChange={(e) => updateField("imageUrl", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button variant="outline">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Stats Tab */}
          {localSlide.type === "stats" && (
            <TabsContent value="stats" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Label>Statistics</Label>
                <Button variant="outline" size="sm" onClick={addStat}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Stat
                </Button>
              </div>

              <div className="space-y-4">
                {(localSlide.stats || []).map((stat, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <Label>Stat {idx + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStat(idx)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Value</Label>
                        <Input
                          value={stat.value}
                          onChange={(e) =>
                            updateStat(idx, "value", e.target.value)
                          }
                          placeholder="40%"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={stat.label}
                          onChange={(e) =>
                            updateStat(idx, "label", e.target.value)
                          }
                          placeholder="Growth Rate"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={stat.description}
                        onChange={(e) =>
                          updateStat(idx, "description", e.target.value)
                        }
                        rows={2}
                        placeholder="Additional details..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Chart Data Tab */}
          {localSlide.type === "chart" && (
            <TabsContent value="chart" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Label>Chart Data Points</Label>
                <Button variant="outline" size="sm" onClick={addChartData}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Data
                </Button>
              </div>

              <div className="space-y-2">
                {(localSlide.chartData || []).map((data, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      value={data.label}
                      onChange={(e) =>
                        updateChartData(idx, "label", e.target.value)
                      }
                      placeholder="Label"
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={data.value}
                      onChange={(e) =>
                        updateChartData(
                          idx,
                          "value",
                          parseFloat(e.target.value)
                        )
                      }
                      placeholder="Value"
                      className="w-24"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeChartData(idx)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Notes Tab */}
          <TabsContent value="notes">
            <div>
              <Label htmlFor="notes">Speaker Notes</Label>
              <Textarea
                id="notes"
                value={localSlide.notes || ""}
                onChange={(e) => updateField("notes", e.target.value)}
                className="mt-1"
                rows={8}
                placeholder="Add notes for this slide..."
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
