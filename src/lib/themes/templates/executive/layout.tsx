import { SlideLayoutProps } from "../../types";
import type { SlideSection, SlideContentItem } from "../../types";

const isSlideSection = (item: SlideContentItem): item is SlideSection => {
  return (
    typeof item === "object" &&
    item !== null &&
    ("title" in item || "points" in item || "description" in item)
  );
};

const renderItemText = (item: any): string => {
  if (typeof item === "string") return item;
  if (item.title && Array.isArray(item.points))
    return `${item.title}: ${item.points.join(", ")}`;
  if (item.year && item.event) return `${item.year} — ${item.event}`;
  if (item.aspect && item.samsung && item.apple)
    return `${item.aspect}: ${item.samsung} vs ${item.apple}`;
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

      <div className="pt-56 px-20">
        <ul className="space-y-8">
          {slide.content.map((item, idx) => (
            <li key={idx} className="flex items-start gap-6">
              <span
                className="text-5xl font-bold mt-2"
                style={{ color: theme.colors.primary }}
              >
                •
              </span>
              <span
                className="text-3xl flex-1 leading-relaxed"
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

  cards: ({ slide, theme }: SlideLayoutProps) => {
    if (!slide.content || slide.content.length === 0) {
      return (
        <div
          className="w-full h-full flex items-center justify-center text-4xl text-gray-500"
          style={{ background: theme.colors.background }}
        >
          No content available
        </div>
      );
    }

    const parseCard = (item: string) => {
      if (typeof item !== "string") return { title: "Untitled", desc: "" };
      const [title, ...descParts] = item.split(":");
      return {
        title: title.trim(),
        desc: descParts.join(":").trim(),
      };
    };

    return (
      <div
        className="w-full h-full p-20 flex flex-col"
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

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 flex-1 items-center justify-center">
          {slide.content.map((item, idx) => {
            const { title, desc } = parseCard(item as string);

            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-8 rounded-3xl shadow-lg border transition-transform hover:scale-105"
                style={{
                  background: theme.colors.surface,
                  borderColor: theme.colors.border,
                }}
              >
                <h3
                  className="text-3xl font-semibold mb-4"
                  style={{
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.heading.family,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-2xl leading-relaxed flex-1"
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

    if (slide.stats && slide.stats.length > 0) {
      stats = slide.stats.map((s) => ({
        label: s.label,
        value: s.value,
        description: s.description ?? "",
      }));
    } else if (slide.content && slide.content.length >= 3) {
      for (let i = 0; i < slide.content.length; i += 3) {
        const label = slide.content[i] as string;
        const value = slide.content[i + 1] as string;
        const description = slide.content[i + 2] as string;
        if (label && value && description) {
          stats.push({ label, value, description });
        }
      }
    }

    if (stats.length === 0) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-72">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center rounded-3xl shadow-xl border p-10 hover:shadow-2xl transition-all"
              style={{
                background: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
            >
              <div
                className="text-7xl font-bold mb-4"
                style={{
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.heading.family,
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-3xl font-semibold mb-3"
                style={{
                  color: theme.colors.textDark,
                  fontFamily: theme.fonts.heading.family,
                }}
              >
                {stat.label}
              </div>
              <div
                className="text-2xl leading-relaxed"
                style={{
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.body.family,
                }}
              >
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  timeline: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full p-20"
      style={{ background: theme.colors.background }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-48 flex items-center px-20 mb-12"
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

      <div className="flex justify-around items-start gap-4 pt-72">
        {slide.content.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center flex-1"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold mb-8 shadow-xl"
              style={{
                background: theme.colors.primary,
                color: "#FFFFFF",
              }}
            >
              {idx + 1}
            </div>
            <p
              className="text-2xl px-4 leading-relaxed"
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body.family,
              }}
            >
              {renderItemText(item)}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),

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

  twoColumn: ({ slide, theme }: SlideLayoutProps) => {
    const isComparison =
      slide.content.length === 2 &&
      slide.content.every(
        (item: any) => item?.title && Array.isArray(item?.points)
      );

    if (isComparison) {
      const [left, right] = slide.content as any[];

      return (
        <div
          className="w-full h-full p-20"
          style={{ background: theme.colors.background }}
        >
          {/* <div
            className="absolute top-0 left-0 right-0 h-48 flex items-center px-20 mb-12"
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
          /> */}

          <div className="grid grid-cols-2 gap-12 h-[700px]">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-10 flex flex-col">
              <h3
                className="text-4xl font-bold mb-6 text-center"
                style={{
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.heading.family,
                }}
              >
                {left.title}
              </h3>
              <ul className="space-y-4">
                {left.points.map((p: string, i: number) => (
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
                    >
                      •
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-10 flex flex-col">
              <h3
                className="text-4xl font-bold mb-6 text-center"
                style={{
                  color: theme.colors.secondary,
                  fontFamily: theme.fonts.heading.family,
                }}
              >
                {right.title}
              </h3>
              <ul className="space-y-4">
                {right.points.map((p: string, i: number) => (
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
                    >
                      •
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // 🧩 Default fallback (multi-item content layout)
    const half = Math.ceil(slide.content.length / 2);
    const columns = [slide.content.slice(0, half), slide.content.slice(half)];

    const renderContentItem = (item: any, idx: number) => {
      if (typeof item === "string") {
        return (
          <li key={idx} className="flex items-start gap-4">
            <span
              className="text-4xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              •
            </span>
            <span
              className="text-3xl flex-1 leading-relaxed"
              style={{
                color: theme.colors.text,
                fontFamily: theme.fonts.body.family,
              }}
            >
              {item}
            </span>
          </li>
        );
      }

      if (item.title && Array.isArray(item.points)) {
        return (
          <li
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <h3
              className="text-3xl font-semibold mb-4"
              style={{
                color: theme.colors.primary,
                fontFamily: theme.fonts.heading.family,
              }}
            >
              {item.title}
            </h3>
            <ul className="space-y-3">
              {item.points.map((p: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-2xl"
                  style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body.family,
                  }}
                >
                  <span
                    className="text-3xl leading-none"
                    style={{ color: theme.colors.accent }}
                  >
                    •
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </li>
        );
      }

      return (
        <li
          key={idx}
          className="text-3xl"
          style={{ fontFamily: theme.fonts.body.family }}
        >
          {JSON.stringify(item)}
        </li>
      );
    };

    return (
      <div
        className="w-full h-full p-20"
        style={{ background: theme.colors.background }}
      >
        <h2
          className="text-6xl font-bold mb-16"
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.heading.family,
          }}
        >
          {slide.title}
        </h2>

        <div className="grid grid-cols-2 gap-16 h-[700px] overflow-y-auto">
          {columns.map((col, colIdx) => (
            <ul key={colIdx} className="space-y-6">
              {col.map((item, idx) => renderContentItem(item, idx))}
            </ul>
          ))}
        </div>
      </div>
    );
  },
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

    // 🧠 Detect structured (object) vs flat (string) format
    const isStructured = slide.content.every((c: any) => typeof c === "object");
    let left: any = {};
    let right: any = {};

    if (isStructured) {
      // Already objects like [{title, points}, {title, points}]
      [left, right] = slide.content as any[];
    } else {
      // Flat list like ["MacBook Air", "...", "MacBook Pro", "..."]
      const mid = Math.floor(slide.content.length / 2);
      const leftTitle = slide.content[0];
      const rightTitle = slide.content[mid];

      left = {
        title: leftTitle,
        points: slide.content.slice(1, mid),
      };
      right = {
        title: rightTitle,
        points: slide.content.slice(mid + 1),
      };
    }

    return (
      <div
        className="w-full h-full p-20 flex flex-col items-center justify-center"
        style={{ background: theme.colors.background }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-48 flex items-center px-20 mb-12"
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

        {/* Comparison Grid */}
        <div className="relative grid grid-cols-2 gap-12 w-full max-w-6xl">
          {/* Left Column */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 flex flex-col">
            <h3
              className="text-4xl font-bold mb-6 text-center uppercase"
              style={{
                color: theme.colors.primary,
                fontFamily: theme.fonts.heading.family,
              }}
            >
              {left.title}
            </h3>
            <ul className="space-y-4">
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
                  >
                    •
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 flex flex-col">
            <h3
              className="text-4xl font-bold mb-6 text-center uppercase"
              style={{
                color: theme.colors.secondary,
                fontFamily: theme.fonts.heading.family,
              }}
            >
              {right.title}
            </h3>
            <ul className="space-y-4">
              {right.points?.map((p: string, i: number) => (
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
                  >
                    •
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute left-1/2 top-0 bottom-0 flex flex-col items-center justify-center">
            <div className="w-[3px] h-full bg-gray-300 opacity-50"></div>
            <div
              className="absolute text-5xl font-extrabold text-white px-6 py-4 rounded-full shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                fontFamily: theme.fonts.heading.family,
                transform: "translateY(-50%)",
              }}
            >
              VS
            </div>
          </div>
        </div>
      </div>
    );
  },

  closing: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center p-20"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
      }}
    >
      <div className="flex items-center gap-4 mb-12">
        <div
          className="w-16 h-16 rounded-full"
          style={{ background: theme.colors.secondary }}
        />
        <span
          className="text-3xl font-bold"
          style={{
            color: theme.colors.secondary,
            fontFamily: theme.fonts.heading.family,
          }}
        >
          LOGO
        </span>
      </div>

      <h1
        className="text-7xl font-bold mb-8"
        style={{
          color: "#FFFFFF",
          fontFamily: theme.fonts.heading.family,
        }}
      >
        {slide.title}
      </h1>

      {slide.content[0] && (
        <p
          className="text-3xl mb-16"
          style={{
            color: "rgba(255,255,255,0.9)",
            fontFamily: theme.fonts.body.family,
          }}
        >
          {renderItemText(slide.content[0])}
        </p>
      )}

      {/* Contact info */}
      <div className="flex gap-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
          <span className="text-2xl text-white">📧 hello@example.com</span>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
          <span className="text-2xl text-white">🌐 www.example.com</span>
        </div>
      </div>
    </div>
  ),
};
