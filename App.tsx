import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import {
  CormorantGaramond_500Medium,
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashView from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LibraryScreen from "./src/screens/LibraryScreen";
import StoryScreen from "./src/screens/StoryScreen";
import { featuredStory, type Story } from "./src/data/stories";
import { theme } from "./src/theme";
import type { TabId } from "./src/components/BottomNav";

SplashScreen.preventAutoHideAsync().catch(() => {});

type Screen = "splash" | "login" | "home" | "story" | "library";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [story, setStory] = useState<Story>(featuredStory);
  const [storyOrigin, setStoryOrigin] = useState<"home" | "library">("home");

  const [fontsLoaded] = useFonts({
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    CormorantGaramond_500Medium,
    CormorantGaramond_500Medium_Italic,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const openStory = (s: Story, origin: "home" | "library") => {
    setStory(s);
    setStoryOrigin(origin);
    setScreen("story");
  };

  const handleFooterTab = (tab: TabId) => {
    if (tab === "home") setScreen("home");
    else if (tab === "library") setScreen("library");
  };

  return (
    <SafeAreaProvider>
      <View style={styles.root} onLayout={onLayoutRootView}>
        {screen === "splash" && <SplashView onDone={() => setScreen("login")} />}
        {screen === "login" && <LoginScreen onLogin={() => setScreen("home")} />}
        {screen === "home" && (
          <HomeScreen onOpenStory={(s) => openStory(s, "home")} onFooterTab={handleFooterTab} />
        )}
        {screen === "library" && (
          <LibraryScreen onOpenStory={(s) => openStory(s, "library")} onFooterTab={handleFooterTab} />
        )}
        {screen === "story" && (
          <StoryScreen story={story} onBack={() => setScreen(storyOrigin)} />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
});
