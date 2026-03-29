import React, { useRef, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPasswordEmail">;

const BLUE = "#2EA8FF";
const DARK_BLUE = "#1E3A8A";
const PANEL_BLUE = "#EAF6FF";
const WHITE = "#FFFFFF";

export default function ForgotPasswordEmailScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const emailLabel = useRef(new Animated.Value(0)).current;

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
  }, [slideAnim, opacityAnim]);

  const animateLabel = (toValue: number) => {
    Animated.timing(emailLabel, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const pressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.97,
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

  const handleSendConfirmation = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!email.trim()) {
      Alert.alert("Validation", "Please enter your email");
      return;
    }

    try {
      setLoading(true);

      Alert.alert(
        "Backend Pending",
        "Forgot password backend is not created yet. Moving to OTP screen for UI flow."
      );

      navigation.navigate("ForgotPasswordOtp", { email: email.trim() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[DARK_BLUE, BLUE, "#6EC6FF"]} style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
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
                />
              </View>

              <Text style={styles.title}>Forgot Password</Text>

              <Text style={styles.subtitle}>
                Don&apos;t worry. Enter your email and we&apos;ll send a
                confirmation code to reset your password.
              </Text>

              <View style={styles.stepContainer}>
                <View style={styles.activeDot} />
                <View style={styles.line} />
                <View style={styles.dot} />
                <View style={styles.line} />
                <View style={styles.dot} />
              </View>

              {/* INPUT */}
              <View
                style={[
                  styles.inputWrapper,
                  focused && styles.inputFocused,
                ]}
              >
                <Animated.Text
                  style={[
                    styles.label,
                    {
                      top: emailLabel.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, -8],
                      }),
                      fontSize: emailLabel.interpolate({
                        inputRange: [0, 1],
                        outputRange: [14, 11],
                      }),
                    },
                  ]}
                >
                  Email
                </Animated.Text>

                <MaterialIcons name="email" size={18} color="#6B7280" />

                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    animateLabel(text ? 1 : 0);
                  }}
                  onFocus={() => {
                    setFocused(true);
                    animateLabel(1);
                  }}
                  onBlur={() => {
                    setFocused(false);
                    if (!email) animateLabel(0);
                  }}
                />
              </View>

              {/* BUTTON */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  onPress={handleSendConfirmation}
                  onPressIn={pressIn}
                  onPressOut={pressOut}
                  android_ripple={{ color: "#ffffff40" }}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>
                    Send Confirmation Email
                  </Text>
                </Pressable>
              </Animated.View>

              {/* BACK */}
              <TouchableOpacity
                style={styles.backRow}
                onPress={() => navigation.navigate("SignIn", { role: "patient" })}
              >
                <Ionicons name="arrow-back" size={16} color={BLUE} />
                <Text style={styles.backText}>Back to Sign In</Text>
              </TouchableOpacity>

            </Animated.View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {loading && (
        <View style={styles.overlay}>
          <View style={styles.loaderBox}>
            <Text style={styles.loaderText}>Preparing reset flow...</Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  card: {
    backgroundColor: PANEL_BLUE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 78,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: BLUE,
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 18,
    lineHeight: 20,
  },

  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: BLUE,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
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

  label: {
    position: "absolute",
    left: 40,
    color: "#6B7280",
    backgroundColor: WHITE,
    paddingHorizontal: 4,
  },

  primaryButton: {
    backgroundColor: BLUE,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryButtonText: {
    color: WHITE,
    fontWeight: "800",
    fontSize: 15,
  },

  backRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  backText: {
    color: BLUE,
    fontWeight: "600",
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
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 16,
  },

  loaderText: {
    color: BLUE,
    fontWeight: "700",
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