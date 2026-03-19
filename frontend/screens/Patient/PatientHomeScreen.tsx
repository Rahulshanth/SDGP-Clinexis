import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, FlatList,
  StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchDoctorsBySpecialization, clearDoctors } from '../../store/doctorSlice';

const PatientHomeScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim().length === 0) {
      setIsSearching(false);
      dispatch(clearDoctors());
      return;
    }
    setIsSearching(true);
    dispatch(fetchDoctorsBySpecialization(text));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome, Patient 👋</Text>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/voice-recorder' as any)}
      >
        <Text style={styles.primaryButtonText}>🎙️ Start New Recording</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/live-transcript' as any)}
      >
        <Text style={styles.secondaryButtonText}>📋 View My Consultations</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search doctors by specialization..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Doctor Search Results */}
      {isSearching && (
        <View>
          <Text style={styles.sectionTitle}>Doctors Found</Text>
          {loading && <ActivityIndicator size="large" color="#2563eb" />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {!loading && doctors.length === 0 && (
            <Text style={styles.emptyText}>No doctors found for "{searchText}"</Text>
          )}
          <FlatList
            data={doctors}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
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
      )}
    </ScrollView>
  );
};

export default PatientHomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 20 },
  primaryButton: {
    backgroundColor: '#2563eb', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 12,
  },
  primaryButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  secondaryButton: {
    backgroundColor: 'white', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: '#2563eb',
  },
  secondaryButtonText: { color: '#2563eb', fontSize: 16, fontWeight: '600' },
  searchBar: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 12, marginBottom: 16, backgroundColor: 'white', fontSize: 15,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  doctorCard: {
    backgroundColor: 'white', borderRadius: 10,
    padding: 16, marginBottom: 12, elevation: 2,
  },
  doctorName: { fontSize: 16, fontWeight: 'bold', color: '#1e3a5f' },
  doctorSpec: { fontSize: 14, color: '#2563eb', marginTop: 2 },
  doctorInfo: { fontSize: 13, color: '#666', marginTop: 2 },
  errorText: { color: 'red', textAlign: 'center' },
  emptyText: { color: '#999', textAlign: 'center', marginTop: 20 },
});





                            // Rivithi and Nadithi when you are done with PatientProfileScreen uncomment line 21


/*import React, { useEffect, useState } from 'react';
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

      
      <TextInput
        style={styles.searchBar}
        placeholder="Search doctors by specialization..."
        value={searchText}
        onChangeText={handleSearch}
      />

      
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

export default PatientHomeScreen;*/
