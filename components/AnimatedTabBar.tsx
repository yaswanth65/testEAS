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
  search: "Search",
  favorites: "Favorites",
  profile: "Profile",
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="absolute bottom-6 left-4 right-4 bg-dark-800/90 backdrop-blur-xl rounded-2xl border border-dark-600 flex-row items-center justify-around px-2 py-2">
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
            className={`items-center justify-center py-2 px-4 rounded-xl ${
              isFocused ? "bg-accent-500/20" : ""
            }`}
            style={{ minWidth: 60 }}
          >
            <Ionicons
              name={iconName}
              size={22}
              color={isFocused ? COLORS.accent : COLORS.textTertiary}
            />
            {isFocused && (
              <Text className="text-accent-400 text-xs font-medium mt-1">
                {labels[route.name] || route.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
