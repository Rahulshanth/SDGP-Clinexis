import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

export default function Welcome({ navigation }: Props) {
  return (
    <ImageBackground
      source={require("../../assets/images/welcome_page.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Dark overlay for contrast */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Clinexis</Text>

            <Text style={styles.subtitle}>
              Your modern companion for trusted medical care, clear treatment
              guidance, and everyday health support.
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("ChooseProfile")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // stronger for better contrast
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  content: {
    alignItems: "center",
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#dddddd",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: 320,
  },

  button: {
    backgroundColor: "#3498db",
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 14,
    elevation: 3,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});