
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  
  const pendingCount = useSelector(
    (s: any) => s.orders.list.filter( (o: any) => o.status === "pending").length
  );

  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    dashboard: "speedometer",
    items: "fast-food",
    orders: "receipt",
    restaurant: "restaurant",
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#1f7aed",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: { backgroundColor: "#fff", borderTopColor: "#eee" },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconMap[route.name] ?? "ellipse"} size={size} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="items" options={{ title: "Items" }} />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarBadge: pendingCount > 0 ? pendingCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#dc3545",
            color: "#fff",
            fontWeight: "700",
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen name="restaurant" options={{ title: "Restaurant" }} />
    </Tabs>
  );
}
