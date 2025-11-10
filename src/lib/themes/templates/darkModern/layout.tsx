import { SlideLayoutProps } from "../../types";

export const DarkModernLayouts = {
  title: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center p-20 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(${theme.colors.gradient?.direction}, ${theme.colors.gradient?.start}, ${theme.colors.gradient?.end})`,
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-30"
        style={{
          background: `radial-gradient(circle, ${theme.colors.primary}, transparent)`,
        }}
      />

      <div className="relative z-10">
        <h1
          className="text-8xl font-bold mb-8 leading-tight"
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.heading.family,
            textShadow: `0 0 40px ${theme.colors.primary}50`,
          }}
        >
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p
            className="text-4xl"
            style={{
              color: theme.colors.textLight,
              fontFamily: theme.fonts.body.family,
            }}
          >
            {slide.subtitle}
          </p>
        )}

        {/* Decorative line */}
        <div
          className="w-32 h-1 mx-auto mt-12 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          }}
        />
      </div>
    </div>
  ),

  content: ({ slide, theme }: SlideLayoutProps) => (
    <div
      className="w-full h-full p-20"
      style={{ background: theme.colors.background }}
    >
      {/* Title with glow */}
      <h2
        className="text-6xl font-bold mb-16 pb-6 border-b-4"
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.heading.family,
          borderColor: theme.colors.primary,
          textShadow: `0 0 30px ${theme.colors.primary}50`,
        }}
      >
        {slide.title}
      </h2>

      {/* Content with cards */}
      <div className="space-y-6">
        {slide.content.map((item, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl backdrop-blur-sm border-l-4"
            style={{
              background: `${theme.colors.surface}80`,
              borderColor: theme.colors.primary,
              boxShadow: `0 0 20px ${theme.colors.primary}20`,
            }}
          >
            <div className="flex items-start gap-6">
              <span
                className="text-3xl font-bold px-4 py-2 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  color: theme.colors.text,
                }}
              >
                {idx + 1}
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
            </div>
          </div>
        ))}
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

      <div className="grid grid-cols-1 gap-12">
        {slide.stats?.map((stat, idx) => (
          <div
            key={idx}
            className="p-10 rounded-3xl backdrop-blur-sm"
            style={{
              background: `${theme.colors.surface}80`,
              border: `2px solid ${theme.colors.primary}30`,
              boxShadow: `0 0 40px ${theme.colors.primary}20`,
            }}
          >
            <div className="flex items-center gap-12">
              <div
                className="text-9xl font-bold px-8 py-4 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  color: theme.colors.text,
                  textShadow: `0 0 20px ${theme.colors.primary}`,
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
                className="w-full rounded-t-3xl transition-all duration-500 flex items-end justify-center pb-8 relative overflow-hidden"
                style={{
                  height: `${item.value}%`,
                  background: `linear-gradient(to top, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  boxShadow: `0 0 40px ${theme.colors.primary}60`,
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(to top, transparent, ${theme.colors.primary}40)`,
                  }}
                />
                <span className="text-4xl font-bold text-white relative z-10">
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

      <div className="flex justify-around items-start gap-6">
        {slide.content.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center flex-1"
          >
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold mb-8 relative"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                color: theme.colors.text,
                boxShadow: `0 0 40px ${theme.colors.primary}60`,
              }}
            >
              {/* Pulse ring */}
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: theme.colors.primary }}
              />
              <span className="relative z-10">{idx + 1}</span>
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
      className="w-full h-full flex flex-col items-center justify-center text-center p-24 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, ${theme.colors.primary}, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="text-9xl mb-8 opacity-50"
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
          className="text-4xl not-italic font-semibold inline-block px-8 py-3 rounded-full"
          style={{
            color: theme.colors.text,
            background: `${theme.colors.surface}80`,
            border: `2px solid ${theme.colors.primary}30`,
            fontFamily: theme.fonts.body.family,
          }}
        >
          — {slide.quote?.author}
        </cite>
      </div>
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

      <div className="grid grid-cols-2 gap-12 h-[700px]">
        <div
          className="p-10 rounded-3xl"
          style={{
            background: `${theme.colors.surface}60`,
            border: `2px solid ${theme.colors.primary}30`,
          }}
        >
          <ul className="space-y-6">
            {slide.content
              .slice(0, Math.ceil(slide.content.length / 2))
              .map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span
                    className="text-3xl font-bold"
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
        <div
          className="p-10 rounded-3xl"
          style={{
            background: `${theme.colors.surface}60`,
            border: `2px solid ${theme.colors.secondary}30`,
          }}
        >
          <ul className="space-y-6">
            {slide.content
              .slice(Math.ceil(slide.content.length / 2))
              .map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: theme.colors.secondary }}
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
      className="w-full h-full flex flex-col items-center justify-center text-center p-20 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      {/* Animated gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: theme.colors.primary }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: theme.colors.secondary }}
      />

      <div className="relative z-10">
        <h1
          className="text-8xl font-bold mb-8"
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.heading.family,
            textShadow: `0 0 60px ${theme.colors.primary}80`,
          }}
        >
          {slide.title}
        </h1>

        {slide.content[0] && (
          <p
            className="text-4xl mb-16"
            style={{
              color: theme.colors.textLight,
              fontFamily: theme.fonts.body.family,
            }}
          >
            {slide.content[0]}
          </p>
        )}

        <div className="flex gap-8 justify-center">
          <div
            className="px-10 py-5 rounded-2xl backdrop-blur-sm"
            style={{
              background: `${theme.colors.surface}80`,
              border: `2px solid ${theme.colors.primary}50`,
              boxShadow: `0 0 30px ${theme.colors.primary}30`,
            }}
          >
            <span className="text-2xl text-white">📧 hello@example.com</span>
          </div>
          <div
            className="px-10 py-5 rounded-2xl backdrop-blur-sm"
            style={{
              background: `${theme.colors.surface}80`,
              border: `2px solid ${theme.colors.secondary}50`,
              boxShadow: `0 0 30px ${theme.colors.secondary}30`,
            }}
          >
            <span className="text-2xl text-white">🌐 www.example.com</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
