import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { COLORS } from "../../constants/theme";

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
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 64, paddingBottom: 8 }}>
        <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "bold", letterSpacing: -0.5 }}>Profile</Text>
        <Text style={{ color: "#8B8BA0", fontSize: 14, marginTop: 2 }}>Cyber Gallery v{appVersion}</Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ marginHorizontal: 16, padding: 20, borderRadius: 16, marginBottom: 16, backgroundColor: "rgba(20, 20, 40, 0.7)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.12)" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(139, 92, 246, 0.2)", borderWidth: 2, borderColor: "rgba(139, 92, 246, 0.3)" }}>
              <Ionicons name="person" size={28} color="#A78BFA" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Cyber Gallery</Text>
              <Text style={{ color: "#8B8BA0", fontSize: 12, marginTop: 2 }}>AI-Powered Wallpapers</Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: 16, marginBottom: 16, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={{ flexDirection: "row", alignItems: "center", paddingVertical: 16, paddingHorizontal: 20, backgroundColor: "rgba(20, 20, 40, 0.5)", borderBottomWidth: index < menuItems.length - 1 ? 1 : 0, borderBottomColor: "rgba(120, 80, 255, 0.06)" }}
            >
              <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: `${item.color}15` }}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
                <Text style={{ color: "#707088", fontSize: 12, marginTop: 2 }}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#555570" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginHorizontal: 16, padding: 16, borderRadius: 16, marginBottom: 16, backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
          <Text style={{ color: "#7070A0", fontSize: 11, fontWeight: "bold", letterSpacing: 2, marginBottom: 8 }}>OTA STATUS</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#22C55E" }} />
            <Text style={{ color: "#C4B5FD", fontSize: 13 }}>Up to date (production)</Text>
          </View>
          <Text style={{ color: "#555570", fontSize: 10, marginTop: 4 }}>Runtime: {Constants.expoConfig?.runtimeVersion ?? "1.0.0"}</Text>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/yaswanth65/testEAS")}
          style={{ marginHorizontal: 16, padding: 16, borderRadius: 16, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}
        >
          <Ionicons name="logo-github" size={20} color="#C4B5FD" />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold" }}>GitHub</Text>
            <Text style={{ color: "#707088", fontSize: 12, marginTop: 2 }}>yaswanth65/testEAS</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#555570" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
