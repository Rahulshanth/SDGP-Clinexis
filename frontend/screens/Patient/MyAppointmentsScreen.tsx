import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PatientStackParamList } from "../../navigation/PatientNavigator";

type Nav = NativeStackNavigationProp<PatientStackParamList, "MyAppointments">;
type AppointmentStatus = "Confirmed" | "Pending" | "Cancelled";

interface Appointment {
  id: string;
  doctor: { name: string; specialty: string; hospital: string; image: string };
  date: string;
  time: string;
  status: AppointmentStatus;
  isNext?: boolean;
}

const UPCOMING: Appointment[] = [
  {
    id: "a1",
    doctor: {
      name: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      hospital: "City Heart Center",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    date: "Oct 24, 2023",
    time: "10:30 AM",
    status: "Confirmed",
    isNext: true,
  },
  {
    id: "a2",
    doctor: {
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      hospital: "Skin Care Lab",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "Nov 02, 2023",
    time: "02:15 PM",
    status: "Pending",
  },
  {
    id: "a3",
    doctor: {
      name: "Dr. Emily Watts",
      specialty: "General Practitioner",
      hospital: "City Clinic",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    date: "Nov 15, 2023",
    time: "09:00 AM",
    status: "Confirmed",
  },
];

const PAST: Appointment[] = [
  {
    id: "p1",
    doctor: {
      name: "Dr. James Wilson",
      specialty: "Cardiologist",
      hospital: "General Hospital",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    date: "Sep 10, 2023",
    time: "11:00 AM",
    status: "Confirmed",
  },
  {
    id: "p2",
    doctor: {
      name: "Dr. Lisa Park",
      specialty: "Neurologist",
      hospital: "Wellness Plaza",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
    },
    date: "Aug 22, 2023",
    time: "03:30 PM",
    status: "Confirmed",
  },
];

const STATUS_STYLE: Record<AppointmentStatus, { bg: string; text: string }> = {
  Confirmed: { bg: "#F0FDF4", text: "#16A34A" },
  Pending: { bg: "#FFF7ED", text: "#C2410C" },
  Cancelled: { bg: "#FEF2F2", text: "#DC2626" },
};

export default function MyAppointmentsScreen() {
  const navigation = useNavigation<Nav>();
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");

  const nextAppt = UPCOMING.find((a) => a.isNext);
  const otherAppts = UPCOMING.filter((a) => !a.isNext);

  const handleCancel = (id: string) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "Keep It", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => console.log("Cancelled", id),
        },
      ],
    );
  };

  const AppointmentCard = ({
    item,
    isNext = false,
  }: {
    item: Appointment;
    isNext?: boolean;
  }) => (
    <View style={[styles.card, isNext && styles.cardHighlighted]}>
      <View style={styles.cardTop}>
        <Image source={{ uri: item.doctor.image }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.doctorName} numberOfLines={1}>
              {item.doctor.name}
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: STATUS_STYLE[item.status].bg },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: STATUS_STYLE[item.status].text },
                ]}
              >
                • {item.status}
              </Text>
            </View>
          </View>
          <Text style={styles.specialty}>
            {item.doctor.specialty} • {item.doctor.hospital}
          </Text>
        </View>
      </View>

      <View style={styles.dateRow}>
        <View style={styles.dateChip}>
          <Text style={styles.dateIcon}>📅</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.dateChip}>
          <Text style={styles.dateIcon}>⏰</Text>
          <Text style={styles.dateText}>{item.time}</Text>
        </View>
      </View>

      {tab === "Upcoming" && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.rescheduleBtn}
            onPress={() =>
              navigation.navigate("BookAppointment", {
                doctor: item.doctor,
                selectedSlot: item.time,
                selectedDay: item.date,
              })
            }
          >
            <Text style={styles.rescheduleBtnText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => handleCancel(item.id)}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appointments</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(["Upcoming", "Past"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t} ({t === "Upcoming" ? UPCOMING.length : PAST.length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {tab === "Upcoming" ? (
          <>
            {nextAppt && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Next Scheduled Visit</Text>
                  <View style={styles.nextUpBadge}>
                    <Text style={styles.nextUpText}>Next Up</Text>
                  </View>
                </View>
                <AppointmentCard item={nextAppt} isNext />
              </View>
            )}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Other Appointments</Text>
              {otherAppts.map((item) => (
                <AppointmentCard key={item.id} item={item} />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Past Appointments</Text>
            {PAST.map((item) => (
              <AppointmentCard key={item.id} item={item} />
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.bookNewBtn}
          onPress={() => navigation.navigate("FindDoctor")}
        >
          <Text style={styles.bookNewBtnText}>+ Book New Appointment</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1E3A8A",
  },
  backBtn: { padding: 4, marginRight: 8 },
  backArrow: { fontSize: 20, color: "#fff" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#fff" },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: { borderBottomColor: "#1E3A8A" },
  tabText: { fontSize: 15, fontWeight: "600", color: "#94A3B8" },
  tabTextActive: { color: "#1E3A8A" },
  scroll: { flex: 1 },
  sectionBlock: { paddingHorizontal: 16, marginTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  nextUpBadge: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  nextUpText: { fontSize: 12, fontWeight: "600", color: "#1E3A8A" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHighlighted: { borderColor: "#BFDBFE", borderWidth: 1.5 },
  cardTop: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, marginRight: 12 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
    marginRight: 8,
  },
  specialty: { fontSize: 12, color: "#64748B" },
  statusBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: 11, fontWeight: "700" },
  dateRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#F1F5F9",
  },
  dateChip: { flexDirection: "row", alignItems: "center", gap: 4 },
  dateIcon: { fontSize: 13 },
  dateText: { fontSize: 13, color: "#475569", fontWeight: "500" },
  actionRow: { flexDirection: "row", gap: 8 },
  rescheduleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
  },
  rescheduleBtnText: { fontSize: 13, fontWeight: "600", color: "#1E3A8A" },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
  },
  cancelBtnText: { fontSize: 13, fontWeight: "600", color: "#DC2626" },
  bookNewBtn: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  bookNewBtnText: { fontSize: 15, fontWeight: "700", color: "#1E3A8A" },
});
