import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = { qty: number; onChange: (q: number) => void };

export default function QuantityStepper({ qty, onChange }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.btn} onPress={() => onChange(Math.max(1, qty - 1))}>
        <Text style={styles.btnText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.qty}>{qty}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => onChange(qty + 1)}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  btn: {
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e5ea'
  },
  btnText: { fontSize: 18, fontWeight: '700' },
  qty: { fontSize: 16, fontWeight: '700' }
});
