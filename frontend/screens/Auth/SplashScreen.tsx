import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  navigation: any;
};

export default function SplashScreen({ navigation }: Props) {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // animation
    scale.value = withTiming(1, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });

    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <LinearGradient
      colors={["#1E3A8A", "#2EA7FF", "#6EC6FF"]} // dark → light → glow
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Animated Logo */}
          <Animated.View style={[styles.logoWrapper, animatedStyle]}>
            <Image
              source={require("../../assets/images/ClinexisLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          {/* App Name */}
          <Animated.Text style={[styles.title, animatedStyle]}>
            CLINEXIS
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text style={[styles.tagline, animatedStyle]}>
            SMART HEALTHCARE, SIMPLIFIED
          </Animated.Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40, // breathing room
  },

  content: {
    alignItems: "center",
  },

  logoWrapper: {
    marginBottom: 20,
  },

  logo: {
    width: 180,
    height: 180,
    borderRadius: 20, // modern rounded
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 1.5, // tech feel
    marginBottom: 10,
  },

  tagline: {
    fontSize: 13,
    color: "#e0f2ff",
    letterSpacing: 2,
    textAlign: "center",
  },
});