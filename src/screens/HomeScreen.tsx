import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Bell, Menu, Play, Heart, Clock, UserPlus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SaintIllustration from "../components/SaintIllustration";
import BottomNav, { type TabId } from "../components/BottomNav";
import { theme } from "../theme";
import { featuredStory, stories, type Story } from "../data/stories";

export default function HomeScreen({ onOpenStory, onFooterTab }: { onOpenStory: (story: Story) => void; onFooterTab: (tab: TabId) => void }) {
  const more = stories.slice(1);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View style={styles.pill}>
            <UserPlus size={15} color={theme.colors.gold} />
            <Text style={styles.pillText}>Add your child</Text>
          </View>
          <View style={styles.icons}>
            <View style={styles.iconBtn}>
              <Bell size={16} color={theme.colors.cream} />
              <View style={styles.notifDot} />
            </View>
            <View style={styles.iconBtn}>
              <Menu size={16} color={theme.colors.cream} />
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
                <Play size={15} color={theme.colors.onGold} fill={theme.colors.onGold} />
                <Text style={styles.readBtnText}>Read</Text>
              </Pressable>
            </View>
          </SaintIllustration>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More saint stories</Text>
          {more.map((s) => (
            <Pressable key={s.id} onPress={() => onOpenStory(s)} style={styles.readCard}>
              <View style={styles.readThumb}>
                <SaintIllustration palette={s.palette} art={s.art} height={88} />
                <View style={styles.heartBtn}>
                  <Heart size={13} color={theme.colors.cream} />
                </View>
              </View>
              <View style={styles.readInfo}>
                <Text style={styles.readTitle}>{s.title}</Text>
                <Text style={styles.readBlurb}>{s.blurb}</Text>
                <View style={styles.readMeta}>
                  <View style={styles.ageBadge}>
                    <Text style={styles.ageText}>{s.age}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={12} color={theme.colors.mutedDim} />
                    <Text style={styles.metaText}>{s.minutes} min</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomNav active="home" onTab={onFooterTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
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
    backgroundColor: theme.colors.bgCard,
    borderWidth: 1,
    borderColor: theme.colors.ring,
    borderRadius: theme.radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pillText: {
    fontFamily: theme.fonts.uiBold,
    fontSize: 14,
    color: theme.colors.gold,
  },
  icons: {
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.bgCard,
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
    backgroundColor: theme.colors.gold,
  },
  featuredWrap: {
    paddingHorizontal: 18,
  },
  featuredOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "rgba(20,13,9,0.35)",
  },
  eyebrow: {
    fontFamily: theme.fonts.uiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: theme.colors.gold,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  featuredTitle: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 34,
    lineHeight: 38,
    color: theme.colors.cream,
  },
  featuredBlurb: {
    fontFamily: theme.fonts.ui,
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.muted,
    marginTop: 8,
  },
  readBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: theme.colors.gold,
    borderRadius: theme.radius.pill,
    paddingVertical: 13,
    paddingHorizontal: 34,
    marginTop: 16,
  },
  readBtnText: {
    fontFamily: theme.fonts.uiBold,
    fontSize: 15,
    color: theme.colors.onGold,
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 26,
    gap: 14,
  },
  sectionTitle: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 22,
    color: theme.colors.cream,
  },
  readCard: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: theme.colors.bgCard,
    borderRadius: theme.radius.card,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.ring,
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
    fontFamily: theme.fonts.displayBold,
    fontSize: 18,
    color: theme.colors.cream,
  },
  readBlurb: {
    fontFamily: theme.fonts.ui,
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.muted,
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
    gap: 4,
  },
  metaText: {
    fontFamily: theme.fonts.ui,
    fontSize: 12,
    color: theme.colors.mutedDim,
  },
});
