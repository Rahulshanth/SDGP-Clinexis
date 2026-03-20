import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

interface Pharmacy {
  id: string;
  name: string;
  rating: number;
  distance: number;
  address: string;
  phone?: string;
  matchedMedicines: string[];
  missingMedicines: string[];
  price?: number;
  isAvailable: boolean;
}

const MOCK_PHARMACIES: Pharmacy[] = [
  {
    id: '1',
    name: 'HealthPlus Pharmacy',
    rating: 4.8,
    distance: 1.2,
    address: 'No 45, Main Street, Colombo 03',
    matchedMedicines: ['Panadol', 'Aspirin'],
    missingMedicines: ['Insulin'],
    price: 450,
    isAvailable: true,
  },
  {
    id: '2',
    name: 'MediCare Express',
    rating: 4.5,
    distance: 0.8,
    address: '2nd Floor, Unity Plaza, Colombo 04',
    matchedMedicines: ['Panadol', 'Insulin', 'Aspirin'],
    missingMedicines: [],
    price: 1200,
    isAvailable: true,
  },
  {
    id: '3',
    name: 'City Medicals',
    rating: 4.2,
    distance: 3.5,
    address: 'Galle Road, Dehiwala',
    matchedMedicines: ['Panadol'],
    missingMedicines: ['Aspirin', 'Insulin'],
    price: 120,
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Royal Pharma',
    rating: 4.9,
    distance: 2.1,
    address: 'Havelock Road, Colombo 05',
    matchedMedicines: ['Insulin'],
    missingMedicines: ['Panadol', 'Aspirin'],
    price: 850,
    isAvailable: true,
  },
];

