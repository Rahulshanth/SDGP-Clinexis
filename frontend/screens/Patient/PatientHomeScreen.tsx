// Rivithi and Nadithi when you are done with PatientProfileScreen uncomment line 21
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchConsultations } from "../../store/consultationSlice";
import { fetchDoctorsBySpecialization, clearDoctors } from "../../store/doctorSlice";
import ConsultationCard from "../../components/features/ConsultationCard/ConsultationCard";
import { PatientStackParamList } from "../../navigation/PatientNavigator";
//import PatientProfileScreen from "./PatientProfileScreen"; <-- After create the Profile screen consider this

// ── Vidu added navigation type ────────────────────────────────────────────────
type Nav = NativeStackNavigationProp<PatientStackParamList>;

// ── From develop — color constants ────────────────────────────────────────────
const COLORS = {
  primary: "#2EA7FF",
  background: "#F5F7FB",
  white: "#FFFFFF",
  text: "#1E2A3A",
  subtext: "#8A94A6",
  border: "#E8EEF5",
};

const PatientHomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Nav>();
  const { consultations } = useAppSelector((state) => state.consultation);
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim().length === 0) {
      // If search bar is cleared, go back to consultations view
      setIsSearching(false);
      dispatch(clearDoctors());
      return;
    }
    setIsSearching(true);
    dispatch(fetchDoctorsBySpecialization(text));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        {/* ── From develop — Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.name}>Patient</Text>
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=32" }}
            style={styles.avatar}
          />
        </View>

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
          <Text style={styles.secondaryButtonText}>📋 View My Consultations</Text>
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
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
  contentContainer: { paddingTop: 16, paddingBottom: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  secondaryButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: "600" },
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