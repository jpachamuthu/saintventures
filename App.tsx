import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import { Baloo2_600SemiBold } from "@expo-google-fonts/baloo-2";
import {
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StartupScreen from "./src/screens/StartupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LibraryScreen from "./src/screens/LibraryScreen";
import StoryScreen from "./src/screens/StoryScreen";
import QuizScreen from "./src/screens/QuizScreen";
import BadgesScreen from "./src/screens/BadgesScreen";
import FeastDaysScreen from "./src/screens/FeastDaysScreen";
import QuizzesScreen from "./src/screens/QuizzesScreen";
import MenuScreen from "./src/screens/MenuScreen";
import GalleryScreen from "./src/screens/GalleryScreen";
import { featuredStory, stories, type Story } from "./src/data/stories";
import { theme } from "./src/theme";
import { ThemeProvider } from "./src/components/ThemeContext";
import BottomNav from "./src/components/BottomNav";
import type { TabId } from "./src/components/BottomNav";
import { useFavourites } from "./src/hooks/useFavourites";
import { useSeen } from "./src/hooks/useSeen";
import { useReadingProgress } from "./src/hooks/useReadingProgress";
import { useStars } from "./src/hooks/useStars";
import { useStreak } from "./src/hooks/useStreak";
import { feastDays } from "./src/data/feastDays";
import { pickUpNext } from "./src/data/upNext";
import { refreshFeastNotifications } from "./src/notify/feasts";

SplashScreen.preventAutoHideAsync().catch(() => {});

type Screen = "startup" | "home" | "story" | "library" | "badges" | "feasts" | "quizzes" | "menu" | "gallery" | "quiz";

export default function App() {
  const [screen, setScreen] = useState<Screen>("startup");
  const [story, setStory] = useState<Story>(featuredStory);
  const [initialPage, setInitialPage] = useState(0);
  const [storyOrigin, setStoryOrigin] = useState<"home" | "library" | "badges" | "feasts">("home");
  const [quizOrigin, setQuizOrigin] = useState<"story" | "quizzes">("story");

  const [fontsLoaded] = useFonts({
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Baloo2_600SemiBold,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const { favourites, isFavourite, toggleFavourite } = useFavourites();
  const { seen, markSeen, markAllSeen } = useSeen();
  const { progress, savePage, markFinished } = useReadingProgress();
  const { best: starBest, record: recordStars } = useStars();
  const { streak, recordDay } = useStreak();

  const unseen = useMemo(
    () =>
      stories
        .filter((s) => !seen.includes(s.id))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [seen]
  );

  // TEMP DEBUG: bell verification (removed before commit)
  console.log(`[bell-test] seen=${seen.length} total=${stories.length} unseen=[${unseen.map((s) => s.id).join(",")}] hasNew=${unseen.length > 0}`);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  useEffect(() => {
    refreshFeastNotifications().catch(() => {});
  }, []);

  const openStory = (s: Story, origin: "home" | "library" | "badges" | "feasts", page = 0) => {
    setStory(s);
    setStoryOrigin(origin);
    markSeen(s.id);
    setInitialPage(page);
    setScreen("story");
  };

  const openQuiz = (s: Story, origin: "story" | "quizzes") => {
    setStory(s);
    setQuizOrigin(origin);
    setScreen("quiz");
  };

  const handleBell = () => {
    if (unseen.length === 0) return;
    markAllSeen(unseen.map((s) => s.id));
    openStory(unseen[0], "home");
  };

  const handleSavePage = useCallback(
    (id: string, page: number) => savePage(id, page),
    [savePage]
  );

  const handleFinishReading = useCallback(
    (id: string, page: number) => {
      markFinished(id, page);
      recordDay();
    },
    [markFinished, recordDay]
  );

  const handleRecordStars = useCallback(
    (id: string, stars: number) => recordStars(id, stars),
    [recordStars]
  );

  const continueEntry = useMemo(() => {
    const open = stories
      .filter((s) => {
        const p = progress[s.id];
        return p && !p.finished;
      })
      .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))[0];
    if (!open) return null;
    return { story: open, page: Math.min(progress[open.id].page, open.pages.length - 1) };
  }, [progress]);

  const todayFeast = useMemo(() => {
    const now = new Date();
    const f = feastDays.find((d) => d.month === now.getMonth() + 1 && d.day === now.getDate());
    return f ? f.story : null;
  }, []);

  const upNext = useMemo(
    () => (screen === "story" ? pickUpNext(story.id, progress, seen) : null),
    [screen, story.id, progress, seen]
  );

  const starsTotal = useMemo(
    () => Object.values(starBest).reduce((a, b) => a + b, 0),
    [starBest]
  );

  const handleFooterTab = (tab: TabId) => {
    if (tab === "home") setScreen("home");
    else if (tab === "library") setScreen("library");
    else if (tab === "badges") setScreen("badges");
    else if (tab === "feasts") setScreen("feasts");
    else if (tab === "quizzes") setScreen("quizzes");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={styles.root} onLayout={onLayoutRootView}>
          {screen === "startup" && <StartupScreen onStart={() => setScreen("home")} />}
          {screen === "home" && (
            <HomeScreen
              onOpenStory={(s, page) => openStory(s, "home", page)}
              onFooterTab={handleFooterTab}
              onOpenMenu={() => setScreen("menu")}
              hasNew={unseen.length > 0}
              onBellPress={handleBell}
              continueStory={continueEntry?.story ?? null}
              continuePage={continueEntry?.page ?? 0}
              todayFeast={todayFeast}
              streakCount={streak.count}
              favouriteIds={favourites}
              onToggleFavourite={toggleFavourite}
            />
          )}
          {screen === "library" && (
            <LibraryScreen
              onOpenStory={(s) => openStory(s, "library")}
              favouriteIds={favourites}
              onToggleFavourite={toggleFavourite}
            />
          )}
          {screen === "feasts" && (
            <FeastDaysScreen
              onOpenStory={(s) => openStory(s, "feasts")}
              favouriteIds={favourites}
              onToggleFavourite={toggleFavourite}
            />
          )}
          {screen === "quizzes" && (
            <QuizzesScreen
              onOpenQuiz={(s) => openQuiz(s, "quizzes")}
              favouriteIds={favourites}
              onToggleFavourite={toggleFavourite}
            />
          )}
          {screen === "menu" && <MenuScreen onBack={() => setScreen("home")} onGoTab={(t) => setScreen(t)} onOpenGallery={() => setScreen("gallery")} />}
          {screen === "gallery" && <GalleryScreen onBack={() => setScreen("menu")} favouriteIds={favourites} onToggleFavourite={toggleFavourite} />}
          {screen === "badges" && (
            <BadgesScreen
              onOpenStory={(s) => openStory(s, "badges")}
              starsTotal={starsTotal}
              streakCount={streak.count}
              streakBest={streak.best}
            />
          )}
          {screen === "story" && (
            <StoryScreen
              story={story}
              initialPage={initialPage}
              upNext={upNext}
              onBack={() => setScreen(storyOrigin)}
              onStartQuiz={() => openQuiz(story, "story")}
              onPlayNext={() => upNext && openStory(upNext, storyOrigin)}
              onSavePage={handleSavePage}
              onFinishReading={handleFinishReading}
            />
          )}
          {screen === "quiz" && (
            <QuizScreen story={story} onExit={() => setScreen(quizOrigin === "quizzes" ? "quizzes" : "story")} onDone={() => setScreen("home")} onRecordStars={handleRecordStars} />
          )}
          {(screen === "home" || screen === "library" || screen === "badges" || screen === "feasts" || screen === "quizzes") && (
            <BottomNav active={screen} onTab={handleFooterTab} />
          )}
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
});
