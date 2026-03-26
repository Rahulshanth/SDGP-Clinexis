import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity, // ✅ Fix 1: Added missing import
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchConsultationById } from "../../../store/consultationSlice";

interface Props {
  paragraphs: string[];
  consultationId: string;
}

const ConsultationCard: React.FC<Props> = ({ consultationId }) => {
  const dispatch = useAppDispatch();
  const { activeConsultationParagraphs, status, error } = useAppSelector(
    (state) => state.consultation
  );

  // ✅ Fix 2 & 3: Declare the missing state variables
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [creatingReminder, setCreatingReminder] = useState(false);

  useEffect(() => {
    dispatch(fetchConsultationById(consultationId));
  }, [consultationId, dispatch]);

  // ✅ Fix 4: Define the missing handler function
  const handleCreateReminder = async () => {
    if (selectedIndex === null) return;

    setCreatingReminder(true);
    try {
      // TODO: Connect to your reminder API endpoint later
      // POST /api/reminders/create
      const selectedParagraph = activeConsultationParagraphs[selectedIndex];
      console.log("Creating reminder for paragraph:", selectedParagraph);

      Alert.alert("Reminder Created", "Your reminder has been set!");
      setSelectedIndex(null);
    } catch (err) {
      Alert.alert("Error", "Failed to create reminder. Please try again.");
    } finally {
      setCreatingReminder(false);
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No conversation recorded.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>Tap a paragraph to select it</Text>

      {activeConsultationParagraphs.map((paragraph: string, index: number) => (
        // ✅ Each paragraph is now tappable to set selectedIndex
        <TouchableOpacity
          key={index}
          onPress={() =>
            setSelectedIndex(index === selectedIndex ? null : index)
          }
        >
          <View
            style={[
              styles.block,
              selectedIndex === index && styles.blockSelected,
            ]}
          >
            {selectedIndex === index && (
              <Text style={styles.selectedTick}>✔ Selected</Text>
            )}
            {/* ✅ Fix 5: speakerLabel style added below in StyleSheet */}
            <Text style={styles.speakerLabel}>Speaker {index + 1}</Text>
            <Text style={styles.text}>{paragraph}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Create Reminder button */}
      <TouchableOpacity
        style={[
          styles.createBtn,
          (selectedIndex === null || creatingReminder) &&
            styles.createBtnDisabled,
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
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  // ✅ Fix 5: Added missing speakerLabel style
  speakerLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 4,
  },
  selectedTick: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 4,
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