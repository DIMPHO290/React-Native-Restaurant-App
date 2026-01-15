// src/screens/ItemScreen.tsx
import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/cartSlice";
import { menuItems } from "../data/menu";
import { ZAR } from "../utils/currency";

export default function ItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useMemo(() => menuItems.find(m => m.id === Number(id)), [id]);
  const dispatch = useDispatch();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [chosenSides, setChosenSides] = useState<string[]>([]);
  const [chosenDrinks, setChosenDrinks] = useState<string[]>([]);
  const [chosenExtras, setChosenExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Item not found</Text>
      </View>
    );
  }

  // Pricing: base + drinks (add-on) + extras (add-on)
  const extrasTotal = chosenExtras
    .map(id => item.extras.find(e => e.id === id)?.price ?? 0)
    .reduce((a, b) => a + b, 0);

  const drinksTotal = chosenDrinks
    .map(id => item.drinks.find(d => d.id === id)?.price ?? 0)
    .reduce((a, b) => a + b, 0);

  const unitTotal = item.price + extrasTotal + drinksTotal;
  const total = unitTotal * quantity;

  const toggle = (list: string[], setList: (v: string[]) => void, key: string, limit?: number) => {
    const exists = list.includes(key);
    if (exists) setList(list.filter(x => x !== key));
    else {
      if (limit && list.length >= limit) return; // enforce sides limit (e.g., 2)
      setList([...list, key]);
    }
  };

  const add = () => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        basePrice: item.price,
        quantity,
        sides: item.sides
          .filter(s => chosenSides.includes(s.id))
          .map(s => ({ id: s.id, name: s.name, included: s.included, price: s.price })),
        drinks: item.drinks
          .filter(d => chosenDrinks.includes(d.id))
          .map(d => ({ id: d.id, name: d.name, price: d.price })),
        extras: item.extras
          .filter(e => chosenExtras.includes(e.id))
          .map(e => ({ id: e.id, name: e.name, price: e.price })),
        notes,
      })
    );
    router.push("/orders");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>{ZAR(item.price)} base</Text>

      <Text style={styles.section}>Sides (choose up to 2, included)</Text>
      <View style={styles.row}>
        {item.sides.map(s => (
          <TouchableOpacity
            key={s.id}
            style={[styles.option, chosenSides.includes(s.id) && styles.optionActive]}
            onPress={() => toggle(chosenSides, setChosenSides, s.id, 2)}
          >
            <Text style={styles.optionText}>{s.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Drinks (add-on)</Text>
      <View style={styles.row}>
        {item.drinks.map(d => (
          <TouchableOpacity
            key={d.id}
            style={[styles.option, chosenDrinks.includes(d.id) && styles.optionActive]}
            onPress={() => toggle(chosenDrinks, setChosenDrinks, d.id)}
          >
            <Text style={styles.optionText}>
              {d.name} {d.price ? `+ ${ZAR(d.price)}` : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Extras (add-on)</Text>
      <View style={styles.row}>
        {item.extras.map(e => (
          <TouchableOpacity
            key={e.id}
            style={[styles.option, chosenExtras.includes(e.id) && styles.optionActive]}
            onPress={() => toggle(chosenExtras, setChosenExtras, e.id)}
          >
            <Text style={styles.optionText}>{e.name} + {ZAR(e.price)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Optional ingredients (notes)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., no lettuce, extra tomato"
        value={notes}
        onChangeText={setNotes}
      />

      <View style={styles.qtyRow}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(q => Math.max(1, q - 1))}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(q => q + 1)}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>Total: {ZAR(total)}</Text>

      <TouchableOpacity style={styles.addBtn} onPress={add}>
        <Text style={styles.addText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16 },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  desc: { fontSize: 14, color: "#666", marginVertical: 8 },
  price: { fontSize: 16, fontWeight: "600", color: "#1f7aed", marginBottom: 12 },
  section: { fontSize: 16, fontWeight: "700", marginTop: 16, marginBottom: 8 },
  row: { flexDirection: "row", flexWrap: "wrap" },
  option: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: "#eee", marginRight: 8, marginBottom: 8 },
  optionActive: { backgroundColor: "#1f7aed" },
  optionText: { color: "#333" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginTop: 8 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  qtyBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#eee", alignItems: "center", justifyContent: "center" },
  qtyText: { fontSize: 18, fontWeight: "700" },
  qtyValue: { marginHorizontal: 12, fontSize: 18, fontWeight: "700" },
  total: { fontSize: 18, fontWeight: "700", marginVertical: 12 },
  addBtn: { backgroundColor: "#28a745", padding: 12, borderRadius: 8 },
  addText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
