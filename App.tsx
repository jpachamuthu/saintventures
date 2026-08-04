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
import StoryScreen from "./src/screens/StoryScreen";
import { featuredStory, type Story } from "./src/data/stories";
import { theme } from "./src/theme";

SplashScreen.preventAutoHideAsync().catch(() => {});

type Screen = "splash" | "login" | "home" | "story";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [story, setStory] = useState<Story>(featuredStory);

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

  return (
    <SafeAreaProvider>
      <View style={styles.root} onLayout={onLayoutRootView}>
        {screen === "splash" && <SplashView onDone={() => setScreen("login")} />}
        {screen === "login" && <LoginScreen onLogin={() => setScreen("home")} />}
        {screen === "home" && <HomeScreen onOpenStory={(s) => { setStory(s); setScreen("story"); }} />}
        {screen === "story" && <StoryScreen story={story} onBack={() => setScreen("home")} />}
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
