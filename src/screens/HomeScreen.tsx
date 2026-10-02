import React, { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Bell, Library, Menu, Play, Clock, Star } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SaintIllustration from "../components/SaintIllustration";
import GoldGradient from "../components/GoldGradient";
import AnimatedHeartButton from "../components/AnimatedHeartButton";
import FadeInView from "../components/FadeInView";
import type { TabId } from "../components/BottomNav";
import { LogoMark } from "../components/Logo";
import { webBlurStyle } from "../components/GlassView";
import { useTheme } from "../components/ThemeContext";
import { useRatings, formatRating } from "../hooks/useRatings";
import { fonts, radius, type ThemeColors } from "../theme";
import { stories, type Story } from "../data/stories";

const TOP_BLUR = webBlurStyle();

export default function HomeScreen({
  onOpenStory,
  onFooterTab,
  onOpenMenu,
  hasNew,
  onBellPress,
  favouriteIds,
  onToggleFavourite,
}: {
  onOpenStory: (story: Story) => void;
  onFooterTab: (tab: TabId) => void;
  onOpenMenu: () => void;
  hasNew: boolean;
  onBellPress: () => void;
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
}) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { average: avgRating } = useRatings();
  const styles = createStyles(colors);
  const latest = [...stories].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 10);
  const favourites = stories.filter((s) => favouriteIds.includes(s.id));
  const topStories = [...stories].sort((a, b) => avgRating(b.id) - avgRating(a.id)).slice(0, 10);
  const [featuredStory] = useState<Story>(
    () => stories[Math.floor(Math.random() * stories.length)]
  );
  const [removed, setRemoved] = useState<Story | null>(null);
  const undoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = (s: Story) => {
    const wasFav = favouriteIds.includes(s.id);
    onToggleFavourite(s.id);
    if (undoRef.current) {
      clearTimeout(undoRef.current);
      undoRef.current = null;
    }
    if (wasFav) {
      setRemoved(s);
      undoRef.current = setTimeout(() => setRemoved(null), 4000);
    } else {
      setRemoved(null);
    }
  };

  const undoRemoval = () => {
    if (removed) {
      onToggleFavourite(removed.id);
      setRemoved(null);
      if (undoRef.current) {
        clearTimeout(undoRef.current);
        undoRef.current = null;
      }
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.topBar, { top: insets.top }, TOP_BLUR]}>
        <View style={styles.brand}>
          <LogoMark size={30} />
          <Text style={styles.brandName}>
            <Text style={{ color: colors.cream }}>Saint</Text>
            <Text style={{ color: colors.gold }}>Ventures</Text>
          </Text>
        </View>
          <View style={styles.icons}>
            <Pressable
              onPress={onBellPress}
              style={styles.iconBtn}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="New stories"
            >
              <Bell size={16} color={colors.cream} />
              {hasNew && <View style={styles.notifDot} />}
            </Pressable>
          <Pressable
            onPress={onOpenMenu}
            style={styles.iconBtn}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Menu size={16} color={colors.cream} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredWrap}>
          <SaintIllustration palette={featuredStory.palette} art={featuredStory.art} image={featuredStory.hero} height={330}>
            <View style={styles.featuredOverlay}>
              <Text style={[styles.eyebrow, !isDark && styles.eyebrowLight]}>Featured Saint</Text>
              <Text style={[styles.featuredTitle, !isDark && styles.featuredTitleLight]}>
                {featuredStory.title}
              </Text>
              <Text style={[styles.featuredBlurb, !isDark && styles.featuredBlurbLight]}>
                {featuredStory.blurb}
              </Text>
              <Pressable onPress={() => onOpenStory(featuredStory)} style={styles.readBtn}>
                <GoldGradient style={StyleSheet.absoluteFill} />
                <Play size={15} color="#000000" fill="#000000" style={{ zIndex: 1 }} />
                <Text style={styles.readBtnText}>Read</Text>
              </Pressable>
            </View>
          </SaintIllustration>
          <AnimatedHeartButton
            active={favouriteIds.includes(featuredStory.id)}
            onPress={() => handleToggle(featuredStory)}
            size={18}
            style={styles.featuredHeart}
          />
        </View>

        <View style={styles.favouritesSection}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Top stories</Text>
            <Text style={styles.favCount}>Top 10 ⭐</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favRail}
          >
            {topStories.map((s) => (
              <Pressable
                key={s.id}
                onPress={() => onOpenStory(s)}
                style={({ pressed }) => [styles.favCard, pressed && styles.pressed]}
              >
                <View style={styles.favThumb}>
                  <SaintIllustration palette={s.palette} art={s.art} image={s.imageSmall ?? s.hero} height={150} cropBottom={s.imageSmall != null} />
                  <AnimatedHeartButton
                    active={favouriteIds.includes(s.id)}
                    onPress={() => handleToggle(s)}
                    size={13}
                    style={[styles.heartBtn, { width: 28, height: 28, borderRadius: 14 }]}
                  />
                  <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.45)", "rgba(0,0,0,0.78)"]} style={styles.nameScrim}>
                    <Text style={styles.nameOverlay} numberOfLines={2}>
                      {s.saint}
                    </Text>
                  </LinearGradient>
                </View>
                <View style={styles.favInfo}>
                  <View style={styles.favMeta}>
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
        </View>

        <View style={styles.favouritesSection}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Favourite stories</Text>
            {favourites.length > 0 && (
              <Text style={styles.favCount}>{favourites.length} 💛</Text>
            )}
          </View>
          {favourites.length === 0 ? (
            <View style={styles.favEmpty}>
              <Text style={styles.favEmptyText}>Tap the heart on a story to save it here</Text>
            </View>
          ) : (
            <FadeInView>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.favRail}
              >
                {favourites.map((s) => (
                  <Pressable
                    key={s.id}
                    onPress={() => onOpenStory(s)}
                    style={({ pressed }) => [styles.favCard, pressed && styles.pressed]}
                  >
                    <View style={styles.favThumb}>
                      <SaintIllustration palette={s.palette} art={s.art} image={s.imageSmall ?? s.hero} height={150} cropBottom={s.imageSmall != null} />
                      <AnimatedHeartButton
                        active
                        onPress={() => handleToggle(s)}
                        size={13}
                        style={[styles.heartBtn, { width: 28, height: 28, borderRadius: 14 }]}
                      />
                      <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.45)", "rgba(0,0,0,0.78)"]} style={styles.nameScrim}>
                        <Text style={styles.nameOverlay} numberOfLines={2}>
                          {s.saint}
                        </Text>
                      </LinearGradient>
                    </View>
                    <View style={styles.favInfo}>
                      <View style={styles.favMeta}>
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
            </FadeInView>
          )}
        </View>

        {favourites.length > 0 && <View style={styles.blank} />}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest saint stories</Text>
          {latest.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => onOpenStory(s)}
              style={({ pressed }) => [styles.readCard, pressed && styles.pressed]}
            >
              <View style={styles.readThumb}>
                <SaintIllustration palette={s.palette} art={s.art} image={s.imageSmall ?? s.hero} height={88} cropBottom={s.imageSmall != null} />
                <AnimatedHeartButton
                  active={favouriteIds.includes(s.id)}
                  onPress={() => handleToggle(s)}
                  size={13}
                  style={styles.heartBtn}
                />
                <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.45)", "rgba(0,0,0,0.78)"]} style={styles.thumbScrim}>
                  <Text style={styles.thumbName} numberOfLines={2}>
                    {s.saint}
                  </Text>
                </LinearGradient>
              </View>
              <View style={styles.readInfo}>
                <Text style={styles.readTitle}>{s.title}</Text>
                <Text style={styles.readBlurb}>{s.blurb}</Text>
                <View style={styles.readMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={12} color={colors.mutedDim} />
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
          <Pressable onPress={() => onFooterTab("library")} hitSlop={8} style={({ pressed }) => [styles.goLibrary, pressed && styles.pressed]}>
            <GoldGradient style={StyleSheet.absoluteFill} />
            <Library size={18} color={colors.onGold} style={{ zIndex: 1 }} />
            <Text style={styles.goLibraryText}>Go to Library for more stories</Text>
          </Pressable>
        </View>
      </ScrollView>

      {removed && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Removed from favourites</Text>
          <Pressable onPress={undoRemoval} hitSlop={8}>
            <Text style={styles.toastUndo}>Undo</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    paddingTop: 70,
    paddingBottom: 130,
  },
  topBar: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.glassFill,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandName: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
  },
  icons: {
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gold,
  },
  featuredWrap: {
    paddingHorizontal: 18,
  },
  featuredHeart: {
    top: 14,
    right: 32,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(20,13,9,0.62)",
  },
  pressed: {
    opacity: 0.75,
  },
  toast: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 96,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.bgCardAlt,
    borderWidth: 1,
    borderColor: colors.ring,
    borderRadius: radius.card,
    paddingHorizontal: 16,
    paddingVertical: 13,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  toastText: {
    fontFamily: fonts.ui,
    fontSize: 13,
    color: colors.cream,
  },
  toastUndo: {
    fontFamily: fonts.uiBold,
    fontSize: 13,
    color: colors.gold,
  },
  featuredOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "rgba(20,13,9,0.35)",
  },
  eyebrow: {
    fontFamily: fonts.uiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.gold,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  eyebrowLight: {
    color: "#FFB347",
  },
  featuredTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 36,
    lineHeight: 40,
    color: colors.cream,
  },
  featuredTitleLight: {
    color: "#FFD27A",
  },
  featuredBlurb: {
    fontFamily: fonts.ui,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    marginTop: 8,
  },
  featuredBlurbLight: {
    color: "#FFD27A",
  },
  readBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingVertical: 13,
    paddingHorizontal: 34,
    marginTop: 16,
    overflow: "hidden",
  },
  readBtnText: {
    fontFamily: fonts.uiBold,
    fontSize: 15,
    color: colors.onGold,
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 26,
    gap: 14,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.cream,
  },
  goLibrary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "center",
    borderRadius: radius.pill,
    paddingVertical: 13,
    paddingHorizontal: 30,
    marginTop: 8,
    overflow: "hidden",
  },
  goLibraryText: {
    fontFamily: fonts.uiBold,
    fontSize: 15,
    color: colors.onGold,
  },
  readCard: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: colors.glassFill,
    borderRadius: radius.card,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  readThumb: {
    width: 88,
    height: 88,
    borderRadius: 14,
    overflow: "hidden",
  },
  heartBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(20,13,9,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  readInfo: {
    flex: 1,
    justifyContent: "center",
  },
  readTitle: {
    fontFamily: fonts.card,
    fontSize: 18,
    color: colors.cream,
  },
  readBlurb: {
    fontFamily: fonts.ui,
    fontSize: 12,
    lineHeight: 16,
    color: colors.muted,
    marginTop: 4,
  },
  readMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
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
    gap: 4,
  },
  metaText: {
    fontFamily: fonts.metaBold,
    fontSize: 12,
    color: colors.mutedDim,
  },
  favouritesSection: {
    marginTop: 26,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  favCount: {
    fontFamily: fonts.uiBold,
    fontSize: 11,
    color: colors.gold,
  },
  favRail: {
    paddingHorizontal: 18,
    gap: 12,
  },
  favCard: {
    width: 148,
    backgroundColor: colors.glassFill,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: "hidden",
  },
  favThumb: {
    height: 150,
    overflow: "hidden",
  },
  favInfo: {
    paddingHorizontal: 11,
    paddingTop: 9,
    paddingBottom: 11,
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
  thumbScrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: 6,
    paddingBottom: 5,
  },
  thumbName: {
    fontFamily: fonts.card,
    fontSize: 10.5,
    lineHeight: 13,
    color: colors.white,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  favMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 7,
  },
  favEmpty: {
    marginHorizontal: 18,
    paddingVertical: 22,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.ring,
    borderRadius: radius.card,
  },
  favEmptyText: {
    fontFamily: fonts.ui,
    fontSize: 13,
    color: colors.mutedDim,
  },
  blank: {
    height: 6,
  },
});
}
