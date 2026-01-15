// src/screens/admin/Restaurant.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";

export default function Restaurant() {
  const [name, setName] = useState("Dimpho’s Restaurant");
  const [phone, setPhone] = useState("0123456789");
  const [address, setAddress] = useState("123 Main Street");

  const save = () => Alert.alert("Saved", "Restaurant info updated.");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Info</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Address" />
      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 10 },
  button: { backgroundColor: "#1f7aed", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
