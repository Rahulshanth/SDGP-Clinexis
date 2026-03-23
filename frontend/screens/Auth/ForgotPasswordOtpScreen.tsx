import React, { useRef, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPasswordOtp">;

const BLUE = "#2EA8FF";
const DARK_BLUE = "#1E3A8A";
const PANEL_BLUE = "#EAF6FF";
const WHITE = "#FFFFFF";

export default function ForgotPasswordOtpScreen({ navigation, route }: Props) {
  const { email } = route.params;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

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

  const handleChange = (text: string, index: number) => {
    if (!/^[0-9]*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

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

  const handleVerify = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const code = otp.join("");

    if (code.length < 6) {
      Alert.alert("Validation", "Enter complete OTP");
      return;
    }

    Alert.alert(
      "Backend Pending",
      "OTP verification not implemented yet. Moving to reset screen."
    );

    navigation.navigate("ResetPassword", { email, code });
  };

  return (
    <LinearGradient colors={[DARK_BLUE, BLUE, "#6EC6FF"]} style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="always"
          >

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

              <Text style={styles.title}>Verify Code</Text>

              <Text style={styles.subtitle}>
                Enter the 6-digit code sent to{"\n"}
                <Text style={{ fontWeight: "700", color: BLUE }}>{email}</Text>
              </Text>

              {/* STEP INDICATOR */}
              <View style={styles.stepContainer}>
                <View style={styles.doneDot} />
                <View style={styles.line} />
                <View style={styles.activeDot} />
                <View style={styles.line} />
                <View style={styles.dot} />
              </View>

              {/* OTP BOXES */}
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputs.current[index] = ref;
                    }}
                    style={styles.otpBox}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === "Backspace") {
                        handleBackspace(index);
                      }
                    }}
                  />
                ))}
              </View>

              <Text style={styles.resendText}>Resend Code?</Text>

              {/* BUTTON */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  onPress={handleVerify}
                  onPressIn={pressIn}
                  onPressOut={pressOut}
                  android_ripple={{ color: "#ffffff40" }}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>Verify</Text>
                </Pressable>
              </Animated.View>

              <Pressable onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancel Request</Text>
              </Pressable>

            </Animated.View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingTop: 100, // important
  },

  card: {
    backgroundColor: PANEL_BLUE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 90, // space for logo
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
    lineHeight: 20,
  },

  stepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
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

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  otpBox: {
    width: 45,
    height: 55,
    backgroundColor: WHITE,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    elevation: 2,
  },

  resendText: {
    textAlign: "center",
    color: BLUE,
    marginBottom: 20,
    fontWeight: "600",
  },

  primaryButton: {
    backgroundColor: BLUE,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
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

  logoFloating: {
    position: "absolute",
    top: -90,
    alignSelf: "center",
    zIndex: 10,
  },

  logo: {
    width: 200,
    height: 200,
    borderRadius: 60,
  },
});
//edited by rivithi