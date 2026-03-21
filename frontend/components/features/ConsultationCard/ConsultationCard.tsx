import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createRemindersFromConsultation } from "../../../services/reminderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  consultation: any; // or proper type if you have it
}

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

const ConsultationCard: React.FC<Props> = ({ paragraphs, consultationId }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [creatingReminder, setCreatingReminder] = useState(false);

  const handleCreateReminder = async () => {
    if (selectedIndex === null) {
      Alert.alert(
        "Select a paragraph",
        "Please tap a conversation paragraph first, then press Create Reminder.",
      );
      return;
    }

    setCreatingReminder(true);
    try {
      const patientId = await getUserIdFromToken();
      if (!patientId) {
        Alert.alert("Error", "Could not get user info. Please log in again.");
        return;
      }

      const fullTranscript = paragraphs[selectedIndex];

      const reminders = await createRemindersFromConsultation({
        consultationId,
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
        setSelectedIndex(null);
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

  if (!paragraphs || paragraphs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No conversation recorded.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Instruction */}
      <Text style={styles.instruction}>
        💡 Tap a paragraph to select it, then press Create Reminder
      </Text>

      {/* Paragraphs */}
      {paragraphs.map((paragraph: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: string | number | bigint | ((prevState: number | null) => number | null) | null | undefined) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            setSelectedIndex(index === selectedIndex ? null : index)
          }
          activeOpacity={0.8}
        >
          <View style={[
            styles.block,
            selectedIndex === index && styles.blockSelected,
          ]}>
            {selectedIndex === index && (
              <Text style={styles.selectedTick}>✓ Selected</Text>
            )}
            <Text style={styles.text}>{paragraph}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Create Reminder button */}
      <TouchableOpacity
        style={[
          styles.createBtn,
          (selectedIndex === null || creatingReminder) && styles.createBtnDisabled,
        ]}
        onPress={handleCreateReminder}
        disabled={creatingReminder || selectedIndex === null}
      >
        {creatingReminder ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.createBtnText}>
            {selectedIndex === null
              ? "Select a paragraph first"
              : "🔔 Create Reminder"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ConsultationCard;

const styles = StyleSheet.create({
  container: { padding: 4 },
  block: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f0f4ff",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  text: { fontSize: 14, color: "#1e293b", lineHeight: 22 },
  emptyText: { color: "#999", textAlign: "center", padding: 16 },
  instruction: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 10,
    fontStyle: "italic",
    textAlign: "center",
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
  createBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
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