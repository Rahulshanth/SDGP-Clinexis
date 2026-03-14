import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PatientStackParamList } from "../../navigation/PatientNavigator";

type Nav = NativeStackNavigationProp<PatientStackParamList, "DoctorProfile">;
type Route = RouteProp<PatientStackParamList, "DoctorProfile">;

const SCHEDULE_DAYS = [
  { day: "Mon", date: 18 },
  { day: "Tue", date: 19 },
  { day: "Wed", date: 20 },
  { day: "Thu", date: 21 },
  { day: "Fri", date: 22 },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

const REVIEWS = [
  {
    initials: "SK",
    name: "Sarah K.",
    rating: 5,
    text: "Dr. Wilson was incredibly thorough and patient with all my questions. Highly recommend!",
  },
  {
    initials: "MR",
    name: "Michael R.",
    rating: 4,
    text: "Great experience, very professional staff and clinic.",
  },
];

export default function DoctorProfileScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { doctor } = route.params;

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
        <TouchableOpacity>
          <Text style={styles.shareIcon}>⬆</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: doctor.image }} style={styles.avatar} />
            <View style={styles.verifiedBadge}>
              <Text style={{ fontSize: 10, color: "#fff" }}>✓</Text>
            </View>
          </View>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.credentials}>{doctor.specialty} • MBBS, MD</Text>
          <Text style={styles.university}>Medical University of New York</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>10+</Text>
              <Text style={styles.statLabel}>Years Exp</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{doctor.rating}</Text>
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
          {/* Hospital */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🏥</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>{doctor.hospital}</Text>
              <Text style={styles.infoSub}>City Center, 5th Avenue, NY</Text>
            </View>
            <Text style={styles.mapIcon}>🗺</Text>
          </View>

          {/* Fee */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💳</Text>
            <Text style={styles.infoTitle}>Consultation Fee</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.feeAmount}>$50</Text>
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

          {/* Reviews */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            {REVIEWS.map((r, i) => (
              <View key={i} style={styles.reviewCard}>
                <View style={styles.reviewTop}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewInitials}>{r.initials}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewName}>{r.name}</Text>
                    <Text style={{ fontSize: 12 }}>
                      {"⭐".repeat(r.rating)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.reviewText}>{r.text}</Text>
              </View>
            ))}
          </View>
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.bookBtn, !selectedSlot && styles.bookBtnDisabled]}
          onPress={() => {
            if (!selectedSlot) return;
            navigation.navigate("BookAppointment", {
              doctor,
              selectedSlot,
              selectedDay: `${SCHEDULE_DAYS[selectedDay].day} ${SCHEDULE_DAYS[selectedDay].date}`,
            });
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1E3A8A",
  },
  backBtn: { padding: 4 },
  backArrow: { fontSize: 20, color: "#fff" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#fff" },
  shareIcon: { fontSize: 18, color: "#fff" },
  hero: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },
  avatarWrapper: { position: "relative", marginBottom: 12 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#EFF6FF",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: { fontSize: 22, fontWeight: "700", color: "#0F172A", marginBottom: 4 },
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
  seeAll: { fontSize: 13, color: "#1E3A8A", fontWeight: "600" },
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
  dayDate: { fontSize: 18, fontWeight: "700", color: "#1E293B", marginTop: 2 },
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
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  reviewTop: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  reviewInitials: { fontSize: 13, fontWeight: "700", color: "#1E3A8A" },
  reviewName: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
  reviewText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
    fontStyle: "italic",
  },
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
