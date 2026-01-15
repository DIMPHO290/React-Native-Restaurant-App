import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
//import { clearCart, editQty, removeFromCart } from '@/state/cartSlice';
import { clearCart , editQty, removeFromCart  } from '../state/cartSlice';
// import { calcCartTotal } from '@/state/cartSlice';
import { calcCartTotal } from '../state/cartSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
 import { RootStackParamList } from '../../app/(tabs)/App'

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const total = calcCartTotal(items);

  return (
    <View style={styles.wrap}>
      <FlatList
        contentContainerStyle={styles.content}
        data={items}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={<Text style={styles.h1}>Your cart</Text>}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>Qty: {item.qty}</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => dispatch(editQty({ id: item.id, qty: Math.max(1, item.qty - 1) }))}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => dispatch(editQty({ id: item.id, qty: item.qty + 1 }))}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delBtn} onPress={() => dispatch(removeFromCart({ id: item.id }))}>
                  <Text style={styles.delText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: R {total.toFixed(2)}</Text>
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.clear} onPress={() => dispatch(clearCart())}>
            <Text style={styles.clearText}>Clear cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkout} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { padding: 16 },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#1f1f1f' },
  empty: { color: '#666', textAlign: 'center', marginTop: 20 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', padding: 12, marginBottom: 12, gap: 12 },
  img: { width: 90, height: 90, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: '700', color: '#1f1f1f' },
  meta: { color: '#666', marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  qtyBtn: { backgroundColor: '#f0f2f5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#e1e5ea' },
  qtyText: { fontSize: 16, fontWeight: '700' },
  delBtn: { marginLeft: 'auto', backgroundColor: '#c53030', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  delText: { color: '#fff', fontWeight: '700' },
  footer: { padding: 16, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  footerRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  total: { fontSize: 16, fontWeight: '800', color: '#1f1f1f' },
  clear: { flex: 1, backgroundColor: '#f0f2f5', paddingVertical: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#e1e5ea' },
  clearText: { color: '#222', fontWeight: '700' },
  checkout: { flex: 1, backgroundColor: '#1f7aed', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: '800' }
});
