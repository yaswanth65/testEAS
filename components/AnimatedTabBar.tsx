import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const icons = { index: "home", search: "search", favorites: "heart", profile: "person" } as const;
const labels: Record<string, string> = { index: "Home", search: "Explore", favorites: "Likes", profile: "Profile" };

export default function CyberTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        position: "absolute", bottom: 24, left: 16, right: 16,
        flexDirection: "row", alignItems: "center", justifyContent: "space-around",
        paddingHorizontal: 12, paddingVertical: 10,
        backgroundColor: "rgba(15, 15, 30, 0.85)",
        borderRadius: 20,
        borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.2)",
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = icons[route.name as keyof typeof icons];
        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={{ alignItems: "center", justifyContent: "center", paddingVertical: 6, minWidth: 64 }}>
            {isFocused && <View style={{ position: "absolute", top: -4, width: 32, height: 3, borderRadius: 1.5, backgroundColor: "#8B5CF6" }} />}
            <Ionicons name={iconName} size={22} color={isFocused ? "#A78BFA" : "#555570"} />
            {isFocused && <Text style={{ color: "#A78BFA", fontSize: 10, fontWeight: "bold", marginTop: 4, letterSpacing: 1 }}>{labels[route.name] || route.name}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
