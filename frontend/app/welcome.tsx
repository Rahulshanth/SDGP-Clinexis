import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('/Users/nadithimoonasingha/SDGP-Clinexis/frontend/assets/images/welcome_page.png')}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Clinexis</Text>

          <Text style={styles.description}>
            Your modern companion for trusted medical care, clear treatment
            guidance, and everyday health support.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 24,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#2EA8FF',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});