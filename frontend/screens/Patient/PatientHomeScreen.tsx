import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchConsultations } from "../../store/consultationSlice";
import {
  fetchDoctorsBySpecialization,
  clearDoctors,
} from "../../store/doctorSlice";

import ConsultationCard from "../../components/features/ConsultationCard/ConsultationCard";

export default function PatientHomeScreen() {
  const dispatch = useAppDispatch();

  const { consultations } = useAppSelector((state) => state.consultation);
  const { doctors, loading } = useAppSelector((state) => state.doctor);

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, [dispatch]);

  const handleSearch = (text: string) => {
    setSearchText(text);

    if (!text.trim()) {
      setIsSearching(false);
      dispatch(clearDoctors());
      return;
    }

    setIsSearching(true);
    dispatch(fetchDoctorsBySpecialization(text));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statBlue]}>
            <Ionicons name="calendar-outline" size={18} color="#2563eb" />
            <Text style={styles.statNumber}>{consultations.length}</Text>
            <Text style={styles.statLabel}>Appointments</Text>
          </View>

          <View style={[styles.statCard, styles.statGreen]}>
            <Ionicons name="medkit-outline" size={18} color="#16a34a" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Prescriptions</Text>
          </View>

          <View style={[styles.statCard, styles.statPurple]}>
            <Ionicons name="notifications-outline" size={18} color="#7c3aed" />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Reminders</Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors..."
            placeholderTextColor="#94a3b8"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        {/* CONTENT */}
        {isSearching ? (
          <View>
            <Text style={styles.sectionTitle}>Doctors</Text>

            {loading && <ActivityIndicator size="large" color="#3b82f6" />}

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
                <View style={styles.card}>
                  
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.doctorName}>
                        {item.profile?.name || "Doctor"}
                      </Text>
                      <Text style={styles.doctorSpec}>
                        {item.profile?.specialization || "Specialist"}
                      </Text>
                    </View>

                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>Book</Text>
                    </TouchableOpacity>
                  </View>

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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },

  /* STATS */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
  },

  statBlue: {
    backgroundColor: "#eff6ff",
    borderColor: "#dbeafe",
  },

  statGreen: {
    backgroundColor: "#ecfdf5",
    borderColor: "#d1fae5",
  },

  statPurple: {
    backgroundColor: "#f5f3ff",
    borderColor: "#ede9fe",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 4,
  },

  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  /* SEARCH */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#1e293b",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },

  /* CARD */
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  doctorName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
  },

  doctorSpec: {
    fontSize: 13,
    color: "#3b82f6",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#94a3b8",
    fontSize: 14,
  },
});