export default function FindMedicinesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [inputText, setInputText] = useState('');
  const [searchedMedicines, setSearchedMedicines] = useState<string[]>([]);
  const [pharmacyResults, setPharmacyResults] = useState<Pharmacy[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('Best Match');
  const [isFromPrescription, setIsFromPrescription] = useState(false);

  useEffect(() => {
    if (params.medicines) {
      try {
        const meds = JSON.parse(params.medicines as string);
        setSearchedMedicines(meds);
        setIsFromPrescription(true);
      } catch (e) {
        console.error('Failed to parse medicines', e);
      }
    }
    
    if (params.results) {
      try {
        const results = JSON.parse(params.results as string);
        const mapped = results.map((r: any) => ({
          id: r.pharmacyId,
          name: r.pharmacyName,
          rating: 4.5,
          distance: 1.0,
          address: r.address || '',
          phone: r.phone,
          matchedMedicines: r.matchedMedicines || [],
          missingMedicines: r.missingMedicines || [],
          isAvailable: r.matchCount > 0,
        }));
        setPharmacyResults(mapped);
      } catch (e) {
        console.error('Failed to parse results', e);
      }
    }
  }, [params.medicines, params.results]);

  const filters = ['Best Match', 'Nearest', 'Lowest Price'];

  const addMedicine = () => {
    if (inputText.trim() && !searchedMedicines.includes(inputText.trim())) {
      setSearchedMedicines([...searchedMedicines, inputText.trim()]);
      setInputText('');
    }
  };

  const removeMedicine = (med: string) => {
    setSearchedMedicines(searchedMedicines.filter(m => m !== med));
  };

  const renderPharmacyCard = ({ item }: { item: Pharmacy }) => {
    const totalSearched = searchedMedicines.length;
    const matchedCount = item.matchedMedicines.length;
    const matchPercentage = totalSearched > 0 ? (matchedCount / totalSearched) * 100 : 0;

    return (
      <View style={styles.card}>
        {/* Header: Name and Rating */}
        <View style={styles.cardHeader}>
          <View style={styles.nameContainer}>
            <Text style={styles.pharmacyName}>{item.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#f59e0b" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <View style={[styles.matchIndicator, { backgroundColor: matchPercentage > 50 ? '#dcfce7' : '#fee2e2' }]}>
            <Text style={[styles.matchIndicatorText, { color: matchPercentage > 50 ? '#16a34a' : '#dc2626' }]}>
              {matchedCount}/{totalSearched} Matched
            </Text>
          </View>
        </View>

        {/* Address and Distance */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#64748b" />
          <Text style={styles.locationText}>{item.distance} km • {item.address}</Text>
        </View>

        {/* Matching Feature Visualization */}
        <View style={styles.matchingSection}>
          <Text style={styles.sectionTitle}>Availability Breakdown</Text>
          <View style={styles.medicineList}>
            {item.matchedMedicines.map((med, index) => (
              <View key={`match-${index}`} style={styles.medicineItem}>
                <View style={[styles.checkCircle, { backgroundColor: '#dcfce7' }]}>
                  <Ionicons name="checkmark" size={12} color="#16a34a" />
                </View>
                <Text style={styles.medicineNameMatch}>{med}</Text>
              </View>
            ))}
            {item.missingMedicines.map((med, index) => (
              <View key={`miss-${index}`} style={styles.medicineItem}>
                <View style={[styles.checkCircle, { backgroundColor: '#fee2e2' }]}>
                  <Ionicons name="close" size={12} color="#dc2626" />
                </View>
                <Text style={styles.medicineNameMiss}>{med}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer: Price and Order */}
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.priceLabel}>Total Estimated Price</Text>
            <Text style={styles.priceValue}>Rs. {item.price ? item.price.toLocaleString() : '---'}</Text>
          </View>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>View & Order</Text>
            <Ionicons name="arrow-forward" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getFilteredPharmacies = () => {
    const data = isFromPrescription && pharmacyResults.length > 0 ? pharmacyResults : MOCK_PHARMACIES;
    let sorted = [...data];
    
    if (activeFilter === 'Best Match') {
      sorted.sort((a, b) => b.matchedMedicines.length - a.matchedMedicines.length);
    } else if (activeFilter === 'Nearest') {
      sorted.sort((a, b) => a.distance - b.distance);
    } else if (activeFilter === 'Lowest Price') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    
    return sorted;
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isFromPrescription ? 'Prescription Results' : 'Pharmacy Matching'}
        </Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Multi-Medicine Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.searchLabel}>
          {isFromPrescription ? 'Medicines from Prescription' : 'What medicines do you need?'}
        </Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Add medicine name..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addMedicine}
          />
          <TouchableOpacity onPress={addMedicine} style={styles.addButton}>
            <Ionicons name="add-circle" size={32} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {/* Chips for searched medicines */}
        <View style={styles.chipsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {searchedMedicines.map((med, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{med}</Text>
                <TouchableOpacity onPress={() => removeMedicine(med)} style={styles.removeChip}>
                  <Ionicons name="close-circle" size={16} color="#3b82f6" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Pharmacy Results List */}
      <FlatList
        data={getFilteredPharmacies()}
        renderItem={renderPharmacyCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          const count = isFromPrescription && pharmacyResults.length > 0 
            ? pharmacyResults.length 
            : MOCK_PHARMACIES.length;
          return (
            <Text style={styles.resultsHeader}>
              {isFromPrescription ? 'Pharmacies with your medicines' : `Matching Pharmacies (${count})`}
            </Text>
          );
        }}
      />

      {/* Map FAB */}
      <TouchableOpacity style={styles.mapFab}>
        <Ionicons name="map" size={24} color="#ffffff" />
        <Text style={styles.mapFabText}>View Map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  infoButton: {
    padding: 5,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingLeft: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    paddingHorizontal: 12,
  },
  addButton: {
    paddingRight: 8,
  },
  chipsContainer: {
    marginTop: 12,
    flexDirection: 'row',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d4ed8',
    marginRight: 6,
  },
  removeChip: {
    padding: 2,
  },
  filterSection: {
    marginBottom: 10,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 15,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  nameContainer: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff7ed',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ea580c',
  },
  matchIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  matchIndicatorText: {
    fontSize: 12,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    flex: 1,
  },
  matchingSection: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  medicineList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  medicineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineNameMatch: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  medicineNameMiss: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  orderButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  mapFab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  mapFabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
