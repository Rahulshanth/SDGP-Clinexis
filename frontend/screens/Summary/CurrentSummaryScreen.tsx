import React, { useEffect } from "react";
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

type CurrentSummaryRouteParams = {
  CurrentSummary: { consultationId: string };
};

const COLORS = {
  background: "#F7F8FC",
  card: "#FFFFFF",
  border: "#E6EAF2",
  text: "#1F2937",
  subtext: "#6B7280",
  primary: "#2D6CDF",
  primarySoft: "#E8F0FF",
  danger: "#DC2626",
  tagBg: "#F3F4F6",
};

const CurrentSummaryScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<CurrentSummaryRouteParams, "CurrentSummary">>();
  const { consultationId } = route.params;

  const dispatch = useAppDispatch();
  const { currentSummary, loadingCurrent, generating, error } = useAppSelector(
    (state) => state.summary
  );

  useEffect(() => {
    dispatch(fetchCurrentSummary(consultationId));
  }, [consultationId]);

  useEffect(() => {
    if (error) Alert.alert("Error", error);
  }, [error]);

  const handleGenerate = () => {
    dispatch(generateConsultationSummary({ consultationId }));
  };

  if (loadingCurrent) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading summary...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Consultation Summary</Text>
          <Text style={styles.headerSubtitle}>
            AI-generated medical summary
          </Text>
        </View>

        {currentSummary ? (
          <>
            {/* Patient Condition */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Patient Condition</Text>
              <Text style={styles.bodyText}>{currentSummary.patientCondition}</Text>
            </View>

            {/* Key Symptoms */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Symptoms</Text>
              <View style={styles.tagRow}>
                {currentSummary.keySymptoms.map((symptom, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Diagnosis */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Diagnosis</Text>
              <Text style={styles.bodyText}>{currentSummary.diagnosis}</Text>
            </View>

            {/* Treatment Plan */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Treatment Plan</Text>
              <Text style={styles.bodyText}>{currentSummary.treatmentPlan}</Text>
            </View>

            {/* Medications */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Medications</Text>
              <View style={styles.tagRow}>
                {currentSummary.medications.map((med, i) => (
                  <View key={i} style={[styles.tag, { backgroundColor: "#EFF6FF" }]}>
                    <Text style={[styles.tagText, { color: COLORS.primary }]}>{med}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No summary yet for this consultation.</Text>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGenerate}
            disabled={generating}
          >
            <Text style={styles.primaryButtonText}>
              {generating ? "Generating..." : "Generate New Summary"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("SummaryHistory")}
          >
            <Text style={styles.secondaryButtonText}>View History</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrentSummaryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  centered: { flex: 1, backgroundColor: COLORS.background, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: COLORS.subtext, fontSize: 14 },
  headerCard: {
    backgroundColor: COLORS.card, borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: COLORS.text },
  headerSubtitle: { fontSize: 14, color: COLORS.subtext, marginTop: 6 },
  section: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: COLORS.text, marginBottom: 8 },
  bodyText: { fontSize: 14, color: COLORS.text, lineHeight: 22 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: COLORS.tagBg, borderRadius: 999,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  tagText: { fontSize: 13, color: COLORS.text },
  emptyCard: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 18,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 16,
  },
  emptyText: { color: COLORS.subtext, fontSize: 14, textAlign: "center" },
  actionRow: { gap: 10, marginBottom: 30 },
  primaryButton: {
    backgroundColor: COLORS.primary, borderRadius: 14,
    paddingVertical: 14, alignItems: "center",
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  secondaryButton: {
    backgroundColor: COLORS.card, borderRadius: 14,
    paddingVertical: 14, alignItems: "center",
    borderWidth: 1, borderColor: COLORS.primary,
  },
  secondaryButtonText: { color: COLORS.primary, fontSize: 15, fontWeight: "700" },
});
