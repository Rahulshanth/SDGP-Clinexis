import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Audio } from 'expo-av';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uploadConsultationAudio } from '../../store/consultationSlice';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const VoiceRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [timer, setTimer] = useState(0);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { status } = useAppSelector((state) => state.consultation);

  // ⏱ TIMER + ANIMATION
  useEffect(() => {
    let interval: any;

    if (recording) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      setTimer(0);
      pulseAnim.setValue(1);
    }

    return () => clearInterval(interval);
  }, [pulseAnim, recording]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // START
  const startRecording = async () => {
    await Audio.requestPermissionsAsync();

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    setRecording(recording);
  };

  // STOP
  const stopRecording = async () => {
    if (!recording) return;

    const rec = recording;
    setRecording(null);

    await rec.stopAndUnloadAsync();

    const uri = rec.getURI();

    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "audio/wav",
      name: "consultation.wav"
    } as any);

    dispatch(uploadConsultationAudio(formData));
  };

  return (
    <View style={styles.container}>

      {/* 🔷 HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Consultation Recorder</Text>
        <Text style={styles.headerSub}>
          Record and store patient consultations securely
        </Text>
      </View>

      {/* 🔥 CENTER AREA */}
      <View style={styles.center}>

        <Text style={styles.helperText}>
          {recording ? "Recording in progress" : "Tap to start recording"}
        </Text>

        {/* 🎤 MIC */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[
              styles.micButton,
              recording && styles.micActive
            ]}
            onPress={recording ? stopRecording : startRecording}
          >
            <Ionicons
              name={recording ? "stop" : "mic"}
              size={40}
              color="#fff"
            />
          </TouchableOpacity>
        </Animated.View>

        {/* ⏱ TIMER */}
        {recording && (
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        )}

        {/*TRANSCRIPT */}
        {status === "succeeded" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LiveTranscript")}
          >
            <Text style={styles.buttonText}>View Transcript →</Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
};

export default VoiceRecorder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  // HEADER
  header: {
    backgroundColor: "#2563EB",
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  headerSub: {
    color: "#E0E7FF",
    fontSize: 12,
    marginTop: 4,
  },

  // CENTER
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80, // space for tab bar
  },

  helperText: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 24,
  },

  // MIC
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#2563EB",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },

  micActive: {
    backgroundColor: "#DC2626",
  },

  // TIMER
  timer: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  // BUTTON
  button: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});