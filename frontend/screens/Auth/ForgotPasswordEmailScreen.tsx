import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPasswordEmail">;

export default function ForgotPasswordEmailScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");

  const handleSendConfirmation = async () => {
    if (!email.trim()) {
      Alert.alert("Validation", "Please enter your email");
      return;
    }

    Alert.alert(
      "Backend Pending",
      "Forgot password backend is not created yet. Moving to OTP screen for UI flow."
    );

    navigation.navigate("ForgotPasswordOtp", { email: email.trim() });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>

        <View style={styles.stepContainer}>
          <View style={styles.activeDot} />
          <View style={styles.line} />
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.subtitle}>
          Don&apos;t worry if happens. Enter your email and we&apos;ll send a confirmation
          code to reset password.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSendConfirmation}
        >
          <Text style={styles.primaryButtonText}>Send Confirmation email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const BLUE = "#2EA8FF";
const LIGHT_BLUE = "#CFEAFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: BLUE,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 34,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 30,
    marginBottom: 14,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  activeDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#111827",
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
  },
  line: {
    width: 42,
    height: 2,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 6,
  },
  subtitle: {
    color: "#EAF6FF",
    fontSize: 12,
    marginBottom: 18,
    textAlign: "left",
    width: "100%",
  },
  label: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: LIGHT_BLUE,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    color: "#111827",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: BLUE,
    fontSize: 14,
    fontWeight: "800",
  },
});