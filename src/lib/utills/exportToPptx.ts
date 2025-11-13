// import { SlideContentItem, SlideData, ThemeConfig } from "@/lib/themes/types";

// const getContentItemLabel = (item: SlideContentItem) => {
//   if (typeof item === "string") {
//     return item;
//   }

//   if ("title" in item && item.title) {
//     return item.title;
//   }

//   if ("event" in item && item.event) {
//     return item.event;
//   }

//   if ("aspect" in item && item.aspect) {
//     return item.aspect;
//   }

//   if ("year" in item && item.year) {
//     return item.year;
//   }

//   if ("description" in item && item.description) {
//     return item.description;
//   }

//   if ("points" in item && item.points?.length) {
//     return item.points.join("\n");
//   }

//   return "";
// };

// export const exportToPPTX = async (slides: SlideData[], theme: ThemeConfig) => {
//   const pptx = new PptxGenJS();
//   pptx.author = "Your App Name";
//   pptx.company = "AI Presentation Builder";
//   pptx.layout = "16x9";
//   pptx.title = "Generated Presentation";

//   slides.forEach((slide) => {
//     const sld = pptx.addSlide();

//     switch (slide.type) {
//       case "title":
//         sld.background = { color: theme.colors.primary };
//         sld.addText(slide.title, {
//           x: 1,
//           y: 2,
//           w: 8,
//           h: 1.5,
//           fontFace: theme.fonts.heading.family,
//           fontSize: 44,
//           bold: true,
//           color: "FFFFFF",
//         });

//         if (slide.subtitle) {
//           sld.addText(slide.subtitle, {
//             x: 1,
//             y: 3.5,
//             w: 8,
//             h: 1,
//             fontFace: theme.fonts.body.family,
//             fontSize: 24,
//             color: "FFFFFF",
//           });
//         }
//         break;

//       case "content":
//         sld.background = { color: theme.colors.background };
//         sld.addText(slide.title, {
//           x: 0.5,
//           y: 0.3,
//           fontSize: 32,
//           bold: true,
//           color: theme.colors.primary,
//         });
//         slide.content.forEach((c, i) => {
//           const text = typeof c === "string" ? c : JSON.stringify(c, null, 2);
//           sld.addText(`• ${text}`, {
//             x: 1,
//             y: 1 + i * 0.6,
//             fontSize: 18,
//             color: theme.colors.text,
//             w: 8,
//           });
//         });
//         break;

//       case "twoColumn":
//         sld.background = { color: theme.colors.background };
//         sld.addText(slide.title, {
//           x: 0.5,
//           y: 0.3,
//           fontSize: 30,
//           bold: true,
//           color: theme.colors.primary,
//         });
//         const col1 = slide.content.slice(
//           0,
//           Math.ceil(slide.content.length / 2)
//         );
//         const col2 = slide.content.slice(Math.ceil(slide.content.length / 2));
//         col1.forEach((item, i) => {
//           sld.addText(`• ${getContentItemLabel(item)}`, {
//             x: 0.7,
//             y: 1.2 + i * 0.6,
//             fontSize: 18,
//             color: theme.colors.text,
//             w: 4,
//           });
//         });
//         col2.forEach((item, i) => {
//           sld.addText(`• ${getContentItemLabel(item)}`, {
//             x: 5.5,
//             y: 1.2 + i * 0.6,
//             fontSize: 18,
//             color: theme.colors.text,
//             w: 4,
//           });
//         });
//         break;

//       case "plan":
//         sld.background = { color: theme.colors.background };
//         sld.addText(slide.title, {
//           x: 0.5,
//           y: 0.3,
//           fontSize: 30,
//           bold: true,
//           color: theme.colors.primary,
//         });
//         const formatPlanItem = (item: SlideContentItem) => {
//           if (typeof item === "string") {
//             return item;
//           }

//           if ("title" in item || "points" in item) {
//             const title = "title" in item && item.title ? item.title : "";
//             const points =
//               "points" in item && item.points?.length
//                 ? item.points.join("\n")
//                 : "";

//             return [title, points].filter(Boolean).join("\n");
//           }

//           return getContentItemLabel(item);
//         };
//         slide.content.forEach((item, idx) => {
//           const text = formatPlanItem(item);
//           const colX = idx % 3;
//           const rowY = Math.floor(idx / 3);
//           sld.addText(text, {
//             x: 0.5 + colX * 3,
//             y: 1.5 + rowY * 2,
//             w: 3,
//             h: 1.8,
//             fontSize: 18,
//             color: theme.colors.text,
//             shape: pptx.ShapeType.roundRect,
//             fill: { color: theme.colors.surface },
//             align: "left",
//             margin: 0.2,
//           });
//         });
//         break;

//       case "stats":
//         sld.background = { color: theme.colors.surface };
//         sld.addText(slide.title, {
//           x: 0.5,
//           y: 0.3,
//           fontSize: 30,
//           bold: true,
//           color: theme.colors.primary,
//         });
//         (slide.stats || []).forEach((stat, idx) => {
//           sld.addText(`${stat.label}\n${stat.value}\n${stat.description}`, {
//             x: 0.5 + (idx % 3) * 3,
//             y: 1.5 + Math.floor(idx / 3) * 2,
//             w: 3,
//             h: 1.8,
//             fontSize: 16,
//             color: theme.colors.textDark,
//             shape: pptx.ShapeType.roundRect,
//             fill: { color: theme.colors.background },
//           });
//         });
//         break;

//       default:
//         sld.addText(slide.title, {
//           x: 1,
//           y: 1,
//           fontSize: 36,
//           color: theme.colors.textDark,
//         });
//         break;
//     }
//   });

//   pptx.writeFile({ fileName: `${theme.name}-Presentation.pptx` });
// };
