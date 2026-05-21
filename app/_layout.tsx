import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Animated } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 5 * 60 * 1000, gcTime: 30 * 60 * 1000 },
  },
});

SplashScreen.preventAutoHideAsync();

const ONBOARDING_KEY = "@onboarding_complete";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    async function prepare() {
      const done = await AsyncStorage.getItem(ONBOARDING_KEY);
      setShowOnboarding(!done);
      await SplashScreen.hideAsync();
      setIsReady(true);
    }
    setTimeout(prepare, 800);
  }, []);

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: "#0A0A0F" }}>
        <View
          className="w-16 h-16 rounded-full items-center justify-center"
          style={{
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            borderWidth: 1,
            borderColor: "rgba(139, 92, 246, 0.2)",
            shadowColor: "#8B5CF6",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Text className="text-2xl" style={{ color: "#A78BFA" }}>✦</Text>
        </View>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
          {showOnboarding && <Stack.Screen name="onboarding" />}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="photo/[id]" options={{ headerShown: false, presentation: "fullScreenModal" }} />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
