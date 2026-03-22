// screens/Patient/DoctorProfileScreen.tsx — created by Vidu
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PatientStackParamList } from "../../navigation/PatientNavigator";
import { getDoctorById } from "../../services/doctorApi";
import { Doctor } from "../../store/doctorSlice";

type Nav = NativeStackNavigationProp<PatientStackParamList, "DoctorProfile">;
type Route = RouteProp<PatientStackParamList, "DoctorProfile">;

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

const SCHEDULE_DAYS = [
  { day: "Mon", date: 18 },
  { day: "Tue", date: 19 },
  { day: "Wed", date: 20 },
  { day: "Thu", date: 21 },
  { day: "Fri", date: 22 },
];

export default function DoctorProfileScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();
  const { doctor: doctorParam } = route.params;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");

  // ── Fetch real doctor data from MongoDB using ID ──────────────────────────
  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    setLoading(true);
    try {
      const data = await getDoctorById(doctorParam.id);
      setDoctor(data);
    } catch (err: any) {
      Alert.alert("Error", "Failed to load doctor profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Loading doctor profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (!doctor) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Doctor not found.</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={loadDoctor}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const profile = doctor.profile || {};
  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "DR";

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero — real data from MongoDB */}
        <View style={styles.hero}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.name}>{profile.name || "Unknown Doctor"}</Text>
          <Text style={styles.credentials}>
            {profile.specialization || "Specialization not set"} • MBBS, MD
          </Text>
          <Text style={styles.university}>
            {profile.hospitalName || "Hospital not set"}
          </Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>10+</Text>
              <Text style={styles.statLabel}>Years Exp</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>500+</Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* Hospital info — real from MongoDB */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🏥</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>
                {profile.hospitalName || "Not set"}
              </Text>
              <Text style={styles.infoSub}>
                {profile.clinicLocation || "Location not set"}
              </Text>
            </View>
            <Text style={styles.mapIcon}>🗺</Text>
          </View>

          {/* Phone — real from MongoDB */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📞</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Contact Number</Text>
              <Text style={styles.infoSub}>
                {profile.phoneNumber || "Not set"}
              </Text>
            </View>
          </View>

          {/* Fee */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💳</Text>
            <Text style={styles.infoTitle}>Consultation Fee</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.feeAmount}>Rs. 1500</Text>
              <Text style={styles.feeSub}>per session</Text>
            </View>
          </View>

          {/* Schedule */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Schedule</Text>
              <Text style={styles.sectionSub}>April 2026</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 14 }}
            >
              {SCHEDULE_DAYS.map((d, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dayChip,
                    selectedDay === i && styles.dayChipActive,
                  ]}
                  onPress={() => setSelectedDay(i)}
                >
                  <Text
                    style={[
                      styles.dayName,
                      selectedDay === i && styles.dayNameActive,
                    ]}
                  >
                    {d.day}
                  </Text>
                  <Text
                    style={[
                      styles.dayDate,
                      selectedDay === i && styles.dayDateActive,
                    ]}
                  >
                    {d.date}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.slotsGrid}>
              {TIME_SLOTS.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.slotChip,
                    selectedSlot === slot && styles.slotChipActive,
                  ]}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <Text
                    style={[
                      styles.slotText,
                      selectedSlot === slot && styles.slotTextActive,
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Book button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.bookBtn, !selectedSlot && styles.bookBtnDisabled]}
          onPress={() => {
            if (!selectedSlot) return;
            Alert.alert(
              "📅 Appointment Booking",
              `Book with ${profile.name} at ${selectedSlot} on ${SCHEDULE_DAYS[selectedDay].day} ${SCHEDULE_DAYS[selectedDay].date}?`,
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Confirm",
                  onPress: () =>
                    Alert.alert(
                      "✅ Booked!",
                      "Appointment booking feature coming soon.",
                    ),
                },
              ],
            );
          }}
        >
          <Text style={styles.bookBtnText}>
            📅 Book Appointment{selectedSlot ? ` — ${selectedSlot}` : ""}
          </Text>
        </TouchableOpacity>
        {!selectedSlot && (
          <Text style={styles.selectHint}>
            Select a time slot above to continue
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { marginTop: 12, fontSize: 15, color: "#94A3B8" },
  errorText: { fontSize: 15, color: "#DC2626", marginBottom: 12 },
  retryBtn: {
    backgroundColor: "#1E3A8A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  retryText: { color: "#fff", fontWeight: "600" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#1E3A8A",
  },
  backBtn: { padding: 4 },
  backArrow: { fontSize: 20, color: "#fff" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#fff" },
  hero: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarInitials: { fontSize: 32, fontWeight: "700", color: "#fff" },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  credentials: { fontSize: 14, color: "#475569", marginBottom: 2 },
  university: { fontSize: 12, color: "#94A3B8", marginBottom: 16 },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    width: "100%",
  },
  stat: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "700", color: "#1E3A8A" },
  statLabel: { fontSize: 11, color: "#94A3B8", marginTop: 2 },
  statDivider: { width: 1, backgroundColor: "#BFDBFE" },
  body: { paddingHorizontal: 16, paddingTop: 16 },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  infoIcon: { fontSize: 18 },
  infoTitle: { fontSize: 14, fontWeight: "600", color: "#1E293B", flex: 1 },
  infoSub: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  mapIcon: { fontSize: 16 },
  feeAmount: { fontSize: 18, fontWeight: "700", color: "#1E3A8A" },
  feeSub: { fontSize: 11, color: "#94A3B8" },
  section: { marginTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
  sectionSub: { fontSize: 12, color: "#94A3B8" },
  dayChip: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    marginRight: 8,
  },
  dayChipActive: { backgroundColor: "#1E3A8A", borderColor: "#1E3A8A" },
  dayName: { fontSize: 12, color: "#64748B", fontWeight: "500" },
  dayNameActive: { color: "#fff" },
  dayDate: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 2,
  },
  dayDateActive: { color: "#fff" },
  slotsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  slotChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  slotChipActive: { backgroundColor: "#1E3A8A", borderColor: "#1E3A8A" },
  slotText: { fontSize: 13, color: "#475569", fontWeight: "500" },
  slotTextActive: { color: "#fff" },
  footer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#E5E7EB",
  },
  bookBtn: {
    backgroundColor: "#1E3A8A",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  bookBtnDisabled: { backgroundColor: "#94A3B8" },
  bookBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  selectHint: {
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 6,
  },
});