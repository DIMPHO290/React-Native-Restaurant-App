import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function Dashboard() {
  const orders = useSelector((s: RootState) => s.orders.list);
  const user = useSelector((s: RootState) => s.auth.user);

  const userOrders = orders.filter(o => (o as any).user?.uid === user?.uid);
  const userRevenue = userOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.stat}>Welcome, {user?.name ?? "Admin"}</Text>
      <Text style={styles.stat}>Your Orders: Margherita Pizza , CheeseBurger R{240}</Text>
      <Text style={styles.stat}>Your Revenue: R{80}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  stat: { fontSize: 16, marginBottom: 6 },
});

