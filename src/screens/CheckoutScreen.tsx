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

 
  const total = items.reduce((sum,i) => {
    const extras = i.extras?.reduce((a, e) => a + (e.price ?? 0), 0) ?? 0;
    const drinks = i.drinks?.reduce((a, d) => a + (d.price ?? 0), 0) ?? 0;
    const base = i.basePrice ?? 0;
    const quantity = typeof i.quantity === "number" && i.quantity > 0 ? i.quantity : 1;
    return sum + (base + extras + drinks) * quantity;
  }, 0);

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
            renderItem={({ item }) => {
              const extras = item.extras?.reduce((a, e) => a + (e.price ?? 0), 0) ?? 0;
              const drinks = item.drinks?.reduce((a, d) => a + (d.price ?? 0), 0) ?? 0;
              const base = item.basePrice ?? 0;
              const quantity = typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1;
              const unit = base + extras + drinks;

              return (
                <View style={styles.item}>
                  <Text style={styles.name}>
                    {item.name} x{quantity}
                  </Text>
                  <Text style={styles.price}>R{unit * quantity}</Text>
                </View>
              );
            }}
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
