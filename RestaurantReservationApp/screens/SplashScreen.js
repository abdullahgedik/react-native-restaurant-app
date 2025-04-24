// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  // Başlangıçta görünmez (opacity 0) ve biraz küçültülmüş (scale 0.8)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // İki animasyonu paralel başlatıyoruz
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Animasyon tamamlandığında kısa bir bekleme sonrası Login ekranına yönlendiriyoruz
      setTimeout(() => {
         navigation.replace('Login');
      }, 1000);
    });
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Text style={[styles.text, { transform: [{ scale: scaleAnim }] }]}>
        Restoran Rezervasyon Uygulaması
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4287f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});
