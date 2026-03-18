import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchConsultations } from '../../store/consultationSlice';
import { matchPharmaciesWithMedicines, PharmacyMatch } from '../../services/pharmacyMatchingApi';

export default function SharePrescriptionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { consultations } = useAppSelector((state) => state.consultation);
  const [medicines, setMedicines] = useState<string[]>([]);
  const [newMedicine, setNewMedicine] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PharmacyMatch[]>([]);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  const addMedicine = () => {
    if (newMedicine.trim()) {
      setMedicines([...medicines, newMedicine.trim()]);
      setNewMedicine('');
    }
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const searchPharmacies = async () => {
    if (medicines.length === 0) {
      Alert.alert('No Medicines', 'Please add at least one medicine to search');
      return;
    }

    setIsSearching(true);
    try {
      const response = await matchPharmaciesWithMedicines(medicines);
      setSearchResults(response.data);
      router.push({
        pathname: '/FindMedicines',
        params: { 
          medicines: JSON.stringify(medicines),
          results: JSON.stringify(response.data)
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to search pharmacies. Please try again.');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const renderConsultation = ({ item }: any) => (
    <TouchableOpacity style={styles.consultationCard}>
      <View style={styles.consultationIcon}>
        <Ionicons name="document-text" size={24} color="#2563eb" />
      </View>
      <View style={styles.consultationInfo}>
        <Text style={styles.consultationTitle}>Consultation #{item._id.slice(-6)}</Text>
        <Text style={styles.consultationDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.useButton}
        onPress={() => {
          const extractedMedicines = extractMedicinesFromConsultation(item);
          setMedicines([...medicines, ...extractedMedicines]);
        }}
      >
        <Text style={styles.useButtonText}>Use</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const extractMedicinesFromConsultation = (consultation: any): string[] => {
    const mockMedicines = ['Paracetamol', 'Amoxicillin', 'Vitamin C'];
    return mockMedicines;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share Prescription</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Add Medicines</Text>
          <Text style={styles.sectionSubtitle}>
            Enter medicines from your prescription
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter medicine name..."
              placeholderTextColor="#94a3b8"
              value={newMedicine}
              onChangeText={setNewMedicine}
              onSubmitEditing={addMedicine}
            />
            <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
              <Ionicons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {medicines.length > 0 && (
            <View style={styles.medicinesContainer}>
              {medicines.map((med, index) => (
                <View key={index} style={styles.medicineChip}>
                  <Text style={styles.medicineChipText}>💊 {med}</Text>
                  <TouchableOpacity onPress={() => removeMedicine(index)}>
                    <Ionicons name="close-circle" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.searchButton, medicines.length === 0 && styles.searchButtonDisabled]}
          onPress={searchPharmacies}
          disabled={medicines.length === 0 || isSearching}
        >
          {isSearching ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Ionicons name="search" size={20} color="#ffffff" />
              <Text style={styles.searchButtonText}>Find Pharmacies</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Recent Consultations</Text>
          <Text style={styles.sectionSubtitle}>
            Use medicines from your past consultations
          </Text>

          {consultations.length > 0 ? (
            <FlatList
              data={consultations.slice(0, 5)}
              keyExtractor={(item) => item._id}
              renderItem={renderConsultation}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyConsultations}>
              <Ionicons name="document-text-outline" size={48} color="#cbd5e1" />
              <Text style={styles.emptyText}>No consultations yet</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {medicines.length > 0 && (
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
          <View style={styles.medicineCount}>
            <Text style={styles.medicineCountText}>{medicines.length} medicine{medicines.length !== 1 ? 's' : ''} selected</Text>
          </View>
          <TouchableOpacity 
            style={styles.floatingSearchButton}
            onPress={searchPharmacies}
            disabled={isSearching}
          >
            {isSearching ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Ionicons name="search" size={20} color="#ffffff" />
                <Text style={styles.floatingSearchText}>Search Pharmacies</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicinesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  medicineChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  medicineChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2ECC71',
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  searchButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  consultationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  consultationIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consultationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  consultationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  consultationDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  useButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  useButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  emptyConsultations: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  medicineCount: {
    alignItems: 'center',
    marginBottom: 8,
  },
  medicineCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  floatingSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingSearchText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
