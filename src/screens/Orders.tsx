import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { updateQuantity, removeItem, clearCart } from "../state/cartSlice";
import { useRouter } from "expo-router";
import { ZAR } from "../utils/currency";

export default function OrdersScreen() {
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce((sum, item) => {
    const extras = item.extras?.reduce((a, e) => a + (e.price ?? 0), 0) ?? 0;
    const drinks = item.drinks?.reduce((a, d) => a + (d.price ?? 0), 0) ?? 0;
    const base = item.basePrice ?? 0;
    const quantity = typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1;
    return sum + (base + extras + drinks) * quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {items.length === 0 ? (
        <Text style={styles.subtitle}>No items in cart</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              const extras = item.extras?.reduce((a, e) => a + (e.price ?? 0), 0) ?? 0;
              const drinks = item.drinks?.reduce((a, d) => a + (d.price ?? 0), 0) ?? 0;
              const base = item.basePrice ?? 0;
              const quantity = typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1;
              const unit = base + extras + drinks;

              return (
                <View style={styles.item}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.meta}>
                      {item.sides?.length ? `Sides: ${item.sides.map(s => s.name).join(", ")}` : "No sides"}
                    </Text>
                    <Text style={styles.meta}>
                      {item.drinks?.length ? `Drinks: ${item.drinks.map(d => d.name).join(", ")}` : "No drinks"}
                    </Text>
                    <Text style={styles.meta}>
                      {item.extras?.length ? `Extras: ${item.extras.map(e => e.name).join(", ")}` : "No extras"}
                    </Text>
                    {item.notes ? <Text style={styles.meta}>Notes: {item.notes}</Text> : null}
                  </View>

                  <View style={styles.right}>
                    <Text style={styles.price}>{ZAR(unit * quantity)}</Text>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() =>
                          dispatch(updateQuantity({ index, quantity: Math.max(1, quantity - 1) }))
                        }
                      >
                        <Text style={styles.qtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyValue}>{quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() =>
                          dispatch(updateQuantity({ index, quantity: quantity + 1 }))
                        }
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.actions}>
                      <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => router.push({ pathname: "/item/[id]" as any, params: { id: item.id } })}
                      >
                        <Text style={styles.editText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={() => dispatch(removeItem(index))}
                      >
                        <Text style={styles.removeText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />

          <Text style={styles.total}>Total: {ZAR(total)}</Text>

          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push("/checkout")}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearCart())}>
            <Text style={styles.clearText}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  subtitle: { fontSize: 14, color: "#666" },
  item: { flexDirection: "row", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  name: { fontSize: 16, fontWeight: "700" },
  meta: { fontSize: 12, color: "#666" },
  right: { alignItems: "flex-end" },
  price: { fontSize: 14, fontWeight: "700", color: "#1f7aed" },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#eee", alignItems: "center", justifyContent: "center" },
  qtyText: { fontSize: 16, fontWeight: "700" },
  qtyValue: { marginHorizontal: 8, fontSize: 16, fontWeight: "700" },
  actions: { flexDirection: "row", marginTop: 8 },
  editBtn: { backgroundColor: "#ffc107", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, marginRight: 8 },
  editText: { color: "#333", fontWeight: "700" },
  removeBtn: { backgroundColor: "#dc3545", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  removeText: { color: "#fff", fontWeight: "700" },
  total: { fontSize: 18, fontWeight: "700", marginVertical: 12 },
  checkoutBtn: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, marginBottom: 8 },
  checkoutText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  clearBtn: { backgroundColor: "#6c757d", padding: 12, borderRadius: 8 },
  clearText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
