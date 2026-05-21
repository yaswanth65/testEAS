import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function CyberProfileScreen() {
  const appVersion = Constants.expoConfig?.version ?? "1.0.0";

  const menuItems = [
    { icon: "image", title: "My Collection", subtitle: "24 wallpapers", color: "#8B5CF6" },
    { icon: "heart", title: "Favorites", subtitle: "Saved wallpapers", color: "#EC4899" },
    { icon: "download", title: "Downloads", subtitle: "Offline storage", color: "#06B6D4" },
    { icon: "shield-checkmark", title: "Privacy", subtitle: "Data handling", color: "#22C55E" },
    { icon: "color-palette", title: "Theme", subtitle: "Cyber dark", color: "#F59E0B" },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: "#0A0A0F" }}>
      <View className="px-4 pt-16 pb-2">
        <Text className="text-3xl font-bold tracking-tight" style={{ color: "white" }}>Profile</Text>
        <Text className="text-sm tracking-wide mt-0.5" style={{ color: "#8B8BA0" }}>Cyber Gallery v{appVersion}</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View
          className="mx-4 p-5 rounded-2xl mb-4"
          style={{
            backgroundColor: "rgba(20, 20, 40, 0.7)",
            borderWidth: 1,
            borderColor: "rgba(120, 80, 255, 0.12)",
            shadowColor: "#8B5CF6",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <View className="flex-row items-center gap-4">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(139, 92, 246, 0.2)", borderWidth: 2, borderColor: "rgba(139, 92, 246, 0.3)" }}
            >
              <Ionicons name="person" size={28} color="#A78BFA" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold tracking-tight" style={{ color: "white" }}>Cyber Gallery</Text>
              <Text className="text-xs tracking-wider mt-0.5" style={{ color: "#8B8BA0" }}>AI-Powered Wallpapers</Text>
            </View>
          </View>
        </View>

        <View className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{ borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              className="flex-row items-center py-4 px-5"
              style={{
                backgroundColor: "rgba(20, 20, 40, 0.5)",
                borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: "rgba(120, 80, 255, 0.06)",
              }}
            >
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-sm font-bold tracking-wide" style={{ color: "white" }}>{item.title}</Text>
                <Text className="text-xs mt-0.5" style={{ color: "#707088" }}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#555570" />
            </TouchableOpacity>
          ))}
        </View>

        <View
          className="mx-4 p-4 rounded-2xl mb-4"
          style={{ backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}
        >
          <Text className="text-xs font-bold tracking-widest mb-2" style={{ color: "#7070A0" }}>OTA STATUS</Text>
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22C55E", shadowColor: "#22C55E", shadowOpacity: 0.6, shadowRadius: 4 }} />
            <Text className="text-xs" style={{ color: "#C4B5FD" }}>Up to date (production)</Text>
          </View>
          <Text className="text-[10px] mt-1" style={{ color: "#555570" }}>Runtime: {Constants.expoConfig?.runtimeVersion ?? "1.0.0"}</Text>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/yaswanth65/testEAS")}
          className="mx-4 p-4 rounded-2xl flex-row items-center gap-3"
          style={{ backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}
        >
          <Ionicons name="logo-github" size={20} color="#C4B5FD" />
          <View className="flex-1">
            <Text className="text-sm font-bold tracking-wide" style={{ color: "white" }}>GitHub</Text>
            <Text className="text-xs mt-0.5" style={{ color: "#707088" }}>yaswanth65/testEAS</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#555570" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
