// frontend/screens/Consultation/LiveTranscript.tsx — merged by Vidu
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchConsultations } from "../../store/consultationSlice";
import { createRemindersFromConsultation } from "../../services/reminderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ── Extract userId from JWT token ─────────────────────────────────────────────
const getUserIdFromToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) return null;
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.sub || decoded.userId || null;
  } catch {
    return null;
  }
};

const LiveTranscript = () => {
  const dispatch = useAppDispatch();
  const { consultations, status, error } = useAppSelector(
    (state) => state.consultation,
  );

  // ── Track selected paragraph across all consultations ─────────────────────
  const [selectedConsultId, setSelectedConsultId] = useState<string | null>(null);
  const [selectedParaIndex, setSelectedParaIndex] = useState<number | null>(null);
  const [creatingReminder, setCreatingReminder] = useState(false);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  // ── Handle paragraph tap ──────────────────────────────────────────────────
  const handleParaTap = (consultId: string, index: number) => {
    if (selectedConsultId === consultId && selectedParaIndex === index) {
      setSelectedConsultId(null);
      setSelectedParaIndex(null);
    } else {
      setSelectedConsultId(consultId);
      setSelectedParaIndex(index);
    }
  };

  // ── Create reminder from selected paragraph ───────────────────────────────
  const handleCreateReminder = async () => {
    if (!selectedConsultId || selectedParaIndex === null) {
      Alert.alert(
        "Select a paragraph",
        "Please tap a conversation paragraph first, then press Create Reminder.",
      );
      return;
    }

    const consult = consultations.find((c) => c._id === selectedConsultId);
    if (!consult) return;

    const fullTranscript = consult.conversationParagraphs[selectedParaIndex];

    setCreatingReminder(true);
    try {
      const patientId = await getUserIdFromToken();
      if (!patientId) {
        Alert.alert("Error", "Could not get user info. Please log in again.");
        return;
      }

      const reminders = await createRemindersFromConsultation({
        consultationId: selectedConsultId,
        patientId,
        fullTranscript,
      });

      if (reminders.length === 0) {
        Alert.alert(
          "No reminders created",
          "No timing keywords found (morning, afternoon, evening, night, noon, bedtime). Try a different paragraph.",
        );
      } else {
        Alert.alert(
          "✅ Reminders Created!",
          `${reminders.length} reminder${reminders.length > 1 ? "s" : ""} added to your Reminders screen.`,
        );
        setSelectedConsultId(null);
        setSelectedParaIndex(null);
      }
    } catch (err: any) {
      Alert.alert(
        "Error",
        err?.message || "Failed to create reminders. Try again.",
      );
    } finally {
      setCreatingReminder(false);
    }
  };

  const hasSelection = selectedConsultId !== null && selectedParaIndex !== null;

  return (
    <ScrollView style={styles.container}>

      {/* ── From develop — nice title ── */}
      <Text style={styles.title}>Consultation Records</Text>

      {/* ── From develop — loading state ── */}
      {status === "loading" && (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={{ marginTop: 40 }}
        />
      )}

      {/* ── From develop — error state ── */}
      {status === "failed" && (
        <Text style={styles.errorText}>
          {error ?? "Failed to load consultations."}
        </Text>
      )}

      {/* ── From develop — empty state ── */}
      {status === "succeeded" && consultations.length === 0 && (
        <Text style={styles.emptyText}>No consultations found.</Text>
      )}

      {/* Instruction */}
      <Text style={styles.instruction}>
        💡 Tap a paragraph to select it, then press Create Reminder
      </Text>

      {/* ── Consultations — nice card from develop + tappable paragraphs from HEAD ── */}
      {consultations.map((consult) => (
        <View key={consult._id} style={styles.card}>

          {/* ── From develop — date header ── */}
          <Text style={styles.dateText}>
            🗓️{" "}
            {new Date(consult.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>

          {/* ── Paragraphs — tappable from HEAD ── */}
          {consult.conversationParagraphs.map(
            (paragraph: string, index: number) => {
              const isSelected =
                selectedConsultId === consult._id &&
                selectedParaIndex === index;
              return (
                <TouchableOpacity
                  key={`${consult._id}-${index}`}
                  onPress={() => handleParaTap(consult._id, index)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.block,
                      isSelected && styles.blockSelected,
                    ]}
                  >
                    {isSelected && (
                      <Text style={styles.selectedTick}>✓ Selected</Text>
                    )}
                    <Text
                      style={[
                        styles.paragraph,
                        isSelected && styles.paragraphSelected,
                      ]}
                    >
                      {paragraph}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            },
          )}
        </View>
      ))}

      {/* ── Create Reminder button — below all consultations ── */}
      <TouchableOpacity
        style={[
          styles.createBtn,
          (!hasSelection || creatingReminder) && styles.createBtnDisabled,
        ]}
        onPress={handleCreateReminder}
        disabled={!hasSelection || creatingReminder}
      >
        {creatingReminder ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.createBtnText}>
            {hasSelection
              ? "🔔 Create Reminder"
              : "Select a paragraph first"}
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

export default LiveTranscript;

const styles = StyleSheet.create({
  // ── From develop ──────────────────────────────────────────────────────────
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: { fontSize: 12, color: "#999", marginBottom: 10 },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
  emptyText: { color: "#999", textAlign: "center", marginTop: 40, fontSize: 15 },

  // ── From HEAD ─────────────────────────────────────────────────────────────
  instruction: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  block: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f0f4ff",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  blockSelected: {
    backgroundColor: "#EFF6FF",
    borderLeftColor: "#1D4ED8",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
  },
  selectedTick: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 14,
    color: "#1e293b",
    lineHeight: 22,
  },
  paragraphSelected: {
    color: "#1D4ED8",
  },
  createBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  createBtnDisabled: {
    backgroundColor: "#93C5FD",
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});