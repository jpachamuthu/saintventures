import React, { useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Search, ArrowUp, ArrowDown, Calendar, X } from "lucide-react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedHeartButton from "../components/AnimatedHeartButton";
import { webBlurStyle } from "../components/GlassView";
import { useTheme } from "../components/ThemeContext";
import { fonts, radius, type ThemeColors } from "../theme";
import {
  feastDays,
  MONTH_NAMES,
  sortFeastDays,
  type FeastDay,
} from "../data/feastDays";
import type { Story } from "../data/stories";

const TOP_BLUR = webBlurStyle();

type SortDirection = "asc" | "desc";

export default function FeastDaysScreen({
  onOpenStory,
  favouriteIds,
  onToggleFavourite,
}: {
  onOpenStory: (story: Story) => void;
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState<SortDirection>("asc");
  const scrollRef = useRef<ScrollView>(null);
  const monthOffsets = useRef<Record<number, number>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? feastDays.filter((f) => f.story.saint.toLowerCase().includes(q))
      : feastDays;
    return sortFeastDays(base, direction);
  }, [query, direction]);

  const grouped = useMemo(() => {
    const groups: { month: number; days: { day: number; items: FeastDay[] }[] }[] = [];
    filtered.forEach((f) => {
      let g = groups[groups.length - 1];
      if (!g || g.month !== f.month) {
        g = { month: f.month, days: [] };
        groups.push(g);
      }
      const d = g.days[g.days.length - 1];
      if (d && d.day === f.day) d.items.push(f);
      else g.days.push({ day: f.day, items: [f] });
    });
    return groups;
  }, [filtered]);

  const scrollToToday = () => {
    const currentMonth = new Date().getMonth() + 1;
    const y = monthOffsets.current[currentMonth];
    if (y !== undefined) {
      scrollRef.current?.scrollTo({ y, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.headerPanel, { top: insets.top }, TOP_BLUR]}>
        <View style={styles.panelInner}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Saints</Text>
          <Text style={styles.subtitle}>FEAST DAYS</Text>
        </View>
        <View style={styles.searchPill}>
          <Search size={15} color={colors.mutedDim} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search saints..."
            placeholderTextColor={colors.mutedDim}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <X size={15} color={colors.mutedDim} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.toolbar}>
        <Pressable style={styles.todayPill} onPress={scrollToToday}>
          <Calendar size={13} color={colors.gold} />
          <Text style={styles.todayPillText}>Today</Text>
        </Pressable>

        <Pressable
          style={styles.sortPill}
          onPress={() => setDirection((d) => (d === "asc" ? "desc" : "asc"))}
          accessibilityRole="button"
          accessibilityLabel={direction === "asc" ? "Sort descending" : "Sort ascending"}
        >
          {direction === "asc" ? (
            <ArrowUp size={13} color={colors.gold} strokeWidth={2.4} />
          ) : (
            <ArrowDown size={13} color={colors.gold} strokeWidth={2.4} />
          )}
          <Text style={styles.sortPillText}>Month</Text>
        </Pressable>
      </View>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {grouped.map((group) => (
          <View
            key={group.month}
            onLayout={(e) => {
              monthOffsets.current[group.month] = e.nativeEvent.layout.y;
            }}
          >
            <Text style={styles.monthLabel}>
              {MONTH_NAMES[group.month - 1].toUpperCase()}
            </Text>
            {group.days.map((d) => (
              <View key={d.day} style={styles.dayRow}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateDay}>{d.day}</Text>
                  <Text style={styles.dateMonth}>
                    {MONTH_NAMES[group.month - 1].slice(0, 3)}
                  </Text>
                </View>
                <View style={styles.dayItems}>
                  {d.items.map((f, idx) => (
                    <Pressable
                      key={f.story.id}
                      style={[styles.saintRow, idx > 0 && styles.saintRowBorder]}
                      onPress={() => onOpenStory(f.story)}
                    >
                      <View style={styles.nameRow}>
                        <Text style={styles.rowName} numberOfLines={1}>
                          {f.story.saint}
                        </Text>
                        <AnimatedHeartButton
                          active={favouriteIds.includes(f.story.id)}
                          onPress={() => onToggleFavourite(f.story.id)}
                          size={14}
                          style={styles.heartBtn}
                        />
                      </View>
                      <Text style={styles.rowTitle} numberOfLines={1}>
                        {f.story.title}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
        <Text style={styles.sourceNote}>
          Feast dates follow the General Roman Calendar and the Roman Martyrology. See Credits & Attribution in the Menu for details.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    headerPanel: {
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: colors.glassFill,
      borderBottomWidth: 1,
      borderBottomColor: colors.glassBorder,
    },
    panelInner: {
      paddingHorizontal: 18,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 8,
      marginBottom: 14,
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
    searchPill: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.bgCard,
      borderColor: colors.ring,
      borderWidth: 1,
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
      // Web browsers draw their own focus ring around the textbox — suppress it
      // so only the pill itself is visible.
      ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
    },
    toolbar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 8,
      marginBottom: 14,
      zIndex: 10,
    },
    todayPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: colors.bgCardAlt,
      borderColor: colors.gold,
      borderWidth: 1,
      borderRadius: radius.pill,
      paddingHorizontal: 12,
      paddingVertical: 7,
    },
    todayPillText: {
      fontFamily: fonts.uiBold,
      fontSize: 12,
      color: colors.cream,
    },
    sortPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      backgroundColor: colors.bgCard,
      borderColor: colors.ring,
      borderWidth: 1,
      borderRadius: radius.pill,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    sortPillText: {
      fontFamily: fonts.uiBold,
      fontSize: 12,
      color: colors.cream,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 18,
      paddingTop: 127,
      paddingBottom: 130,
    },
    monthLabel: {
      fontFamily: fonts.uiBold,
      fontSize: 11,
      letterSpacing: 1,
      color: colors.gold,
      marginTop: 14,
      marginBottom: 8,
      paddingHorizontal: 2,
    },
    dayRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 10,
      paddingHorizontal: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.ring,
    },
    dayItems: {
      flex: 1,
      minWidth: 0,
    },
    saintRow: {
      paddingVertical: 5,
    },
    saintRowBorder: {
      borderTopWidth: 1,
      borderTopColor: colors.ring,
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },    dateBadge: {
      width: 42,
      height: 42,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.gold,
      backgroundColor: colors.bgCard,
      alignItems: "center",
      justifyContent: "center",
    },
    dateDay: {
      fontFamily: fonts.uiBold,
      fontSize: 14,
      color: colors.gold,
      lineHeight: 16,
    },
    dateMonth: {
      fontFamily: fonts.uiBold,
      fontSize: 9,
      color: colors.gold,
      opacity: 0.85,
    },
    rowText: {
      flex: 1,
      minWidth: 0,
    },
    rowName: {
      flex: 1,
      fontFamily: fonts.uiBold,
      fontSize: 14,
      color: colors.cream,
    },
    rowTitle: {
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
    sourceNote: {
      fontFamily: fonts.ui,
      fontSize: 11,
      lineHeight: 16,
      color: colors.mutedDim,
      textAlign: "center",
      paddingHorizontal: 20,
      marginTop: 22,
    },
  });
}
