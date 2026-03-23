/*import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const COLORS = {
  primary: "#2EA7FF",
  background: "#F5F7FB",
  white: "#FFFFFF",
  text: "#1E2A3A",
  subtext: "#8A94A6",
  border: "#E8EEF5",
};

const summaries = [
  {
    id: "1",
    date: "2026-03-10",
    doctor: "Dr. Perera",
    summary:
      "Patient reported headache and mild fever. Prescribed medication for 3 days.",
  },
  {
    id: "2",
    date: "2026-03-12",
    doctor: "Dr. Silva",
    summary:
      "Follow-up consultation completed. Patient condition improved.",
  },
];

const PatientSummaryScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Consultation Summaries</Text>
        <Text style={styles.subheading}>
          View your previous consultation summaries and follow-up notes
        </Text>

        <FlatList
          data={summaries}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.card}
              onPress={() =>
                navigation?.navigate?.("PatientConsultationRecord", {
                  summaryId: item.id,
                })
              }
            >
              <View style={styles.topRow}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.openText}>Open</Text>
              </View>

              <Text style={styles.doctor}>{item.doctor}</Text>
              <Text style={styles.summary}>{item.summary}</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: COLORS.subtext,
    marginBottom: 18,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: COLORS.subtext,
  },
  openText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
  },
  doctor: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 21,
  },
  emptyBox: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.subtext,
  },
});

export default PatientSummaryScreen;

//edit by rivithi*/