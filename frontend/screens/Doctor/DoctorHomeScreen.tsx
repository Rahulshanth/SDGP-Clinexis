import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const DoctorHomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* HEADER */}
      <LinearGradient
        colors={['#1E3A8A', '#2EA7FF']}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.subtitle}>Welcome</Text>
            <Text style={styles.name}>Doctor</Text>
          </View>

          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
        </View>
      </LinearGradient>

      {/* MAIN CARD */}
      <View style={styles.card}>
        <View style={styles.content}>

          {/* SECTION TITLE */}
          <Text style={styles.sectionTitle}>Consultation Access</Text>

          {/* PRIMARY ACTION */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/live-transcript' as any)}
          >
            <Ionicons name="document-text-outline" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>
              View Consultation Records
            </Text>
          </TouchableOpacity>

          {/* OPTIONAL SECONDARY BLOCK */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={20} color="#2EA7FF" />
            <Text style={styles.infoText}>
              Access and review recorded consultations securely.
            </Text>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorHomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },

  header: {
    padding: 20,
    paddingBottom: 50,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subtitle: {
    color: '#DCEBFF',
    fontSize: 13,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 4,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  card: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -20,
    padding: 20,
  },

  content: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2A3A',
    marginBottom: 16,
  },

  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EA7FF',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    elevation: 1,
    gap: 8,
  },

  infoText: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
});








/*import React, { useEffect } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchConsultations } from "../../store/consultationSlice";
import ConsultationCard from "../../components/features/ConsultationCard/ConsultationCard";
//import DoctorProfileScreen from "./DoctorProfileScreen";

const DoctorHomeScreen = () => {
  const dispatch = useAppDispatch();
  const { consultations } = useAppSelector((state) => state.consultation);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  return (
    <View>
      {consultations.map((consult) => (
        <ConsultationCard key={consult._id} consultationId={consult._id} />
      ))}
    </View>
  );
};

export default DoctorHomeScreen;*/
