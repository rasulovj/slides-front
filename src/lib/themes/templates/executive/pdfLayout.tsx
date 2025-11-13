import { Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { SlideLayoutProps, SlideContentItem } from "../../types";

// Font.register({
//   family: "Lexend",
//   fonts: [
//     {
//       src: "/fonts/lexend/Lexend-Regular.ttf",
//     },
//     {
//       src: "/fonts/lexend/Lexend-Bold.ttf",
//       fontWeight: "bold",
//     },
//   ],
// });

const createBaseStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    page: {
      backgroundColor: theme.colors.surface || "#FFFFFF",
      position: "relative",
      width: 1920,
      height: 1080,
      // fontFamily: "Lexend",
      overflow: "hidden",
    },
  });

const createTitleStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    ...createBaseStyles(theme),
    shapeAccent: {
      position: "absolute",
      right: "8%",
      top: 940,
      width: 256,
      height: 200,
      backgroundColor: "#FBBF24",
      transform: "rotate(20deg)",
      zIndex: 4,
    },
    shapePrimary: {
      position: "absolute",
      right: "-8%",
      bottom: 10,
      width: 768,
      height: 2600,
      backgroundColor: theme.colors.primary || "#1E40AF",
      transform: "rotate(-12deg)",
      zIndex: 3,
    },
    shapeSecondary: {
      position: "absolute",
      right: "-18%",
      bottom: 0.1,
      width: 768,
      height: 2600,
      backgroundColor: theme.colors.secondary || "#60A5FA",
      transform: "rotate(-12deg)",
      zIndex: 2,
    },
    titlePage: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingHorizontal: 80,
      height: "100%",
      zIndex: 10,
    },
    title: {
      fontSize: 96,
      fontWeight: "bold",
      color: theme.colors.text || "#002f6e",
      maxWidth: 1200,
    },
    subtitleBox: {
      fontSize: 32,
      color: theme.colors.textLight || "#FFFFFF",
      marginTop: 40,
      backgroundColor: theme.colors.primary || "#1E40AF",
      padding: 14,
      borderRadius: 8,
      maxWidth: 520,
    },
  });

export const TitlePage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createTitleStyles(theme);
  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.shapePrimary} fixed />
      <View style={styles.shapeSecondary} fixed />
      <View style={styles.shapeAccent} fixed />

      <View style={styles.titlePage}>
        <Text style={styles.title}>{slide.title || "Untitled"}</Text>
        {slide.subtitle && (
          <View style={styles.subtitleBox}>
            <Text>{slide.subtitle}</Text>
          </View>
        )}
      </View>
    </Page>
  );
};

const createPlanStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    ...createBaseStyles(theme),
    planHeader: {
      backgroundColor: theme.colors.primary || "#1E40AF",
      padding: 20,
      paddingHorizontal: 80,
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 180,
    },
    planTitle: {
      fontSize: 48,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    planContent: {
      marginTop: 220,
      flexDirection: "column",
      paddingHorizontal: 80,
      gap: 24,
    },
    planItem: {
      padding: 42,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 16,
      backgroundColor: "#FFFFFF",
    },
    planText: {
      fontSize: 24,
      color: theme.colors.text || "#1F2937",
    },
  });

export const PlanPage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createPlanStyles(theme);
  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>{slide.title || "Untitled"}</Text>
      </View>
      <View style={styles.planContent}>
        {(slide.content || []).map((item: SlideContentItem, idx: number) => (
          <View key={idx} style={styles.planItem}>
            <Text style={styles.planText}>
              {typeof item === "string" ? item : JSON.stringify(item)}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  );
};

const createContentStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    ...createBaseStyles(theme),
    contentHeader: {
      backgroundColor: theme.colors.primary || "#1E40AF",
      padding: 20,
      paddingHorizontal: 80,
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 180,
    },
    contentPage: {
      flexDirection: "column",
      paddingHorizontal: 80,
      paddingTop: 220,
      gap: 24,
    },
    contentTitle: {
      fontSize: 48,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    contentText: {
      fontSize: 30,
      color: theme.colors.text || "#1F2937",
      marginBottom: 12,
    },
  });

export const ContentPage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createContentStyles(theme);
  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.contentHeader}>
        <Text style={styles.contentTitle}>{slide.title || "Untitled"}</Text>
      </View>
      <View style={styles.contentPage}>
        {(slide.content || []).map((item: SlideContentItem, idx: number) => (
          <Text key={idx} style={styles.contentText}>
            • {typeof item === "string" ? item : JSON.stringify(item)}
          </Text>
        ))}
      </View>
    </Page>
  );
};

export const ExecutivePDFLayouts = {
  title: TitlePage,
  plan: PlanPage,
  content: ContentPage,
};
