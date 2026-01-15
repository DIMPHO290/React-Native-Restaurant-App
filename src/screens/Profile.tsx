
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

function ProfileScreen() {
  const [name, setName] = useState("Dimpho");
  const [email, setEmail] = useState("dimpho@gmail.com");
  const [address, setAddress] = useState("123 Main Street, Polokwane");

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    alert("You have been logged out.");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/profile.png")} style={styles.avatar} />

      <Text style={styles.header}>My Profile</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#f9f9f9" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#1f7aed",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: "100%",
  },
  logout: { backgroundColor: "#dc3545" },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
