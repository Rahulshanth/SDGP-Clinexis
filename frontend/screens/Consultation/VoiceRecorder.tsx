import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, TextInput, FlatList,
  ScrollView, Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uploadConsultationAudio } from '../../store/consultationSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PatientStackParamList } from '../../navigation/PatientNavigator';
import { searchDoctorsByName } from '../../services/doctorApi';
import { Doctor } from '../../store/doctorSlice';

const getUserIdFromToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return null;
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.sub || decoded.userId || null;
  } catch {
    return null;
  }
};

type VoiceRecorderNavProp = NativeStackNavigationProp<PatientStackParamList>;

const VoiceRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<VoiceRecorderNavProp>();
  const { status } = useAppSelector((state) => state.consultation);

  // ── Doctor search state ───────────────────────────────────────────────────
  const [doctorSearch, setDoctorSearch] = useState('');
  const [doctorResults, setDoctorResults] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searching, setSearching] = useState(false);

  // ── Search doctors by name ────────────────────────────────────────────────
  const handleDoctorSearch = async (text: string) => {
    setDoctorSearch(text);
    setSelectedDoctor(null); // clear selection when typing again

    if (text.trim().length < 2) {
      setDoctorResults([]);
      return;
    }

    setSearching(true);
    try {
      const results = await searchDoctorsByName(text);
      setDoctorResults(results);
    } catch {
      setDoctorResults([]);
    } finally {
      setSearching(false);
    }
  };

  // ── Select a doctor from results ──────────────────────────────────────────
  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDoctorSearch(doctor.profile.name); // show name in search bar
    setDoctorResults([]); // hide dropdown
  };

  // ── Start recording ───────────────────────────────────────────────────────
  const startRecording = async () => {
    if (!selectedDoctor) {
      Alert.alert('Select a Doctor', 'Please search and select a doctor first.');
      return;
    }

    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync({
      android: {
        extension: '.wav',
        outputFormat: Audio.AndroidOutputFormat.DEFAULT,
        audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
        sampleRate: 48000,
        numberOfChannels: 1,
        bitRate: 128000,
      },
      ios: {
        extension: '.wav',
        audioQuality: Audio.IOSAudioQuality.HIGH,
        sampleRate: 48000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
      web: {},
    });

    setRecording(recording);
  };

  // ── Stop recording & upload ───────────────────────────────────────────────
  const stopRecording = async () => {
  if (!recording || !selectedDoctor) return;

  // ── guard against double-stop ──────────────────────────────────────────
  const currentRecording = recording;
  setRecording(null); // ← clear state FIRST before unloading

  try {
    await currentRecording.stopAndUnloadAsync();
  } catch {
    // already unloaded — safe to ignore
  }

  const uri = currentRecording.getURI();
  if (!uri) return;

  // ── Get real patientId from JWT token ───────────────────────────────────
  const patientId = await getUserIdFromToken();
  if (!patientId) {
    Alert.alert('Error', 'Could not get patient info. Please log in again.');
    return;
  }

  const formData = new FormData();
  formData.append('file', {
    uri,
    type: 'audio/wav',
    name: 'consultation.wav',
  } as any);

  formData.append('doctorId', selectedDoctor._id);  // ← real doctor ID
  formData.append('patientId', patientId);           // ← real patient ID

  dispatch(uploadConsultationAudio(formData));
};

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Consultation Recording</Text>

      {/* ── Doctor Search ─────────────────────────────────────────────────── */}
      <View style={styles.searchSection}>
        <Text style={styles.searchLabel}>🔍 Search Doctor by Name</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Type doctor name..."
          placeholderTextColor="#94A3B8"
          value={doctorSearch}
          onChangeText={handleDoctorSearch}
          editable={!recording} // disable while recording
        />

        {/* Loading indicator */}
        {searching && (
          <ActivityIndicator
            size="small"
            color="#2563eb"
            style={{ marginTop: 8 }}
          />
        )}

        {/* Doctor results dropdown */}
        {doctorResults.length > 0 && (
          <View style={styles.dropdown}>
            {doctorResults.map((doctor) => (
              <TouchableOpacity
                key={doctor._id}
                style={styles.dropdownItem}
                onPress={() => handleSelectDoctor(doctor)}
              >
                <Text style={styles.dropdownName}>
                  {doctor.profile.name}
                </Text>
                <Text style={styles.dropdownSpec}>
                  {doctor.profile.specialization} •{' '}
                  {doctor.profile.hospitalName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Selected doctor card */}
        {selectedDoctor && (
          <View style={styles.selectedCard}>
            <Text style={styles.selectedLabel}>✅ Selected Doctor</Text>
            <Text style={styles.selectedName}>
              {selectedDoctor.profile.name}
            </Text>
            <Text style={styles.selectedSpec}>
              {selectedDoctor.profile.specialization} •{' '}
              {selectedDoctor.profile.hospitalName}
            </Text>
          </View>
        )}
      </View>

      {/* ── Recording section ─────────────────────────────────────────────── */}
      <Text style={styles.subtitle}>
        {recording
          ? '🔴 Recording in progress...'
          : selectedDoctor
          ? 'Tap the mic to start'
          : 'Select a doctor first, then record'}
      </Text>

      <TouchableOpacity
        style={[
          styles.micButton,
          recording && styles.micButtonActive,
          !selectedDoctor && styles.micButtonDisabled,
        ]}
        onPress={recording ? stopRecording : startRecording}
        disabled={status === 'loading'}
      >
        <Text style={styles.micIcon}>{recording ? '⏹️' : '🎙️'}</Text>
      </TouchableOpacity>

      <Text style={styles.micLabel}>
        {recording ? 'Tap to Stop & Save' : 'Tap to Start Recording'}
      </Text>

      {status === 'loading' && (
        <View style={styles.statusRow}>
          <ActivityIndicator size="small" color="#2563eb" />
          <Text style={styles.statusText}>  Uploading & transcribing...</Text>
        </View>
      )}

      {status === 'succeeded' && (
        <View>
          <Text style={styles.successText}>
            ✅ Consultation saved! Both doctor and patient can view it.
          </Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => navigation.navigate('LiveTranscript')}
          >
            <Text style={styles.viewButtonText}>View Transcript →</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default VoiceRecorder;

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f9f9f9' },
  container: {
    padding: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 22, fontWeight: 'bold',
    color: '#1e3a5f', marginBottom: 24,
  },

  // ── Search styles ──────────────────────────────────────────────────────────
  searchSection: { width: '100%', marginBottom: 32 },
  searchLabel: {
    fontSize: 14, fontWeight: '600',
    color: '#1e3a5f', marginBottom: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1E293B',
    width: '100%',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
  },
  dropdownName: {
    fontSize: 15, fontWeight: '600', color: '#1E293B',
  },
  dropdownSpec: {
    fontSize: 12, color: '#64748B', marginTop: 2,
  },
  selectedCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    width: '100%',
  },
  selectedLabel: {
    fontSize: 11, fontWeight: '700',
    color: '#1D4ED8', marginBottom: 4,
  },
  selectedName: {
    fontSize: 16, fontWeight: '700', color: '#1E293B',
  },
  selectedSpec: {
    fontSize: 13, color: '#64748B', marginTop: 2,
  },

  // ── Recording styles ───────────────────────────────────────────────────────
  subtitle: {
    fontSize: 14, color: '#666',
    marginBottom: 24, textAlign: 'center',
  },
  micButton: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#2563eb', justifyContent: 'center',
    alignItems: 'center', elevation: 6,
    shadowColor: '#2563eb', shadowOpacity: 0.4, shadowRadius: 10,
  },
  micButtonActive: { backgroundColor: '#dc2626' },
  micButtonDisabled: { backgroundColor: '#93C5FD' },
  micIcon: { fontSize: 40 },
  micLabel: { marginTop: 16, fontSize: 14, color: '#666' },
  statusRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 24,
  },
  statusText: { color: '#2563eb', fontSize: 14 },
  successText: {
    color: 'green', fontWeight: 'bold',
    fontSize: 15, marginTop: 24, textAlign: 'center',
  },
  viewButton: {
    marginTop: 12, backgroundColor: '#2563eb',
    borderRadius: 10, padding: 12, alignItems: 'center',
  },
  viewButtonText: { color: 'white', fontWeight: '600' },
});