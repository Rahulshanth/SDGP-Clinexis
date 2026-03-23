import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uploadConsultationAudio } from '../../store/consultationSlice';
import { useRouter } from 'expo-router';

// TODO: replace with real auth state when login is ready
// const TEST_PATIENT_ID = '69b8ead12a41401d6b03f912';
// const TEST_DOCTOR_ID  = '69b8eaa82a41401d6b03f910';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector((state) => state.consultation);

  const startRecording = async () => {
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

  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'audio/wav',
      name: 'consultation.wav',
    } as any);
    const patientId = '69b8ead12a41401d6b03f912';
    const doctorId  = '69b8eaa82a41401d6b03f910';

    formData.append('doctorId', doctorId);
    formData.append('patientId', patientId);

    dispatch(uploadConsultationAudio(formData));
    setRecording(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultation Recording</Text>

      <Text style={styles.subtitle}>
        {recording ? '🔴 Recording in progress...' : 'Tap the mic to start'}
      </Text>

      {/* Mic Button */}
      <TouchableOpacity
        style={[styles.micButton, recording && styles.micButtonActive]}
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
          <Text style={styles.successText}>✅ Consultation saved successfully!</Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => router.push('/live-transcript' as any)}
          >
            <Text style={styles.viewButtonText}>View Transcript →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VoiceRecorder;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 40 },
  micButton: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#2563eb', justifyContent: 'center',
    alignItems: 'center', elevation: 6,
    shadowColor: '#2563eb', shadowOpacity: 0.4, shadowRadius: 10,
  },
  micButtonActive: { backgroundColor: '#dc2626' },
  micIcon: { fontSize: 40 },
  micLabel: { marginTop: 16, fontSize: 14, color: '#666' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  statusText: { color: '#2563eb', fontSize: 14 },
  successText: { color: 'green', fontWeight: 'bold', fontSize: 15, marginTop: 24, textAlign: 'center' },
  viewButton: {
    marginTop: 12, backgroundColor: '#2563eb',
    borderRadius: 10, padding: 12, alignItems: 'center',
  },
  viewButtonText: { color: 'white', fontWeight: '600' },
});