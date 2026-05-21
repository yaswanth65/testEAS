import { View } from "react-native";
import ShimmerPlaceholder from "./ShimmerPlaceholder";

export function HomeSkeleton() {
  return (
    <View className="flex-1 bg-dark-900 px-4 pt-16">
      <ShimmerPlaceholder width="60%" height={32} borderRadius={8} />
      <View className="flex-row gap-2 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <ShimmerPlaceholder key={i} width={80} height={32} borderRadius={16} />
        ))}
      </View>
      <ShimmerPlaceholder
        width="100%"
        height={200}
        borderRadius={16}
        className="mt-6"
      />
      <View className="flex-row gap-3 mt-6">
        <View className="flex-1 gap-3">
          <ShimmerPlaceholder width="100%" height={280} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={200} borderRadius={12} />
        </View>
        <View className="flex-1 gap-3 mt-8">
          <ShimmerPlaceholder width="100%" height={200} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={280} borderRadius={12} />
        </View>
      </View>
    </View>
  );
}

export function SearchSkeleton() {
  return (
    <View className="flex-1 bg-dark-900 px-4 pt-16">
      <ShimmerPlaceholder width="100%" height={48} borderRadius={24} />
      <View className="flex-row gap-3 mt-6">
        <View className="flex-1 gap-3">
          <ShimmerPlaceholder width="100%" height={220} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={160} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={200} borderRadius={12} />
        </View>
        <View className="flex-1 gap-3 mt-8">
          <ShimmerPlaceholder width="100%" height={160} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={220} borderRadius={12} />
          <ShimmerPlaceholder width="100%" height={180} borderRadius={12} />
        </View>
      </View>
    </View>
  );
}
