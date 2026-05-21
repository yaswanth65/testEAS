import { View } from "react-native";
import ShimmerPlaceholder from "./ShimmerPlaceholder";
import { COLORS } from "../constants/theme";

export function HomeSkeleton() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16, paddingTop: 64 }}>
      <ShimmerPlaceholder width="60%" height={32} borderRadius={8} />
      <View style={{ flexDirection: "row", gap: 8, marginTop: 24 }}>
        {[1, 2, 3, 4].map((i) => <ShimmerPlaceholder key={i} width={80} height={32} borderRadius={16} />)}
      </View>
      <ShimmerPlaceholder width="100%" height={200} borderRadius={16} style={{ marginTop: 24 }} />
      <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
        <View style={{ flex: 1, gap: 12 }}>
          <ShimmerPlaceholder width="100%" height={280} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={200} borderRadius={12} />
        </View>
        <View style={{ flex: 1, gap: 12, marginTop: 32 }}>
          <ShimmerPlaceholder width="100%" height={200} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={280} borderRadius={12} />
        </View>
      </View>
    </View>
  );
}

export function SearchSkeleton() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16, paddingTop: 64 }}>
      <ShimmerPlaceholder width="100%" height={48} borderRadius={24} />
      <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
        <View style={{ flex: 1, gap: 12 }}>
          <ShimmerPlaceholder width="100%" height={220} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={160} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={200} borderRadius={12} />
        </View>
        <View style={{ flex: 1, gap: 12, marginTop: 32 }}>
          <ShimmerPlaceholder width="100%" height={160} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={220} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={180} borderRadius={12} />
        </View>
      </View>
    </View>
  );
}
