"use client";

interface Slide {
  id: string;
  type: string;
  title: string;
  content: string[];
}

export default function SlidePreview({ slide }: { slide: Slide }) {
  return (
    <div className="aspect-video bg-white border border-gray-200 rounded overflow-hidden">
      <div className="h-full flex flex-col p-2 text-xs">
        <div className="font-semibold truncate">{slide.title}</div>
        <div className="mt-1 text-gray-600 space-y-0.5">
          {slide.content.slice(0, 3).map((item, idx) => (
            <div key={idx} className="truncate">
              • {item}
            </div>
          ))}
          {slide.content.length > 3 && <div className="text-gray-400">...</div>}
        </div>
      </div>
    </div>
  );
}
