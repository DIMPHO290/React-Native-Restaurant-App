

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { clearCart } from "../state/cartSlice";
import { useRouter } from "expo-router";

function CheckoutScreen() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

const handlePayment = () => {
  alert("Thank you for your order.");   
  dispatch(clearCart());              
  router.push("/orders");              
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {items.length === 0 ? (
        <Text style={styles.subtitle}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>
                  {item.name} x{item.quantity}
                </Text>
                <Text style={styles.price}>R{item.price * item.quantity}</Text>
              </View>
            )}
          />

          <Text style={styles.total}>Total: R{total}</Text>

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  subtitle: { fontSize: 14, color: "#666" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  name: { fontSize: 16 },
  price: { fontSize: 16, fontWeight: "600" },
  total: { fontSize: 18, fontWeight: "700", marginVertical: 12 },
  button: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, marginTop: 16 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
