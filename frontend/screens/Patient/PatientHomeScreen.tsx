import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList,
  StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView,
  SafeAreaView, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchDoctorsBySpecialization, clearDoctors } from '../../store/doctorSlice';

const COLORS = {
  primary: '#2EA7FF',
  background: '#F5F7FB',
  white: '#FFFFFF',
  text: '#1E2A3A',
  subtext: '#8A94A6',
  border: '#E8EEF5',
};

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.name}>Patient</Text>
          </View>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
            style={styles.avatar}
          />
        </View>

        {/* Top card */}
        <View style={styles.topCard}>
          <Text style={styles.topCardTitle}>Find Your Doctor</Text>
          <Text style={styles.topCardText}>
            Search doctors by specialization and manage your consultations.
          </Text>
        </View>

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
          placeholderTextColor="#9AA4B2"
          value={searchText}
          onChangeText={handleSearch}
        />

        {/* Doctor Search Results */}
        {isSearching && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Doctors Found</Text>
            {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {!loading && doctors.length === 0 && (
              <Text style={styles.emptyText}> {`No doctors found for "${searchText}"`}</Text>
            )}
            <FlatList
              data={doctors}
              keyExtractor={(item) => item._id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.doctorCard}>
                  <Text style={styles.doctorName}>{item.profile?.name || 'Doctor'}</Text>
                  <Text style={styles.doctorSpec}>{item.profile?.specialization || 'Specialist'}</Text>
                  <Text style={styles.doctorInfo}>{item.profile?.hospitalName || 'Hospital'}</Text>
                  <Text style={styles.doctorInfo}>{item.profile?.phoneNumber || ''}</Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientHomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
  contentContainer: { paddingTop: 16, paddingBottom: 24 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  greeting: { fontSize: 14, color: COLORS.subtext },
  name: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginTop: 4 },
  avatar: { width: 58, height: 58, borderRadius: 29 },
  topCard: {
    backgroundColor: COLORS.primary, borderRadius: 20,
    padding: 18, marginBottom: 18,
  },
  topCardTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  topCardText: { color: '#EAF6FF', fontSize: 13, lineHeight: 20 },
  primaryButton: {
    backgroundColor: COLORS.primary, borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 12,
  },
  primaryButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  secondaryButton: {
    backgroundColor: COLORS.white, borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: COLORS.primary,
  },
  secondaryButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  searchBar: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 14,
    padding: 14, marginBottom: 18, backgroundColor: COLORS.white,
    fontSize: 15, color: COLORS.text,
  },
  section: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: COLORS.text },
  doctorCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  doctorName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  doctorSpec: { fontSize: 14, color: COLORS.primary, marginTop: 4 },
  doctorInfo: { fontSize: 13, color: COLORS.subtext, marginTop: 4 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
  emptyText: { color: COLORS.subtext, textAlign: 'center', marginTop: 20, fontSize: 14 },
});