import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function Hero() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1543353071-087092ec393a' }}
      style={styles.bg}
      imageStyle={styles.bgImg}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Enjoy a Luxury Experience</Text>
        <Text style={styles.subtitle}>Discover signature dishes, crafted drinks, and indulgent desserts.</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { height: 200, borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  bgImg: { transform: [{ scale: 1.05 }] },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#eee', fontSize: 14 }
});
