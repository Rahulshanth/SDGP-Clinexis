import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { extractMedicines } from "../../services/nlpApi";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [medicines, setMedicines] = useState<string[]>([]);

  const handleExtract = async () => {
    try {
      const data = await extractMedicines(text);
      setMedicines(data.medicines);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Text style={styles.iconText}>Rx</Text>
        </View>
        <Text style={styles.title}>Medicine Extractor</Text>
        <Text style={styles.subtitle}>
          Paste a prescription and identify all medicines quickly.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>PRESCRIPTION TEXT</Text>
        <TextInput
          placeholder="Paste or type your prescription here..."
          placeholderTextColor="#9BAAB8"
          value={text}
          onChangeText={setText}
          multiline
          style={styles.input}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleExtract}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Extract Medicines</Text>
        </TouchableOpacity>
      </View>

      {medicines.length > 0 ? (
        <View style={styles.resultsCard}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Identified Medicines</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{medicines.length} found</Text>
            </View>
          </View>

          {medicines.map((medicine, index) => (
            <View key={`${medicine}-${index}`} style={styles.medItem}>
              <View style={styles.medDot} />
              <Text style={styles.medName}>{medicine}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Results will appear here.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const BLUE = "#3B82F6";
const BLUE_LIGHT = "#EAF3FF";
const NAVY = "#0D1F2D";
const SLATE = "#4A6274";
const BG = "#F0F4F8";
const WHITE = "#FFFFFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24,
    fontWeight: "700",
    color: WHITE,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: NAVY,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: SLATE,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 260,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: BLUE,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  input: {
    backgroundColor: BG,
    borderRadius: 12,
    padding: 14,
    height: 140,
    fontSize: 15,
    color: NAVY,
    lineHeight: 22,
    marginBottom: 16,
  },
  button: {
    backgroundColor: BLUE,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "700",
  },
  resultsCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: NAVY,
  },
  badge: {
    backgroundColor: BLUE_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: BLUE,
  },
  medItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: BG,
    gap: 12,
  },
  medDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BLUE,
  },
  medName: {
    fontSize: 15,
    color: NAVY,
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    color: SLATE,
    fontWeight: "500",
  },
});
