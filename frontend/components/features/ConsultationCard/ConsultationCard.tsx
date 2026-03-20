import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchConsultationById } from "../../../store/consultationSlice";

interface Props {
  consultationId: string;
}

const ConsultationCard: React.FC<Props> = ({ consultationId }) => {
  const dispatch = useAppDispatch();
  const { activeConsultationParagraphs, status, error } = useAppSelector(
    (state) => state.consultation
  );

  useEffect(() => {
    dispatch(fetchConsultationById(consultationId));
  }, [consultationId, dispatch]);

  if (status === "loading") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {activeConsultationParagraphs.map((paragraph, index) => (
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
  container: {
    padding: 10,
  },
  centered: {
    padding: 20,
    alignItems: "center",
  },
  block: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  speakerLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 14,
    color: "#1e293b",
    lineHeight: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
