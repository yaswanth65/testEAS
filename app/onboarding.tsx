import { useRef, useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const ONBOARDING_KEY = "@onboarding_complete";

const slides = [
  {
    icon: "sparkles",
    title: "AI Wallpapers",
    subtitle: "Discover stunning AI-generated cyberpunk wallpapers curated just for you.",
    color: "#8B5CF6",
  },
  {
    icon: "infinite",
    title: "Endless Exploration",
    subtitle: "Scroll through infinite wallpapers. Find your perfect aesthetic.",
    color: "#3B82F6",
  },
  {
    icon: "heart",
    title: "Save & Share",
    subtitle: "Like your favorites, share with friends, download for offline use.",
    color: "#EC4899",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    router.replace("/(tabs)");
  };

  const slide = slides[step];
  const isLast = step === slides.length - 1;

  return (
    <View className="flex-1" style={{ backgroundColor: "#0A0A0F" }}>
      <Animated.View entering={FadeIn.duration(600)} className="flex-1 items-center justify-center px-8">
        <View
          className="w-24 h-24 rounded-full items-center justify-center mb-8"
          style={{
            backgroundColor: `${slide.color}15`,
            borderWidth: 1,
            borderColor: `${slide.color}30`,
            shadowColor: slide.color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Ionicons name={slide.icon as any} size={44} color={slide.color} />
        </View>
        <Animated.Text
          entering={FadeInDown.duration(500).delay(200)}
          className="text-3xl font-bold text-center tracking-tight mb-3"
          style={{ color: "white" }}
        >
          {slide.title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.duration(500).delay(400)}
          className="text-base text-center leading-6 tracking-wide"
          style={{ color: "#8B8BA0" }}
        >
          {slide.subtitle}
        </Animated.Text>
      </Animated.View>

      <View className="px-8 pb-12 gap-4">
        <View className="flex-row justify-center gap-2 mb-4">
          {slides.map((_, i) => (
            <View
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: i === step ? 24 : 8,
                backgroundColor: i === step ? slide.color : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => isLast ? completeOnboarding() : setStep(step + 1)}
          className="w-full py-4 rounded-2xl items-center"
          style={{
            backgroundColor: `${slide.color}20`,
            borderWidth: 1,
            borderColor: `${slide.color}30`,
          }}
        >
          <Text className="text-base font-bold tracking-wider" style={{ color: slide.color }}>
            {isLast ? "ENTER GALLERY" : "NEXT"}
          </Text>
        </TouchableOpacity>

        {!isLast && (
          <TouchableOpacity onPress={completeOnboarding} className="items-center py-2">
            <Text className="text-xs tracking-wider" style={{ color: "#555570" }}>SKIP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
