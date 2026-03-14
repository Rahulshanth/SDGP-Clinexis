import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PatientStackParamList } from "../../navigation/PatientNavigator";

type Nav = NativeStackNavigationProp<PatientStackParamList, "FindDoctor">;

const DOCTORS = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 128,
    hospital: "Central Hospital",
    earliest: "Tomorrow, 10:00 AM",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Dr. Marcus Chen",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 85,
    hospital: "Wellness Plaza",
    earliest: "Today, 2:00 PM",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Dr. Elena Rodriguez",
    specialty: "Pediatrician",
    rating: 5.0,
    reviews: 204,
    hospital: "Children's Clinic",
    earliest: "Monday, 09:15 AM",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 156,
    hospital: "General Hospital",
    earliest: "Tomorrow, 09:00 AM",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const SPECIALIZATIONS = [
  "All",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Dermatology",
];

export default function FindDoctorScreen() {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [selectedRating, setSelectedRating] = useState("Any");
  const [visibleCount, setVisibleCount] = useState(3);

  const filtered = DOCTORS.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpec =
      selectedSpec === "All" ||
      d.specialty
        .toLowerCase()
        .includes(selectedSpec.toLowerCase().slice(0, 5));
    const matchRating =
      selectedRating === "Any" || d.rating >= parseFloat(selectedRating);
    return matchSearch && matchSpec && matchRating;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a Doctor</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or specialty..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
        >
          {SPECIALIZATIONS.map((s) => (
            <TouchableOpacity
              key={s}
              style={[
                styles.filterChip,
                selectedSpec === s && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpec(s)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedSpec === s && styles.filterChipTextActive,
                ]}
              >
                {s === "All" ? "⊞  Specialization" : s}
              </Text>
            </TouchableOpacity>
          ))}
          {["4.0+", "4.5+"].map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.filterChip,
                selectedRating === r && styles.filterChipActive,
              ]}
              onPress={() =>
                setSelectedRating(selectedRating === r ? "Any" : r)
              }
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedRating === r && styles.filterChipTextActive,
                ]}
              >
                ⭐ {r}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>📅 Available</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Doctor Cards */}
        {visible.map((doc) => (
          <View key={doc.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Image source={{ uri: doc.image }} style={styles.avatar} />
              <View style={styles.cardInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.doctorName}>{doc.name}</Text>
                  <Text style={styles.rating}>⭐ {doc.rating}</Text>
                </View>
                <Text style={styles.specialty}>{doc.specialty}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>⏱ {doc.reviews} reviews</Text>
                  <Text style={styles.dot}> • </Text>
                  <Text style={styles.metaText}>📍 {doc.hospital}</Text>
                </View>
              </View>
            </View>

            <View style={styles.availableBadge}>
              <Text style={styles.availableLabel}>EARLIEST AVAILABLE</Text>
              <Text style={styles.availableTime}>{doc.earliest}</Text>
            </View>

            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() =>
                navigation.navigate("DoctorProfile", { doctor: doc })
              }
            >
              <Text style={styles.viewBtnText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        ))}

        {visibleCount < filtered.length && (
          <TouchableOpacity
            style={styles.loadMore}
            onPress={() => setVisibleCount((v) => v + 3)}
          >
            <Text style={styles.loadMoreText}>Load More Results</Text>
          </TouchableOpacity>
        )}
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
  backBtn: { padding: 4, marginRight: 10 },
  backArrow: { fontSize: 20, color: "#fff" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#fff" },
  container: { flex: 1, paddingHorizontal: 16 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, height: 44, fontSize: 15, color: "#1E293B" },
  filterRow: { marginBottom: 16 },
  filterChip: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: "#EFF6FF", borderColor: "#1E3A8A" },
  filterChipText: { fontSize: 13, color: "#64748B", fontWeight: "500" },
  filterChipTextActive: { color: "#1E3A8A" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTop: { flexDirection: "row", marginBottom: 12 },
  avatar: { width: 72, height: 72, borderRadius: 12, marginRight: 12 },
  cardInfo: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctorName: { fontSize: 16, fontWeight: "700", color: "#1E293B", flex: 1 },
  rating: { fontSize: 13, fontWeight: "600", color: "#F59E0B" },
  specialty: {
    fontSize: 13,
    color: "#1E3A8A",
    fontWeight: "500",
    marginTop: 2,
  },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  metaText: { fontSize: 12, color: "#64748B" },
  dot: { color: "#CBD5E1", fontSize: 12 },
  availableBadge: {
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderStyle: "dashed",
  },
  availableLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#16A34A",
    letterSpacing: 0.5,
  },
  availableTime: {
    fontSize: 13,
    fontWeight: "600",
    color: "#15803D",
    marginTop: 2,
  },
  viewBtn: {
    backgroundColor: "#1E3A8A",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  viewBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  loadMore: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  loadMoreText: { fontSize: 15, color: "#475569", fontWeight: "600" },
});
