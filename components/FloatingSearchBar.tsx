import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FloatingSearchBarProps { onPress: () => void }

export default function FloatingSearchBar({ onPress }: FloatingSearchBarProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginHorizontal: 16, marginBottom: 12, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 16, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.7)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.15)" }}
    >
      <Ionicons name="search" size={18} color="#7070A0" />
      <Text style={{ color: "#7070A0", fontSize: 16, marginLeft: 12, flex: 1 }}>Search cyber wallpapers...</Text>
      <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: "rgba(139, 92, 246, 0.15)" }}>
        <Ionicons name="sparkles" size={12} color="#A78BFA" />
      </View>
    </TouchableOpacity>
  );
}
