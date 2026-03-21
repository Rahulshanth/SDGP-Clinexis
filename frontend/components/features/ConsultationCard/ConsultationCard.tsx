import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
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

  useEffect(() => {
    dispatch(fetchConsultationById(consultationId));
  }, [consultationId, dispatch]); // re-fetches if ID changes

  // Loading state
  if (status === 'loading') {
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
      {activeConsultationParagraphs.map((paragraph: string, index: number) => (
        <View key={index} style={styles.block}>
          <Text style={styles.speakerLabel}>Speaker {index + 1}</Text>
          <Text style={styles.text}>{paragraph}</Text>
        </View>
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
