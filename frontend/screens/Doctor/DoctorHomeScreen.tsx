import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DoctorHomeScreen() {
  const navigation = useNavigation<any>();

  // Animations
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={{ opacity: fade, transform: [{ translateY: slide }] }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Dr. Michael</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="notifications-outline" size={22} />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput placeholder="Search patients, records..." />
        </View>

        {/* OVERVIEW */}
        <Text style={styles.section}>Overview</Text>

        <View style={styles.cardsRow}>
          <TouchableOpacity style={[styles.card, styles.primaryCard]}>
            <Text style={styles.cardNumber}>142</Text>
            <Text style={styles.cardText}>Patients</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardNumberDark}>08</Text>
            <Text style={styles.cardText}>Consultations</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardNumberDark}>05</Text>
            <Text style={styles.cardText}>Reports</Text>
          </TouchableOpacity>
        </View>

        {/* QUICK ACTION */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LiveTranscript")}
        >
          <Text style={styles.buttonText}>Start Consultation</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  greeting: {
    color: "#6B7280",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 20,
    gap: 10,
  },

  section: {
    fontWeight: "700",
    marginBottom: 10,
  },

  cardsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3,
  },

  primaryCard: {
    backgroundColor: "#2563EB",
  },

  cardNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  cardNumberDark: {
    fontSize: 18,
    fontWeight: "800",
  },

  cardText: {
    fontSize: 12,
    color: "#6B7280",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});