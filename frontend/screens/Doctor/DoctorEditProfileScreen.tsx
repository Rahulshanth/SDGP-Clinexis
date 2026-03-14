import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
  Image,
} from "react-native";

export default function DoctorProfileScreen() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [name] = useState("Dr. Sarah Bennett");
  const [specialty] = useState("Cardiologist");
  const [hospital] = useState("St. Mary's Medical Center");
  const [clinicNumber] = useState("+94 11 234 5678");
  const [workingHours] = useState("Mon-Fri, 09:00 - 17:00");

  const handleSave = () => {
    Alert.alert("Profile Saved", "Your profile has been updated successfully.");
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => console.log("Logged out"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraBtn}>
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.doctorName}>{name}</Text>
          <View style={styles.specialtyBadge}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Professional Info */}
          <Text style={styles.sectionLabel}>PROFESSIONAL INFO</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🏥</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoFieldLabel}>Hospital Affiliation</Text>
                <Text style={styles.infoFieldValue}>{hospital}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🕐</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoFieldLabel}>Working Hours</Text>
                <Text style={styles.infoFieldValue}>{workingHours}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📞</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoFieldLabel}>Clinic Number</Text>
                <Text style={styles.infoFieldValue}>{clinicNumber}</Text>
              </View>
            </View>
          </View>

          {/* Security & Notifications */}
          <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
            SECURITY & NOTIFICATIONS
          </Text>

          <View style={styles.settingsCard}>
            {/* Change Password */}
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() =>
                Alert.alert(
                  "Change Password",
                  "This feature will be available soon.",
                )
              }
            >
              <View style={styles.settingsLeft}>
                <View
                  style={[
                    styles.settingsIconBox,
                    { backgroundColor: "#EFF6FF" },
                  ]}
                >
                  <Text style={styles.settingsIcon}>🔒</Text>
                </View>
                <Text style={styles.settingsLabel}>Change Password</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Two Factor */}
            <View style={styles.settingsRow}>
              <View style={styles.settingsLeft}>
                <View
                  style={[
                    styles.settingsIconBox,
                    { backgroundColor: "#EFF6FF" },
                  ]}
                >
                  <Text style={styles.settingsIcon}>🛡</Text>
                </View>
                <Text style={styles.settingsLabel}>Two-Factor Auth</Text>
              </View>
              <Switch
                value={twoFactor}
                onValueChange={setTwoFactor}
                trackColor={{ false: "#E5E7EB", true: "#1E3A8A" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            {/* Notification Settings */}
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() =>
                Alert.alert(
                  "Notifications",
                  "Notification settings coming soon.",
                )
              }
            >
              <View style={styles.settingsLeft}>
                <View
                  style={[
                    styles.settingsIconBox,
                    { backgroundColor: "#EFF6FF" },
                  ]}
                >
                  <Text style={styles.settingsIcon}>🔔</Text>
                </View>
                <Text style={styles.settingsLabel}>Notification Settings</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutIcon}>↪</Text>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>© 2025 ClineXis Team</Text>
          <View style={{ height: 32 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },
  backBtn: { padding: 4 },
  backArrow: { fontSize: 24, color: "#1E293B" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#0F172A" },
  saveText: { fontSize: 15, fontWeight: "700", color: "#1E3A8A" },
  avatarSection: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 28,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },
  avatarWrapper: { position: "relative", marginBottom: 14 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#EFF6FF",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  cameraIcon: { fontSize: 14 },
  doctorName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  specialtyBadge: {
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  specialtyText: { fontSize: 13, fontWeight: "600", color: "#1E3A8A" },
  body: { paddingHorizontal: 20, paddingTop: 24 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoIcon: { fontSize: 18 },
  infoFieldLabel: { fontSize: 11, color: "#94A3B8", marginBottom: 4 },
  infoFieldValue: { fontSize: 15, fontWeight: "600", color: "#1E293B" },
  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingsLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingsIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: { fontSize: 18 },
  settingsLabel: { fontSize: 15, fontWeight: "500", color: "#1E293B" },
  chevron: { fontSize: 20, color: "#CBD5E1" },
  divider: { height: 0.5, backgroundColor: "#F1F5F9", marginHorizontal: 16 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    backgroundColor: "#FEF2F2",
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutIcon: { fontSize: 18, color: "#DC2626" },
  logoutText: { fontSize: 16, fontWeight: "700", color: "#DC2626" },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#CBD5E1",
    marginTop: 20,
  },
});
