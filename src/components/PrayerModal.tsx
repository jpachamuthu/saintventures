import React from "react";
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { Download, Share2, X } from "lucide-react-native";
import { useTheme } from "./ThemeContext";
import GlassView from "./GlassView";
import { downloadPrayerCard, sharePrayerCard } from "../cards/prayerCard";
import { prayers } from "../data/prayers";
import type { Story } from "../data/stories";
import { fonts, type ThemeColors } from "../theme";

type PrayerModalProps = {
  visible: boolean;
  story: Story | null;
  onClose: () => void;
};

// Deeper frost than the default dock blur so the card reads unmistakably as glass.
const DEEP_FROST: ViewStyle | null =
  Platform.OS === "web" ? ({ backdropFilter: "blur(30px) saturate(1.8)" } as ViewStyle) : null;

export default function PrayerModal({ visible, story, onClose }: PrayerModalProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const prayer = story ? prayers[story.id] : undefined;

  const handleDownload = () => {
    if (story) {
      downloadPrayerCard(story).catch(() => {});
    }
  };

  const handleShare = () => {
    if (story) {
      sharePrayerCard(story).catch(() => {});
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close prayer" />
        <GlassView strong corner={28} style={[styles.card, DEEP_FROST]}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>A PRAYER</Text>
            <Text style={styles.title}>{story?.saint ?? ""}</Text>
            <Pressable onPress={onClose} style={styles.close} hitSlop={10}>
              <X size={18} color={colors.cream} />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>{prayer?.text ?? ""}</Text>
            <Text style={styles.footnote}>{prayer?.footnote ?? ""}</Text>
          </ScrollView>
          <View style={styles.footerRow}>
            <Pressable
              style={styles.iconBtn}
              onPress={handleDownload}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Download prayer card image"
            >
              <Download size={18} color={colors.cream} />
            </Pressable>
            <Pressable style={styles.doneBtn} onPress={onClose} accessibilityRole="button" accessibilityLabel="Amen">
              <Text style={styles.doneLabel}>Amen</Text>
            </Pressable>
            <Pressable
              style={styles.iconBtn}
              onPress={handleShare}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Share prayer card image"
            >
              <Share2 size={18} color={colors.cream} />
            </Pressable>
          </View>
        </GlassView>
      </View>
    </Modal>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(10, 8, 18, 0.6)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 28,
    },
    card: {
      width: "100%",
      maxHeight: "72%",
      paddingHorizontal: 24,
      paddingTop: 22,
      paddingBottom: 20,
    },
    header: {
      alignItems: "center",
      marginBottom: 14,
    },
    eyebrow: {
      fontFamily: fonts.metaBold,
      fontSize: 11,
      letterSpacing: 3,
      color: colors.gold,
      textTransform: "uppercase",
    },
    title: {
      fontFamily: fonts.serifBold,
      fontSize: 24,
      color: colors.cream,
      textAlign: "center",
      marginTop: 4,
    },
    close: {
      position: "absolute",
      top: -6,
      right: -6,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.bgCardAlt,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: fonts.serif,
      fontSize: 18,
      lineHeight: 28,
      color: colors.cream,
      textAlign: "center",
    },
    footnote: {
      fontFamily: fonts.ui,
      fontSize: 11,
      lineHeight: 16,
      color: colors.mutedDim,
      textAlign: "center",
      marginTop: 16,
      fontStyle: "italic",
    },
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 18,
    },
    iconBtn: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.bgCardAlt,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    doneBtn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 999,
      backgroundColor: colors.cta,
      paddingVertical: 13,
    },
    doneLabel: {
      fontFamily: fonts.uiBold,
      fontSize: 16,
      color: colors.onGold,
    },
  });
}
