import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchSummaryHistory } from "../../store/summarySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SummaryHistoryItem } from "../../types";

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
  const { history, loadingHistory } = useAppSelector((state) => state.summary);

  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSummaryHistory());
  }, [dispatch]);

  const filteredHistory = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return history;

    return history.filter((item) => {
      return (
        item.patientName.toLowerCase().includes(keyword) ||
        item.doctorName.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword) ||
        item.date.toLowerCase().includes(keyword)
      );
    });
  }, [history, search]);

  const renderItem = ({ item }: { item: SummaryHistoryItem }) => {
    const expanded = expandedId === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => setExpandedId(expanded ? null : item.id)}
      >
        <View style={styles.cardTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.patientName}>{item.patientName}</Text>
            <Text style={styles.metaText}>Doctor: {item.doctorName}</Text>
            <Text style={styles.metaText}>
              Date: {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>

          <Text style={styles.expandText}>{expanded ? "Hide" : "View"}</Text>
        </View>

        <Text numberOfLines={expanded ? undefined : 3} style={styles.summary}>
          {item.summary}
        </Text>
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
        Doctors can review previous consultation summaries here
      </Text>

      <TextInput
        placeholder="Search by patient, doctor, date or summary..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor="#94A3B8"
      />

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
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
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.subtext,
    marginTop: 6,
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    color: COLORS.text,
  },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  patientName: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },
  metaText: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 4,
  },
  expandText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  summary: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.subtext,
  },
});