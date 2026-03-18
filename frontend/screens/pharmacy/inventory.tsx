import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InventoryScreen() {

  // Medicine name input
  const [medicine, setMedicine] = useState("");

  // Stock counter
  const [stock, setStock] = useState(120);

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* Back Arrow */}
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Inventory</Text>

        {/* Right Icons */}
        <View style={styles.headerRight}>

          {/* Settings */}
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Ionicons name="settings-outline" size={22} color="#333" />
          </TouchableOpacity>

          {/* Pharmacy Logo (Remote image to avoid crash) */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            }}
            style={styles.profileIcon}
          />

        </View>
      </View>


      {/* ADD MEDICINE SECTION */}
      <Text style={styles.sectionTitle}>Add Medicine</Text>
      <Text style={styles.subtitle}>
        Update stock levels and medicine info
      </Text>

      {/* Medicine Input */}
      <Text style={styles.label}>Medicine Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Paracetamol 500mg"
        value={medicine}
        onChangeText={setMedicine}
      />


      {/* STOCK + UNIT */}
      <View style={styles.row}>

        {/* Stock Counter */}
        <View style={styles.stockBox}>
          <Text style={styles.label}>Stock Count</Text>

          <View style={styles.counter}>

            <TouchableOpacity onPress={() => setStock(stock - 1)}>
              <Text style={styles.counterBtn}>−</Text>
            </TouchableOpacity>

            <Text style={styles.stockText}>{stock}</Text>

            <TouchableOpacity onPress={() => setStock(stock + 1)}>
              <Text style={styles.counterBtn}>+</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Unit Type */}
        <View style={styles.unitBox}>
          <Text style={styles.label}>Unit Type</Text>

          <View style={styles.unitDropdown}>
            <Text>Tablets</Text>
          </View>
        </View>

      </View>


      {/* TAGS */}
      <Text style={styles.label}>Tags</Text>

      <View style={styles.tags}>

        <View style={styles.tagActive}>
          <Text style={styles.tagActiveText}>Prescription</Text>
        </View>

        <View style={styles.tag}>
          <Text>Refrigerated</Text>
        </View>

        <View style={styles.tag}>
          <Text>Urgent</Text>
        </View>

        <View style={styles.tag}>
          <Text>Chronic</Text>
        </View>

      </View>


      {/* AVAILABILITY PROJECTION */}
      <View style={styles.projectionCard}>

        <Text style={styles.projectionTitle}>Availability Projection</Text>

        <Text style={styles.projectionText}>
          Based on current usage, this stock will last
          <Text style={{ color: "#2F80ED", fontWeight: "bold" }}> 42 days</Text>
        </Text>

        <Text style={styles.projectionText}>
          Estimated exhaustion date:
        </Text>

        <Text style={styles.projectionDate}>Feb 24, 2026</Text>

      </View>


      {/* ADD BUTTON */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Inventory</Text>
      </TouchableOpacity>


      {/* CURRENT STOCK */}
      <View style={styles.stockHeader}>
        <Text style={styles.sectionTitle}>Current Stock</Text>
        <Text style={styles.itemCount}>24 Items Total</Text>
      </View>


      {/* Medicine Card 1 */}
      <View style={styles.stockCard}>

        <Text style={styles.medicineName}>Amoxicillin 250mg</Text>

        <View style={styles.stockInfo}>
          <Text style={styles.lowStock}>LOW STOCK</Text>
          <Text style={styles.units}>12 units</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "30%", backgroundColor: "orange" }]} />
        </View>

      </View>


      {/* Medicine Card 2 */}
      <View style={styles.stockCard}>

        <Text style={styles.medicineName}>Lisinopril 10mg</Text>

        <View style={styles.stockInfo}>
          <Text style={styles.stable}>STABLE</Text>
          <Text style={styles.units}>450 units</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "90%", backgroundColor: "green" }]} />
        </View>

      </View>


      {/* Medicine Card 3 */}
      <View style={styles.stockCard}>

        <Text style={styles.medicineName}>Insulin Glargine</Text>

        <View style={styles.stockInfo}>
          <Text style={styles.cold}>COLD CHAIN</Text>
          <Text style={styles.units}>5 vials</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "50%", backgroundColor: "#2F80ED" }]} />
        </View>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold"
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center"
  },

  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 20
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 15
  },

  label: {
    fontWeight: "600",
    marginBottom: 5
  },

  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  stockBox: {
    width: "48%"
  },

  unitBox: {
    width: "48%"
  },

  counter: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10
  },

  counterBtn: {
    fontSize: 20
  },

  stockText: {
    fontSize: 18
  },

  unitDropdown: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15
  },

  tag: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8
  },

  tagActive: {
    backgroundColor: "#2F80ED",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8
  },

  tagActiveText: {
    color: "white"
  },

  projectionCard: {
    backgroundColor: "#EAF2FF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  projectionTitle: {
    color: "#2F80ED",
    fontWeight: "bold"
  },

  projectionText: {
    marginTop: 4
  },

  projectionDate: {
    fontWeight: "bold",
    marginTop: 5
  },

  addButton: {
    backgroundColor: "#2F80ED",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold"
  },

  stockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  itemCount: {
    color: "#6B7280"
  },

  stockCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginTop: 10
  },

  medicineName: {
    fontWeight: "bold",
    fontSize: 16
  },

  stockInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8
  },

  units: {
    fontWeight: "600"
  },

  lowStock: {
    backgroundColor: "#FDE68A",
    paddingHorizontal: 8,
    borderRadius: 6
  },

  stable: {
    backgroundColor: "#BBF7D0",
    paddingHorizontal: 8,
    borderRadius: 6
  },

  cold: {
    backgroundColor: "#E9D5FF",
    paddingHorizontal: 8,
    borderRadius: 6
  },

  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 5
  },

  progressFill: {
    height: "100%",
    borderRadius: 5
  }

});