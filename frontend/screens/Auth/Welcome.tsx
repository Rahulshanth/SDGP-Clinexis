import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

export default function Welcome({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/ClinexisLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  content: {
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1E2A3A",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 40,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#2EA7FF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
//Edited by Nadithi & Rivithi