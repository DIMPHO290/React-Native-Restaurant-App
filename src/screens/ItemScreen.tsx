// src/screens/ItemScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateItem } from "../state/cartSlice";
import { RootState } from "../state/store";
import { menuItems } from "../data/menu";
import { ZAR } from "../utils/currency";

export default function ItemScreen() {
  const { id, cartIndex } = useLocalSearchParams<{
    id: string;
    cartIndex?: string;
  }>();

  const editIndex = cartIndex !== undefined ? Number(cartIndex) : null;

  const item = useMemo(
    () => menuItems.find(m => m.id === Number(id)),
    [id]
  );

  const cartItem = useSelector((s: RootState) =>
    editIndex !== null ? s.cart.items[editIndex] : null
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [chosenSides, setChosenSides] = useState<string[]>([]);
  const [chosenDrinks, setChosenDrinks] = useState<string[]>([]);
  const [chosenExtras, setChosenExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!cartItem) return;

    setQuantity(cartItem.quantity);
    setChosenSides(cartItem.sides?.map(s => s.id) ?? []);
    setChosenDrinks(cartItem.drinks?.map(d => d.id) ?? []);
    setChosenExtras(cartItem.extras?.map(e => e.id) ?? []);
    setNotes(cartItem.notes ?? "");
  }, [cartItem]);

  if (!item) return null;

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    key: string,
    limit?: number
  ) => {
    if (list.includes(key)) setList(list.filter(x => x !== key));
    else {
      if (limit && list.length >= limit) return;
      setList([...list, key]);
    }
  };

  const save = () => {
    const payload = {
      id: String(item.id),
      name: item.name,
      basePrice: item.price,
      quantity,
      sides: item.sides
        .filter(s => chosenSides.includes(s.id))
        .map(s => ({ id: s.id, name: s.name })),
      drinks: item.drinks
        .filter(d => chosenDrinks.includes(d.id))
        .map(d => ({ id: d.id, name: d.name, price: d.price })),
      extras: item.extras
        .filter(e => chosenExtras.includes(e.id))
        .map(e => ({ id: e.id, name: e.name, price: e.price })),
      notes,
    };

    if (editIndex !== null) {
      dispatch(updateItem({ index: editIndex, item: payload }));
    } else {
      dispatch(addToCart(payload));
    }

    router.push("/orders");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>

      <Text style={styles.section}>Sides</Text>
      {item.sides.map(s => (
        <TouchableOpacity
          key={s.id}
          onPress={() => toggle(chosenSides, setChosenSides, s.id, 2)}
        >
          <Text>{chosenSides.includes(s.id) ? "✔ " : ""}{s.name}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Drinks</Text>
      {item.drinks.map(d => (
        <TouchableOpacity
          key={d.id}
          onPress={() => toggle(chosenDrinks, setChosenDrinks, d.id)}
        >
          <Text>{chosenDrinks.includes(d.id) ? "✔ " : ""}{d.name}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Extras</Text>
      {item.extras.map(e => (
        <TouchableOpacity
          key={e.id}
          onPress={() => toggle(chosenExtras, setChosenExtras, e.id)}
        >
          <Text>{chosenExtras.includes(e.id) ? "✔ " : ""}{e.name}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={save}>
        <Text style={styles.saveText}>
          {editIndex !== null ? "Update Item" : "Add to Cart"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  image: { height: 220, width: "100%", borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  section: { fontSize: 16, fontWeight: "700", marginTop: 16 },
  input: { borderWidth: 1, padding: 8, marginTop: 8 },
  saveBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  saveText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
