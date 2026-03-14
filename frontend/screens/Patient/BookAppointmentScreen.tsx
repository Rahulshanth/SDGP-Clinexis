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

  const [consultType, setConsultType] = useState<"Online" | "In-Person">(
    "Online",
  );
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState("09:30 AM");

  const fee = consultType === "Online" ? 85 : 75;

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
        {/* Consultation Type */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Consultation Type</Text>
            <Text style={styles.feeTag}>${fee}.00 • 30 min</Text>
          </View>
          <View style={styles.typeToggle}>
            {(["Online", "In-Person"] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.typeBtn,
                  consultType === t && styles.typeBtnActive,
                ]}
                onPress={() => setConsultType(t)}
              >
                <Text style={styles.typeIcon}>
                  {t === "Online" ? "💻" : "🏥"}
                </Text>
                <Text
                  style={[
                    styles.typeBtnText,
                    consultType === t && styles.typeBtnTextActive,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Calendar */}
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
          <Text style={styles.monthLabel}>October 2023</Text>

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

        {/* Time Slots */}
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

        {/* Payment */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentCard}>
            <Text style={styles.cardIcon}>💳</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardNumber}>Visa •••• 4242</Text>
              <Text style={styles.cardExpiry}>Expires 12/26</Text>
            </View>
            <View style={styles.selectedDot} />
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalAmount}>${fee}.00</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.totalLabel}>Oct {selectedDate}, 2023</Text>
            <Text style={styles.totalTime}>{selectedTime}</Text>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() =>
            navigation.navigate("AppointmentConfirm", {
              doctor,
              date: `Oct ${selectedDate}, 2023`,
              time: selectedTime,
              consultType,
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
  typeToggle: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
  },
  typeBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  typeBtnActive: { backgroundColor: "#fff" },
  typeIcon: { fontSize: 16 },
  typeBtnText: { fontSize: 14, fontWeight: "600", color: "#94A3B8" },
  typeBtnTextActive: { color: "#1E3A8A" },
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
  editLink: { fontSize: 13, color: "#1E3A8A", fontWeight: "600" },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  cardIcon: { fontSize: 22 },
  cardNumber: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
  cardExpiry: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  selectedDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#1E3A8A",
    borderWidth: 2,
    borderColor: "#1E3A8A",
  },
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
