import { ScrollView, TouchableOpacity, Text } from "react-native";
import { CATEGORIES } from "../constants/theme";

interface CategoryChipsProps { selected: string; onSelect: (slug: string) => void }

export default function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 12 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
      {CATEGORIES.map((cat) => {
        const isSel = selected === cat.slug;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.slug)}
            style={{
              paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999,
              backgroundColor: isSel ? "rgba(139, 92, 246, 0.2)" : "rgba(30, 30, 50, 0.5)",
              borderWidth: 1,
              borderColor: isSel ? "rgba(139, 92, 246, 0.4)" : "rgba(120, 80, 255, 0.08)",
            }}
          >
            <Text style={{ color: isSel ? "#C4B5FD" : "#707088", fontSize: 14, fontWeight: "bold", letterSpacing: 1 }}>{cat.title}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
