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

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPasswordOtp">;

export default function ForgotPasswordOtpScreen({ navigation, route }: Props) {
  const { email } = route.params;
  const [code, setCode] = useState("");

  const handleVerify = () => {
    if (!code.trim()) {
      Alert.alert("Validation", "Please enter confirmation code");
      return;
    }

    Alert.alert(
      "Backend Pending",
      "OTP verification backend is not created yet. Moving to reset password screen for UI flow."
    );

    navigation.navigate("ResetPassword", { email, code });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>

        <View style={styles.stepContainer}>
          <View style={styles.doneDot} />
          <View style={styles.line} />
          <View style={styles.activeDot} />
          <View style={styles.line} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.subtitle}>
          By resetting an OTP, you confirm that the email associated belongs to you and
          that you have received this code. The OTP is valid for a limited time.
        </Text>

        <Text style={styles.label}>Confirmation Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Code"
          placeholderTextColor="#6B7280"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
          maxLength={6}
        />

        <Text style={styles.resendText}>Resend Code ?</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
          <Text style={styles.primaryButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel Request</Text>
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
  doneDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#111827",
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
    fontSize: 11,
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
    marginBottom: 12,
    color: "#111827",
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 6,
  },
  resendText: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 16,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: BLUE,
    fontSize: 14,
    fontWeight: "800",
  },
  cancelText: {
    color: "#FFFFFF",
    fontSize: 12,
    textDecorationLine: "underline",
  },
});
//edited by rivithi