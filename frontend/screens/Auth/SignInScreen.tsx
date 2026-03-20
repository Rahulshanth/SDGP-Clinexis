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
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
 
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { signInUser } from "../../services/authApi";


//type Props = NativeStackScreenProps<AuthStackParamList, "SignIn">; // commented on 20th march RAHUL
type Props = NativeStackScreenProps<AuthStackParamList, "SignIn"> & {
  onLoginSuccess: () => void;
};

const BLUE = "#2EA8FF";
const DARK_BLUE = "#1E3A8A";
const PANEL_BLUE = "#EAF6FF";
const WHITE = "#FFFFFF";

export default function SignInScreen({ navigation, route , onLoginSuccess }: Props) {
  const selectedRole = route.params.role;
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
 
  // animations
  const slideAnim = useRef(new Animated.Value(120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
 
  const emailLabel = useRef(new Animated.Value(0)).current;
  const passwordLabel = useRef(new Animated.Value(0)).current;
 
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
 
  const animateLabel = (anim: Animated.Value, toValue: number) => {
    Animated.timing(anim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
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
 
  const handleSignIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
 
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

      /*const role =
        result?.user?.role ?? selectedRole ?? "patient";
        console.log("Logged in as:", role); // useful for debugging

      const parentNavigation = navigation.getParent() as any;*/

      /*if (role === "patient") parentNavigation?.replace("Patient");
      else if (role === "doctor") parentNavigation?.replace("Doctor");
      else parentNavigation?.replace("Pharmacy");*/
      console.log("Login result:", JSON.stringify(result));
      onLoginSuccess();

    } catch (error) {
  // ✅ Change this to see the real error
  console.log("Sign in error:", JSON.stringify(error));
  Alert.alert("Error", "Sign in failed");
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
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ translateY: slideAnim }],
                  opacity: opacityAnim,
                },
              ]}
            >

              {/*<Image
                source={require("../../assets/images/ClinexisLogo.png")}
                style={styles.logo}
              />*/}

              <Text style={styles.title}>Sign In</Text>
 
              <Text style={styles.subtitle}>
                Welcome back, please enter your details
              </Text>
 
              <Text style={styles.profileText}>
                {selectedRole} account
              </Text>
 
              {/* SEGMENT */}
              <View style={styles.segment}>
                <View style={styles.segmentActive}>
                  <Text style={styles.segmentActiveText}>Sign In</Text>
                </View>
 
                <TouchableOpacity
                  style={styles.segmentInactive}
                  onPress={() =>
                    navigation.navigate("SignUp", { role: selectedRole })
                  }
                >
                  <Text style={styles.segmentInactiveText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
 
              {/* EMAIL */}
              <View
                style={[
                  styles.inputWrapper,
                  focused === "email" && styles.inputFocused,
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
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    animateLabel(emailLabel, t ? 1 : 0);
                  }}
                  onFocus={() => {
                    setFocused("email");
                    animateLabel(emailLabel, 1);
                  }}
                  onBlur={() => {
                    setFocused(null);
                    !email && animateLabel(emailLabel, 0);
                  }}
                />
              </View>
 
              {/* PASSWORD */}
              <View
                style={[
                  styles.inputWrapper,
                  focused === "password" && styles.inputFocused,
                ]}
              >
                <Animated.Text
                  style={[
                    styles.label,
                    {
                      top: passwordLabel.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, -8],
                      }),
                      fontSize: passwordLabel.interpolate({
                        inputRange: [0, 1],
                        outputRange: [14, 11],
                      }),
                    },
                  ]}
                >
                  Password
                </Animated.Text>
 
                <FontAwesome5 name="lock" size={16} color="#6B7280" />
 
                <TextInput
                  style={styles.input}
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    animateLabel(passwordLabel, t ? 1 : 0);
                  }}
                  onFocus={() => {
                    setFocused("password");
                    animateLabel(passwordLabel, 1);
                  }}
                  onBlur={() => {
                    setFocused(null);
                    !password && animateLabel(passwordLabel, 0);
                  }}
                />
 
                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                  <Ionicons
                    name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
 
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPasswordEmail")}
              >
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
 
              {/* BUTTON */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  onPress={handleSignIn}
                  onPressIn={pressIn}
                  onPressOut={pressOut}
                  android_ripple={{ color: "#ffffff40" }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
              </Animated.View>
 
            </Animated.View>
 
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
 
      {/* LOADING OVERLAY */}
      {loading && (
        <View style={styles.overlay}>
          <View style={styles.loaderBox}>
            <Text style={{ color: BLUE }}>Signing in...</Text>
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
  },
 
  card: {
    backgroundColor: PANEL_BLUE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 78,
    paddingHorizontal: 24,
    paddingTop: 75,
  },

  /*logo: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginBottom: 10,
  },*/

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: BLUE,
    marginBottom: 10,
  },
 
  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 7,
  },
 
  profileText: {
    textAlign: "center",
    marginBottom: 20,
    color: "#374151",
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
 
  inputFocused: {
    borderWidth: 1.5,
    borderColor: BLUE,
  },
 
  input: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 6,
  },
 
  label: {
    position: "absolute",
    left: 40,
    color: "#6B7280",
    backgroundColor: WHITE,
    paddingHorizontal: 4,
  },
 
  forgot: {
    textAlign: "right",
    color: BLUE,
    marginBottom: 18,
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
});
 
// Added by Rivithi & Edited by Nadithi