import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

export default function Welcome({ navigation }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withTiming(0, { duration: 800 });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/welcome_page.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Animated.View style={[styles.content, animatedStyle]}>
            <Text style={styles.title}>Clinexis</Text>

            <Text style={styles.subtitle}>
              Your modern companion for trusted medical care, clear treatment
              guidance, and everyday health support.
            </Text>

            <Animated.View style={buttonAnimatedStyle}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => navigation.navigate("ChooseProfile")}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

//Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)", // slightly stronger
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  content: {
    alignItems: "center",
  },

  title: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#dddddd",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: 320,
  },

  button: {
    backgroundColor: "#3498db",
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 14,
    elevation: 5,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});