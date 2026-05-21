import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import {
  User,
  ChevronRight,
  Github,
  Info,
  Shield,
  Palette,
  Image,
  Heart,
  Download,
} from "lucide-react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

interface UpdateInfo {
  isUpdateAvailable: boolean;
  updateUrl: string | null;
}

export default function ProfileScreen() {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo>({
    isUpdateAvailable: false,
    updateUrl: null,
  });

  const appVersion = Constants.expoConfig?.version ?? "1.0.0";
  const buildNumber = Constants.expoConfig?.extra?.eas?.buildNumber ?? "1";

  const menuItems = [
    {
      icon: Image,
      title: "My Wallpapers",
      subtitle: `${24} wallpapers saved`,
      color: "#38BDF8",
    },
    {
      icon: Heart,
      title: "Favorites",
      subtitle: "View saved wallpapers",
      color: "#EF4444",
    },
    {
      icon: Download,
      title: "Downloads",
      subtitle: "Manage downloaded wallpapers",
      color: "#22C55E",
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      subtitle: "How we handle your data",
      color: "#8B5CF6",
    },
    {
      icon: Palette,
      title: "Theme",
      subtitle: "Dark mode only",
      color: "#F59E0B",
    },
    {
      icon: Info,
      title: "About",
      subtitle: `Version ${appVersion} (Build ${buildNumber})`,
      color: "#707070",
    },
  ];

  const handleGitHub = () => {
    Linking.openURL("https://github.com/yaswanth65/testEAS");
  };

  return (
    <View className="flex-1 bg-dark-900">
      <View className="px-4 pt-16 pb-2">
        <Text className="text-white text-3xl font-bold">Profile</Text>
        <Text className="text-dark-100 text-base mt-1">
          Manage your account and settings
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Profile Card */}
        <View className="mx-4 p-5 bg-dark-800 rounded-2xl border border-dark-600 mb-4">
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-purple-500 items-center justify-center">
              <User size={28} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-bold">Wallpaper Gallery</Text>
              <Text className="text-dark-100 text-sm">AI-Powered Wallpapers</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mx-4 mb-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              className={`flex-row items-center py-4 px-4 ${
                index === 0
                  ? "bg-dark-800 rounded-t-2xl"
                  : index === menuItems.length - 1
                  ? "bg-dark-800 rounded-b-2xl border-t-0"
                  : "bg-dark-800"
              } ${index > 0 ? "border-t border-dark-600" : ""}`}
            >
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon size={20} color={item.color} />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-white text-sm font-medium">
                  {item.title}
                </Text>
                <Text className="text-dark-200 text-xs mt-0.5">
                  {item.subtitle}
                </Text>
              </View>
              <ChevronRight size={18} color="#545454" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Update Status */}
        <View className="mx-4 p-4 bg-dark-800 rounded-2xl border border-dark-600 mb-4">
          <Text className="text-white text-sm font-semibold mb-2">
            OTA Update Status
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-green-500" />
            <Text className="text-dark-100 text-xs">
              Up to date (Channel: production)
            </Text>
          </View>
          <Text className="text-dark-200 text-xs mt-1">
            Runtime: {Constants.expoConfig?.runtimeVersion ?? "1.0.0"}
          </Text>
        </View>

        {/* GitHub Button */}
        <TouchableOpacity
          onPress={handleGitHub}
          className="mx-4 p-4 bg-dark-800 rounded-2xl border border-dark-600 flex-row items-center gap-3"
        >
          <Github size={22} color="white" />
          <View className="flex-1">
            <Text className="text-white text-sm font-medium">
              View on GitHub
            </Text>
            <Text className="text-dark-200 text-xs mt-0.5">
              yaswanth65/testEAS
            </Text>
          </View>
          <ChevronRight size={18} color="#545454" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
