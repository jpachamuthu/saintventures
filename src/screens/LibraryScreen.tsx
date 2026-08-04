import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ArrowUpDown, Clock, Heart, Search } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SaintIllustration from "../components/SaintIllustration";
import BottomNav, { type TabId } from "../components/BottomNav";
import { theme } from "../theme";
import { stories, type Story } from "../data/stories";

type LibraryScreenProps = {
  onOpenStory: (story: Story) => void;
  onFooterTab: (tab: TabId) => void;
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
};

function Highlighted({ text, query, style }: { text: string; query: string; style: any }) {
  if (!query) return <Text style={style}>{text}</Text>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return <Text style={style}>{text}</Text>;
  return (
    <Text style={style}>
      {text.slice(0, idx)}
      <Text style={{ color: theme.colors.goldBright }}>{text.slice(idx, idx + query.length)}</Text>
      {text.slice(idx + query.length)}
    </Text>
  );
}

export default function LibraryScreen({ onOpenStory, onFooterTab, favouriteIds, onToggleFavourite }: LibraryScreenProps) {
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = stories.slice().sort((a, b) =>
      asc ? a.saint.localeCompare(b.saint) : b.saint.localeCompare(a.saint)
    );
    return q ? list.filter((s) => s.saint.toLowerCase().includes(q)) : list;
  }, [query, asc]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Library</Text>
          <Text style={styles.subtitle}>SAINT STORIES</Text>
        </View>
        <View style={styles.search}>
          <Search size={15} color={theme.colors.mutedDim} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search saints…"
            placeholderTextColor={theme.colors.mutedDim}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Text style={styles.clearBtn}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.count}>
          <Text style={styles.countNum}>{items.length}</Text>
          {query ? " of 6 stories" : " stories"}
        </Text>
        <Pressable onPress={() => setAsc(!asc)} style={styles.sortBtn}>
          <ArrowUpDown size={13} color={theme.colors.gold} strokeWidth={2.4} />
          <Text style={styles.sortLabel}>{asc ? "Name A–Z" : "Name Z–A"}</Text>
        </Pressable>
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
            <Pressable key={s.id} onPress={() => onOpenStory(s)} style={styles.card}>
              <View style={styles.thumb}>
                <SaintIllustration palette={s.palette} art={s.art} height={150} />
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    onToggleFavourite(s.id);
                  }}
                  hitSlop={8}
                  style={styles.heartBtn}
                >
                  <Heart
                    size={15}
                    color={favouriteIds.includes(s.id) ? theme.colors.gold : theme.colors.cream}
                    fill={favouriteIds.includes(s.id) ? theme.colors.gold : "transparent"}
                  />
                </Pressable>
              </View>
              <View style={styles.info}>
                <Highlighted style={styles.saint} text={s.saint} query={query.trim()} />
                <Text style={styles.gtitle} numberOfLines={1}>
                  {s.title}
                </Text>
                <View style={styles.meta}>
                  <View style={styles.ageBadge}>
                    <Text style={styles.ageText}>{s.age}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={11} color={theme.colors.mutedDim} />
                    <Text style={styles.metaText}>{s.minutes} min</Text>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
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
    fontFamily: theme.fonts.displayBold,
    fontSize: 30,
    lineHeight: 32,
    color: theme.colors.cream,
  },
  subtitle: {
    fontFamily: theme.fonts.uiBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: theme.colors.gold,
    marginTop: 1,
  },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.bgCard,
    borderWidth: 1,
    borderColor: theme.colors.ring,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 14,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.fonts.uiMedium,
    fontSize: 13.5,
    color: theme.colors.cream,
    padding: 0,
  },
  clearBtn: {
    fontSize: 13,
    color: theme.colors.mutedDim,
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
    fontFamily: theme.fonts.uiMedium,
    fontSize: 12.5,
    color: theme.colors.muted,
  },
  countNum: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.uiBold,
  },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: theme.colors.bgCard,
    borderWidth: 1,
    borderColor: theme.colors.ring,
    borderRadius: theme.radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  sortLabel: {
    fontFamily: theme.fonts.uiBold,
    fontSize: 12,
    color: theme.colors.cream,
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
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.ring,
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
  saint: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 18,
    lineHeight: 21,
    color: theme.colors.cream,
  },
  gtitle: {
    fontFamily: theme.fonts.uiMedium,
    fontSize: 11.5,
    color: theme.colors.muted,
    marginTop: 3,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 9,
  },
  ageBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.marianBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  ageText: {
    fontFamily: theme.fonts.uiBold,
    fontSize: 11,
    color: "#FFFFFF",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    fontFamily: theme.fonts.uiMedium,
    fontSize: 11,
    color: theme.colors.mutedDim,
  },
  empty: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  emptyGlyph: {
    fontSize: 30,
    color: theme.colors.mutedDim,
  },
  emptyTitle: {
    fontFamily: theme.fonts.uiBold,
    fontSize: 14,
    color: theme.colors.muted,
    marginTop: 4,
  },
  emptyHint: {
    fontFamily: theme.fonts.ui,
    fontSize: 12.5,
    color: theme.colors.mutedDim,
    marginTop: 4,
  },
});