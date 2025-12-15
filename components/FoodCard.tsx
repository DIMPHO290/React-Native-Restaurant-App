import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FoodItem } from '@/types';

type Props = { item: FoodItem; onPress: () => void };

export default function FoodCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 14
  },
  img: { height: 140, width: '100%' },
  info: { padding: 12 },
  name: { fontSize: 16, fontWeight: '700', color: '#1f1f1f' },
  desc: { fontSize: 12, color: '#666', marginTop: 4 },
  price: { marginTop: 8, fontSize: 14, fontWeight: '700', color: '#1f7aed' }
});
