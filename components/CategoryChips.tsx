import { ScrollView, TouchableOpacity, Text } from "react-native";
import { CATEGORIES } from "../constants/theme";

interface CategoryChipsProps {
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryChips({
  selected,
  onSelect,
}: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-3"
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selected === cat.slug;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.slug)}
            style={{
              backgroundColor: isSelected ? "rgba(139, 92, 246, 0.2)" : "rgba(30, 30, 50, 0.5)",
              borderWidth: 1,
              borderColor: isSelected ? "rgba(139, 92, 246, 0.4)" : "rgba(120, 80, 255, 0.08)",
              borderRadius: 999,
              paddingHorizontal: 16,
              paddingVertical: 8,
              shadowColor: isSelected ? "#8B5CF6" : "transparent",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: isSelected ? 0.4 : 0,
              shadowRadius: 8,
              elevation: isSelected ? 4 : 0,
            }}
          >
            <Text
              className="text-sm font-bold tracking-wider"
              style={{ color: isSelected ? "#C4B5FD" : "#707088" }}
            >
              {cat.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
