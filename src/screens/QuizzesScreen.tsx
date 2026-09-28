import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ArrowUpDown, Heart, Search, X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SaintIllustration from "../components/SaintIllustration";
import AnimatedHeartButton from "../components/AnimatedHeartButton";
import GoldGradient from "../components/GoldGradient";
import BottomNav, { type TabId } from "../components/BottomNav";
import { useTheme } from "../components/ThemeContext";
import { fonts, radius, type ThemeColors } from "../theme";
import { stories, type Story } from "../data/stories";
import { quizzes } from "../data/quizzes";

type QuizzesScreenProps = {
  onOpenQuiz: (story: Story) => void;
  onFooterTab: (tab: TabId) => void;
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
};

export default function QuizzesScreen({ onOpenQuiz, onFooterTab, favouriteIds, onToggleFavourite }: QuizzesScreenProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);
  const [onlyFavs, setOnlyFavs] = useState(false);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = stories
      .filter((s) => (quizzes[s.id] ?? []).length > 0)
      .sort((a, b) =>
        asc ? a.saint.localeCompare(b.saint) : b.saint.localeCompare(a.saint)
      );
    if (onlyFavs) list = list.filter((s) => favouriteIds.includes(s.id));
    if (q) list = list.filter((s) => s.saint.toLowerCase().includes(q));
    return list;
  }, [query, asc, onlyFavs, favouriteIds]);

  const clearSearch = () => setQuery("");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Quizzes</Text>
          <Text style={styles.subtitle}>SAINT QUIZZES</Text>
        </View>
        <View style={styles.search}>
          <Search size={15} color={colors.mutedDim} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search saints…"
            placeholderTextColor={colors.mutedDim}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <Pressable onPress={clearSearch} hitSlop={8}>
              <X size={15} color={colors.mutedDim} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.count}>
          <Text style={styles.countNum}>{items.length}</Text>
          {query ? ` of ${stories.length} quizzes` : " quizzes"}
        </Text>
        <View style={styles.sortGroup}>
          <Pressable
            onPress={() => setOnlyFavs(!onlyFavs)}
            accessibilityRole="button"
            accessibilityLabel={onlyFavs ? "Show all quizzes" : "Show only favourites"}
            style={({ pressed }) => [
              styles.sortBtn,
              pressed && styles.pressed,
              onlyFavs && styles.favChipActive,
            ]}
          >
            {onlyFavs && <GoldGradient style={StyleSheet.absoluteFill} />}
            <Heart
              size={13}
              color={onlyFavs ? colors.onGold : colors.gold}
              fill={onlyFavs ? colors.onGold : "transparent"}
              style={{ zIndex: 1 }}
            />
            <Text style={[styles.sortLabel, onlyFavs && { color: colors.onGold }]}>Favs</Text>
          </Pressable>
          <Pressable
            onPress={() => setAsc(!asc)}
            style={({ pressed }) => [styles.sortBtn, pressed && styles.pressed]}
          >
            <ArrowUpDown size={13} color={colors.gold} strokeWidth={2.4} />
            <Text style={styles.sortLabel}>{asc ? "A–Z" : "Z–A"}</Text>
          </Pressable>
        </View>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyGlyph}>✧</Text>
          <Text style={styles.emptyTitle}>No quizzes found</Text>
          <Text style={styles.emptyHint}>Try a different name, like "Clare" or "Francis"</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {items.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => onOpenQuiz(s)}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            >
              <View style={styles.thumb}>
                <SaintIllustration palette={s.palette} art={s.art} image={s.imageSmall ?? s.hero} height={52} />
              </View>
              <View style={styles.rowText}>
                <View style={styles.nameRow}>
                  <Text style={styles.rowName} numberOfLines={1}>
                    {s.saint}
                  </Text>
                  <AnimatedHeartButton
                    active={favouriteIds.includes(s.id)}
                    onPress={() => onToggleFavourite(s.id)}
                    size={14}
                    style={styles.heartBtn}
                  />
                </View>
                <Text style={styles.rowMeta} numberOfLines={1}>
                  {(quizzes[s.id] ?? []).length} questions · {s.title}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <BottomNav active="quizzes" onTab={onFooterTab} />
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingHorizontal: 18,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 8,
      marginBottom: 4,
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
    search: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.ring,
      borderRadius: radius.pill,
      paddingHorizontal: 14,
      height: 42,
    },
    searchInput: {
      flex: 1,
      fontFamily: fonts.uiMedium,
      fontSize: 13.5,
      color: colors.cream,
      padding: 0,
      borderWidth: 0,
      ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
    },
    sortRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 12,
      paddingBottom: 8,
    },
    count: {
      fontFamily: fonts.uiMedium,
      fontSize: 12.5,
      color: colors.muted,
    },
    countNum: {
      color: colors.gold,
      fontFamily: fonts.uiBold,
    },
    sortGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    sortBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.ring,
      borderRadius: radius.pill,
      paddingVertical: 8,
      paddingHorizontal: 14,
      overflow: "hidden",
    },
    favChipActive: {
      borderColor: colors.gold,
    },
    pressed: {
      opacity: 0.7,
    },
    sortLabel: {
      fontFamily: fonts.uiBold,
      fontSize: 12,
      color: colors.cream,
    },
    list: {
      paddingBottom: 130,
      gap: 4,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 10,
      paddingHorizontal: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.ring,
    },
    thumb: {
      width: 52,
      height: 52,
      borderRadius: 12,
      overflow: "hidden",
      flexShrink: 0,
    },
    rowText: {
      flex: 1,
      minWidth: 0,
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    rowName: {
      flex: 1,
      fontFamily: fonts.uiBold,
      fontSize: 14,
      color: colors.cream,
    },
    rowMeta: {
      fontFamily: fonts.ui,
      fontSize: 12,
      color: colors.muted,
      marginTop: 1,
    },
    heartBtn: {
      position: "relative",
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.bgCardAlt,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    empty: {
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 56,
    },
    emptyGlyph: {
      fontSize: 30,
      color: colors.mutedDim,
    },
    emptyTitle: {
      fontFamily: fonts.uiBold,
      fontSize: 14,
      color: colors.muted,
      marginTop: 4,
    },
    emptyHint: {
      fontFamily: fonts.ui,
      fontSize: 12.5,
      color: colors.mutedDim,
      marginTop: 4,
    },
  });
}
