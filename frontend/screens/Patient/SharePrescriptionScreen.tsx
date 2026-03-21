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
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchConsultations } from '../../store/consultationSlice';
import { matchPharmaciesWithMedicines, PharmacyMatch } from '../../services/pharmacyMatchingApi';

const { width } = Dimensions.get('window');

export default function SharePrescriptionScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  
  const { consultations } = useAppSelector((state) => state.consultation);
  const [medicines, setMedicines] = useState<string[]>([]);
  const [newMedicine, setNewMedicine] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  const addMedicine = () => {
    if (newMedicine.trim() && !medicines.includes(newMedicine.trim())) {
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
      navigation.navigate('FindMedicines', {
        medicines: JSON.stringify(medicines),
        results: JSON.stringify(response.data),
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to search pharmacies. Please try again.');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate('Home');
  };

  const renderConsultationCard = (item: any) => (
    <View key={item._id} style={styles.consultationCard}>
      <View style={styles.consultationHeader}>
        <View style={styles.doctorInfo}>
          <View style={styles.doctorAvatar}>
            <Ionicons name="person" size={20} color="#3b82f6" />
          </View>
          <View>
            <Text style={styles.doctorName}>Dr. Samantha Perera</Text>
            <Text style={styles.specialtyText}>General Physician</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Complete</Text>
        </View>
      </View>
      
      <View style={styles.consultationDetails}>
        <View style={styles.detailItem}>
          <Feather name="calendar" size={14} color="#64748b" />
          <Text style={styles.detailText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="hash" size={14} color="#64748b" />
          <Text style={styles.detailText}>ID: #{item._id.slice(-6)}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.useButton}
        onPress={() => {
          const mockMeds = ['Paracetamol', 'Amoxicillin']; // Simplified for demo
          setMedicines([...new Set([...medicines, ...mockMeds])]);
        }}
      >
        <Text style={styles.useButtonText}>Use These Medicines</Text>
        <Ionicons name="add" size={16} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share Prescription</Text>
        <TouchableOpacity style={styles.historyButton}>
          <Ionicons name="time-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        
        {/* Step Guide */}
        <View style={styles.guideSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.guideScroll}>
            <View style={[styles.guideCard, { backgroundColor: '#eff6ff' }]}>
              <View style={styles.guideIcon}>
                <Ionicons name="camera" size={20} color="#3b82f6" />
              </View>
              <Text style={styles.guideText}>1. Upload Photo or Add Medicines</Text>
            </View>
            <View style={[styles.guideCard, { backgroundColor: '#f0fdf4' }]}>
              <View style={styles.guideIcon}>
                <Ionicons name="search" size={20} color="#10b981" />
              </View>
              <Text style={styles.guideText}>2. We match with Pharmacies</Text>
            </View>
            <View style={[styles.guideCard, { backgroundColor: '#fef3c7' }]}>
              <View style={styles.guideIcon}>
                <Ionicons name="cart" size={20} color="#f59e0b" />
              </View>
              <Text style={styles.guideText}>3. Order and Get Delivered</Text>
            </View>
          </ScrollView>
        </View>

        {/* Prescription Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prescription Photo</Text>
          <TouchableOpacity style={styles.uploadCard}>
            <View style={styles.uploadIconContainer}>
              <Ionicons name="cloud-upload-outline" size={32} color="#3b82f6" />
            </View>
            <Text style={styles.uploadTitle}>Upload or Take Photo</Text>
            <Text style={styles.uploadSubtitle}>Supports JPG, PNG or PDF (Max 5MB)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OR ADD MANUALLY</Text>
          <View style={styles.line} />
        </View>

        {/* Manual Medicine Entry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Medicines</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="medkit-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Panadol 500mg"
              value={newMedicine}
              onChangeText={setNewMedicine}
              onSubmitEditing={addMedicine}
            />
            <TouchableOpacity onPress={addMedicine} style={styles.addMedicineBtn}>
              <Ionicons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {medicines.length > 0 && (
            <View style={styles.chipsContainer}>
              {medicines.map((med, index) => (
                <View key={index} style={styles.chip}>
                  <Text style={styles.chipText}>{med}</Text>
                  <TouchableOpacity onPress={() => removeMedicine(index)}>
                    <Ionicons name="close-circle" size={18} color="#3b82f6" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Recent Consultations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Consultations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {consultations.length > 0 ? (
            consultations.slice(0, 3).map(renderConsultationCard)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={48} color="#cbd5e1" />
              <Text style={styles.emptyText}>No recent consultations found</Text>
            </View>
          )}
        </View>

      </ScrollView>

      {/* Bottom Bar */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <View style={styles.summaryRow}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{medicines.length}</Text>
          </View>
          <Text style={styles.summaryText}>Medicines listed for matching</Text>
        </View>
        <TouchableOpacity 
          style={[styles.mainButton, medicines.length === 0 && styles.disabledButton]}
          onPress={searchPharmacies}
          disabled={medicines.length === 0 || isSearching}
        >
          {isSearching ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Text style={styles.buttonText}>Find Matching Pharmacies</Text>
              <Ionicons name="sparkles" size={18} color="#ffffff" />
            </>
          )}
        </TouchableOpacity>
      </View>
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
    width: 44,
    height: 44,
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
  historyButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  guideSection: {
    marginBottom: 24,
  },
  guideScroll: {
    gap: 12,
  },
  guideCard: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  guideIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3b82f6',
  },
  uploadCard: {
    height: 140,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    height: 56,
    paddingLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  addMedicineBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  chipsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  consultationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  consultationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  doctorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1e293b',
  },
  specialtyText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16a34a',
  },
  consultationDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  useButton: {
    backgroundColor: '#0f172a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 12,
    gap: 8,
  },
  useButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 10,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    justifyContent: 'center',
  },
  countBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  countText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3b82f6',
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  mainButton: {
    height: 60,
    backgroundColor: '#2563eb',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#cbd5e1',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});
