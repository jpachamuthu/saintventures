import React, { useCallback, useMemo, useState } from "react";
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
import SplashView from "./src/screens/SplashScreen";
import StartupScreen from "./src/screens/StartupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LibraryScreen from "./src/screens/LibraryScreen";
import StoryScreen from "./src/screens/StoryScreen";
import QuizScreen from "./src/screens/QuizScreen";
import BadgesScreen from "./src/screens/BadgesScreen";
import FeastDaysScreen from "./src/screens/FeastDaysScreen";
import QuizzesScreen from "./src/screens/QuizzesScreen";
import MenuScreen from "./src/screens/MenuScreen";
import { featuredStory, stories, type Story } from "./src/data/stories";
import { theme } from "./src/theme";
import { ThemeProvider } from "./src/components/ThemeContext";
import BottomNav from "./src/components/BottomNav";
import type { TabId } from "./src/components/BottomNav";
import { useFavourites } from "./src/hooks/useFavourites";
import { useSeen } from "./src/hooks/useSeen";

SplashScreen.preventAutoHideAsync().catch(() => {});

type Screen = "splash" | "startup" | "home" | "story" | "library" | "badges" | "feasts" | "quizzes" | "menu" | "quiz";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [story, setStory] = useState<Story>(featuredStory);
  const [storyOrigin, setStoryOrigin] = useState<"home" | "library" | "badges" | "feasts">("home");
  const [quizOrigin, setQuizOrigin] = useState<"story" | "quizzes">("story");
  const [menuOrigin, setMenuOrigin] = useState<"home" | "story">("home");

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

  const unseen = useMemo(
    () =>
      stories
        .filter((s) => !seen.includes(s.id))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [seen]
  );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const openStory = (s: Story, origin: "home" | "library" | "badges" | "feasts") => {
    setStory(s);
    setStoryOrigin(origin);
    markSeen(s.id);
    setScreen("story");
  };

  const openQuiz = (s: Story, origin: "story" | "quizzes") => {
    setStory(s);
    setQuizOrigin(origin);
    setScreen("quiz");
  };

  const openMenu = (origin: "home" | "story") => {
    setMenuOrigin(origin);
    setScreen("menu");
  };

  const handleBell = () => {
    if (unseen.length === 0) return;
    markAllSeen(unseen.map((s) => s.id));
    openStory(unseen[0], "home");
  };

  const handleFooterTab = (tab: TabId) => {
    if (tab === "home") setScreen("home");
    else if (tab === "library") setScreen("library");
    else if (tab === "badges") setScreen("badges");
    else if (tab === "feasts") setScreen("feasts");
    else if (tab === "quizzes") setScreen("quizzes");
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={styles.root} onLayout={onLayoutRootView}>
          {screen === "splash" && <SplashView onDone={() => setScreen("startup")} />}
          {screen === "startup" && <StartupScreen onStart={() => setScreen("home")} />}
          {screen === "home" && (
            <HomeScreen
              onOpenStory={(s) => openStory(s, "home")}
              onFooterTab={handleFooterTab}
              onOpenMenu={() => openMenu("home")}
              hasNew={unseen.length > 0}
              onBellPress={handleBell}
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
          {screen === "menu" && <MenuScreen onBack={() => setScreen(menuOrigin)} />}
          {screen === "badges" && (
            <BadgesScreen
              onOpenStory={(s) => openStory(s, "badges")}
            />
          )}
          {screen === "story" && (
            <StoryScreen
              story={story}
              onBack={() => setScreen(storyOrigin)}
              onStartQuiz={() => openQuiz(story, "story")}
              onOpenMenu={() => openMenu("story")}
            />
          )}
          {screen === "quiz" && (
            <QuizScreen story={story} onExit={() => setScreen(quizOrigin === "quizzes" ? "quizzes" : "story")} onDone={() => setScreen("home")} />
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
