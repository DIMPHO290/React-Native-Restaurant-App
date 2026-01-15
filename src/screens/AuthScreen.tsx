import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login, register } from '../state/authSlice';

export default function AuthScreen() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');

  const onSubmit = () => {
    if (mode === 'login') {
      if (!email.trim()) return Alert.alert('Error', 'Email required');
      dispatch(login({ email }));
      Alert.alert('Logged in');
    } else {
      if (!email.trim() || !name.trim() || !contactNumber.trim() || !address.trim()) {
        return Alert.alert('Error', 'Fill all required fields');
      }
      dispatch(
        register({
          email,
          name,
          surname,
          contactNumber,
          address,
          cardLast4: card.replace(/\s/g, '').slice(-4) || undefined,
          defaultCardToken: card ? 'mock_token' : undefined
        })
      );
      Alert.alert('Registered');
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>{mode === 'login' ? 'Sign in' : 'Register'}</Text>
      {mode === 'register' && (
        <>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Surname" value={surname} onChangeText={setSurname} style={styles.input} />
          <TextInput placeholder="Contact number" value={contactNumber} onChangeText={setContactNumber} style={styles.input} />
          <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
          <TextInput placeholder="Card number (fake ok)" value={card} onChangeText={setCard} style={styles.input} keyboardType="numeric" />
        </>
      )}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TouchableOpacity style={styles.cta} onPress={onSubmit}>
        <Text style={styles.ctaText}>{mode === 'login' ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.alt} onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
        <Text style={styles.altText}>{mode === 'login' ? 'Create an account' : 'I already have an account'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  cta: { backgroundColor: '#1f7aed', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 4 },
  ctaText: { color: '#fff', fontWeight: '800' },
  alt: { marginTop: 10, alignItems: 'center' },
  altText: { color: '#1f7aed', fontWeight: '700' }
});
