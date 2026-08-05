import React, { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Bell, Menu, Play, Clock, UserPlus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SaintIllustration from "../components/SaintIllustration";
import AnimatedHeartButton from "../components/AnimatedHeartButton";
import FadeInView from "../components/FadeInView";
import BottomNav, { type TabId } from "../components/BottomNav";
import { useTheme } from "../components/ThemeContext";
import { fonts, radius, type ThemeColors } from "../theme";
import { featuredStory, stories, type Story } from "../data/stories";

export default function HomeScreen({
  onOpenStory,
  onFooterTab,
  favouriteIds,
  onToggleFavourite,
}: {
  onOpenStory: (story: Story) => void;
  onFooterTab: (tab: TabId) => void;
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
}) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const more = stories.slice(1);
  const favourites = stories.filter((s) => favouriteIds.includes(s.id));
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
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View style={styles.pill}>
            <UserPlus size={15} color={colors.gold} />
            <Text style={styles.pillText}>Add your child</Text>
          </View>
          <View style={styles.icons}>
            <View style={styles.iconBtn}>
              <Bell size={16} color={colors.cream} />
              <View style={styles.notifDot} />
            </View>
            <View style={styles.iconBtn}>
              <Menu size={16} color={colors.cream} />
            </View>
          </View>
        </View>

        <View style={styles.featuredWrap}>
          <SaintIllustration palette={featuredStory.palette} art={featuredStory.art} height={330}>
            <View style={styles.featuredOverlay}>
              <Text style={styles.eyebrow}>Tonight's Saint</Text>
              <Text style={styles.featuredTitle}>{featuredStory.title}</Text>
              <Text style={styles.featuredBlurb}>{featuredStory.blurb}</Text>
              <Pressable onPress={() => onOpenStory(featuredStory)} style={styles.readBtn}>
                <Play size={15} color={colors.onGold} fill={colors.onGold} />
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
                      <SaintIllustration palette={s.palette} art={s.art} height={150} />
                      <AnimatedHeartButton
                        active
                        onPress={() => handleToggle(s)}
                        size={13}
                        style={[styles.heartBtn, { width: 28, height: 28, borderRadius: 14 }]}
                      />
                    </View>
                    <View style={styles.favInfo}>
                      <Text style={styles.favSaint}>{s.saint}</Text>
                      <View style={styles.favMeta}>
                        <View style={styles.ageBadge}>
                          <Text style={styles.ageText}>{s.age}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Clock size={11} color={colors.mutedDim} />
                          <Text style={styles.metaText}>{s.minutes} min</Text>
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
          <Text style={styles.sectionTitle}>More saint stories</Text>
          {more.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => onOpenStory(s)}
              style={({ pressed }) => [styles.readCard, pressed && styles.pressed]}
            >
              <View style={styles.readThumb}>
                <SaintIllustration palette={s.palette} art={s.art} height={88} />
                <AnimatedHeartButton
                  active={favouriteIds.includes(s.id)}
                  onPress={() => handleToggle(s)}
                  size={13}
                  style={styles.heartBtn}
                />
              </View>
              <View style={styles.readInfo}>
                <Text style={styles.readTitle}>{s.title}</Text>
                <Text style={styles.readBlurb}>{s.blurb}</Text>
                <View style={styles.readMeta}>
                  <View style={styles.ageBadge}>
                    <Text style={styles.ageText}>{s.age}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={12} color={colors.mutedDim} />
                    <Text style={styles.metaText}>{s.minutes} min</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
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

      <BottomNav active="home" onTab={onFooterTab} />
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
    paddingBottom: 130,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.ring,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pillText: {
    fontFamily: fonts.uiBold,
    fontSize: 14,
    color: colors.gold,
  },
  icons: {
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.bgCard,
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
  featuredTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 34,
    lineHeight: 38,
    color: colors.cream,
  },
  featuredBlurb: {
    fontFamily: fonts.ui,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    marginTop: 8,
  },
  readBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: 13,
    paddingHorizontal: 34,
    marginTop: 16,
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
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: colors.cream,
  },
  readCard: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: colors.bgCard,
    borderRadius: radius.card,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.ring,
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
    fontFamily: fonts.displayBold,
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
    gap: 10,
    marginTop: 8,
  },
  ageBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.marianBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  ageText: {
    fontFamily: fonts.uiBold,
    fontSize: 11,
    color: "#FFFFFF",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: fonts.ui,
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
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.ring,
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
  favSaint: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    lineHeight: 19,
    color: colors.cream,
  },
  favMeta: {
    flexDirection: "row",
    alignItems: "center",
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
