import React, { useEffect, useState, useMemo } from "react";
import {
  ActivityIndicator, FlatList, SafeAreaView,
  StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchSummaryHistory } from "../../store/summarySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SummaryHistoryItem } from "../../types";
import { DoctorStackParamList } from "../../navigation/DoctorNavigator";

type Nav = NativeStackNavigationProp<DoctorStackParamList>;

const COLORS = {
  background: "#F7F8FC",
  card: "#FFFFFF",
  border: "#E6EAF2",
  text: "#1F2937",
  subtext: "#6B7280",
  primary: "#2D6CDF",
};

const SummaryHistoryScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Nav>();
  const { history, loadingHistory } = useAppSelector((state) => state.summary);

  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSummaryHistory());
  }, []);

  const filteredHistory = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return history;
    return history.filter(
      (item) =>
        item.patientCondition.toLowerCase().includes(keyword) ||
        item.diagnosis.toLowerCase().includes(keyword) ||
        new Date(item.createdAt).toLocaleDateString().includes(keyword)
    );
  }, [history, search]);

  const renderItem = ({ item }: { item: SummaryHistoryItem }) => {
    const expanded = expandedId === item._id;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => setExpandedId(expanded ? null : item._id)}
      >
        <View style={styles.cardTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.diagnosis}>{item.diagnosis}</Text>
            <Text style={styles.metaText}>
              Condition: {item.patientCondition}
            </Text>
            <Text style={styles.metaText}>
              Date: {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.expandText}>{expanded ? "Hide" : "View"}</Text>
        </View>

        {expanded && (
          <TouchableOpacity
            style={styles.openButton}
            onPress={() =>
              navigation.navigate("CurrentSummary", {
                consultationId: item.consultationId,
              })
            }
          >
            <Text style={styles.openButtonText}>Open Full Summary →</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  if (loadingHistory) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading summary history...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Summary History</Text>
      <Text style={styles.subtitle}>
        Review previous consultation summaries
      </Text>

      <TextInput
        placeholder="Search by condition, diagnosis or date..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor="#94A3B8"
      />

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No previous summaries found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default SummaryHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: COLORS.background,
    paddingHorizontal: 16, paddingTop: 16,
  },
  centered: {
    flex: 1, backgroundColor: COLORS.background,
    justifyContent: "center", alignItems: "center",
  },
  loadingText: { marginTop: 10, color: COLORS.subtext, fontSize: 14 },
  title: { fontSize: 24, fontWeight: "700", color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.subtext, marginTop: 6, marginBottom: 14 },
  searchInput: {
    backgroundColor: COLORS.card, borderWidth: 1,
    borderColor: COLORS.border, borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 12,
    marginBottom: 16, color: COLORS.text,
  },
  card: {
    backgroundColor: COLORS.card, borderWidth: 1,
    borderColor: COLORS.border, borderRadius: 16,
    padding: 15, marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row", alignItems: "flex-start",
    justifyContent: "space-between", marginBottom: 6,
  },
  diagnosis: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  metaText: { fontSize: 13, color: COLORS.subtext, marginTop: 4 },
  expandText: { color: COLORS.primary, fontSize: 13, fontWeight: "700" },
  openButton: {
    marginTop: 10, backgroundColor: "#EFF6FF",
    borderRadius: 10, padding: 10, alignItems: "center",
  },
  openButtonText: { color: COLORS.primary, fontWeight: "700", fontSize: 14 },
  emptyCard: {
    backgroundColor: COLORS.card, borderRadius: 16,
    padding: 18, borderWidth: 1,
    borderColor: COLORS.border, marginTop: 20,
  },
  emptyText: { fontSize: 14, color: COLORS.subtext },
}); 