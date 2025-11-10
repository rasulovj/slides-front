"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateDraft } from "@/services/draftServices";
import {
  Button,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components";
import { Shuffle, X, Sparkles, FileText } from "lucide-react";
import { ThemeSelector } from "../workspace/components/themeSelector";

const examplePrompts = [
  "Leadership offsite presentation on cross-functional alignment",
  "Performance insights summary",
  "Annual report highlights",
  "Leadership development roadmap",
  "All-hands meeting on organizational culture transformation",
  "Business continuity review for upcoming fiscal year",
];

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [lang, setLang] = useState("en");
  const [count, setCount] = useState("5");
  const [theme, setTheme] = useState("executive");
  const [tempTheme, setTempTheme] = useState(theme);
  const { mutateAsync: createDraft, isPending } = useCreateDraft();
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt) return;

    try {
      const { draftId } = await createDraft({
        topic: prompt,
        language: lang,
        themeSlug: theme,
        slideCount: count,
      });

      router.push(`/workspace/${draftId}`);
    } catch (err: any) {
      console.error("Failed to create draft:", err.message);
      alert("Error: " + err.message);
    }
  };

  const shufflePrompts = () => {
    const randomPrompt =
      examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setPrompt(randomPrompt);
  };

  const handleClose = () => window.history.back();

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-teal-50 to-teal-100 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 z-10 group border border-teal-100"
        aria-label="Close"
      >
        <X className="h-5 w-5 text-gray-700 group-hover:text-teal-600 transition-colors" />
      </button>

      <div className="max-w-3xl w-full text-center space-y-8 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-teal-500 to-cyan-500 shadow-lg mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Create Your Presentation
          </h1>
          <p className="text-gray-600 text-lg">
            Describe your vision and let AI bring it to life
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-teal-100">
          <div className="flex justify-center gap-2">
            <div className="flex flex-wrap justify-center gap-3">
              <Select value={count} onValueChange={setCount}>
                <SelectTrigger className="w-[150px] h-11 rounded-xl border-2 border-gray-200 hover:border-teal-300 transition-colors">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Select value={lang} onValueChange={setLang}>
                <SelectTrigger className="w-[150px] h-11 rounded-xl border-2 border-gray-200 hover:border-teal-300 transition-colors">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="uz">🇺🇿 Uzbek</SelectItem>
                  <SelectItem value="ru">🇷🇺 Russian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-xl px-6 py-2 text-sm bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg transition-all hover:shadow-xl">
                  Choose Theme
                </Button>
              </DialogTrigger>
              <DialogTitle>
                <DialogContent className="max-w-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Choose a Theme
                  </h3>
                  <ThemeSelector
                    selectedThemeId={tempTheme}
                    onSelectTheme={(id) => setTempTheme(id)}
                  />
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={() => {
                        setTheme(tempTheme);
                      }}
                      className="rounded-xl px-6 py-2 text-sm bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg transition-all hover:shadow-xl"
                    >
                      Confirm
                    </Button>
                  </div>
                </DialogContent>
              </DialogTitle>
            </Dialog>
          </div>

          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your presentation in detail..."
              className="h-32 text-base resize-none border-2 border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all shadow-sm rounded-2xl pt-4 pr-28 bg-gray-50/50 focus:bg-white"
            />
            <Button
              onClick={handleGenerate}
              disabled={!prompt || isPending}
              className="absolute bottom-4 right-4 rounded-xl px-6 py-2 text-sm bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-xl"
            >
              {isPending ? (
                "Generating..."
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" /> Generate
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-teal-600" />
            <h2 className="uppercase tracking-wider text-gray-600 text-sm font-semibold">
              Example Prompts
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {examplePrompts.map((ex, i) => (
              <button
                key={i}
                onClick={() => setPrompt(ex)}
                className="text-left bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-teal-300 rounded-2xl p-4 text-sm shadow-sm transition-all hover:shadow-md hover:scale-[1.02] group"
              >
                <span className="text-gray-700 group-hover:text-teal-700 transition-colors">
                  {ex}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              onClick={shufflePrompts}
              className="gap-2 text-sm hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-colors"
            >
              <Shuffle className="h-4 w-4" /> Shuffle prompts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
