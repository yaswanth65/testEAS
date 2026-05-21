import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants/theme";

const icons = {
  index: "home",
  search: "search",
  favorites: "heart",
  profile: "person",
} as const;

const labels: Record<string, string> = {
  index: "Home",
  search: "Explore",
  favorites: "Likes",
  profile: "Profile",
};

export default function CyberTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="absolute bottom-6 left-4 right-4 flex-row items-center justify-around px-3 py-2.5"
      style={{
        backgroundColor: "rgba(15, 15, 30, 0.85)",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(120, 80, 255, 0.2)",
        shadowColor: "#8B5CF6",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = icons[route.name as keyof typeof icons];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="items-center justify-center py-1.5"
            style={{ minWidth: 64 }}
          >
            {isFocused && (
              <View
                className="absolute -top-1 w-8 h-0.5 rounded-full"
                style={{ backgroundColor: "#8B5CF6", shadowColor: "#8B5CF6", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 6 }}
              />
            )}
            <Ionicons
              name={iconName}
              size={22}
              color={isFocused ? "#A78BFA" : "#555570"}
              style={{
                textShadowColor: isFocused ? "#8B5CF6" : "transparent",
                textShadowRadius: isFocused ? 10 : 0,
              }}
            />
            {isFocused && (
              <Text className="text-[10px] font-bold mt-1 tracking-wider" style={{ color: "#A78BFA" }}>
                {labels[route.name] || route.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
