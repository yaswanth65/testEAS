import { useRef } from "react";
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
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          onPress={() => onSelect(cat.slug)}
          className={`px-4 py-2 rounded-full ${
            selected === cat.slug ? "bg-accent-500" : "bg-dark-600"
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              selected === cat.slug ? "text-white" : "text-dark-100"
            }`}
          >
            {cat.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
