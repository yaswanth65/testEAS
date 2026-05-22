import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const MESSAGES = [
  { id: "1", name: "CyberArt", message: "Liked your new wallpaper", time: "2m", unread: true, uri: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "NeonLab", message: "Check out my new drop", time: "1h", unread: true, uri: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Glitch", message: "Thanks for the follow!", time: "3h", unread: false, uri: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Vapor", message: "Great collection", time: "1d", unread: false, uri: "https://i.pravatar.cc/150?u=4" },
  { id: "5", name: "Synth", message: "Let's collab", time: "2d", unread: false, uri: "https://i.pravatar.cc/150?u=5" },
];

export default function MessagesScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {MESSAGES.map((msg) => (
          <TouchableOpacity key={msg.id} style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: "rgba(120,80,255,0.06)" }}>
            <View style={{ position: "relative" }}>
              <Image source={{ uri: msg.uri }} style={{ width: 52, height: 52, borderRadius: 26 }} contentFit="cover" />
              {msg.unread && (
                <View style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: "#EC4899", borderWidth: 2, borderColor: "#0A0A0F" }} />
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: msg.unread ? "#FFFFFF" : "#8B8BA0", fontSize: 14, fontWeight: msg.unread ? "bold" : "600" }}>{msg.name}</Text>
              <Text style={{ color: msg.unread ? "#C4B5FD" : "#555570", fontSize: 13, marginTop: 2 }} numberOfLines={1}>{msg.message}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#555570", fontSize: 11 }}>{msg.time}</Text>
              {msg.unread && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#8B5CF6", marginTop: 4 }} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
