import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PatientHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Hello Jack Dawson</Text>
        <Ionicons name="notifications-outline" size={24} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput placeholder="Search doctors, medicines..." />
      </View>

      {/* QUICK ACTIONS */}
      <Text style={styles.section}>Quick Actions</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate("FindDoctor")}>
          <View style={styles.circle}>
            <Ionicons name="medkit" size={28} color="white" />
          </View>
          <Text style={styles.actionText}>Book Doctor</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MyAppointments")}>
          <View style={styles.circle}>
            <Ionicons name="calendar" size={28} color="white" />
          </View>
          <Text style={styles.actionText}>Appointments</Text>
        </TouchableOpacity>
      </View>

      {/* UPCOMING */}
      <Text style={styles.section}>Upcoming Appointments</Text>
      <View style={styles.card}>
        <Text>No appointments yet</Text>
      </View>

      {/* REMINDERS */}
      <Text style={styles.section}>Today Reminders</Text>
      <View style={styles.card}>
        <Text>No reminders</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    gap: 10,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },

  circle: {
    backgroundColor: "#1E3A8A",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  actionText: {
    textAlign: "center",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
});