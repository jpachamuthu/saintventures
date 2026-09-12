import React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { X } from "lucide-react-native";
import { useTheme } from "./ThemeContext";
import { fonts, type ThemeColors } from "../theme";

type LegalSection = { heading: string; body: string };

type LegalPageProps = {
  visible: boolean;
  title: string;
  sections: LegalSection[];
  onClose: () => void;
};

export default function LegalPage({ visible, title, sections, onClose }: LegalPageProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose} style={styles.close} hitSlop={10}>
            <X size={20} color={colors.cream} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {sections.map((s) => (
            <View key={s.heading} style={styles.section}>
              <Text style={styles.heading}>{s.heading}</Text>
              <Text style={styles.body}>{s.body}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Sample privacy notice",
    body: "This is a sample Privacy Policy for demonstration. It explains what information SaintVentures may collect, how it is used, and how it is protected.",
  },
  {
    heading: "What we collect",
    body: "We keep our app simple and child-friendly. We collect as little information as possible, and we never ask young users for personal details.",
  },
  {
    heading: "How we use your information",
    body: "Any information collected is used only to keep the app working, such as remembering your favourites and badges on your own device.",
  },
  {
    heading: "Sharing",
    body: "We do not sell or give away your information. We only share if required by law, or with your permission.",
  },
  {
    heading: "Parental controls",
    body: "Parents are welcome to contact us about their child's experience, manage or delete stored data at any time, and review how the app is used.",
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Sample terms of service",
    body: "This is a sample Terms of Service for demonstration. By using SaintVentures you agree to these simple, family-friendly terms.",
  },
  {
    heading: "Using the app",
    body: "SaintVentures is made for children and families to enjoy stories of the saints together. Please use it kindly and respect your fellow readers.",
  },
  {
    heading: "Content",
    body: "Stories are provided for education, inspiration and family fun. They are not intended as academic or theological reference material.",
  },
  {
    heading: "Accounts",
    body: "Simple in-app features are stored on your own device. Any future account features will be optional, family-friendly, and controlled by parents.",
  },
  {
    heading: "Changes",
    body: "We may update these terms from time to time. Continued use of the app means you accept any updates we publish here.",
  },
];

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
      paddingTop: 66,
      paddingBottom: 14,
      paddingHorizontal: 22,
      borderBottomWidth: 1,
      borderBottomColor: colors.ring,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      color: colors.cream,
    },
    close: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.bgCard,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      padding: 24,
      paddingBottom: 60,
    },
    section: {
      marginBottom: 24,
    },
    heading: {
      fontFamily: fonts.uiBold,
      fontSize: 16,
      color: colors.gold,
      marginBottom: 6,
    },
    body: {
      fontFamily: fonts.ui,
      fontSize: 14,
      lineHeight: 22,
      color: colors.muted,
    },
  });
}