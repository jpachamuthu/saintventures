import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Medal } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SaintIllustration from "../components/SaintIllustration";
import BottomNav, { type TabId } from "../components/BottomNav";
import { useTheme } from "../components/ThemeContext";
import { useBadges } from "../hooks/useBadges";
import { fonts, radius, type ThemeColors } from "../theme";
import { stories, type Story } from "../data/stories";

type BadgesScreenProps = {
  onOpenStory: (story: Story) => void;
  onFooterTab: (tab: TabId) => void;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

type BadgeEntry = { earnedAt: number; story: Story };

export default function BadgesScreen({ onOpenStory, onFooterTab }: BadgesScreenProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { list } = useBadges();

  const badgeItems = useMemo<BadgeEntry[]>(
    () =>
      list()
        .map((b) => ({ earnedAt: b.earnedAt, story: stories.find((s) => s.id === b.id) }))
        .filter((item): item is BadgeEntry => Boolean(item.story)),
    [list]
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Badges</Text>
          <Text style={styles.subtitle}>
            {badgeItems.length} EARNED
          </Text>
        </View>
        <View style={styles.countBadge}>
          <Medal size={15} color={colors.gold} fill={colors.gold} />
          <Text style={styles.countText}>{badgeItems.length}</Text>
        </View>
      </View>

      {badgeItems.length === 0 ? (
        <View style={styles.empty}>
          <Medal size={52} color={colors.mutedDim} />
          <Text style={styles.emptyTitle}>No badges yet</Text>
          <Text style={styles.emptyHint}>Finish a story quiz to earn your first badge!</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {badgeItems.map(({ earnedAt, story }) => (
            <Pressable
              key={story.id}
              onPress={() => onOpenStory(story)}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={`${story.title}, earned ${formatDate(earnedAt)}`}
            >
              <View style={styles.thumb}>
                <SaintIllustration palette={story.palette} art={story.art} image={story.hero} height={150} />
                <View style={styles.medalBadge}>
                  <Medal size={15} color={colors.onGold} fill={colors.onGold} />
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.saint} numberOfLines={1}>
                  {story.saint}
                </Text>
                <Text style={styles.gtitle} numberOfLines={2}>
                  {story.title}
                </Text>
                <View style={styles.meta}>
                  <Text style={styles.metaText}>Earned {formatDate(earnedAt)}</Text>
                  <Medal size={13} color={colors.gold} fill={colors.gold} />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <BottomNav active="badges" onTab={onFooterTab} />
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingBottom: 120,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      paddingTop: 10,
      paddingBottom: 4,
    },
    titleBlock: {
      flexShrink: 0,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 30,
      lineHeight: 32,
      color: colors.cream,
    },
    subtitle: {
      fontFamily: fonts.uiBold,
      fontSize: 11,
      letterSpacing: 1.5,
      color: colors.gold,
      marginTop: 1,
    },
    countBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.ring,
      borderRadius: radius.pill,
      paddingHorizontal: 12,
      paddingVertical: 7,
    },
    countText: {
      fontFamily: fonts.metaBold,
      fontSize: 13,
      color: colors.cream,
    },
    grid: {
      paddingHorizontal: 18,
      paddingTop: 14,
      paddingBottom: 20,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 14,
    },
    card: {
      width: "48%",
      backgroundColor: colors.bgCard,
      borderRadius: radius.card,
      borderWidth: 1,
      borderColor: colors.ring,
      overflow: "hidden",
    },
    pressed: {
      opacity: 0.7,
    },
    thumb: {
      aspectRatio: 1,
      overflow: "hidden",
    },
    medalBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.gold,
      alignItems: "center",
      justifyContent: "center",
    },
    info: {
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 12,
    },
    saint: {
      fontFamily: fonts.card,
      fontSize: 18,
      lineHeight: 21,
      color: colors.cream,
    },
    gtitle: {
      fontFamily: fonts.uiMedium,
      fontSize: 11.5,
      color: colors.muted,
      marginTop: 3,
    },
    meta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 9,
    },
    metaText: {
      fontFamily: fonts.metaBold,
      fontSize: 11,
      color: colors.gold,
      flexShrink: 1,
      marginRight: 6,
    },
    empty: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
      paddingBottom: 80,
    },
    emptyTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 20,
      color: colors.cream,
      marginTop: 14,
    },
    emptyHint: {
      fontFamily: fonts.ui,
      fontSize: 13,
      color: colors.mutedDim,
      textAlign: "center",
      marginTop: 6,
    },
  });
}
