import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  Image as RNImage,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { ArrowLeft, ArrowUpDown, Download, FileText, Heart, Image as ImageIcon, Search, X } from "lucide-react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SaintIllustration from "../components/SaintIllustration";
import AnimatedHeartButton from "../components/AnimatedHeartButton";
import GoldGradient from "../components/GoldGradient";
import PrayingHands from "../components/PrayingHands";
import { webBlurStyle } from "../components/GlassView";
import { useTheme } from "../components/ThemeContext";
import { fonts, radius, type ThemeColors } from "../theme";
import { saintSortKey, stories, type Story } from "../data/stories";
import { downloadPrayerCard } from "../cards/prayerCard";
import { downloadSaintImage, downloadStoryBookHtml } from "../cards/storyCard";

const TOP_BLUR = webBlurStyle();
const WEB_LOCK_Y = { touchAction: "pan-y", overscrollBehavior: "none" } as any;

type GalleryScreenProps = {
  onBack: () => void;
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
};

type GalleryItem = { story: Story; image: number };

export default function GalleryScreen({ onBack, favouriteIds, onToggleFavourite }: GalleryScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [dlOpen, setDlOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const fanProg = useRef(new Animated.Value(0)).current;
  const fanRise = fanProg.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });
  const fanScale = fanProg.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let saints = stories
      .filter((s) => s.imageSmall != null || s.hero != null || (s.extraImages ?? []).length > 0)
      .sort((a, b) =>
        asc
          ? saintSortKey(a.saint).localeCompare(saintSortKey(b.saint))
          : saintSortKey(b.saint).localeCompare(saintSortKey(a.saint))
      );
    if (onlyFavs) saints = saints.filter((s) => favouriteIds.includes(s.id));
    if (q) saints = saints.filter((s) => s.saint.toLowerCase().includes(q));
    const all: GalleryItem[] = [];
    for (const s of saints) {
      if (s.hero != null) all.push({ story: s, image: s.hero });
      if (s.imageSmall != null) all.push({ story: s, image: s.imageSmall });
      for (const extra of s.extraImages ?? []) all.push({ story: s, image: extra });
    }
    return all;
  }, [query, asc, onlyFavs, favouriteIds]);

  const openLightbox = (item: GalleryItem) => {
    fanProg.setValue(0);
    setDlOpen(false);
    setSelected(item);
  };

  const closeLightbox = () => {
    setDlOpen(false);
    fanProg.setValue(0);
    setSelected(null);
  };

  const toggleDl = () => {
    if (dlOpen) {
      closeFan();
      return;
    }
    setDlOpen(true);
    Animated.spring(fanProg, { toValue: 1, friction: 7, tension: 180, useNativeDriver: true }).start();
  };

  const closeFan = () => {
    Animated.spring(fanProg, { toValue: 0, friction: 7, tension: 180, useNativeDriver: true }).start();
    setTimeout(() => setDlOpen(false), 180);
  };

  const runDownload = (fn: (s: Story) => void | Promise<unknown>) => {
    if (!selected) return;
    closeFan();
    try {
      const r = fn(selected.story);
      if (r && typeof (r as Promise<unknown>).catch === "function") {
        (r as Promise<unknown>).catch(() => {});
      }
    } catch {
      /* download is best-effort */
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.headerPanel, { top: insets.top }, TOP_BLUR]}>
        <View style={styles.header}>
          <Pressable onPress={onBack} style={styles.backBtn} hitSlop={8} accessibilityRole="button" accessibilityLabel="Back">
            <ArrowLeft size={18} color={colors.cream} />
          </Pressable>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Gallery</Text>
            <Text style={styles.subtitle}>SAINT ARTWORK</Text>
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
              <Pressable onPress={() => setQuery("")} hitSlop={8}>
                <X size={15} color={colors.mutedDim} />
              </Pressable>
            )}
          </View>
        </View>

        <View style={styles.sortRow}>
          <Text style={styles.count}>
            <Text style={styles.countNum}>{items.length}</Text>
            {query ? " of many artworks" : " artworks"}
          </Text>
          <View style={styles.sortGroup}>
            <Pressable
              onPress={() => setOnlyFavs(!onlyFavs)}
              accessibilityRole="button"
              accessibilityLabel={onlyFavs ? "Show all artworks" : "Show only favourites"}
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
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyGlyph}>✧</Text>
          <Text style={styles.emptyTitle}>No artworks found</Text>
          <Text style={styles.emptyHint}>Try a different name, like "Clare" or "Francis"</Text>
        </View>
      ) : (
      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        style={Platform.OS === "web" ? WEB_LOCK_Y : undefined}
      >
        {items.map((item, idx) => (
          <Pressable
            key={`${item.story.id}-${idx}`}
            onPress={() => openLightbox(item)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={`View ${item.story.saint}`}
          >
            <View style={styles.thumb}>
              <SaintIllustration palette={item.story.palette} art={item.story.art} image={item.image} height="100%" />
              <AnimatedHeartButton
                active={favouriteIds.includes(item.story.id)}
                onPress={() => onToggleFavourite(item.story.id)}
                size={13}
                style={styles.heartBtn}
              />
            </View>
            <Text style={styles.name} numberOfLines={2}>
              {item.story.saint}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      )}

      <Modal visible={selected !== null} animationType="fade" transparent onRequestClose={closeLightbox}>
        <View style={styles.lightbox}>
          <View style={styles.lightHeader}>
            <Text style={styles.lightTitle} numberOfLines={1}>
              {selected?.story.saint ?? ""}
            </Text>
            <Pressable onPress={closeLightbox} style={styles.closeBtn} hitSlop={10} accessibilityRole="button" accessibilityLabel="Close">
              <X size={18} color={colors.cream} />
            </Pressable>
          </View>
          {selected && (
            <RNImage
              source={selected.image}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
          <View style={styles.lightFooter}>
            {dlOpen && (
              <View style={styles.fanCol}>
                <Animated.View style={{ opacity: fanProg, transform: [{ translateY: fanRise }, { scale: fanScale }] }}>
                  <Pressable
                    style={styles.fanBtn}
                    onPress={() => runDownload(downloadStoryBookHtml)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Download storybook"
                  >
                    <FileText size={18} color={colors.cream} />
                  </Pressable>
                </Animated.View>
                <Animated.View style={{ opacity: fanProg, transform: [{ translateY: fanRise }, { scale: fanScale }] }}>
                  <Pressable
                    style={styles.fanBtn}
                    onPress={() => selected && runDownload((s) => downloadPrayerCard(s, selected.image))}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Download prayer card"
                  >
                    <PrayingHands size={18} color={colors.gold} />
                  </Pressable>
                </Animated.View>
                <Animated.View style={{ opacity: fanProg, transform: [{ translateY: fanRise }, { scale: fanScale }] }}>
                  <Pressable
                    style={styles.fanBtn}
                    onPress={() => selected && runDownload((s) => downloadSaintImage(s, selected.image))}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Download image"
                  >
                    <ImageIcon size={18} color={colors.cream} />
                  </Pressable>
                </Animated.View>
              </View>
            )}
            <Pressable
              onPress={toggleDl}
              style={styles.mainBtn}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Download options"
            >
              <Download size={19} color={colors.cream} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
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
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 18,
      paddingTop: 8,
      paddingBottom: 4,
    },
    titleBlock: {
      flexShrink: 0,
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
      minWidth: 0,
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
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.glassFill,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    backBtnSpacer: {
      width: 40,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 30,
      lineHeight: 32,
      color: colors.cream,
    },
    grid: {
      paddingHorizontal: 18,
      paddingTop: 125,
      paddingBottom: 40,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 14,
    },
    card: {
      width: "31%",
    },
    thumb: {
      aspectRatio: 1,
      borderRadius: 14,
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
    empty: {
      alignItems: "center",
      paddingHorizontal: 24,
      marginTop: 113,
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
    name: {
      fontFamily: fonts.uiBold,
      fontSize: 11,
      lineHeight: 14,
      color: colors.cream,
      textAlign: "center",
      marginTop: 6,
    },
    lightbox: {
      flex: 1,
      backgroundColor: "rgba(10, 8, 18, 0.92)",
      paddingTop: 54,
      paddingBottom: 30,
      paddingHorizontal: 18,
    },
    lightHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    lightTitle: {
      flex: 1,
      fontFamily: fonts.serifBold,
      fontSize: 22,
      color: colors.cream,
    },
    closeBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.glassFill,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    fullImage: {
      flex: 1,
      width: "100%",
    },
    lightFooter: {
      alignItems: "center",
      marginTop: 16,
    },
    fanCol: {
      alignItems: "center",
      gap: 10,
      marginBottom: 12,
    },
    fanBtn: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.glassFillStrong,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    mainBtn: {
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor: colors.gold,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.4,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
    },
  });
}
