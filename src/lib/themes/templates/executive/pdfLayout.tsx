import { Page, View, Text, StyleSheet, Svg, Image } from "@react-pdf/renderer";
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

const stringifyContentItem = (item?: SlideContentItem) => {
  if (!item) return "";
  return typeof item === "string" ? item : JSON.stringify(item);
};

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
      paddingTop: 280,
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
      lineHeight: 2,
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
            {/* <Image
              src="/icons/checks.png"
              style={{ width: 28, height: 28, marginRight: 12 }}
            /> */}
            {typeof item === "string" ? item : JSON.stringify(item)}
          </Text>
        ))}
      </View>
    </Page>
  );
};

const createTwoColumnStyle = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    ...createBaseStyles(theme),

    header: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 80,
      paddingVertical: 30,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 180,
      justifyContent: "center",
    },

    headerTitle: {
      fontSize: 48,
      fontWeight: "bold",
      color: "#FFFFFF",
    },

    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 80,
      paddingTop: 320,
      gap: 40,
    },

    card: {
      backgroundColor: "#FFFFFF",
      padding: 40,
      borderRadius: 16,
      width: "48%",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },

    columnTitle: {
      fontSize: 40,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginBottom: 20,
    },

    columnText: {
      fontSize: 28,
      lineHeight: 1.6,
      color: theme.colors.text,
    },
  });

export const TwoColumnPage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createTwoColumnStyle(theme);

  const [leftTitle, leftText, rightTitle, rightText] = slide.content || [];

  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{slide.title || "Untitled"}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.columnTitle}>
            {stringifyContentItem(leftTitle)}
          </Text>
          <Text style={styles.columnText}>
            {stringifyContentItem(leftText)}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.columnTitle}>
            {stringifyContentItem(rightTitle)}
          </Text>
          <Text style={styles.columnText}>
            {stringifyContentItem(rightText)}
          </Text>
        </View>
      </View>
    </Page>
  );
};

const stringify = (item: any) =>
  typeof item === "string" ? item : JSON.stringify(item);

const createComparisonStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    page: {
      width: 1920,
      height: 1080,
      backgroundColor: theme.colors.background,
      position: "relative",
    },

    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 180,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 80,
      paddingVertical: 40,
      justifyContent: "center",
    },

    headerTitle: {
      fontSize: 48,
      fontWeight: 700,
      color: "#FFFFFF",
    },

    containerF: {
      flexDirection: "row",
      width: "100%",
      paddingHorizontal: 80,
      paddingTop: 280,
      gap: 40,
    },

    centerDividerWrapper: {
      position: "absolute",
      top: 180,
      bottom: 0,
      left: "40%",
      width: 2,
      alignItems: "center",
    },

    divider: {
      width: 2,
      backgroundColor: "#D1D5DB",
      opacity: 0.5,
      height: "80%",
    },

    card: {
      backgroundColor: "#FFFFFF",
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 48,
      width: "48%",
    },

    columnTitle: {
      fontSize: 40,
      fontWeight: 700,
      marginBottom: 16,
      textAlign: "center",
    },

    underline: {
      height: 8,
      width: 120,
      borderRadius: 4,
      marginBottom: 32,
      alignSelf: "center",
    },

    bulletList: {
      marginTop: 20,
      flexDirection: "column",
      gap: 20,
    },

    bulletItem: {
      fontSize: 28,
      lineHeight: 1.4,
      color: theme.colors.text,
    },
  });

export const ComparisonPage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createComparisonStyles(theme);

  const isStructured = slide.content?.every((x: any) => typeof x === "object");
  let left: any = {};
  let right: any = {};

  if (isStructured) {
    [left, right] = slide.content as any[];
  } else {
    const mid = Math.floor(slide.content.length / 2);
    left = {
      title: stringify(slide.content[0]),
      points: slide.content.slice(1, mid),
    };
    right = {
      title: stringify(slide.content[mid]),
      points: slide.content.slice(mid + 1),
    };
  }

  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{slide.title}</Text>
      </View>

      <View style={styles.containerF}>
        <View style={styles.card}>
          <Text
            style={{
              ...styles.columnTitle,
              color: theme.colors.primary,
            }}
          >
            {left.title}
          </Text>

          <View
            style={{
              ...styles.underline,
              backgroundColor: theme.colors.primary,
            }}
          />

          <View style={styles.bulletList}>
            {left.points?.map((p: string, i: number) => (
              <Text key={i} style={styles.bulletItem}>
                {stringify(p)}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text
            style={{
              ...styles.columnTitle,
              color: theme.colors.secondary,
            }}
          >
            {right.title}
          </Text>

          <View
            style={{
              ...styles.underline,
              backgroundColor: theme.colors.secondary,
            }}
          />

          <View style={styles.bulletList}>
            {right.points?.map((p: string, i: number) => (
              <Text key={i} style={styles.bulletItem}>
                {stringify(p)}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Page>
  );
};

const parseCardItem = (item: string) => {
  const [title, ...desc] = item.split(":");
  return {
    title: title.trim(),
    desc: desc.join(":").trim(),
  };
};

const createCardsStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    page: {
      width: 1920,
      height: 1080,
      backgroundColor: theme.colors.background,
      position: "relative",
      padding: 0,
    },

    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 180,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      paddingHorizontal: 80,
    },

    headerTitle: {
      fontSize: 48,
      color: "#FFFFFF",
      fontWeight: 700,
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingTop: 240,
      paddingHorizontal: 80,
      gap: 40,
    },

    card: {
      width: "47%",
      backgroundColor: theme.colors.surface,
      padding: 40,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    cardTitle: {
      fontSize: 36,
      fontWeight: 700,
      color: theme.colors.primary,
      marginBottom: 12,
    },

    cardDesc: {
      fontSize: 24,
      color: theme.colors.text,
      lineHeight: 1.5,
      opacity: 0.9,
    },
  });

export const CardsPage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createCardsStyles(theme);

  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{slide.title}</Text>
      </View>

      <View style={styles.grid}>
        {slide.content?.map((item: any, idx: number) => {
          const { title, desc } = parseCardItem(String(item));
          return (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardDesc}>{desc}</Text>
            </View>
          );
        })}
      </View>
    </Page>
  );
};

const createStatsStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    page: {
      width: 1920,
      height: 1080,
      backgroundColor: theme.colors.background,
      position: "relative",
      padding: 0,
    },

    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 180,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      paddingHorizontal: 80,
    },

    headerTitle: {
      fontSize: 48,
      fontWeight: 700,
      color: "#ffffff",
    },

    grid: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 350,
      paddingHorizontal: 80,
      gap: 40,
    },

    card: {
      width: "30%",
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 40,
      borderRadius: 24,
      alignItems: "center",
      textAlign: "center",
    },

    statValue: {
      fontSize: 48,
      fontWeight: 800,
      color: theme.colors.primary,
      marginBottom: 16,
    },

    accentLine: {
      width: 80,
      height: 10,
      borderRadius: 8,
      backgroundColor: theme.colors.accent,
      marginBottom: 30,
    },

    statLabel: {
      fontSize: 28,
      fontWeight: 600,
      color: theme.colors.textDark,
      marginBottom: 20,
    },

    statDescription: {
      fontSize: 26,
      lineHeight: 1.4,
      color: theme.colors.text,
      opacity: 0.85,
    },
  });

export const StatsPage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createStatsStyles(theme);

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
        label: String(slide.content[i]),
        value: String(slide.content[i + 1]),
        description: String(slide.content[i + 2]),
      });
    }
  }

  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{slide.title}</Text>
      </View>

      <View style={styles.grid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <View style={styles.accentLine} />
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statDescription}>{stat.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
};

const createClosingStyles = (theme: SlideLayoutProps["theme"]) =>
  StyleSheet.create({
    page: {
      width: 1920,
      height: 1080,
      backgroundColor: theme.colors.background,
      position: "relative",
      padding: 0,
      alignItems: "center",
      justifyContent: "center",
    },

    topAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 20,
      backgroundColor: theme.colors.primary,
    },

    bottomAccent: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 16,
      backgroundColor: theme.colors.secondary,
    },

    logoWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 60,
      marginTop: 40,
    },

    logoCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },

    logoText: {
      fontSize: 42,
      fontWeight: 700,
      color: theme.colors.textLight,
    },

    brandText: {
      fontSize: 40,
      marginLeft: 25,
      fontWeight: 700,
      color: theme.colors.textDark,
    },

    title: {
      fontSize: 80,
      color: theme.colors.primary,
      fontWeight: 700,
      textAlign: "center",
      marginBottom: 20,
      paddingHorizontal: 120,
    },

    subtitle: {
      fontSize: 36,
      color: theme.colors.text,
      opacity: 0.85,
      textAlign: "center",
      marginBottom: 80,
      paddingHorizontal: 160,
    },

    contactRow: {
      flexDirection: "row",
      gap: 40,
    },

    contactBox: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: 20,
      paddingHorizontal: 50,
    },

    contactText: {
      fontSize: 30,
      color: theme.colors.textDark,
      textAlign: "center",
    },
  });

export const ClosingPage = ({ slide, theme }: SlideLayoutProps) => {
  const styles = createClosingStyles(theme);

  return (
    <Page size={{ width: 1920, height: 1080 }} style={styles.page}>
      <View style={styles.topAccent} />

      <Text style={styles.title}>{slide.title}</Text>

      {/* Subtitle */}
      {slide.content?.[0] && (
        <Text style={styles.subtitle}>{String(slide.content[0])}</Text>
      )}

      <View style={styles.contactRow}>
        <View style={styles.contactBox}>
          <Text style={styles.contactText}>jamshidbekrasulov@gmail.com</Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactText}>slidemind.uz</Text>
        </View>
      </View>

      <View style={styles.bottomAccent} />
    </Page>
  );
};

export const ExecutivePDFLayouts = {
  title: TitlePage,
  plan: PlanPage,
  content: ContentPage,
  twoColumn: TwoColumnPage,
  comparison: ComparisonPage,
  cards: CardsPage,
  stats: StatsPage,
  closing: ClosingPage,
};
