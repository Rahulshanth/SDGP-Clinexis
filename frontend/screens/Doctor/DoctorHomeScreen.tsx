import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../../navigation/DoctorNavigator';

type DoctorNavProp = NativeStackNavigationProp<DoctorStackParamList, 'DoctorHome'>;

const DoctorHomeScreen = () => {
  //const router = useRouter();
  const navigation = useNavigation<DoctorNavProp>();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Doctor 👨‍⚕️</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        //onPress={() => router.push('/live-transcript' as any)} Commented By Rahul
        onPress={() => navigation.navigate('LiveTranscript')} 
      >
        <Text style={styles.primaryButtonText}>📋 View My Consultations</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorHomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 30, textAlign: 'center' },
  primaryButton: {
    backgroundColor: '#2563eb', borderRadius: 12,
    padding: 16, alignItems: 'center',
  },
  primaryButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
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
