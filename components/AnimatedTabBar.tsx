import { View, TouchableOpacity, Text } from "react-native";
import { Home, Search, Heart, User } from "lucide-react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS } from "../constants/theme";

const icons = {
  index: Home,
  search: Search,
  favorites: Heart,
  profile: User,
} as const;

const labels: Record<string, string> = {
  index: "Home",
  search: "Search",
  favorites: "Favorites",
  profile: "Profile",
};

export default function AnimatedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="absolute bottom-6 left-4 right-4 bg-dark-800/90 backdrop-blur-xl rounded-2xl border border-dark-600 flex-row items-center justify-around px-2 py-2">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const Icon = icons[route.name as keyof typeof icons];

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
            <Icon
              size={22}
              color={isFocused ? COLORS.accent : COLORS.textTertiary}
            />
            {isFocused && (
              <Animated.View entering={FadeInUp.duration(200)}>
                <Text className="text-accent-400 text-xs font-medium mt-1">
                  {labels[route.name] || route.name}
                </Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
