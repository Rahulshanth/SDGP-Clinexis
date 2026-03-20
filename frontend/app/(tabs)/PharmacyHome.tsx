import { StyleSheet, Text, View } from "react-native";

export default function PharmacyHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pharmacy Home</Text>
      <Text style={styles.subtitle}>
        Pharmacy features are available from the app navigation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FB",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E2A3A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
