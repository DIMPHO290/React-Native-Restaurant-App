// src/screens/Register.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { register } from "../state/authSlice";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [cardToken, setCardToken] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const submit = () => {
    if (!email || !password || !name || !surname || !contact || !address) {
      Alert.alert("Missing fields", "Please fill in all required fields.");
      return;
    }
    const uid = `uid_${Date.now()}`;
    dispatch(
      register({
        uid,
        name,
        surname,
        email,
        contact,
        address,
        card: cardToken ? { brand: "Demo", last4: cardToken.slice(-4), token: cardToken } : undefined,
      })
    );
    Alert.alert("Registered", "Account created. You can now place orders.");
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Surname" value={surname} onChangeText={setSurname} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contact number" value={contact} onChangeText={setContact} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="Card token (demo)" value={cardToken} onChangeText={setCardToken} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Create Account</Text>
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
