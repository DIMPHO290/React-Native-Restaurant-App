import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function AdminDashboardScreen() {
  const menu = useSelector((s: RootState) => s.menu.items);
  const orders = useSelector((s: RootState) => s.orders.orders);

  const byCat = menu.reduce<Record<string, number>>((acc: any, m: any) => {
    acc[m.category] = (acc[m.category] ?? 0) + 1;
    return acc;
  }, {});

  const revenue = orders.reduce((sum :any, o: any) => sum + o.total, 0);

  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>Admin dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.h2}>Menu items by category</Text>
        {Object.entries(byCat).map(([cat, count]) => (
          <View key={cat} style={styles.row}>
            <Text style={styles.label}>{cat}</Text>
            <Text style={styles.value}>{count as number}</Text>
          </View>
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.h2}>Total revenue</Text>
        <Text style={styles.revenue}>R {revenue.toFixed(2)}</Text>
      </View>
      <Text style={styles.note}>In a real app, you’d manage food items and restaurant info here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', padding: 12, marginBottom: 12 },
  h2: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  label: { color: '#555' },
  value: { fontWeight: '700', color: '#1f1f1f' },
  revenue: { fontSize: 18, fontWeight: '800', color: '#1f7aed' },
  note: { color: '#666', marginTop: 12 }
});
