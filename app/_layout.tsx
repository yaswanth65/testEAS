import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Alert } from "react-native";
import * as Updates from "expo-updates";

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
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    async function prepare() {
      // Check for OTA updates
      try {
        if (!__DEV__) {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            setUpdateMessage("Downloading update...");
            await Updates.fetchUpdateAsync();
            setUpdateMessage("Update ready! Restarting...");
            await Updates.reloadAsync();
            return;
          }
        }
      } catch (e) {
        console.log("Update check error:", e);
      }

      const done = await AsyncStorage.getItem(ONBOARDING_KEY);
      setShowOnboarding(!done);
      await SplashScreen.hideAsync();
      setIsReady(true);
    }
    setTimeout(prepare, 600);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0A0A0F" }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 9999,
            alignItems: "center",
            justifyContent: "center",
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
          <Text style={{ fontSize: 24, color: "#A78BFA" }}>✦</Text>
        </View>
        {updateMessage && (
          <Text style={{ color: "#A78BFA", fontSize: 12, marginTop: 16, fontWeight: "600" }}>{updateMessage}</Text>
        )}
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
          <Stack.Screen name="camera" options={{ headerShown: false, presentation: "modal" }} />
          <Stack.Screen name="messages" options={{ headerShown: false, presentation: "modal" }} />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
