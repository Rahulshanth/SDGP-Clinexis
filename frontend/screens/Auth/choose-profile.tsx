import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ChooseProfile"
>;

export default function ChooseProfileScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <LinearGradient
      colors={["#1E3A8A", "#2EA7FF", "#6EC6FF"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Choose Your Profile</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("SignIn", { role: "patient" })}
        >
          <View style={styles.row}>
            <Ionicons name="person" size={26} color="#2EA7FF" />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Patient</Text>
              <Text style={styles.cardText}>Access your medical records</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("SignIn", { role: "doctor" })}
        >
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="stethoscope"
              size={26}
              color="#2EA7FF"
            />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Doctor</Text>
              <Text style={styles.cardText}>Manage consultations</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("SignIn", { role: "pharmacy" })}
        >
          <View style={styles.row}>
            <MaterialCommunityIcons name="pill" size={26} color="#2EA7FF" />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Pharmacy</Text>
              <Text style={styles.cardText}>Manage prescriptions</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 1.2,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  cardText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.6)",
    marginTop: 4,
  },
});
