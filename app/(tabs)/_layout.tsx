import { Tabs } from "expo-router";
import CyberTabBar from "../../components/AnimatedTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CyberTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
