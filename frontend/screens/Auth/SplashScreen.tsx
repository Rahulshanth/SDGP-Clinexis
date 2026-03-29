import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

type Props = {
  navigation: any;
};

export default function SplashScreen({ navigation }: Props) {
  // Animation values
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30); // start slightly lower

  useEffect(() => {
    // Smooth entry animation
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    opacity.value = withTiming(1, {
      duration: 800,
    });

    translateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    // Navigate after delay
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale, translateY]);

  // Combined animation style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <LinearGradient
      colors={["#1E3A8A", "#2EA7FF", "#6EC6FF"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View style={[styles.centerContainer, animatedStyle]}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.tagline}>
              SMART HEALTHCARE,{"\n"}SIMPLIFIED
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  centerContainer: {
    alignItems: "center",
  },

  logo: {
    width: 220,
    height: 220,
    marginBottom: 15,
  },

  tagline: {
    fontSize: 13,
    color: "#EAF6FF",
    textAlign: "center",
    letterSpacing: 2.5,
    lineHeight: 22,
    opacity: 0.95,
  },
});