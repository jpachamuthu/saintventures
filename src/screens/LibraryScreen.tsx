import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ArrowUpDown, Clock, Heart, Search, Star, X } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import SaintIllustration from "../components/SaintIllustration";
import AnimatedHeartButton from "../components/AnimatedHeartButton";
import BottomNav, { type TabId } from "../components/BottomNav";
import { useTheme } from "../components/ThemeContext";
import { useRatings, formatRating } from "../hooks/useRatings";
import { fonts, radius, type ThemeColors } from "../theme";
import { stories, type Story } from "../data/stories";

type LibraryScreenProps = {
  onOpenStory: (story: Story) => void;
  onFooterTab: (tab: TabId) => void;
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
};

function Highlighted({ text, query, style }: { text: string; query: string; style: any }) {
  const { colors } = useTheme();
  if (!query) return <Text style={style}>{text}</Text>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return <Text style={style}>{text}</Text>;
  return (
    <Text style={style}>
      {text.slice(0, idx)}
      <Text style={{ color: colors.goldBright }}>{text.slice(idx, idx + query.length)}</Text>
      {text.slice(idx + query.length)}
    </Text>
  );
}

export default function LibraryScreen({ onOpenStory, onFooterTab, favouriteIds, onToggleFavourite }: LibraryScreenProps) {
  const { colors } = useTheme();
  const { average: avgRating } = useRatings();
  const styles = createStyles(colors);
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);
  const [onlyFavs, setOnlyFavs] = useState(false);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = stories.slice().sort((a, b) =>
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
          <Text style={styles.title}>Library</Text>
          <Text style={styles.subtitle}>SAINT STORIES</Text>
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
        {query.length > 0 && (
          <Pressable onPress={clearSearch} hitSlop={8}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.count}>
          <Text style={styles.countNum}>{items.length}</Text>
          {query ? ` of ${stories.length} stories` : " stories"}
        </Text>
        <View style={styles.sortGroup}>
          <Pressable
            onPress={() => setOnlyFavs(!onlyFavs)}
            accessibilityRole="button"
            accessibilityLabel={onlyFavs ? "Show all stories" : "Show only favourites"}
            style={({ pressed }) => [
              styles.sortBtn,
              pressed && styles.pressed,
              onlyFavs && styles.favChipActive,
            ]}
          >
            <Heart
              size={13}
              color={onlyFavs ? colors.onGold : colors.gold}
              fill={onlyFavs ? colors.onGold : "transparent"}
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
          <Text style={styles.emptyTitle}>No saints found</Text>
          <Text style={styles.emptyHint}>Try a different name, like "Clare" or "Francis"</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {items.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => onOpenStory(s)}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={styles.thumb}>
                <SaintIllustration palette={s.palette} art={s.art} image={s.imageSmall ?? s.hero} height="100%" />
                <AnimatedHeartButton
                  active={favouriteIds.includes(s.id)}
                  onPress={() => onToggleFavourite(s.id)}
                  size={15}
                  style={styles.heartBtn}
                />
                <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.45)", "rgba(0,0,0,0.78)"]} style={styles.nameScrim}>
                  <Highlighted style={styles.nameOverlay} text={s.saint} query={query.trim()} />
                </LinearGradient>
              </View>
              <View style={styles.info}>
                <Text style={styles.gtitle} numberOfLines={1}>
                  {s.title}
                </Text>
                <View style={styles.meta}>
                  <View style={styles.metaItem}>
                    <Clock size={11} color={colors.mutedDim} />
                    <Text style={styles.metaText}>{s.minutes} min</Text>
                  </View>
                  <View style={styles.starGroup}>
                    <Star size={12} color={colors.gold} fill={colors.gold} />
                    <Text style={styles.starValue}>{formatRating(avgRating(s.id))}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <BottomNav active="library" onTab={onFooterTab} />
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
    gap: 12,
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
  },
  clearBtn: {
    fontSize: 13,
    color: colors.mutedDim,
  },
  cancelText: {
    fontFamily: fonts.uiBold,
    fontSize: 13,
    color: colors.gold,
  },
  sortGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  favChipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  pressed: {
    opacity: 0.7,
  },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
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
  },
  sortLabel: {
    fontFamily: fonts.uiBold,
    fontSize: 12,
    color: colors.cream,
  },
  grid: {
    paddingHorizontal: 18,
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
  thumb: {
    aspectRatio: 1,
    overflow: "hidden",
  },
  heartBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(20,13,9,0.62)",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  nameScrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 18,
    paddingHorizontal: 10,
    paddingBottom: 9,
  },
  nameOverlay: {
    fontFamily: fonts.card,
    fontSize: 14,
    lineHeight: 17,
    color: colors.white,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
    gap: 8,
    marginTop: 9,
  },
  starGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  starValue: {
    fontFamily: fonts.metaBold,
    fontSize: 11,
    color: colors.gold,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    fontFamily: fonts.metaBold,
    fontSize: 11,
    color: colors.mutedDim,
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