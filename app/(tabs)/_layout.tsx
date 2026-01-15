// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../src/state/store";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const cartCount = useSelector((s: RootState) =>
    s.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    home: "home",
    menu: "fast-food",
    orders: "cart",
    profile: "person",
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#1f7aed",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: { backgroundColor: "#fff", borderTopColor: "#eee" },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconMap[route.name] ?? "ellipse"} size={size} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="menu" options={{ title: "Menu" }} />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: { backgroundColor: "#1f7aed", color: "#fff", fontWeight: "700", fontSize: 12 },
        }}
      />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
