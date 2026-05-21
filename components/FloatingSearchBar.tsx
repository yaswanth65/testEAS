import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FloatingSearchBarProps {
  onPress: () => void;
}

export default function FloatingSearchBar({ onPress }: FloatingSearchBarProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mb-3 px-4 py-3.5 bg-dark-700 rounded-2xl flex-row items-center border border-dark-500"
    >
      <Ionicons name="search" size={18} color="#707070" />
      <Text className="text-dark-300 text-base ml-3 flex-1">
        Search wallpapers...
      </Text>
    </TouchableOpacity>
  );
}
