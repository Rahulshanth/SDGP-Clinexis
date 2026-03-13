import React from "react";
import PharmacyBottomNav from "../../components/PharmacyBottomNav";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PatientsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.mainContainer, { paddingTop: Math.max(insets.top, 10) }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 120) }}
        style={styles.container}
      >
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Patients</Text>
            <Text style={styles.subtitle}>50 total registered</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={22} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* ================= SEARCH BAR ================= */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#94a3b8" />
          <TextInput
            placeholder="Search patients..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <Ionicons name="options-outline" size={22} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* ================= SECTION HEADER ================= */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Ordered</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* ================= PATIENT LIST ================= */}
        <View style={styles.listContainer}>
          <View>
            <PatientCard
              initials="JD"
              name="Jane Doe"
              date="Oct 24, 2023"
              status="ACTIVE"
              statusColor="#10b981"
            />
          </View>

          <View>
            <PatientCard
              initials="MS"
              name="Michael Smith"
              date="Oct 22, 2023"
              status="REFILL DUE"
              statusColor="#0ea5e9"
            />
          </View>

          <View>
            <PatientCard
              initials="RW"
              name="Robert Wilson"
              date="Oct 20, 2023"
            />
          </View>

          <View>
            <PatientCard
              initials="AL"
              name="Alice Lawson"
              date="Oct 15, 2023"
            />
          </View>
        </View>

      </ScrollView>
      <PharmacyBottomNav activeTab="Patients" />
    </View>
  );
}

// ================= PATIENT CARD COMPONENT =================

function PatientCard({ initials, name, date, status, statusColor }: any) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.patientInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>Last order: {date}</Text>
        </View>

        {status && (
          <View style={[styles.statusBadge, { backgroundColor: statusColor ? `${statusColor}15` : '#f1f5f9' }]}>
            <Text style={[styles.statusText, { color: statusColor || '#64748b' }]}>{status}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.historyBtn} activeOpacity={0.7}>
        <Text style={styles.historyText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
  notificationBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },
  seeAll: {
    color: "#0ea5e9",
    fontWeight: "700",
    fontSize: 14,
  },
  listContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#0ea5e9",
    fontWeight: "800",
    fontSize: 16,
  },
  patientInfo: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "800",
    fontSize: 16,
    color: "#0f172a",
    marginBottom: 4,
  },
  date: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  historyBtn: {
    backgroundColor: "#f0f9ff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  historyText: {
    color: "#0ea5e9",
    fontWeight: "700",
    fontSize: 14,
  }
});