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
import { signInUser } from "../../services/authApi";

type Props = NativeStackScreenProps<AuthStackParamList, "SignIn">;

export default function SignInScreen({ navigation, route }: Props) {
  const selectedRole = route.params.role;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const result = await signInUser({
        email: email.trim(),
        password,
      });

      console.log("SignIn success:", result);

      Alert.alert("Success", "SignIn successful");

const role: "patient" | "doctor" | "pharmacy" =
  result?.user?.role ?? selectedRole ?? "patient";

const parentNavigation = navigation.getParent() as any;

if (role === "patient") {
  parentNavigation?.replace("Patient");
} else if (role === "doctor") {
  parentNavigation?.replace("Doctor");
} else {
  parentNavigation?.replace("Pharmacy");
}
    } catch (error: any) {
      console.log("SignIn error:", error?.response?.data || error.message);

      Alert.alert(
        "SignIn Failed",
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.subtitle}>
          Welcome back, please enter your details
        </Text>

        <Text style={styles.profileText}>
          Selected profile: {selectedRole}
        </Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inactiveTab}
            onPress={() => navigation.navigate("SignUp", { role: selectedRole })}
          >
            <Text style={styles.inactiveTabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

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

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#1D4ED8" />
          ) : (
            <Text style={styles.primaryButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordEmail")}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Don&apos;t have an account?{" "}
          <Text
            style={styles.bottomLink}
            onPress={() => navigation.navigate("SignUp", { role: selectedRole })}
          >
            Sign Up
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
    marginBottom: 8,
    textAlign: "center",
  },

  profileText: {
    fontSize: 13,
    color: "#FFFFFF",
    marginBottom: 18,
    textTransform: "capitalize",
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
    marginRight: 8,
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
    marginBottom: 16,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryButtonText: {
    color: BLUE,
    fontSize: 15,
    fontWeight: "800",
  },

  forgotText: {
    color: "#FFFFFF",
    fontSize: 13,
    textDecorationLine: "underline",
    marginBottom: 14,
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