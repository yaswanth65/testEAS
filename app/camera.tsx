import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0F", alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(139, 92, 246, 0.15)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.2)", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <Ionicons name="camera" size={48} color="#A78BFA" />
      </View>
      <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>Camera Coming Soon</Text>
      <Text style={{ color: "#8B8BA0", fontSize: 14, textAlign: "center", marginBottom: 24 }}>Take photos and upload your own cyber wallpapers</Text>
      <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, backgroundColor: "rgba(139, 92, 246, 0.2)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.3)" }}>
        <Text style={{ color: "#A78BFA", fontSize: 14, fontWeight: "bold" }}>GO BACK</Text>
      </TouchableOpacity>
    </View>
  );
}
