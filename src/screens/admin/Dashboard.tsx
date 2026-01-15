// src/screens/admin/Dashboard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function Dashboard() {
  const orders = useSelector((s: RootState) => s.orders.list); // ✅ safe selector
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.stat}>Orders: {orders.length}</Text>
      <Text style={styles.stat}>Revenue: R{totalRevenue.toFixed(2)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  stat: { fontSize: 16, marginBottom: 6 },
});
