<<<<<<< HEAD
// Rivithi and Nadithi when you are done with PatientProfileScreen uncomment line 21
=======
>>>>>>> a810a93 (Modified the Patient Home Screen Interface)
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
<<<<<<< HEAD
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
=======
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

>>>>>>> a810a93 (Modified the Patient Home Screen Interface)
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchConsultations } from "../../store/consultationSlice";
import {
  fetchDoctorsBySpecialization,
  clearDoctors,
} from "../../store/doctorSlice";
<<<<<<< HEAD
import ConsultationCard from "../../components/features/ConsultationCard/ConsultationCard";
import { PatientStackParamList } from "../../navigation/PatientNavigator";
//import PatientProfileScreen from "./PatientProfileScreen"; <-- After create the Profile screen consider this
=======

import ConsultationCard from "../../components/features/ConsultationCard/ConsultationCard";
>>>>>>> a810a93 (Modified the Patient Home Screen Interface)

// ── Vidu added navigation type ────────────────────────────────────────────────
type Nav = NativeStackNavigationProp<PatientStackParamList>;

// ── From develop — color constants ────────────────────────────────────────────
const COLORS = {
  primary: "#2EA7FF",
  background: "#F5F7FB",
  white: "#FFFFFF",
  text: "#1E2A3A",
  subtext: "#8A94A6",
<<<<<<< HEAD
  border: "#E8EEF5",
};

const PatientHomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Nav>();
  const { consultations } = useAppSelector((state) => state.consultation);
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);
=======
};

