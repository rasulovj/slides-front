// components/workspace/SlidePreviewForThumbnail.tsx
"use client";

import { Slide } from "@/types";
import { forwardRef } from "react";

interface SlidePreviewProps {
  slide: Slide;
  theme: any;
}

export const SlidePreviewForThumbnail = forwardRef<
  HTMLDivElement,
  SlidePreviewProps
>(({ slide, theme }, ref) => {
  const getSlideStyles = () => {
    const baseStyles: React.CSSProperties = {
      width: "1920px",
      height: "1080px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
    };

    if (slide.type === "title" || slide.type === "closing") {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
      };
    }

    return {
      ...baseStyles,
      background: theme.colors.background,
    };
  };

  return (
    <div ref={ref} style={getSlideStyles()}>
      {/* Title Slide */}
      {slide.type === "title" && (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "80px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "30px",
              fontFamily: theme.fonts.heading,
            }}
          >
            {slide.title}
          </h1>
          {slide.content[0] && (
            <p
              style={{
                fontSize: "36px",
                color: "rgba(255,255,255,0.9)",
                fontFamily: theme.fonts.body,
              }}
            >
              {slide.content[0]}
            </p>
          )}
        </div>
      )}

      {/* Content Slide */}
      {slide.type === "content" && (
        <div style={{ height: "100%", padding: "80px" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: theme.colors.primary,
              display: "flex",
              alignItems: "center",
              paddingLeft: "80px",
            }}
          >
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
                fontFamily: theme.fonts.heading,
              }}
            >
              {slide.title}
            </h2>
          </div>

          <div style={{ marginTop: "120px", paddingTop: "60px" }}>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "32px" }}>
              {slide.content.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "30px",
                    display: "flex",
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      color: theme.colors.primary,
                      fontSize: "40px",
                      marginRight: "20px",
                    }}
                  >
                    •
                  </span>
                  <span
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.body,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Stats Slide */}
      {slide.type === "stats" && (
        <div style={{ height: "100%", padding: "80px" }}>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: theme.colors.text,
              marginBottom: "60px",
              fontFamily: theme.fonts.heading,
            }}
          >
            {slide.title}
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
            }}
          >
            {(slide.stats || []).map((stat, idx) => (
              <div
                key={idx}
                style={{ display: "flex", alignItems: "center", gap: "40px" }}
              >
                <div
                  style={{
                    fontSize: "80px",
                    fontWeight: "bold",
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.heading,
                  }}
                >
                  {stat.value}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: theme.colors.text,
                      marginBottom: "10px",
                      fontFamily: theme.fonts.heading,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
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

      {/* Timeline Slide */}
      {slide.type === "timeline" && (
        <div style={{ height: "100%", padding: "80px" }}>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: theme.colors.text,
              marginBottom: "60px",
              fontFamily: theme.fonts.heading,
            }}
          >
            {slide.title}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "start",
            }}
          >
            {slide.content.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                style={{ flex: 1, textAlign: "center", padding: "20px" }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: theme.colors.primary,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    fontWeight: "bold",
                    margin: "0 auto 20px",
                    fontFamily: theme.fonts.heading,
                  }}
                >
                  {idx + 1}
                </div>
                <p
                  style={{
                    fontSize: "20px",
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing Slide */}
      {slide.type === "closing" && (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "80px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "30px",
              fontFamily: theme.fonts.heading,
            }}
          >
            {slide.title}
          </h1>
          {slide.content[0] && (
            <p
              style={{
                fontSize: "36px",
                color: "rgba(255,255,255,0.9)",
                fontFamily: theme.fonts.body,
              }}
            >
              {slide.content[0]}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

SlidePreviewForThumbnail.displayName = "SlidePreviewForThumbnail";
