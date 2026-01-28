import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import {
  updateQuantity,
  removeItem,
  clearCart,
} from "../state/cartSlice";
import { useRouter } from "expo-router";
import { ZAR } from "../utils/currency";

export default function CartScreen() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  // ✅ Calculate total locally
  const total = items.reduce((sum, item) => {
    const extras =
      item.extras?.reduce((a, e) => a + (e.price ?? 0), 0) ?? 0;

    const drinks =
      item.drinks?.reduce((a, d) => a + (d.price ?? 0), 0) ?? 0;

    return (
      sum +
      (item.basePrice + extras + drinks) * (item.quantity || 1)
    );
  }, 0);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.empty}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const extras =
            item.extras?.reduce(
              (a, e) => a + (e.price ?? 0),
              0
            ) ?? 0;

          const drinks =
            item.drinks?.reduce(
              (a, d) => a + (d.price ?? 0),
              0
            ) ?? 0;

          const unitPrice =
            item.basePrice + extras + drinks;

          return (
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>

                <Text style={styles.meta}>
                  Sides:{" "}
                  {item.sides?.map(s => s.name).join(", ") ||
                    "None"}
                </Text>

                <Text style={styles.meta}>
                  Drinks:{" "}
                  {item.drinks?.map(d => d.name).join(", ") ||
                    "None"}
                </Text>

                <Text style={styles.meta}>
                  Extras:{" "}
                  {item.extras?.map(e => e.name).join(", ") ||
                    "None"}
                </Text>

                {item.notes ? (
                  <Text style={styles.meta}>
                    Notes: {item.notes}
                  </Text>
                ) : null}
              </View>

              <View style={styles.right}>
                <Text style={styles.price}>
                  {ZAR(unitPrice * item.quantity)}
                </Text>

                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() =>
                      dispatch(
                        updateQuantity({
                          index,
                          quantity: Math.max(
                            1,
                            item.quantity - 1
                          ),
                        })
                      )
                    }
                  >
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyValue}>
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() =>
                      dispatch(
                        updateQuantity({
                          index,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() =>
                      router.push({
                        pathname: "/item/[id]" as any,
                        params: {
                          id: item.id,
                          cartIndex: index,
                        },
                      })
                    }
                  >
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() =>
                      dispatch(removeItem(index))
                    }
                  >
                    <Text style={styles.removeText}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      <Text style={styles.total}>
        Total: {ZAR(total)}
      </Text>

      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => router.push("/checkout")}
      >
        <Text style={styles.checkoutText}>
          Proceed to Checkout
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearBtn}
        onPress={() => dispatch(clearCart())}
      >
        <Text style={styles.clearText}>
          Clear Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },

  empty: {
    color: "#666",
    fontSize: 14,
  },

  item: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  meta: {
    fontSize: 12,
    color: "#666",
  },

  right: {
    alignItems: "flex-end",
  },

  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f7aed",
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: {
    fontSize: 16,
    fontWeight: "700",
  },

  qtyValue: {
    marginHorizontal: 8,
    fontWeight: "700",
  },

  actions: {
    flexDirection: "row",
    marginTop: 8,
  },

  editBtn: {
    backgroundColor: "#ffc107",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
  },

  editText: {
    fontWeight: "700",
  },

  removeBtn: {
    backgroundColor: "#dc3545",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  removeText: {
    color: "#fff",
    fontWeight: "700",
  },

  total: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 12,
  },

  checkoutBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  clearBtn: {
    backgroundColor: "#6c757d",
    padding: 12,
    borderRadius: 8,
  },

  clearText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
