import { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const ONBOARDING_KEY = "@onboarding_complete";

const slides = [
  { icon: "sparkles", title: "AI Wallpapers", subtitle: "Discover stunning AI-generated cyberpunk wallpapers curated just for you.", color: "#8B5CF6" },
  { icon: "infinite", title: "Endless Exploration", subtitle: "Scroll through infinite wallpapers. Find your perfect aesthetic.", color: "#3B82F6" },
  { icon: "heart", title: "Save & Share", subtitle: "Like your favorites, share with friends, download for offline use.", color: "#EC4899" },
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
    <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
        <View style={{ width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center", marginBottom: 32, backgroundColor: `${slide.color}15`, borderWidth: 1, borderColor: `${slide.color}30` }}>
          <Ionicons name={slide.icon as any} size={44} color={slide.color} />
        </View>
        <Text style={{ color: "#FFFFFF", fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 12 }}>{slide.title}</Text>
        <Text style={{ color: "#8B8BA0", fontSize: 16, textAlign: "center", lineHeight: 24 }}>{slide.subtitle}</Text>
      </View>

      <View style={{ paddingHorizontal: 32, paddingBottom: 48, gap: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          {slides.map((_, i) => (
            <View key={i} style={{ width: i === step ? 24 : 8, height: 6, borderRadius: 3, backgroundColor: i === step ? slide.color : "rgba(255,255,255,0.1)" }} />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => isLast ? completeOnboarding() : setStep(step + 1)}
          style={{ width: "100%", paddingVertical: 16, borderRadius: 16, alignItems: "center", backgroundColor: `${slide.color}20`, borderWidth: 1, borderColor: `${slide.color}30` }}
        >
          <Text style={{ color: slide.color, fontSize: 16, fontWeight: "bold", letterSpacing: 2 }}>{isLast ? "ENTER GALLERY" : "NEXT"}</Text>
        </TouchableOpacity>

        {!isLast && (
          <TouchableOpacity onPress={completeOnboarding} style={{ alignItems: "center", paddingVertical: 8 }}>
            <Text style={{ color: "#555570", fontSize: 12, letterSpacing: 1 }}>SKIP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
