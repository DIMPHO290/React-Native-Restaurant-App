// src/screens/admin/Items.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { menuItems } from "../../data/menu";

export default function Items() {
  const [items, setItems] = useState(menuItems);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    if (!name || !price) return;
    const id = Math.max(...items.map(i => i.id)) + 1;
    setItems([...items, { id, name, description: "", price: Number(price), category: "Mains", image: require("../../../assets/pizza.png"), sides: [], drinks: [], extras: [], options: { removable: [] } }]);
    setName(""); setPrice("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Items</Text>
      <FlatList
        data={items}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.section}>Add new item</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  name: { fontSize: 16 },
  price: { fontSize: 16, fontWeight: "700", color: "#1f7aed" },
  section: { fontSize: 16, fontWeight: "700", marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 10 },
  button: { backgroundColor: "#1f7aed", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
