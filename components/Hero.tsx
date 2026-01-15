import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Hero() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/restaurant-banner.png")} style={styles.image} />
      <Text style={styles.title}>Welcome to Dimpho’s Restaurant</Text>
      <Text style={styles.subtitle}>Delicious meals, fast delivery</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16, alignItems: "center" },
  image: { width: "100%", height: 180, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "700", marginTop: 12 },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
});
