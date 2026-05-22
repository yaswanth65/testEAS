import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

const STORIES = [
  { id: "me", name: "Your Story", uri: "https://i.pravatar.cc/150?u=me", isUser: true, hasStory: false },
  { id: "1", name: "CyberArt", uri: "https://i.pravatar.cc/150?u=1", color: "#8B5CF6", hasStory: true },
  { id: "2", name: "NeonLab", uri: "https://i.pravatar.cc/150?u=2", color: "#EC4899", hasStory: true },
  { id: "3", name: "Glitch", uri: "https://i.pravatar.cc/150?u=3", color: "#06B6D4", hasStory: true },
  { id: "4", name: "Vapor", uri: "https://i.pravatar.cc/150?u=4", color: "#F59E0B", hasStory: true },
  { id: "5", name: "Synth", uri: "https://i.pravatar.cc/150?u=5", color: "#22C55E", hasStory: true },
  { id: "6", name: "DarkM", uri: "https://i.pravatar.cc/150?u=6", color: "#EF4444", hasStory: true },
  { id: "7", name: "Aether", uri: "https://i.pravatar.cc/150?u=7", color: "#3B82F6", hasStory: true },
];

export default function StoriesRing({ onStoryPress }: { onStoryPress?: (id: string) => void }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, gap: 14 }}>
        {STORIES.map((story) => (
          <TouchableOpacity key={story.id} onPress={() => onStoryPress?.(story.id)} style={{ alignItems: "center", gap: 6 }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                padding: story.hasStory ? 2.5 : 0,
                backgroundColor: story.hasStory ? "transparent" : "rgba(30,30,50,0.5)",
                borderWidth: story.hasStory ? 0 : 1,
                borderColor: story.isUser ? "rgba(120,80,255,0.2)" : "transparent",
              }}
            >
              {story.hasStory && (
                <View
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    borderRadius: 36,
                    borderWidth: 2.5,
                    borderColor: story.color,
                    borderStyle: "dashed" as any,
                  }}
                />
              )}
              <Image
                source={{ uri: story.uri }}
                style={{ width: "100%", height: "100%", borderRadius: 34 }}
                contentFit="cover"
                transition={200}
              />
              {story.isUser && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: "#8B5CF6",
                    borderWidth: 2,
                    borderColor: "#0A0A0F",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "bold", lineHeight: 18 }}>+</Text>
                </View>
              )}
            </View>
            <Text
              style={{
                color: story.hasStory ? "#FFFFFF" : "#8B8BA0",
                fontSize: 11,
                fontWeight: story.hasStory ? "600" : "400",
                maxWidth: 68,
                textAlign: "center",
              }}
              numberOfLines={1}
            >
              {story.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
