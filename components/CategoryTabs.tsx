import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '@/state/menuSlice';
import { RootState } from '@/store';

const CATS = ['All', 'Mains', 'Burgers', 'Starters', 'Dessert', 'Beverages', 'Alcohols'];

export default function CategoryTabs() {
  const dispatch = useDispatch();
  const current = useSelector((s: RootState) => s.menu.category);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wrap}>
      <View style={styles.row}>
        {CATS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.tab, current === c && styles.active]}
            onPress={() => dispatch(setCategory(c as any))}
          >
            <Text style={[styles.tabText, current === c && styles.activeText]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  row: { flexDirection: 'row', gap: 8 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e1e5ea'
  },
  active: { backgroundColor: '#1f7aed' },
  tabText: { color: '#222', fontWeight: '600' },
  activeText: { color: '#fff' }
});
