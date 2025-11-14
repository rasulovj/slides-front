import { SlideLayoutProps } from "../../types";
import type { SlideSection, SlideContentItem } from "../../types";

const isSlideSection = (item: SlideContentItem): item is SlideSection => {
  return (
    typeof item === "object" &&
    item !== null &&
    ("title" in item || "points" in item || "description" in item)
  );
};

const renderItemText = (item?: SlideContentItem): string => {
  if (item == null) return "";
  if (typeof item === "string" || typeof item === "number") return `${item}`;
  if (isSlideSection(item)) {
    if (item.title && Array.isArray(item.points)) {
      return `${item.title}: ${item.points.join(", ")}`;
    }
    if (item.title) return item.title;
    if (item.description) return item.description;
  }
  if ("year" in item && item.year && "event" in item && item.event) {
    return `${item.year} — ${item.event}`;
  }
  if ("aspect" in item) {
    const { aspect, ...rest } = item as Record<string, unknown>;
    const comparisons = Object.values(rest)
      .filter((value): value is string | number => {
        return (
          (typeof value === "string" && value.trim().length > 0) ||
          typeof value === "number"
        );
      })
      .map((value) => `${value}`);

    if (!aspect && comparisons.length === 0) return "";
    if (!aspect) return comparisons.join(" vs ");
    if (comparisons.length === 0) return `${aspect}`;
    return `${aspect}: ${comparisons.join(" vs ")}`;
  }
  return JSON.stringify(item);
};

