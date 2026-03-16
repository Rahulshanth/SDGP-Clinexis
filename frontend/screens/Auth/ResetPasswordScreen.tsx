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

type Props = NativeStackScreenProps<AuthStackParamList, "ResetPassword">;

export default function ResetPasswordScreen({ navigation }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

  const handleReset = () => {
    if (!password || !confirmPassword) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match");
      return;
    }

    Alert.alert(
      "Backend Pending",
      "Reset password backend is not created yet. Returning to sign in screen."
    );

    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create New Password</Text>

        <View style={styles.stepContainer}>
          <View style={styles.doneDot} />
          <View style={styles.line} />
          <View style={styles.doneDot} />
          <View style={styles.line} />
          <View style={styles.activeDot} />
        </View>

        <Text style={styles.subtitle}>
          OTP Authentication Successful. Please confirm your details to proceed.
          Remember your new password to complete the reset.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6B7280"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Text style={styles.smallLink}>
            {secureTextEntry ? "Show password" : "Hide password"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#6B7280"
          secureTextEntry={confirmSecureTextEntry}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          onPress={() =>
            setConfirmSecureTextEntry(!confirmSecureTextEntry)
          }
        >
          <Text style={styles.smallLink}>
            {confirmSecureTextEntry ? "Show confirm password" : "Hide confirm password"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleReset}>
          <Text style={styles.primaryButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.cancelText}>Back to main menu</Text>
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
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 30,
    marginBottom: 14,
    textAlign: "center",
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
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#111827",
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
  input: {
    width: "100%",
    backgroundColor: LIGHT_BLUE,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    color: "#111827",
  },
  smallLink: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 12,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
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