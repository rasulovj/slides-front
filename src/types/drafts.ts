// lib/types/draft.ts
export interface Slide {
  id: string;
  type:
    | "title"
    | "content"
    | "stats"
    | "timeline"
    | "chart"
    | "closing"
    | "image";
  title: string;
  content: string[];
  position: number;
  layout?: string;
  backgroundColor?: string;
  textColor?: string;
  stats?: {
    label: string;
    value: string;
    description: string;
  }[];
  chartData?: {
    label: string;
    value: number;
  }[];
  imageUrl?: string;
  notes?: string;
}

export interface Draft {
  id: string;
  title: string;
  topic: string;
  language: string;
  themeSlug: string;
  slides: Slide[];
  status: "draft" | "generating" | "completed";
  lastEditedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface DraftListItem {
  id: string;
  title: string;
  topic: string;
  themeSlug: string;
  slideCount: number;
  status: string;
  lastEditedAt: string;
  createdAt: string;
}

export interface CreateDraftRequest {
  topic: string;
  language: string;
  themeSlug: string;
}

export interface UpdateDraftRequest {
  title?: string;
  slides?: Slide[];
}

export interface AddSlideRequest {
  position: number;
  type: Slide["type"];
}

export interface ReorderSlidesRequest {
  slideOrder: string[];
}
