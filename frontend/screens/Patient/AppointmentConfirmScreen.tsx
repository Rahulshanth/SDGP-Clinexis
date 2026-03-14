import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PatientStackParamList } from "../../navigation/PatientNavigator";

type Nav = NativeStackNavigationProp<
  PatientStackParamList,
  "AppointmentConfirm"
>;
type Route = RouteProp<PatientStackParamList, "AppointmentConfirm">;

export default function AppointmentConfirmScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { doctor, date, time } = route.params;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 6,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.navigate("PatientHome")}
      >
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>

      <ScrollViewShim>
        {/* Success circle */}
        <Animated.View
          style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.successCheck}>✓</Text>
        </Animated.View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.successTitle}>Appointment Confirmed!</Text>
          <Text style={styles.successSub}>
            You're all set for your visit. We've sent a confirmation email to
            your inbox.
          </Text>

          {/* Confirmation card */}
          <View style={styles.confirmCard}>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapText}>📍 Map Preview</Text>
            </View>

            <View style={styles.visitInfo}>
              <Text style={styles.upcomingLabel}>UPCOMING VISIT</Text>

              <View style={styles.doctorRow}>
                <View style={styles.doctorAvatar}>
                  <Text style={styles.doctorAvatarText}>
                    {doctor.name.split(" ").slice(-1)[0][0]}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpec}>{doctor.specialty}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📅</Text>
                <Text style={styles.detailText}>{date}</Text>
                <Text style={styles.detailTime}>{time}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📍</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailText}>{doctor.hospital}</Text>
                  <Text style={styles.mapsLink}>Open in Maps ↗</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.calendarBtn}>
            <Text style={styles.calendarBtnText}>📅 Add to Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate("PatientHome")}
          >
            <Text style={styles.homeBtnText}>🏠 Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("MyAppointments")}
          >
            <Text style={styles.rescheduleLink}>
              Need to reschedule?{" "}
              <Text style={styles.rescheduleLinkBlue}>
                View my appointments
              </Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollViewShim>
    </SafeAreaView>
  );
}

// simple scroll wrapper
import { ScrollView } from "react-native";
const ScrollViewShim = ({ children }: { children: React.ReactNode }) => (
  <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  closeBtn: {
    position: "absolute",
    top: 52,
    left: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: { fontSize: 16, color: "#475569" },
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  successCheck: { fontSize: 36, color: "#fff", fontWeight: "700" },
  content: { alignItems: "center", width: "100%" },
  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  successSub: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  confirmCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    marginBottom: 20,
  },
  mapPlaceholder: {
    height: 100,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: { fontSize: 14, color: "#1E3A8A" },
  visitInfo: { padding: 16 },
  upcomingLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1E3A8A",
    letterSpacing: 1,
    marginBottom: 10,
  },
  doctorRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  doctorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  doctorAvatarText: { fontSize: 18, fontWeight: "700", color: "#1E3A8A" },
  doctorName: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  doctorSpec: { fontSize: 13, color: "#64748B", marginTop: 2 },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  detailIcon: { fontSize: 15, marginTop: 1 },
  detailText: { fontSize: 13, color: "#374151", fontWeight: "500", flex: 1 },
  detailTime: { fontSize: 13, color: "#64748B" },
  mapsLink: { fontSize: 12, color: "#1E3A8A", marginTop: 2 },
  calendarBtn: {
    width: "100%",
    backgroundColor: "#1E3A8A",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  calendarBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  homeBtn: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  homeBtnText: { color: "#475569", fontWeight: "600", fontSize: 15 },
  rescheduleLink: { fontSize: 13, color: "#94A3B8", textAlign: "center" },
  rescheduleLinkBlue: { color: "#1E3A8A", fontWeight: "600" },
});
