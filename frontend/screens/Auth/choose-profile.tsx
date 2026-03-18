import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "ChooseProfile">;

export default function ChooseProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Your Profile</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("SignIn", { role: "patient" })}
      >
        <Text style={styles.cardTitle}>Patient</Text>
        <Text style={styles.cardText}>Access your medical records</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("SignIn", { role: "doctor" })}
      >
        <Text style={styles.cardTitle}>Doctor</Text>
        <Text style={styles.cardText}>Manage consultations</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("SignIn", { role: "pharmacy" })}
      >
        <Text style={styles.cardTitle}>Pharmacy</Text>
        <Text style={styles.cardText}>Manage prescriptions</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 40,
  },

  card: {
    width: "100%",
    backgroundColor: "#2EA7FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  cardText: {
    color: "#EAF6FF",
    marginTop: 5,
  },
});
//Added by Nadithi
