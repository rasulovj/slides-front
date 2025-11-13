import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { SlideLayoutProps, SlideContentItem } from "../../types";

// Register font
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v12/7cHpv4kjgoGqM7E_DMs5yng.woff2",
    },
    {
      src: "https://fonts.gstatic.com/s/helvetica/v12/7cHrv4kjgoGqM7E3b8s8yn4.woff2",
      fontWeight: "bold",
    },
  ],
});

// Base styles (shared across slides)
const createBaseStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    page: {
      backgroundColor: theme.colors.surface || "#FFFFFF",
      position: "relative",
      width: 1920,
      height: 1080,
      fontFamily: "Helvetica",
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
      backgroundColor: theme.colors.accent || "#FBBF24",
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
      fontSize: 72,
      fontWeight: "bold",
      color: theme.colors.text || "#1F2937",
      maxWidth: 896,
    },
    subtitleBox: {
      fontSize: 24,
      color: theme.colors.textLight || "#FFFFFF",
      marginTop: 40,
      backgroundColor: theme.colors.primary || "#1E40AF",
      padding: 12,
      borderRadius: 8,
      maxWidth: 480,
    },
  });

export const TitlePage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createTitleStyles(theme);
  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      {/* Background shapes */}
      <View style={styles.shapePrimary} fixed />
      <View style={styles.shapeSecondary} fixed />
      <View style={styles.shapeAccent} fixed />

      {/* Foreground text */}
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

/* ==========================================================
   2️⃣ PLAN PAGE LAYOUT
========================================================== */
const createPlanStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    ...createBaseStyles(theme),
    planHeader: {
      backgroundColor: theme.colors.primary || "#1E40AF",
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 100,
    },
    planTitle: {
      fontSize: 48,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    planContent: {
      marginTop: 140,
      flexDirection: "column",
      paddingHorizontal: 80,
      gap: 20,
    },
    planItem: {
      padding: 20,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      backgroundColor: "#FFFFFF",
    },
    planText: {
      fontSize: 20,
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

/* ==========================================================
   3️⃣ CONTENT PAGE LAYOUT
========================================================== */
const createContentStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    ...createBaseStyles(theme),
    contentPage: {
      flexDirection: "column",
      paddingHorizontal: 80,
      paddingTop: 120,
    },
    contentTitle: {
      fontSize: 56,
      fontWeight: "bold",
      color: theme.colors.primary || "#1E40AF",
      marginBottom: 40,
    },
    contentText: {
      fontSize: 20,
      color: theme.colors.text || "#1F2937",
      marginBottom: 16,
      lineHeight: 1.5,
    },
  });

export const ContentPage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createContentStyles(theme);
  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.contentPage}>
        <Text style={styles.contentTitle}>{slide.title || "Untitled"}</Text>
        {(slide.content || []).map((item: SlideContentItem, idx: number) => (
          <Text key={idx} style={styles.contentText}>
            {typeof item === "string" ? item : JSON.stringify(item)}
          </Text>
        ))}
      </View>
    </Page>
  );
};

/* ==========================================================
   4️⃣ EXPORT LAYOUT MAP
========================================================== */
export const ExecutivePDFLayouts = {
  title: TitlePage,
  plan: PlanPage,
  content: ContentPage,
};
