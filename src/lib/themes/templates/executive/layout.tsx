// lib/themes/templates/executive/layouts.tsx
import { SlideLayoutProps } from "../../types";

export const ExecutiveLayouts = {
  title: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: theme.colors.surface }}
    >
      <div className="absolute left-0 top-0 w-[40%] h-full bg-white" />

      <div
        className="absolute right-0 top-0 w-[60%] h-full flex flex-col justify-center px-20"
        style={{ background: theme.colors.primary }}
      >
        <div className="absolute top-12 left-12 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full"
            style={{ background: theme.colors.secondary }}
          />
          <span
            className="text-2xl font-bold"
            style={{
              color: theme.colors.secondary,
              fontFamily: theme.fonts.heading.family,
            }}
          >
            LOGO
          </span>
        </div>

        <h1
          className="text-7xl font-bold mb-8 leading-tight"
          style={{
            color: "#FFFFFF",
            fontFamily: theme.fonts.heading.family,
            fontWeight: theme.fonts.heading.weight.bold,
          }}
        >
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p
            className="text-3xl"
            style={{
              color: "rgba(255,255,255,0.9)",
              fontFamily: theme.fonts.body.family,
            }}
          >
            {slide.subtitle}
          </p>
        )}

        <div className="absolute bottom-12 left-0 right-0 px-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20" />
            <div>
              <div className="text-xl font-semibold text-white">Your Name</div>
              <div className="text-lg text-white/80">Your Designation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  content: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full relative"
      style={{ background: theme.colors.background }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-28 flex items-center px-20"
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
        className="absolute top-0 right-0 w-32 h-32"
        style={{
          background: theme.colors.secondary,
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />

      <div className="pt-40 px-20">
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
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),

  stats: ({ slide, theme }: SlideLayoutProps) => (
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

      <div className="space-y-12">
        {slide.stats?.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-10">
            <div
              className="text-9xl font-bold"
              style={{
                color: theme.colors.primary,
                fontFamily: theme.fonts.heading.family,
              }}
            >
              {stat.value}
            </div>
            <div className="flex-1">
              <div
                className="text-4xl font-semibold mb-3"
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.heading.family,
                }}
              >
                {stat.label}
              </div>
              <div
                className="text-2xl"
                style={{
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.body.family,
                }}
              >
                {stat.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  chart: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full p-20"
      style={{ background: theme.colors.background }}
    >
      <h2
        className="text-6xl font-bold mb-12"
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.heading.family,
        }}
      >
        {slide.title}
      </h2>

      <div className="flex items-end justify-around h-[600px] gap-8">
        {slide.chartData?.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1 h-full">
            <div className="flex-1 w-full flex items-end">
              <div
                className="w-full rounded-t-3xl transition-all duration-500 flex items-end justify-center pb-8"
                style={{
                  height: `${item.value}%`,
                  background: `linear-gradient(to top, ${theme.colors.primary}, ${theme.colors.secondary})`,
                }}
              >
                <span className="text-4xl font-bold text-white">
                  {item.value}%
                </span>
              </div>
            </div>
            <div
              className="mt-6 text-2xl font-semibold"
              style={{ color: theme.colors.text }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  timeline: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full p-20"
      style={{ background: theme.colors.background }}
    >
      <h2
        className="text-6xl font-bold mb-20"
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.heading.family,
        }}
      >
        {slide.title}
      </h2>

      <div className="flex justify-around items-start gap-4">
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
              {item}
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

  twoColumn: ({ slide, theme }: SlideLayoutProps) => (
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

      <div className="grid grid-cols-2 gap-16 h-[700px]">
        <div>
          <ul className="space-y-6">
            {slide.content
              .slice(0, Math.ceil(slide.content.length / 2))
              .map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: theme.colors.primary }}
                  >
                    •
                  </span>
                  <span
                    className="text-3xl flex-1"
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.body.family,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <ul className="space-y-6">
            {slide.content
              .slice(Math.ceil(slide.content.length / 2))
              .map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: theme.colors.primary }}
                  >
                    •
                  </span>
                  <span
                    className="text-3xl flex-1"
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.body.family,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  ),

  closing: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center p-20"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
      }}
    >
      {/* Logo */}
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
          {slide.content[0]}
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
