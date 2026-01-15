// src/screens/Login.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { login } from "../state/authSlice";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registeredUser = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const submit = () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password.");
      return;
    }
    if (!registeredUser || registeredUser.email !== email) {
      Alert.alert("Not registered", "Please register first.");
      return;
    }
    dispatch(login({ email, uid: registeredUser.uid }));
    Alert.alert("Logged in", "Welcome back!");
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Login</Text>
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
