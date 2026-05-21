import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FloatingSearchBarProps {
  onPress: () => void;
}

export default function FloatingSearchBar({ onPress }: FloatingSearchBarProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mb-3 px-5 py-3.5 rounded-2xl flex-row items-center"
      style={{
        backgroundColor: "rgba(20, 20, 40, 0.7)",
        borderWidth: 1,
        borderColor: "rgba(120, 80, 255, 0.15)",
      }}
    >
      <Ionicons name="search" size={18} color="#7070A0" />
      <Text className="text-[#7070A0] text-base ml-3 flex-1 tracking-wide">
        Search cyber wallpapers...
      </Text>
      <View className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: "rgba(139, 92, 246, 0.15)" }}>
        <Ionicons name="sparkles" size={12} color="#A78BFA" />
      </View>
    </TouchableOpacity>
  );
}
