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

export const CREDITS_SECTIONS: LegalSection[] = [
  {
    heading: "Image credits & acknowledgements",
    body: "Some illustrations in Saint Adventures were created with the assistance of OpenAI's ChatGPT image-generation tools, xAI's Grok, and Google's Gemini, and have been adapted for this app. Created with Grok, in accordance with xAI's Brand Guidelines.",
  },
  {
    heading: "Why these pictures exist",
    body: "The illustrations are intended to help children discover the lives, faith, and stories of the saints in an engaging and accessible way.",
  },
  {
    heading: "Independent project",
    body: "Saint Adventures is an independent project and is not officially affiliated with or endorsed by the Vatican or any religious institution unless expressly stated.",
  },
  {
    heading: "How feast days were obtained",
    body: "Feast dates follow the General Roman Calendar of the Catholic Church. Apostles and companions who share a day (such as Sts Philip and James on May 3rd, or the three Archangels on September 29th) are listed together, and local saints and blesseds are dated from the Roman Martyrology and traditional calendars.",
  },
  {
    heading: "Stories and narration",
    body: "Saint stories are original child-friendly retellings written for SaintVentures. Facts are drawn from public-domain works such as Butler's Lives of the Saints, the Golden Legend, the Bible, and Vatican biographies; a few details come from Wikipedia (CC BY-SA), as credited on each individual story.",
  },
];

export const HOWTO_SECTIONS: LegalSection[] = [
  {
    heading: "Reading stories",
    body: "Tap any saint to open their story. Press play to hear it read aloud — words light up as they are spoken, and the page follows along automatically. Every story ends with a short prayer.",
  },
  {
    heading: "Quizzes and stars",
    body: "After a story, take its quiz of 5 questions. No mistakes earns 3 stars, and your best score is always saved — replay any quiz to turn 2 stars into 3.",
  },
  {
    heading: "Prayers and sharing",
    body: "Every saint has a prayer. Open one from the Prayer button after a quiz, or the hands button on any feast day row. On the prayer card, tap the download arrow to save a beautiful prayer image, or the share button to send it to friends and family through WhatsApp and your other apps. On a story page, tap the download arrow at the top right for a storybook to keep, or a prayer card to share.",
  },
  {
    heading: "Badges",
    body: "Finishing a quiz earns that saint's badge. Watch your collection grow toward all 70 saints on the Badges tab.",
  },
  {
    heading: "Keep the flame alive",
    body: "The flame counts consecutive days with a finished story. The first story you finish each day extends it; reading more the same day won't raise it further. Miss a day and the flame resets — so come back tomorrow!",
  },
  {
    heading: "Feasts and new stories",
    body: "The Feasts tab lists every saint's feast day for the year. When new stories arrive, the gold bell on Home lights up — tap it to read the newest one.",
  },
  {
    heading: "Gallery",
    body: "Menu → Gallery holds every saint portrait: heroes, tiles, and extra variants. Tap any image to view it fullscreen, then download the storybook, the prayer card, or the plain image to share with friends and family.",
  },
  {
    heading: "Favourites and music",
    body: "Tap the heart on any story, quiz, or feast to keep it in your favourites. Story music volume can be adjusted anytime in this menu, under Story music.",
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