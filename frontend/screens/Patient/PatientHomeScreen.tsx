


                            // Rivithi and Nadithi when you are done with PatientProfileScreen uncomment line 21


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchConsultations } from '../../store/consultationSlice';
import { fetchDoctorsBySpecialization, clearDoctors } from '../../store/doctorSlice';
import ConsultationCard from '../../components/features/ConsultationCard/ConsultationCard';
//import PatientProfileScreen from "./PatientProfileScreen"; <-- After create the Profile screen consider this


const PatientHomeScreen = () => {
  const dispatch = useAppDispatch();
  const { consultations } = useAppSelector((state) => state.consultation);
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);

  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  // Fires when patient types in the search bar
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
    <View style={styles.container}>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search doctors by specialization..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* While searching — show doctor results */}
      {isSearching ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctors</Text>

          {loading && <ActivityIndicator size="large" color="#2563eb" />}

          {error && <Text style={styles.errorText}>{error}</Text>}

          {!loading && doctors.length === 0 && (
            <Text style={styles.emptyText}>No doctors found for "{searchText}"</Text>
          )}

          <FlatList
            data={doctors}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.doctorCard}>
                <Text style={styles.doctorName}>{item.profile.name}</Text>
                <Text style={styles.doctorSpec}>{item.profile.specialization}</Text>
                <Text style={styles.doctorInfo}>{item.profile.hospitalName}</Text>
                <Text style={styles.doctorInfo}>{item.profile.phoneNumber}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        /* Not searching — show consultations as before */
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Consultations</Text>
          {consultations.map((consult) => (
            <ConsultationCard key={consult._id} consultationId={consult._id} />
          ))}
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  searchBar: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 12, marginBottom: 16, backgroundColor: 'white',
    fontSize: 15,
  },
  section: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  doctorCard: {
    backgroundColor: 'white', borderRadius: 10,
    padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, elevation: 2,
  },
  doctorName: { fontSize: 16, fontWeight: 'bold', color: '#1e3a5f' },
  doctorSpec: { fontSize: 14, color: '#2563eb', marginTop: 2 },
  doctorInfo: { fontSize: 13, color: '#666', marginTop: 2 },
  errorText: { color: 'red', textAlign: 'center' },
  emptyText: { color: '#999', textAlign: 'center', marginTop: 20 },
});

export default PatientHomeScreen;
