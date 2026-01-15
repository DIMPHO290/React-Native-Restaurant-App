// src/screens/admin/Orders.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function AdminOrders() {
  const orders = useSelector((state: RootState) => state.orders.list); // ✅ safe selector

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {orders.length === 0 ? (
        <Text style={styles.empty}>No orders yet</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.id}>{item.id}</Text>
              <Text style={styles.meta}>UID: {item.uid}</Text>
              <Text style={styles.meta}>Total: R{item.total.toFixed(2)}</Text>
              <Text style={styles.meta}>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  empty: { fontSize: 14, color: "#666" },
  row: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  id: { fontWeight: "700" },
  meta: { fontSize: 12, color: "#666" },
});
