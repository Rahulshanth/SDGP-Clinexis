import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchCurrentSummary,
  generateConsultationSummary,
} from "../../store/summarySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TranscriptLine } from "../../types";

type CurrentSummaryRouteParams = {
  CurrentSummary: {
    consultationId: string;
  };
};

const COLORS = {
  background: "#F7F8FC",
  card: "#FFFFFF",
  border: "#E6EAF2",
  text: "#1F2937",
  subtext: "#6B7280",
  primary: "#2D6CDF",
  primarySoft: "#E8F0FF",
  successSoft: "#E7F8F0",
  patientSoft: "#F3E8FF",
  patientText: "#7C3AED",
  doctorText: "#0F766E",
  danger: "#DC2626",
};

const CurrentSummaryScreen = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<CurrentSummaryRouteParams, "CurrentSummary">>();
  const { consultationId } = route.params;

  const dispatch = useAppDispatch();
  const { currentSummary, loadingCurrent, generating, error } = useAppSelector(
    (state) => state.summary
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchCurrentSummary(consultationId));
  }, [consultationId, dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("Summary Error", error);
    }
  }, [error]);

  const transcript = currentSummary?.transcript ?? [];

  const selectedCount = useMemo(() => selectedIds.length, [selectedIds]);

  const toggleLine = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateSummary = async () => {
    await dispatch(
      generateConsultationSummary({
        consultationId,
        selectedTranscriptIds: selectedIds.length ? selectedIds : undefined,
      })
    );
  };

  const renderTranscriptLine = (item: TranscriptLine) => {
    const isSelected = selectedIds.includes(item.id);
    const isDoctor = item.speaker === "doctor";

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.85}
        style={[
          styles.lineCard,
          isSelected && styles.lineCardSelected,
          { borderLeftColor: isDoctor ? COLORS.doctorText : COLORS.patientText },
        ]}
        onPress={() => toggleLine(item.id)}
      >
        <View style={styles.lineHeader}>
          <Text
            style={[
              styles.speakerBadge,
              {
                color: isDoctor ? COLORS.doctorText : COLORS.patientText,
                backgroundColor: isDoctor
                  ? COLORS.successSoft
                  : COLORS.patientSoft,
              },
            ]}
          >
            {isDoctor ? "Doctor" : "Patient"}
          </Text>

          <Text style={styles.timeText}>
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <Text style={styles.lineText}>{item.text}</Text>

        {isSelected && <Text style={styles.selectedText}>Selected</Text>}
      </TouchableOpacity>
    );
  };

  if (loadingCurrent) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading current consultation...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Current Consultation Summary</Text>
          <Text style={styles.headerSubtitle}>
            Doctor-only view for the ongoing consultation
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Patient</Text>
              <Text style={styles.metaValue}>
                {currentSummary?.patientName || "-"}
              </Text>
            </View>

            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Doctor</Text>
              <Text style={styles.metaValue}>
                {currentSummary?.doctorName || "-"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Consultation Transcript</Text>
            <Text style={styles.sectionHint}>
              Tap lines to summarize selected parts
            </Text>
          </View>

          {transcript.length > 0 ? (
            transcript.map(renderTranscriptLine)
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No transcript available yet.</Text>
            </View>
          )}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGenerateSummary}
            disabled={generating}
          >
            <Text style={styles.primaryButtonText}>
              {generating
                ? "Generating..."
                : selectedCount > 0
                ? `Summarize Selected (${selectedCount})`
                : "Summarize Full Consultation"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("SummaryHistory")}
          >
            <Text style={styles.secondaryButtonText}>View History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Generated Summary</Text>

          <Text style={styles.summaryBody}>
            {currentSummary?.summary?.trim()
              ? currentSummary.summary
              : "No summary generated yet. Select transcript lines or summarize the full consultation."}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrentSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.subtext,
    fontSize: 14,
  },
  headerCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.subtext,
    marginTop: 6,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  metaBox: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
  },
  metaLabel: {
    fontSize: 12,
    color: COLORS.subtext,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  sectionHint: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 4,
  },
  lineCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  lineCardSelected: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.primary,
  },
  lineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  speakerBadge: {
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
  },
  timeText: {
    fontSize: 12,
    color: COLORS.subtext,
  },
  lineText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
  actionRow: {
    marginBottom: 16,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 30,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },
  summaryBody: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 24,
  },
  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    color: COLORS.subtext,
    fontSize: 14,
  },
});