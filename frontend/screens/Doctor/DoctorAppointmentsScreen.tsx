//edited by vidu
/*
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

type AppointmentType = "IN-PERSON" | "VIDEO";
type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface DoctorAppointment {
  id: string;
  patientName: string;
  reason: string;
  specialty: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  image?: string;
  initials?: string;
}

const APPOINTMENTS: DoctorAppointment[] = [
  {
    id: "1",
    patientName: "John Smith",
    reason: "Follow-up",
    specialty: "Cardiology",
    time: "10:00 AM",
    type: "IN-PERSON",
    status: "upcoming",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    patientName: "Sarah Connor",
    reason: "Checkup",
    specialty: "Pediatrics",
    time: "11:30 AM",
    type: "VIDEO",
    status: "upcoming",
    initials: "SC",
  },
  {
    id: "3",
    patientName: "Emily Rose",
    reason: "Consultation",
    specialty: "General",
    time: "02:15 PM",
    type: "IN-PERSON",
    status: "upcoming",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "4",
    patientName: "Michael Brown",
    reason: "Follow-up",
    specialty: "Cardiology",
    time: "03:30 PM",
    type: "IN-PERSON",
    status: "upcoming",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const COMPLETED: DoctorAppointment[] = [
  {
    id: "c1",
    patientName: "Alice Wong",
    reason: "Routine Check",
    specialty: "General",
    time: "09:00 AM",
    type: "IN-PERSON",
    status: "completed",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

const WEEK_DAYS = [
  { day: "Mon", date: 11 },
  { day: "Tue", date: 12 },
  { day: "Wed", date: 13 },
  { day: "Thu", date: 14 },
  { day: "Fri", date: 15 },
  { day: "Sat", date: 16 },
];

export default function DoctorAppointmentsScreen() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [tab, setTab] = useState<"Upcoming" | "Completed" | "Cancelled">(
    "Upcoming",
  );
  const [appointments, setAppointments] = useState(APPOINTMENTS);

  const handleMarkCompleted = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "completed" as AppointmentStatus } : a,
      ),
    );
  };

  const upcomingList = appointments.filter((a) => a.status === "upcoming");
  const completedList = [
    ...COMPLETED,
    ...appointments.filter((a) => a.status === "completed"),
  ];
  const cancelledList: DoctorAppointment[] = [];

  const currentList =
    tab === "Upcoming"
      ? upcomingList
      : tab === "Completed"
        ? completedList
        : cancelledList;

  // Group upcoming by time with lunch break
  const morningAppts = upcomingList.filter((a) => {
    const hour = parseInt(a.time.split(":")[0]);
    const isPM = a.time.includes("PM");
    return !isPM || hour === 12;
  });
  const afternoonAppts = upcomingList.filter((a) => {
    const hour = parseInt(a.time.split(":")[0]);
    const isPM = a.time.includes("PM");
    return isPM && hour !== 12;
  });

  const AppointmentCard = ({ item }: { item: DoctorAppointment }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarInitials}>
              <Text style={styles.initialsText}>{item.initials}</Text>
            </View>
          )}
          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.patientName}>{item.patientName}</Text>
              <View
                style={[
                  styles.typeBadge,
                  item.type === "VIDEO"
                    ? styles.typeBadgeVideo
                    : styles.typeBadgeInPerson,
                ]}
              >
                <Text
                  style={[
                    styles.typeText,
                    item.type === "VIDEO"
                      ? styles.typeTextVideo
                      : styles.typeTextInPerson,
                  ]}
                >
                  {item.type}
                </Text>
              </View>
            </View>
            <Text style={styles.reason}>
              {item.reason} • {item.specialty}
            </Text>
          </View>
        </View>

        {item.status === "upcoming" && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.markBtn}
              onPress={() => handleMarkCompleted(item.id)}
            >
              <Text style={styles.markBtnText}>✓ Mark Completed</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === "completed" && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✓ Completed</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      // Header 

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Appointments</Text>
          <Text style={styles.headerSub}>Dr. Sarah Wilson</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.headerAvatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        // Month + Calendar 

        <View style={styles.calendarSection}>
          <View style={styles.monthRow}>
            <Text style={styles.monthText}>September 2025</Text>
            <View style={styles.viewToggle}>
              <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>≡</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.viewBtn, styles.viewBtnActive]}>
                <Text style={[styles.viewBtnText, styles.viewBtnTextActive]}>
                  ⊞
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.weekRow}
          >
            {WEEK_DAYS.map((d, i) => (
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
                {i === 1 && <View style={styles.dotIndicator} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        // Tabs 

        <View style={styles.tabRow}>
          {(["Upcoming", "Completed", "Cancelled"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.tabActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t}{" "}
                {t === "Upcoming"
                  ? upcomingList.length
                  : t === "Completed"
                    ? completedList.length
                    : 0}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        // Appointments List 

        <View style={styles.listContainer}>
          {tab === "Upcoming" ? (
            <>
              <Text style={styles.scheduleLabel}>TODAY'S SCHEDULE</Text>

              {morningAppts.map((item) => (
                <AppointmentCard key={item.id} item={item} />
              ))}

              {afternoonAppts.length > 0 && (
                <>
                  <View style={styles.lunchBreak}>
                    <View style={styles.lunchLine} />
                    <Text style={styles.lunchText}>LUNCH BREAK</Text>
                    <View style={styles.lunchLine} />
                  </View>
                  {afternoonAppts.map((item) => (
                    <AppointmentCard key={item.id} item={item} />
                  ))}
                </>
              )}

              {upcomingList.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No upcoming appointments</Text>
                </View>
              )}
            </>
          ) : (
            <>
              {currentList.map((item) => (
                <AppointmentCard key={item.id} item={item} />
              ))}
              {currentList.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>
                    No {tab.toLowerCase()} appointments
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  headerSub: { fontSize: 13, color: "#64748B", marginTop: 2 },
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 18 },
  headerAvatar: { width: 38, height: 38, borderRadius: 19 },
  calendarSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthText: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    padding: 2,
  },
  viewBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  viewBtnActive: { backgroundColor: "#fff" },
  viewBtnText: { fontSize: 16, color: "#94A3B8" },
  viewBtnTextActive: { color: "#1E3A8A" },
  weekRow: { flexDirection: "row" },
  dayChip: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: "#F8FAFC",
    minWidth: 52,
  },
  dayChipActive: { backgroundColor: "#1E3A8A" },
  dayName: { fontSize: 12, color: "#64748B", fontWeight: "500" },
  dayNameActive: { color: "#fff" },
  dayDate: { fontSize: 20, fontWeight: "700", color: "#1E293B", marginTop: 2 },
  dayDateActive: { color: "#fff" },
  dotIndicator: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
    marginTop: 4,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: { borderBottomColor: "#1E3A8A" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#94A3B8" },
  tabTextActive: { color: "#1E3A8A" },
  listContainer: { paddingHorizontal: 20, paddingTop: 16 },
  scheduleLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLeft: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 64,
  },
  cardTime: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
  },
  cardBody: { flex: 1, padding: 14 },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  avatarInitials: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: { fontSize: 15, fontWeight: "700", color: "#1E3A8A" },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  patientName: { fontSize: 15, fontWeight: "700", color: "#0F172A", flex: 1 },
  reason: { fontSize: 12, color: "#64748B" },
  typeBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  typeBadgeInPerson: { backgroundColor: "#F0FDF4" },
  typeBadgeVideo: { backgroundColor: "#EFF6FF" },
  typeText: { fontSize: 10, fontWeight: "700" },
  typeTextInPerson: { color: "#16A34A" },
  typeTextVideo: { color: "#1E3A8A" },
  actionRow: { flexDirection: "row", gap: 8 },
  markBtn: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  markBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  calendarBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarBtnText: { fontSize: 18 },
  completedBadge: {
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  completedText: { fontSize: 13, fontWeight: "600", color: "#16A34A" },
  lunchBreak: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    gap: 8,
  },
  lunchLine: { flex: 1, height: 0.5, backgroundColor: "#E5E7EB" },
  lunchText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  emptyState: { alignItems: "center", paddingVertical: 40 },
  emptyText: { fontSize: 15, color: "#94A3B8" },
});
*/
