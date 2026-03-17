import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";

type Props = {
  navigation: any;
};

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1D9BF0" />
      <Image
        source={require("../../assets/images/ClinexisLogo.png")}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2EA7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 240,
    height: 240,
  },
});