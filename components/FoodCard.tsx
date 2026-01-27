import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/state/cartSlice";

type Props = {
  id: string; // better to use string for consistency with cartSlice
  name: string;
  description: string;
  price: number;
  image: any;
};

export default function FoodCard({ id, name, description, price, image }: Props) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addToCart({
        id,
        name,
        basePrice: price, // ✅ matches cartSlice
        quantity: 1,      // ✅ default quantity
        sides: [],
        drinks: [],
        extras: [],
        notes: "",
      })
    );
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.price}>R{price}</Text>

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12 },
  name: { fontSize: 16, fontWeight: "700" },
  desc: { fontSize: 12, color: "#666", marginVertical: 4 },
  price: { fontSize: 14, fontWeight: "600", color: "#1f7aed" },
  button: {
    backgroundColor: "#1f7aed",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
