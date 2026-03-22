import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchConsultationById } from "../../../store/consultationSlice";

interface Props {
  paragraphs: string[];
  consultationId: string;
}

const ConsultationCard: React.FC<Props> = ({ consultationId, paragraphs }) => {
  const dispatch = useAppDispatch();
  const { activeConsultationParagraphs, status, error } = useAppSelector(
    (state) => state.consultation
  );

  useEffect(() => {
    if (!paragraphs.length) {
      dispatch(fetchConsultationById(consultationId));
    }
  }, [consultationId, dispatch, paragraphs.length]);

  const displayedParagraphs = paragraphs.length
    ? paragraphs
    : activeConsultationParagraphs;

  if (status === "loading" && !displayedParagraphs.length) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error && !displayedParagraphs.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No conversation recorded.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {displayedParagraphs.map((paragraph, index) => (
        <View key={`${consultationId}-${index}`} style={styles.block}>
          <Text style={styles.speakerLabel}>Speaker {index + 1}</Text>
          <Text style={styles.text}>{paragraph}</Text>
        </View>
      ))}
    </View>
  );
};

export default ConsultationCard;

const styles = StyleSheet.create({
  container: { padding: 4 },
  centered: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  block: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f0f4ff",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  speakerLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  text: { fontSize: 14, color: "#1e293b", lineHeight: 22 },
  emptyText: { color: "#999", textAlign: "center", padding: 16 },
});