export const ExecutiveLayouts = {
  title: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: theme.colors.surface }}
    >
      <div
        className="absolute right-[4%] top-[840px] w-[20%] h-[400px]"
        style={{
          background: theme.colors.accent,
          transform: "rotate(20deg)",
          transformOrigin: "bottom-right",
        }}
      />
      <div
        className="absolute right-[-10%] bottom-28 w-[60%] h-[3000px]"
        style={{
          background: theme.colors.primary,
          transform: "rotate(-12deg)",
          transformOrigin: "top right",
        }}
      />
      <div
        className="absolute right-[-12%] bottom-28 w-[50%] h-[3000px]"
        style={{
          background: theme.colors.secondary,
          transform: "rotate(-12deg)",
          transformOrigin: "top right",
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-center px-20">
        <h1
          className="text-8xl font-bold leading-tight max-w-5xl"
          style={{
            color: "#002f6e",
            fontFamily: theme.fonts.heading.family,
            fontWeight: theme.fonts.heading.weight.bold,
          }}
        >
          {slide.title}
        </h1>

        {slide.subtitle && (
          <div
            className="max-w-[600px] flex items-center h-[100px] mt-20 p-4 rounded-lg"
            style={{
              backgroundColor: theme.colors.primary,
            }}
          >
            <p
              className="text-4xl"
              style={{
                color: theme.colors.textLight,
                fontFamily: theme.fonts.body.family,
              }}
            >
              {slide.subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  ),

  plan: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full p-20"
      style={{ background: theme.colors.background }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-48 flex items-center px-20"
        style={{ background: theme.colors.primary }}
      >
        <h2
          className="text-5xl font-bold"
          style={{
            color: "#FFFFFF",
            fontFamily: theme.fonts.heading.family,
          }}
        >
          {slide.title}
        </h2>
      </div>
      <div
        className="absolute top-0 right-0 w-32 h-56"
        style={{
          background: theme.colors.secondary,
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />

      <div className="flex flex-col gap-4 mt-32">
        {slide.content.map((item, idx) => {
          if (typeof item === "string") {
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl shadow-md bg-white border border-gray-100"
              >
                <p
                  className="text-2xl leading-relaxed"
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body.family,
                  }}
                >
                  {item}
                </p>
              </div>
            );
          }

          if (isSlideSection(item)) {
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl shadow-md bg-white border border-gray-100 flex flex-col"
              >
                {item.title && (
                  <h3
                    className="text-3xl font-semibold mb-4"
                    style={{
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.heading.family,
                    }}
                  >
                    {item.title}
                  </h3>
                )}
                {Array.isArray(item.points) && (
                  <ul className="space-y-3">
                    {item.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-2xl"
                        style={{
                          color: theme.colors.text,
                          fontFamily: theme.fonts.body.family,
                        }}
                      >
                        <span
                          className="text-primary text-3xl leading-none"
                          style={{ color: theme.colors.accent }}
                        >
                          •
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {item.description && (
                  <p
                    className="mt-4 text-2xl text-gray-600"
                    style={{
                      color: theme.colors.textLight,
                      fontFamily: theme.fonts.body.family,
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="p-8 rounded-2xl shadow-md bg-white border border-gray-100"
            >
              <p
                className="text-2xl leading-relaxed"
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body.family,
                }}
              >
                {renderItemText(item)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  ),

  content: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full relative"
      style={{ background: theme.colors.background }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-48 flex items-center px-20"
        style={{ background: theme.colors.primary }}
      >
        <h2
          className="text-5xl font-bold"
          style={{
            color: "#FFFFFF",
            fontFamily: theme.fonts.heading.family,
          }}
        >
          {slide.title}
        </h2>
      </div>
      <div
        className="absolute top-0 right-0 w-32 h-56"
        style={{
          background: theme.colors.secondary,
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />

      <div className="pt-72 px-20">
        <ul className="space-y-16">
          {slide.content.map((item, idx) => (
            <li key={idx} className="flex items-start gap">
              <span
                className="text-3xl flex-1 leading-loose"
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body.family,
                }}
              >
                {renderItemText(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),

  twoColumn: ({ slide, theme }: SlideLayoutProps) => {
    const [leftTitleItem, leftTextItem, rightTitleItem, rightTextItem] =
      slide.content ?? [];

    const leftTitle = renderItemText(leftTitleItem);
    const leftText = renderItemText(leftTextItem);
    const rightTitle = renderItemText(rightTitleItem);
    const rightText = renderItemText(rightTextItem);

    return (
      <div
        className="w-full h-full p-20"
        style={{ background: theme.colors.background }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-48 flex items-center px-20"
          style={{ background: theme.colors.primary }}
        >
          <h2
            className="text-5xl font-bold"
            style={{
              color: "#FFFFFF",
              fontFamily: theme.fonts.heading.family,
            }}
          >
            {slide.title}
          </h2>
        </div>
        <div
          className="absolute top-0 right-0 w-32 h-56"
          style={{
            background: theme.colors.secondary,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        <div className="grid grid-cols-2 gap-16 h-[700px] pt-64">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-10 flex flex-col">
            <h3
              className="text-4xl font-bold mb-6"
              style={{
                color: theme.colors.primary,
                fontFamily: theme.fonts.heading.family,
              }}
            >
              {leftTitle}
            </h3>
            <p
              className="text-3xl leading-relaxed"
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body.family,
              }}
            >
              {leftText}
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-10 flex flex-col">
            <h3
              className="text-4xl font-bold mb-6"
              style={{
                color: theme.colors.secondary,
                fontFamily: theme.fonts.heading.family,
              }}
            >
              {rightTitle}
            </h3>
            <p
              className="text-3xl leading-relaxed"
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body.family,
              }}
            >
              {rightText}
            </p>
          </div>
        </div>
      </div>
    );
  },

  cards: ({ slide, theme }: SlideLayoutProps) => {
    const parseCard = (item: string) => {
      const [title, ...desc] = item.split(":");
      return {
        title: title.trim(),
        desc: desc.join(":").trim(),
      };
    };

    return (
      <div
        className="w-full h-full p-20 relative"
        style={{ background: theme.colors.background }}
      >
        {/* Header */}
        <div
          className="absolute top-0 left-0 right-0 h-48 flex items-center px-20"
          style={{ background: theme.colors.primary }}
        >
          <h2
            className="text-5xl font-bold text-white"
            style={{ fontFamily: theme.fonts.heading.family }}
          >
            {slide.title}
          </h2>
        </div>

        {/* Accent corner */}
        <div
          className="absolute top-0 right-0 w-32 h-56"
          style={{
            background: theme.colors.secondary,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        <div className="mt-60 grid grid-cols-2 gap-10">
          {slide.content.map((item, idx) => {
            const { title, desc } = parseCard(item as string);

            return (
              <div
                key={idx}
                className="p-10 rounded-3xl shadow-md hover:shadow-xl transition-all"
                style={{
                  background: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.heading.family,
                  }}
                >
                  {title}
                </h3>

                <p
                  className="text-xl leading-relaxed opacity-90"
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body.family,
                  }}
                >
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  },

  stats: ({ slide, theme }: SlideLayoutProps) => {
    let stats: { label: string; value: string; description: string }[] = [];

    if (slide.stats?.length) {
      stats = slide.stats.map((s) => ({
        label: s.label,
        value: s.value,
        description: s.description ?? "",
      }));
    } else if (slide.content?.length >= 3) {
      for (let i = 0; i < slide.content.length; i += 3) {
        stats.push({
          label: slide.content[i] as string,
          value: slide.content[i + 1] as string,
          description: slide.content[i + 2] as string,
        });
      }
    }

    if (!stats.length) {
      return (
        <div
          className="w-full h-full flex items-center justify-center text-4xl text-gray-500"
          style={{ background: theme.colors.background }}
        >
          No statistics available
        </div>
      );
    }

    return (
      <div
        className="w-full h-full p-20 relative"
        style={{ background: theme.colors.background }}
      >
        {/* Header */}
        <div
          className="absolute top-0 left-0 right-0 h-48 flex items-center px-20"
          style={{ background: theme.colors.primary }}
        >
          <h2
            className="text-5xl font-bold text-white"
            style={{ fontFamily: theme.fonts.heading.family }}
          >
            {slide.title}
          </h2>
        </div>

        <div
          className="absolute top-0 right-0 w-32 h-56"
          style={{
            background: theme.colors.secondary,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        <div className="grid grid-cols-3 gap-14 pt-72">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-12 flex flex-col items-center text-center shadow-xl hover:scale-[1.02] transition-transform"
              style={{
                background: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <h3
                className="text-4xl font-extrabold mb-4 tracking-tight"
                style={{
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.heading.family,
                }}
              >
                {stat.value}
              </h3>

              <div
                className="h-2 w-20 rounded-full mb-6"
                style={{ background: theme.colors.accent }}
              />

              <div
                className="text-2xl font-semibold mb-4"
                style={{
                  color: theme.colors.textDark,
                  fontFamily: theme.fonts.heading.family,
                }}
              >
                {stat.label}
              </div>

              <p
                className="text-3xl leading-relaxed opacity-80"
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body.family,
                }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
  quote: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center p-24"
      style={{ background: theme.colors.background }}
    >
      <div
        className="text-9xl mb-8"
        style={{ color: theme.colors.primary }}
      ></div>
      <blockquote
        className="text-6xl italic mb-16 max-w-5xl leading-relaxed"
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.heading.family,
        }}
      >
        {slide.quote?.text}
      </blockquote>
      <cite
        className="text-4xl not-italic font-semibold"
        style={{
          color: theme.colors.textLight,
          fontFamily: theme.fonts.body.family,
        }}
      >
        — {slide.quote?.author}
      </cite>
    </div>
  ),

  comparison: ({ slide, theme }: SlideLayoutProps) => {
    if (!slide.content || slide.content.length < 4) {
      return (
        <div
          className="w-full h-full flex items-center justify-center text-4xl text-gray-500"
          style={{ background: theme.colors.background }}
        >
          Not enough data for comparison
        </div>
      );
    }

    const isStructured = slide.content.every((c: any) => typeof c === "object");
    let left: any = {};
    let right: any = {};

    if (isStructured) {
      [left, right] = slide.content as any[];
    } else {
      const mid = Math.floor(slide.content.length / 2);
      left = {
        title: slide.content[0],
        points: slide.content.slice(1, mid),
      };
      right = {
        title: slide.content[mid],
        points: slide.content.slice(mid + 1),
      };
    }

    return (
      <div
        className="w-full h-full p-20 flex flex-col items-center relative"
        style={{ background: theme.colors.background }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-48 flex items-center px-20"
          style={{ background: theme.colors.primary }}
        >
          <h2
            className="text-5xl font-bold"
            style={{
              color: "#FFFFFF",
              fontFamily: theme.fonts.heading.family,
            }}
          >
            {slide.title}
          </h2>
        </div>

        <div
          className="absolute top-0 right-0 w-32 h-56"
          style={{
            background: theme.colors.secondary,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        <div className="mt-56 grid grid-cols-2 gap-12 w-full max-w-7xl relative">
          <div className="absolute left-1/2 top-0 bottom-0 flex justify-center">
            <div className="w-[2px] h-full bg-gray-300 opacity-40"></div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-12 flex flex-col gap-6">
            <h3
              className="text-4xl font-bold text-center"
              style={{
                color: theme.colors.primary,
                fontFamily: theme.fonts.heading.family,
              }}
            >
              {left.title}
            </h3>

            <div
              className="h-2 w-24 mx-auto rounded-full"
              style={{ background: theme.colors.primary }}
            />

            <ul className="space-y-4 mt-6">
              {left.points?.map((p: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-2xl leading-relaxed"
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body.family,
                  }}
                >
                  <span
                    className="text-3xl leading-none"
                    style={{ color: theme.colors.accent }}
                  ></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-12 flex flex-col gap-6">
            <h3
              className="text-4xl font-bold text-center"
              style={{
                color: theme.colors.secondary,
                fontFamily: theme.fonts.heading.family,
              }}
            >
              {right.title}
            </h3>

            <div
              className="h-2 w-24 mx-auto rounded-full"
              style={{ background: theme.colors.secondary }}
            />

            <ul className="space-y-4 mt-6">
              {right.points?.map((p: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-2xl leading-relaxed"
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body.family,
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },

  closing: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center p-20"
      style={{
        background: theme.colors.background, // clean solid background
      }}
    >
      {/* Top Accent Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-8"
        style={{ background: theme.colors.primary }}
      />

      <h1
        className="text-7xl font-bold mb-8"
        style={{
          color: theme.colors.primary,
          fontFamily: theme.fonts.heading.family,
        }}
      >
        {slide.title}
      </h1>

      {slide.content?.[0] && (
        <p
          className="text-3xl mb-20 max-w-4xl"
          style={{
            color: theme.colors.text,
            opacity: 0.85,
            fontFamily: theme.fonts.body.family,
          }}
        >
          {renderItemText(slide.content[0])}
        </p>
      )}

      <div className="flex gap-10">
        <div
          className="px-10 py-6 rounded-2xl shadow-md"
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <span
            className="text-2xl"
            style={{
              color: theme.colors.textDark,
              fontFamily: theme.fonts.body.family,
            }}
          >
            📧 jamshidbekrasulov@gmail.com
          </span>
        </div>

        <div
          className="px-10 py-6 rounded-2xl shadow-md"
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <span
            className="text-2xl"
            style={{
              color: theme.colors.textDark,
              fontFamily: theme.fonts.body.family,
            }}
          >
            🌐 slidemind.uz
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-6"
        style={{ background: theme.colors.secondary }}
      />
    </div>
  ),
};
