import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  label: { color: '#555' },
  value: { fontWeight: '700', color: '#1f1f1f' }
});
