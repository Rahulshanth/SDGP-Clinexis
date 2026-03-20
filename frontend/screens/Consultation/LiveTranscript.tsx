import React, { useEffect } from 'react';
import {
  View, Text, ScrollView,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchConsultations } from '../../store/consultationSlice';
import ConsultationCard from '../../components/features/ConsultationCard/ConsultationCard';

const LiveTranscript = () => {
  const dispatch = useAppDispatch();
  const { consultations, status, error } = useAppSelector((state) => state.consultation);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Consultation Records</Text>

      {status === 'loading' && (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
      )}

      {status === 'failed' && (
        <Text style={styles.errorText}>{error ?? 'Failed to load consultations.'}</Text>
      )}

      {status === 'succeeded' && consultations.length === 0 && (
        <Text style={styles.emptyText}>No consultations found.</Text>
      )}

      {consultations.map((consult) => (
        <View key={consult._id} style={styles.card}>
          <Text style={styles.dateText}>
            🗓️ {new Date(consult.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </Text>
          {/* ✅ Pass paragraphs directly — no shared state bug */}
          <ConsultationCard paragraphs={consult.conversationParagraphs} />
        </View>
      ))}
    </ScrollView>
  );
};



export default LiveTranscript;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 16 },
  card: {
    backgroundColor: 'white', borderRadius: 12,
    padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, elevation: 2,
  },
  dateText: { fontSize: 12, color: '#999', marginBottom: 10 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  emptyText: { color: '#999', textAlign: 'center', marginTop: 40, fontSize: 15 },
});