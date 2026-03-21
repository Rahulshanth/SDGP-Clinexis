import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { extractMedicines } from '../../services/nlpApi';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [medicines, setMedicines] = useState<string[]>([]);

  const handleExtract = async () => {
    try {
      const data = await extractMedicines(text);
      setMedicines(data.medicines);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Text style={styles.iconText}>⚕</Text>
        </View>
        <Text style={styles.title}>Medicine Extractor</Text>
        <Text style={styles.subtitle}>Paste a prescription and instantly identify all medicines</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.label}>PRESCRIPTION TEXT</Text>
        <TextInput
          placeholder="Paste or type your prescription here..."
          placeholderTextColor="#9BAAB8"
          value={text}
          onChangeText={setText}
          multiline
          style={styles.input}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.button} onPress={handleExtract} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Extract Medicines</Text>
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {medicines.length > 0 && (
        <View style={styles.resultsCard}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Identified Medicines</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{medicines.length} found</Text>
            </View>
          </View>

          {medicines.map((med, index) => (
            <View key={index} style={styles.medItem}>
              <View style={styles.medDot} />
              <Text style={styles.medName}>{med}</Text>
            </View>
          ))}
        </View>
      )}

      {medicines.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💊</Text>
          <Text style={styles.emptyText}>Results will appear here</Text>
        </View>
      )}

    </ScrollView>
  );
}

const TEAL = '#3b82f6';
const TEAL_LIGHT = '#E6F7F5';
const NAVY = '#0D1F2D';
const SLATE = '#4A6274';
const BG = '#F0F4F8';
const WHITE = '#FFFFFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: TEAL,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  iconText: {
    fontSize: 30,
    color: WHITE,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: NAVY,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: SLATE,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 260,
  },

  /* Card */
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: TEAL,
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  input: {
    backgroundColor: BG,
    borderRadius: 12,
    padding: 14,
    height: 140,
    fontSize: 15,
    color: NAVY,
    lineHeight: 22,
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginBottom: 16,
  },
  button: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TEAL,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    gap: 8,
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonIcon: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
  },

  /* Results Card */
  resultsCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
  },
  badge: {
    backgroundColor: TEAL_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: TEAL,
  },
  medItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: BG,
    gap: 12,
  },
  medDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEAL,
  },
  medName: {
    fontSize: 15,
    color: NAVY,
    fontWeight: '500',
  },

  /* Empty State */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    opacity: 0.4,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: SLATE,
    fontWeight: '500',
  },
});
