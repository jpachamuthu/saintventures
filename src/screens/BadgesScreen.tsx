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

export default function BadgesScreen({ onOpenStory, onFooterTab }: BadgesScreenProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { list } = useBadges();

  const badgeItems = useMemo(
    () =>
      list()
        .map((b) => ({ badge: b, story: stories.find((s) => s.id === b.id) }))
        .filter((item): item is { badge: { id: string; earnedAt: number }; story: Story } => Boolean(item.story)),
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
          <Text style={styles.emptyHint}>
            Finish a story quiz to earn your first badge!
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {badgeItems.map(({ badge, story }) => (
            <Pressable
              key={badge.id}
              onPress={() => onOpenStory(story)}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={`Open ${story.title}`}
            >
              <View style={styles.thumb}>
                <SaintIllustration palette={story.palette} art={story.art} image={story.hero} height={68} />
              </View>
              <View style={styles.info}>
                <View style={styles.storyRow}>
                  <Medal size={15} color={colors.gold} fill={colors.gold} />
                  <Text style={styles.storyTitle} numberOfLines={2}>
                    {story.title}
                  </Text>
                </View>
                <Text style={styles.earned}>Earned {formatDate(badge.earnedAt)}</Text>
              </View>
              <View style={styles.badgeDot}>
                <Medal size={18} color={colors.onGold} fill={colors.onGold} />
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
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 14,
      paddingBottom: 6,
    },
    titleBlock: {
      flexDirection: "column",
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 30,
      color: colors.cream,
    },
    subtitle: {
      fontFamily: fonts.metaBold,
      fontSize: 10,
      letterSpacing: 1.4,
      color: colors.gold,
      marginTop: 2,
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
    list: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 120,
      gap: 12,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.ring,
      borderRadius: radius.card,
      padding: 12,
    },
    pressed: {
      opacity: 0.8,
    },
    thumb: {
      borderRadius: radius.card,
      overflow: "hidden",
      marginRight: 12,
    },
    info: {
      flex: 1,
    },
    storyRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    storyTitle: {
      fontFamily: fonts.card,
      fontSize: 15,
      lineHeight: 20,
      color: colors.cream,
      flexShrink: 1,
    },
    earned: {
      fontFamily: fonts.metaBold,
      fontSize: 11,
      color: colors.mutedDim,
      marginTop: 5,
    },
    badgeDot: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.gold,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
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
