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
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PatientStackParamList } from "../../navigation/PatientNavigator";

type Nav = NativeStackNavigationProp<PatientStackParamList, "BookAppointment">;
type Route = RouteProp<PatientStackParamList, "BookAppointment">;

const MORNING_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
];
const AFTERNOON_SLOTS = ["02:00 PM", "02:30 PM", "03:00 PM"];
const WEEK_DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const CALENDAR = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, null, null],
];

export default function BookAppointmentScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { doctor } = route.params;

  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState("09:30 AM");

  const fee = 75; // Fixed fee for in-person only

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        // Consultation Type — In Person Only 
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Consultation Type</Text>
            <Text style={styles.feeTag}>${fee}.00 • 30 min</Text>
          </View>
          <View style={styles.inPersonBadge}>
            <Text style={styles.inPersonIcon}>🏥</Text>
            <Text style={styles.inPersonText}>In-Person Only</Text>
          </View>
        </View>

        //Calendar 

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <View style={styles.monthNav}>
              <TouchableOpacity>
                <Text style={styles.navArrow}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.navArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.monthLabel}>April 2026</Text>

          <View style={styles.calendar}>
            <View style={styles.weekRow}>
              {WEEK_DAYS.map((d) => (
                <View key={d} style={styles.weekDayCell}>
                  <Text style={styles.weekDayText}>{d}</Text>
                </View>
              ))}
            </View>
            {CALENDAR.map((week, wi) => (
              <View key={wi} style={styles.weekRow}>
                {week.map((d, di) => {
                  const isSelected = d === selectedDate;
                  return (
                    <TouchableOpacity
                      key={di}
                      style={[
                        styles.dateCell,
                        isSelected && styles.dateCellActive,
                      ]}
                      onPress={() => d !== null && setSelectedDate(d)}
                      disabled={d === null}
                    >
                      <Text
                        style={[
                          styles.dateCellText,
                          isSelected && styles.dateCellTextActive,
                        ]}
                      >
                        {d ?? ""}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        // Time Slots 

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Time</Text>
          <Text style={styles.slotGroupLabel}>MORNING SLOTS</Text>
          <View style={styles.slotsGrid}>
            {MORNING_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slotChip,
                  selectedTime === slot && styles.slotChipActive,
                ]}
                onPress={() => setSelectedTime(slot)}
              >
                <Text
                  style={[
                    styles.slotText,
                    selectedTime === slot && styles.slotTextActive,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.slotGroupLabel}>AFTERNOON SLOTS</Text>
          <View style={styles.slotsGrid}>
            {AFTERNOON_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slotChip,
                  selectedTime === slot && styles.slotChipActive,
                ]}
                onPress={() => setSelectedTime(slot)}
              >
                <Text
                  style={[
                    styles.slotText,
                    selectedTime === slot && styles.slotTextActive,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        // Total 
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Consultation Fee</Text>
            <Text style={styles.totalAmount}>${fee}.00</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.totalLabel}>April {selectedDate}, 2026</Text>
            <Text style={styles.totalTime}>{selectedTime}</Text>
          </View>
        </View>

        // Note 
        <View style={styles.noteBox}>
          <Text style={styles.noteIcon}>ℹ️</Text>
          <Text style={styles.noteText}>
            Payment is made in person at the clinic on the day of your
            appointment.
          </Text>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() =>
            navigation.navigate("AppointmentConfirm", {
              doctor,
              date: `April ${selectedDate}, 2026`,
              time: selectedTime,
              consultType: "In-Person",
              fee: `${fee}`,
            })
          }
        >
          <Text style={styles.confirmBtnText}>Confirm Appointment →</Text>
        </TouchableOpacity>
      </View>
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
  scroll: { flex: 1, paddingHorizontal: 16 },
  section: { marginTop: 20 },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
  feeTag: { fontSize: 13, color: "#1E3A8A", fontWeight: "600" },
  inPersonBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    gap: 10,
  },
  inPersonIcon: { fontSize: 20 },
  inPersonText: { fontSize: 15, fontWeight: "700", color: "#1E3A8A" },
  monthNav: { flexDirection: "row", gap: 8 },
  navArrow: { fontSize: 20, color: "#475569", paddingHorizontal: 4 },
  monthLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 12,
    fontWeight: "500",
  },
  calendar: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  weekRow: { flexDirection: "row", marginBottom: 4 },
  weekDayCell: { flex: 1, alignItems: "center", paddingVertical: 6 },
  weekDayText: { fontSize: 11, fontWeight: "600", color: "#94A3B8" },
  dateCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    margin: 1,
  },
  dateCellActive: { backgroundColor: "#1E3A8A" },
  dateCellText: { fontSize: 14, fontWeight: "500", color: "#1E293B" },
  dateCellTextActive: { color: "#fff", fontWeight: "700" },
  slotGroupLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 12,
  },
  slotsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  slotChip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  slotChipActive: { backgroundColor: "#1E3A8A", borderColor: "#1E3A8A" },
  slotText: { fontSize: 13, color: "#475569", fontWeight: "500" },
  slotTextActive: { color: "#fff" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  totalLabel: { fontSize: 12, color: "#94A3B8", marginBottom: 4 },
  totalAmount: { fontSize: 26, fontWeight: "800", color: "#1E293B" },
  totalTime: { fontSize: 14, fontWeight: "600", color: "#1E3A8A" },
  noteBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    gap: 8,
  },
  noteIcon: { fontSize: 16 },
  noteText: { flex: 1, fontSize: 13, color: "#15803D", lineHeight: 18 },
  footer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#E5E7EB",
  },
  confirmBtn: {
    backgroundColor: "#1E3A8A",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
*/
