import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uploadConsultationAudio } from '../../store/consultationSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PatientStackParamList } from '../../navigation/PatientNavigator';

// TODO: replace with real auth state when login is ready
// const TEST_PATIENT_ID = '69b8ead12a41401d6b03f912';
// const TEST_DOCTOR_ID  = '69b8eaa82a41401d6b03f910';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<PatientStackParamList>>();
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
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <LinearGradient
        colors={['#1E3A8A', '#2EA7FF']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Consultation Recorder</Text>
        <Text style={styles.headerSubtitle}>
          Record and store patient consultations securely
        </Text>
      </LinearGradient>

      {/* MAIN CARD */}
      <View style={styles.card}>
        <View style={styles.content}>
          
          {/* STATUS TEXT */}
          <Text style={styles.statusText}>
            {recording ? 'Recording in progress...' : 'Tap to start recording'}
          </Text>

          {/* MIC BUTTON */}
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => navigation.navigate('LiveTranscript')}
          >
            <View style={styles.innerMic}>
              <Ionicons
                name={recording ? 'stop' : 'mic'}
                size={36}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>

          {/* LABEL */}
          <Text style={styles.micLabel}>
            {recording ? 'Tap to stop and save' : 'Start Recording'}
          </Text>

          {/* LOADING */}
          {status === 'loading' && (
            <View style={styles.statusRow}>
              <ActivityIndicator size="small" color="#2EA7FF" />
              <Text style={styles.uploadText}>
                Uploading and processing audio...
              </Text>
            </View>
          )}

          {/* SUCCESS */}
          {status === 'succeeded' && (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={48} color="green" />
              <Text style={styles.successText}>
                Consultation saved successfully
              </Text>

              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => router.push('/live-transcript' as any)}
              >
                <Text style={styles.viewButtonText}>
                  View Transcript
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VoiceRecorder;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },

  header: {
    padding: 20,
    paddingBottom: 40,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },

  headerSubtitle: {
    color: '#DCEBFF',
    fontSize: 13,
    marginTop: 4,
  },

  card: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -20,
    padding: 24,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 30,
  },

  micWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2EA7FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#2EA7FF',
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },

  micWrapperActive: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
  },

  innerMic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  micLabel: {
    marginTop: 18,
    fontSize: 14,
    color: '#1E2A3A',
    fontWeight: '500',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },

  uploadText: {
    marginLeft: 8,
    color: '#2EA7FF',
    fontSize: 13,
  },

  successBox: {
    marginTop: 30,
    alignItems: 'center',
  },

  successText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2A3A',
  },

  viewButton: {
    marginTop: 16,
    backgroundColor: '#2EA7FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  viewButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  viewButtonText: { color: 'white', fontWeight: '600' },
});
