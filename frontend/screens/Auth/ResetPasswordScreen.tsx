import React, { useRef, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "ResetPassword">;

const BLUE = "#2EA8FF";
const DARK_BLUE = "#1E3A8A";
const PANEL_BLUE = "#EAF6FF";
const WHITE = "#FFFFFF";

export default function ResetPasswordScreen({ navigation }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [focused, setFocused] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const slideAnim = useRef(new Animated.Value(120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const successScale = useRef(new Animated.Value(0)).current;

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

  // PASSWORD RULES
  const rules = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isMatch = password === confirmPassword && confirmPassword.length > 0;

  const pressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleReset = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!rules.length || !rules.uppercase || !rules.number) {
      Alert.alert("Weak Password", "Please meet all password requirements");
      return;
    }

    if (!isMatch) {
      Alert.alert("Mismatch", "Passwords do not match");
      return;
    }

    // SUCCESS ANIMATION
    setSuccess(true);
    Animated.spring(successScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.navigate("ChooseProfile");
    }, 1500);
  };

  const renderRule = (valid: boolean, label: string) => (
    <View style={styles.ruleRow}>
      <Ionicons
        name={valid ? "checkmark-circle" : "ellipse-outline"}
        size={16}
        color={valid ? "green" : "#9CA3AF"}
      />
      <Text style={{ color: valid ? "green" : "#6B7280" }}>
        {label}
      </Text>
    </View>
  );

  return (
    <LinearGradient colors={[DARK_BLUE, BLUE, "#6EC6FF"]} style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="always"
          >
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
                  resizeMode="contain"
                />
              </View>

  <Text style={styles.title}>Create New Password</Text>

              {/* PASSWORD */}
              <View
                style={[
                  styles.inputWrapper,
                  focused === "password" && styles.inputFocused,
                ]}
              >
                <FontAwesome5 name="lock" size={16} color="#6B7280" />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={secure}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                />

                <Pressable onPress={() => setSecure(!secure)}>
                  <Ionicons name={secure ? "eye-off" : "eye"} size={20} />
                </Pressable>
              </View>

              {/* CHECKLIST */}
              <View style={styles.checklist}>
                {renderRule(rules.length, "At least 6 characters")}
                {renderRule(rules.uppercase, "One uppercase letter")}
                {renderRule(rules.number, "One number")}
                {renderRule(rules.special, "One special character")}
              </View>

              {/* CONFIRM PASSWORD */}
              <View
                style={[
                  styles.inputWrapper,
                  isMatch && confirmPassword
                    ? styles.match
                    : confirmPassword
                    ? styles.noMatch
                    : null,
                ]}
              >
                <FontAwesome5 name="lock" size={16} color="#6B7280" />

                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={secureConfirm}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                <Pressable onPress={() => setSecureConfirm(!secureConfirm)}>
                  <Ionicons
                    name={secureConfirm ? "eye-off" : "eye"}
                    size={20}
                  />
                </Pressable>
              </View>

              {/* BUTTON */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  onPress={handleReset}
                  onPressIn={pressIn}
                  onPressOut={pressOut}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>
                    Reset Password
                  </Text>
                </Pressable>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* SUCCESS OVERLAY */}
      {success && (
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.successBox,
              { transform: [{ scale: successScale }] },
            ]}
          >
            <Ionicons name="checkmark-circle" size={60} color="green" />
            <Text style={{ marginTop: 10, fontWeight: "700" }}>
              Password Updated!
            </Text>
          </Animated.View>
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
    paddingTop: 100, // space for logo
  },

  card: {
    backgroundColor: PANEL_BLUE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 90, // space for floating logo
    paddingBottom: 40,
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
    marginBottom: 20,
  },

  stepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  doneDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: BLUE,
  },

  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#111827",
  },

  line: {
    width: 34,
    height: 2,
    backgroundColor: "#B9DFFF",
    marginHorizontal: 8,
  },

inputWrapper: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: WHITE,
  borderRadius: 14,
  paddingHorizontal: 12,
  marginBottom: 25,
  minHeight: 56,
},

inputFocused: {
  borderWidth: 1.5,
  borderColor: BLUE,
},

input: {
  flex: 1,
  paddingVertical: 14,
  marginLeft: 8,
  color: "#111827",
},

  strengthContainer: {
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginBottom: 16,
  },

  strengthBar: {
    height: 6,
    borderRadius: 10,
  },

  primaryButton: {
    backgroundColor: BLUE,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },

  primaryButtonText: {
    color: WHITE,
    fontWeight: "800",
    fontSize: 15,
  },

  cancelText: {
    textAlign: "center",
    color: "#6B7280",
    textDecorationLine: "underline",
  },

  checkItem: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
  },

  checkDone: {
    color: "green",
  },

  checklist: {
    marginBottom: 16,
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },

  match: {
    borderWidth: 1.5,
    borderColor: "green",
  },

  noMatch: {
    borderWidth: 1.5,
    borderColor: "red",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000060",
    justifyContent: "center",
    alignItems: "center",
  },

  successBox: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
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
  },
});

//Added by Rivithi &. Edited by Nadithi