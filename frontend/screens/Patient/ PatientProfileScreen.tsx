import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const PatientProfileScreen = () => {
  const handleLogout = () => {
    Alert.alert("Logout", "Logout button pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.name}>Nadithi Moonasingha</Text>
        <Text style={styles.info}>Email: patient@example.com</Text>
        <Text style={styles.info}>Phone: +94 77 123 4567</Text>
        <Text style={styles.info}>Blood Group: O+</Text>
        <Text style={styles.info}>Age: 24</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default PatientProfileScreen;

//Edited by Nadithi