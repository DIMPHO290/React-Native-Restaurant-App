import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Hero from '@/components/Hero';
import CategoryTabs from '@/components/CategoryTabs';
import FoodCard from '@/components/FoodCard';
import { FoodItem } from '@/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { items, category } = useSelector((s: RootState) => s.menu);
  const user = useSelector((s: RootState) => s.auth.user);

  const filtered = category === 'All' ? items : items.filter((i) => i.category === category);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        contentContainerStyle={styles.content}
        data={filtered}
        keyExtractor={(i: FoodItem) => i.id}
        ListHeaderComponent={
          <View>
            <Hero />
            <View style={styles.topRow}>
              <Text style={styles.h1}>Menu & Specials</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Cart')}>
                  <Text style={styles.linkText}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.linkBtn}
                  onPress={() => navigation.navigate(user ? 'Profile' : 'Auth')}
                >
                  <Text style={styles.linkText}>{user ? 'Profile' : 'Sign in'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <CategoryTabs />
          </View>
        }
        renderItem={({ item }) => (
          <FoodCard item={item} onPress={() => navigation.navigate('Item', { id: item.id })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { padding: 16 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  h1: { fontSize: 22, fontWeight: '800', color: '#1f1f1f' },
  actions: { flexDirection: 'row', gap: 8 },
  linkBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#1f7aed', borderRadius: 8 },
  linkText: { color: '#fff', fontWeight: '700' }
});
