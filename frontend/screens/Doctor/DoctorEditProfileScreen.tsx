// screens/Doctor/DoctorEditProfileScreen.tsx — updated by Vidu
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getMyProfile, updateMyProfile } from "../../services/doctorApi";

// ── Moved OUTSIDE the main component — fixes keyboard closing bug ─────────────
const EditableField = ({
  icon,
  label,
  value,
  onChangeText,
  isEditing,
  keyboardType = "default",
}: {
  icon: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isEditing: boolean;
  keyboardType?: any;
}) => (
  <View style={styles.infoCard}>
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoFieldLabel}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholderTextColor="#94A3B8"
            autoCorrect={false}
            blurOnSubmit={false}
          />
        ) : (
          <Text style={styles.infoFieldValue}>{value || "Not set"}</Text>
        )}
      </View>
      {isEditing && <Text style={styles.editIndicator}>✏️</Text>}
    </View>
  </View>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function DoctorEditProfileScreen() {
  const insets = useSafeAreaInsets();
  const [twoFactor, setTwoFactor] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [clinicLocation, setClinicLocation] = useState("");
  const [email, setEmail] = useState("");

  const [originalData, setOriginalData] = useState({
    name: "",
    specialty: "",
    hospital: "",
    phoneNumber: "",
    clinicLocation: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await getMyProfile();
      const profile = data.profile || {};
      setName(profile.name || "");
      setSpecialty(profile.specialization || "");
      setHospital(profile.hospitalName || "");
      setPhoneNumber(profile.phoneNumber || "");
      setClinicLocation(profile.clinicLocation || "");
      setEmail(data.email || "");
      setOriginalData({
        name: profile.name || "",
        specialty: profile.specialization || "",
        hospital: profile.hospitalName || "",
        phoneNumber: profile.phoneNumber || "",
        clinicLocation: profile.clinicLocation || "",
      });
    } catch (err: any) {
      Alert.alert("Error", "Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateMyProfile({
        name,
        specialization: specialty,
        hospitalName: hospital,
        phoneNumber,
        clinicLocation,
      });
      setOriginalData({
        name,
        specialty,
        hospital,
        phoneNumber,
        clinicLocation,
      });
      setIsEditing(false);
      Alert.alert("✅ Saved", "Your profile has been updated successfully.");
    } catch (err: any) {
      Alert.alert("Error", "Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(originalData.name);
    setSpecialty(originalData.specialty);
    setHospital(originalData.hospital);
    setPhoneNumber(originalData.phoneNumber);
    setClinicLocation(originalData.clinicLocation);
    setIsEditing(false);
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

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <Text style={styles.headerTitle}>Profile</Text>
        {isEditing ? (
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={styles.saveBtn}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.editBtn}
          >
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Edit mode banner */}
        {isEditing && (
          <View style={styles.editBanner}>
            <Text style={styles.editBannerText}>
              ✏️ You are in edit mode — tap Save when done
            </Text>
          </View>
        )}

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {name ? name.charAt(0).toUpperCase() : "D"}
            </Text>
          </View>
          <Text style={styles.doctorName}>{name || "Doctor"}</Text>
          <View style={styles.specialtyBadge}>
            <Text style={styles.specialtyText}>
              {specialty || "Specialization not set"}
            </Text>
          </View>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.sectionLabel}>PROFESSIONAL INFO</Text>

          {/* ── Now passing isEditing as a prop ── */}
          <EditableField
            icon="👤"
            label="Full Name"
            value={name}
            onChangeText={setName}
            isEditing={isEditing}
          />
          <EditableField
            icon="🩺"
            label="Specialization"
            value={specialty}
            onChangeText={setSpecialty}
            isEditing={isEditing}
          />
          <EditableField
            icon="🏥"
            label="Hospital"
            value={hospital}
            onChangeText={setHospital}
            isEditing={isEditing}
          />
          <EditableField
            icon="📍"
            label="Clinic Location"
            value={clinicLocation}
            onChangeText={setClinicLocation}
            isEditing={isEditing}
          />
          <EditableField
            icon="📞"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            isEditing={isEditing}
            keyboardType="phone-pad"
          />

          <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
            SECURITY & NOTIFICATIONS
          </Text>

          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "Change password feature coming soon.",
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

            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() =>
                Alert.alert("Coming Soon", "Notification settings coming soon.")
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
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { marginTop: 12, fontSize: 15, color: "#94A3B8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#0F172A" },
  headerActions: { flexDirection: "row", gap: 8 },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelText: { fontSize: 14, fontWeight: "600", color: "#64748B" },
  saveBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#1E3A8A",
    minWidth: 60,
    alignItems: "center",
  },
  saveText: { fontSize: 14, fontWeight: "700", color: "#fff" },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  editBtnText: { fontSize: 14, fontWeight: "600", color: "#1E3A8A" },
  editBanner: {
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#BFDBFE",
  },
  editBannerText: {
    fontSize: 13,
    color: "#1E3A8A",
    textAlign: "center",
    fontWeight: "500",
  },
  avatarSection: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 28,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarInitial: { fontSize: 40, fontWeight: "700", color: "#fff" },
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
    marginBottom: 6,
  },
  specialtyText: { fontSize: 13, fontWeight: "600", color: "#1E3A8A" },
  emailText: { fontSize: 13, color: "#94A3B8", marginTop: 4 },
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
  editInput: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    borderBottomWidth: 1.5,
    borderBottomColor: "#1E3A8A",
    paddingBottom: 4,
    paddingTop: 2,
  },
  editIndicator: { fontSize: 14 },
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
