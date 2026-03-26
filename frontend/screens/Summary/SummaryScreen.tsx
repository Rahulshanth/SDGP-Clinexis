import React, { useEffect } from "react";
import {
  View, Text, StyleSheet, FlatList,
  SafeAreaView, TouchableOpacity, ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSummaryHistory } from "../../store/summarySlice";

const COLORS = {
  primary: "#2EA7FF",
  background: "#F5F7FB",
  white: "#FFFFFF",
  text: "#1E2A3A",
  subtext: "#8A94A6",
  border: "#E8EEF5",
};

const SummaryScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { history, loadingHistory, error } = useAppSelector(
    (state) => state.summary
  );

  useEffect(() => {
    dispatch(fetchSummaryHistory());
  }, []);

  if (loadingHistory) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Consultation Summaries</Text>
        <Text style={styles.subheading}>
          View your previous consultation summaries
        </Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <FlatList
          data={history}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.card}
              onPress={() =>
                navigation?.navigate?.("CurrentSummary", {
                  consultationId: item.consultationId,
                })
              }
            >
              <View style={styles.topRow}>
                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
                <Text style={styles.openText}>Open →</Text>
              </View>
              <Text style={styles.diagnosis}>{item.diagnosis}</Text>
              <Text style={styles.condition}>{item.patientCondition}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No summaries available yet.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  heading: { fontSize: 24, fontWeight: "700", color: COLORS.text, marginBottom: 6 },
  subheading: { fontSize: 14, color: COLORS.subtext, marginBottom: 18, lineHeight: 20 },
  errorText: { color: "red", marginBottom: 10, textAlign: "center" },
  card: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  topRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  date: { fontSize: 12, color: COLORS.subtext },
  openText: { fontSize: 12, color: COLORS.primary, fontWeight: "700" },
  diagnosis: { fontSize: 15, fontWeight: "700", color: COLORS.primary, marginBottom: 4 },
  condition: { fontSize: 14, color: COLORS.text, lineHeight: 21 },
  emptyBox: { marginTop: 40, alignItems: "center" },
  emptyText: { fontSize: 14, color: COLORS.subtext },
});