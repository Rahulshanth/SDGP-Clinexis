import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { registerUser } from "../../services/authApi";

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Validation", "Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const result = await registerUser({
        email: email.trim(),
        password,
        role: "patient",
        profile: {
          fullName: fullName.trim(),
        },
      });

      console.log("Register success:", result);
      Alert.alert("Success", "User registered successfully");
      navigation.navigate("SignIn");
    } catch (error: any) {
      console.log(
        "Register error:",
        error?.response?.data || error?.message || error
      );

      const message = Array.isArray(error?.response?.data?.message)
        ? error.response.data.message.join("\n")
        : error?.response?.data?.message || "Something went wrong";

      Alert.alert("Registration Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Welcome back, please enter your details
        </Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.inactiveTab}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.inactiveTabText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#6B7280"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

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
          onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
        >
          <Text style={styles.smallLink}>
            {confirmSecureTextEntry
              ? "Show confirm password"
              : "Hide confirm password"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#1D4ED8" />
          ) : (
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Already have an account?{" "}
          <Text
            style={styles.bottomLink}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
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
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 12,
    color: "#EAF6FF",
    marginTop: 8,
    marginBottom: 18,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginLeft: 8,
  },
  inactiveTab: {
    backgroundColor: "#DFF1FF",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  activeTabText: {
    color: BLUE,
    fontWeight: "700",
  },
  inactiveTabText: {
    color: BLUE,
    fontWeight: "700",
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
    marginBottom: 14,
  },
  primaryButtonText: {
    color: BLUE,
    fontSize: 15,
    fontWeight: "800",
  },
  bottomText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  bottomLink: {
    fontWeight: "800",
    textDecorationLine: "underline",
  },
});

//edited by rivithi