export default function PatientHomeScreen() {
  const dispatch = useAppDispatch();

  const { consultations } = useAppSelector((state) => state.consultation);
  const { doctors, loading } = useAppSelector((state) => state.doctor);
>>>>>>> a810a93 (Modified the Patient Home Screen Interface)

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchConsultations());
<<<<<<< HEAD
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim().length === 0) {
      // If search bar is cleared, go back to consultations view
=======
  }, [dispatch]);

  const handleSearch = (text: string) => {
    setSearchText(text);

    if (!text.trim()) {
>>>>>>> a810a93 (Modified the Patient Home Screen Interface)
      setIsSearching(false);
      dispatch(clearDoctors());
      return;
    }

    setIsSearching(true);
    dispatch(fetchDoctorsBySpecialization(text));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <LinearGradient
        colors={["#1E3A8A", "#2EA7FF"]}
        style={styles.headerGradient}
      >
<<<<<<< HEAD
        {/* ── From develop — Header ── */}
=======
>>>>>>> a810a93 (Modified the Patient Home Screen Interface)
        <View style={styles.header}>
          <View>
            <Text style={styles.subtitle}>Welcome</Text>
            <Text style={styles.name}>Patient</Text>
          </View>

          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=32" }}
            style={styles.avatar}
          />
        </View>
      </LinearGradient>

<<<<<<< HEAD
        {/* ── From develop — Top card ── */}
        <View style={styles.topCard}>
          <Text style={styles.topCardTitle}>Find Your Doctor</Text>
          <Text style={styles.topCardText}>
            Search doctors by specialization and manage your consultations.
          </Text>
        </View>

        {/* ── From develop — Action buttons ── */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>🎙️ Start New Recording</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            📋 View My Consultations
          </Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search doctors by specialization..."
          placeholderTextColor="#9AA4B2"
          value={searchText}
          onChangeText={handleSearch}
        />

        {/* While searching — show doctor results */}
        {isSearching ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Doctors Found</Text>

            {loading && (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {!loading && doctors.length === 0 && (
              <Text style={styles.emptyText}>
                No doctors found for "{searchText}"
              </Text>
            )}

            {/* ── Vidu — navigation to DoctorProfile ── */}
            <FlatList
              data={doctors}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DoctorProfile", {
                      doctor: {
                        id: item._id,
                        name: item.profile.name,
                        specialty: item.profile.specialization,
                        hospital: item.profile.hospitalName,
                        image: "",
                        rating: 0,
                        reviews: 0,
                        earliest: "",
                      },
                    })
                  }
                >
                  <View style={styles.doctorCard}>
                    <Text style={styles.doctorName}>
                      {item.profile?.name || "Doctor"}
                    </Text>
                    <Text style={styles.doctorSpec}>
                      {item.profile?.specialization || "Specialist"}
                    </Text>
                    <Text style={styles.doctorInfo}>
                      {item.profile?.hospitalName || "Hospital"}
                    </Text>
                    <Text style={styles.doctorInfo}>
                      {item.profile?.phoneNumber || ""}
                    </Text>
                    <Text style={styles.viewProfile}>View Profile →</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          /* Not searching — show consultations */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Consultations</Text>
            {/* ── Vidu — ConsultationCard with Create Reminder ── */}
            {consultations.map((consult) => (
              <ConsultationCard
                key={consult._id}
                consultationId={consult._id}
                paragraphs={consult.conversationParagraphs}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ── From develop — nice styles ────────────────────────────────────────────
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  contentContainer: { paddingTop: 16, paddingBottom: 24 },
=======
      {/* MAIN CARD */}
      <View style={styles.mainCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* STATS */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{consultations.length}</Text>
              <Text style={styles.statLabel}>Appointments</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Prescriptions</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Reminders</Text>
            </View>
          </View>

          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={18} color="#9AA4B2" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors by specialization"
              placeholderTextColor="#9AA4B2"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>

          {/* CONTENT */}
          {isSearching ? (
            <View>
              <Text style={styles.sectionTitle}>Doctors</Text>

              {loading && <ActivityIndicator size="large" color={COLORS.primary} />}

              {!loading && doctors.length === 0 && (
                <Text style={styles.emptyText}>
                  {`No doctors found for "${searchText}"`}
                </Text>
              )}

              <FlatList
                data={doctors}
                keyExtractor={(item) => item._id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.doctorCard}>
                    <View>
                      <Text style={styles.doctorName}>
                        {item.profile?.name || "Doctor"}
                      </Text>
                      <Text style={styles.doctorSpec}>
                        {item.profile?.specialization || "Specialist"}
                      </Text>
                    </View>

                    <TouchableOpacity style={styles.bookBtn}>
                      <Text style={styles.bookText}>Book</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.sectionTitle}>Consultations</Text>

              {consultations.length > 0 ? (
                consultations.map((c) => (
                  <ConsultationCard key={c._id} consultation={c} />
                ))
              ) : (
                <Text style={styles.emptyText}>
                  No consultations available
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1E3A8A",
  },

  headerGradient: {
    padding: 20,
    paddingBottom: 50,
  },

>>>>>>> a810a93 (Modified the Patient Home Screen Interface)
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
<<<<<<< HEAD
    marginBottom: 20,
  },
  greeting: { fontSize: 14, color: COLORS.subtext },
  name: { fontSize: 24, fontWeight: "700", color: COLORS.text, marginTop: 4 },
  avatar: { width: 58, height: 58, borderRadius: 29 },
  topCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  topCardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  topCardText: { color: "#EAF6FF", fontSize: 13, lineHeight: 20 },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    backgroundColor: COLORS.white,
    fontSize: 15,
    color: COLORS.text,
  },
  section: { flex: 1 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.text,
  },
  doctorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  doctorName: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  doctorSpec: { fontSize: 14, color: COLORS.primary, marginTop: 4 },
  doctorInfo: { fontSize: 13, color: COLORS.subtext, marginTop: 4 },
  errorText: { color: "red", textAlign: "center", marginTop: 10 },
  emptyText: {
    color: COLORS.subtext,
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  // ── Vidu added ────────────────────────────────────────────────────────────
  viewProfile: {
    fontSize: 13,
    color: "#1E3A8A",
    fontWeight: "600",
    marginTop: 6,
  },
});

export default PatientHomeScreen;
=======
  },

  subtitle: {
    color: "#DCEBFF",
    fontSize: 13,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 4,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  mainCard: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -20,
    padding: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 5,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 2,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E2A3A",
  },

  statLabel: {
    fontSize: 12,
    color: "#8A94A6",
    marginTop: 4,
  },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 1,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#1E2A3A",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1E2A3A",
  },

  doctorCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },

  doctorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2A3A",
  },

  doctorSpec: {
    fontSize: 12,
    color: "#2EA7FF",
    marginTop: 4,
  },

  bookBtn: {
    backgroundColor: "#2EA7FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: "center",
  },

  bookText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#8A94A6",
    fontSize: 13,
  },
});
>>>>>>> a810a93 (Modified the Patient Home Screen Interface)
