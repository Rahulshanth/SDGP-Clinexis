import React from "react";

// Import basic React Native UI components
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";

// Import icons from Expo vector icons
import { Ionicons } from "@expo/vector-icons";


// ================= MAIN SCREEN =================

export default function PatientsScreen() {

  return (

    // ScrollView allows the screen to scroll vertically
    <ScrollView style={styles.container}>


      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        {/* Left side title */}
        <View>
          <Text style={styles.title}>Patients</Text>
          <Text style={styles.subtitle}>50 total registered</Text>
        </View>

        {/* Notification bell button */}
        <TouchableOpacity style={styles.notification}>
          <Ionicons name="notifications-outline" size={22} color="#333" />
        </TouchableOpacity>

      </View>



      {/* ================= SEARCH BAR ================= */}

      <View style={styles.searchBox}>

        {/* Search icon */}
        <Ionicons name="search-outline" size={20} color="#9CA3AF" />

        {/* Input field for searching patients */}
        <TextInput
          placeholder="Search patients..."
          style={styles.searchInput}
        />

        {/* Filter icon */}
        <Ionicons name="options-outline" size={20} color="#9CA3AF" />

      </View>



      {/* ================= SECTION HEADER ================= */}

      <View style={styles.sectionHeader}>

        {/* Section title */}
        <Text style={styles.sectionTitle}>Recently Ordered</Text>

        {/* See all button */}
        <Text style={styles.seeAll}>See all</Text>

      </View>



      {/* ================= PATIENT LIST ================= */}

      {/* Patient Card Component */}
      <PatientCard
        initials="JD"
        name="Jane Doe"
        date="Oct 24, 2023"
        status="ACTIVE"
      />

      <PatientCard
        initials="MS"
        name="Michael Smith"
        date="Oct 22, 2023"
        status="REFILL DUE"
      />

      <PatientCard
        initials="RW"
        name="Robert Wilson"
        date="Oct 20, 2023"
      />

      <PatientCard
        initials="AL"
        name="Alice Lawson"
        date="Oct 15, 2023"
      />

    </ScrollView>
  );
}




// ================= PATIENT CARD COMPONENT =================

function PatientCard({ initials, name, date, status }: any) {

  return (

    // Main card container
    <View style={styles.card}>

      {/* Top part of the card */}
      <View style={styles.cardTop}>

        {/* Avatar circle with initials */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        {/* Patient details */}
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>Last order: {date}</Text>
        </View>

        {/* Status badge (only shown if status exists) */}
        {status && (
          <View style={styles.status}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )}

      </View>


      {/* View History Button */}
      <TouchableOpacity style={styles.historyBtn}>
        <Text style={styles.historyText}>View History</Text>
      </TouchableOpacity>

    </View>

  );
}




// ================= STYLES =================

const styles = StyleSheet.create({

  // Main screen container
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20
  },


  // Header layout
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },


  // Main page title
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827"
  },


  // Subtitle under title
  subtitle: {
    color: "#6B7280"
  },


  // Notification button style
  notification: {
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 50
  },


  // Search bar container
  searchBox: {
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },


  // Search text input
  searchInput: {
    flex: 1,
    marginHorizontal: 10
  },


  // Section header layout
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },


  // Section title text
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },


  // See all link
  seeAll: {
    color: "#2F80ED"
  },


  // Patient card container
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15
  },


  // Top section of patient card
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },


  // Avatar circle
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },


  // Avatar text (initials)
  avatarText: {
    color: "#2F80ED",
    fontWeight: "bold"
  },


  // Patient name
  name: {
    fontWeight: "bold",
    fontSize: 16
  },


  // Last order date
  date: {
    color: "#6B7280"
  },


  // Status badge container
  status: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },


  // Status badge text
  statusText: {
    color: "#059669",
    fontSize: 12,
    fontWeight: "600"
  },


  // View history button
  historyBtn: {
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center"
  },


  // View history button text
  historyText: {
    color: "#2F80ED",
    fontWeight: "600"
  }

});