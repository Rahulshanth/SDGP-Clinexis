import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Pressable,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { registerUser } from "@/store/authSlice";

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

const BLUE = "#2EA8FF";
const DARK_BLUE = "#1E3A8A";
const PANEL_BLUE = "#EAF6FF";
const WHITE = "#FFFFFF";

export default function SignUpScreen({ navigation, route }: Props) {
  const { role } = route.params;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry] = useState(true);

  const [loading, setLoading] = useState(false);

  // animations
  const slideAnim = useRef(new Animated.Value(120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityAnim, slideAnim]);

  // PASSWORD STRENGTH
  const getStrength = () => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();

  const getStrengthColor = () => {
    if (strength <= 1) return "red";
    if (strength === 2) return "orange";
    if (strength === 3) return "#2EA8FF";
    return "green";
  };

  const handleRegister = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        email,
        password,
        role,
        profile: { name: fullName },
      });

      Alert.alert("Success", "Registered successfully");
      navigation.navigate("SignIn", { role });

    } catch {
      Alert.alert("Error", "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[DARK_BLUE, BLUE, "#6EC6FF"]} style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>

            {/* FLOATING LOGO */}
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ translateY: slideAnim }],
                  opacity: opacityAnim,
                },
              ]}
            >

              {/* FLOATING LOGO */}
              <View style={styles.logoFloating}>
                <Image
                  source={require("../../assets/images/Logo.png")}
                  style={styles.logo}
                />
              </View>

              <Text style={styles.title}>Sign Up</Text>

              {/* SEGMENT */}
              <View style={styles.segment}>
                <TouchableOpacity
                  style={styles.segmentInactive}
                  onPress={() => navigation.navigate("SignIn", { role })}
                >
                  <Text style={styles.segmentInactiveText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.segmentActive}>
                  <Text style={styles.segmentActiveText}>Sign Up</Text>
                </View>
              </View>

              {/* NAME */}
              <View style={styles.inputWrapper}>
                <MaterialIcons name="person" size={18} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              {/* EMAIL */}
              <View style={styles.inputWrapper}>
                <MaterialIcons name="email" size={18} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* PASSWORD */}
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="lock" size={16} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                  <Ionicons name="eye-outline" size={20} />
                </TouchableOpacity>
              </View>

              {/* STRENGTH BAR */}
              <View style={styles.strengthBarContainer}>
                <View
                  style={[
                    styles.strengthBar,
                    {
                      width: `${(strength / 4) * 100}%`,
                      backgroundColor: getStrengthColor(),
                    },
                  ]}
                />
              </View>

              {/* CONFIRM PASSWORD */}
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="lock" size={16} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={confirmSecureTextEntry}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              {/* BUTTON */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  onPress={handleRegister}
                  android_ripple={{ color: "#ffffff40" }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
              </Animated.View>

            </Animated.View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {loading && (
        <View style={styles.overlay}>
          <View style={styles.loaderBox}>
            <Text style={{ color: BLUE }}>Creating account...</Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingTop: 100, // important for logo spacing
  },

  card: {
    backgroundColor: PANEL_BLUE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 60,
    paddingHorizontal: 24,
    paddingTop: 90, // space for floating logo
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: BLUE,
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 15,
  },

  segment: {
    flexDirection: "row",
    backgroundColor: "#DFF1FF",
    borderRadius: 20,
    padding: 4,
    marginBottom: 18,
  },

  segmentActive: {
    flex: 1,
    backgroundColor: BLUE,
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
  },

  segmentInactive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  segmentActiveText: {
    color: WHITE,
    fontWeight: "700",
  },

  segmentInactiveText: {
    color: BLUE,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
    position: "relative",
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 6,
  },

  label: {
    position: "absolute",
    left: 40,
    backgroundColor: WHITE,
    paddingHorizontal: 4,
    color: "#6B7280",
  },

  button: {
    backgroundColor: BLUE,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: WHITE,
    fontWeight: "800",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000040",
    justifyContent: "center",
    alignItems: "center",
  },

  loaderBox: {
    backgroundColor: WHITE,
    padding: 20,
    borderRadius: 16,
  },

  strengthBarContainer: {
  height: 6,
  backgroundColor: "#ddd",
  borderRadius: 10,
  marginBottom: 12,
  },

  strengthBar: {
  height: 6,
  borderRadius: 10,
  },

  logoFloating: {
    position: "absolute",
    top: -100,
    alignSelf: "center",
    zIndex: 10,
  },

  logo: {
    width: 200,
    height: 200,
    borderRadius: 60,
    padding: 12,
  },
});

//Added by Rivithi & Editted by Nadithi