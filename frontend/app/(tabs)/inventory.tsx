import React, { useState } from "react";
import PharmacyBottomNav from "../../components/PharmacyBottomNav";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function InventoryScreen() {
  const insets = useSafeAreaInsets();
  const [medicine, setMedicine] = useState("");
  const [stock, setStock] = useState(120);

  return (
    <View style={[styles.mainContainer, { paddingTop: Math.max(insets.top, 10) }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 120) }}
        style={styles.container}
      >
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color="#1e293b" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Inventory</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="settings-outline" size={22} color="#1e293b" />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <View style={styles.verifiedBadge}>
                <MaterialCommunityIcons name="check-decagram" size={10} color="#0ea5e9" />
              </View>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png", 
                }}
                style={styles.profileIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* ================= ADD MEDICINE HEADER ================= */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Add Medicine</Text>
          <Text style={styles.subtitle}>Update stock levels and medicine info</Text>
        </View>

        {/* ================= INPUT SECTION ================= */}
        <View style={styles.inputSection}>
          {/* Medicine Name Label */}
          <Text style={styles.label}>Medicine Name</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="pill" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Paracetamol 500mg"
              placeholderTextColor="#94a3b8"
              value={medicine}
              onChangeText={setMedicine}
            />
          </View>

          {/* Stock + Unit */}
          <View style={styles.row}>
            {/* Stock Counter */}
            <View style={styles.stockBox}>
              <Text style={styles.label}>Stock Count</Text>
              <View style={styles.counterWrapper}>
                <TouchableOpacity 
                  style={styles.counterBtn} 
                  onPress={() => setStock(Math.max(0, stock - 1))}
                  activeOpacity={0.7}
                >
                  <Feather name="minus" size={20} color="#3b82f6" />
                </TouchableOpacity>

                <Text style={styles.stockText}>{stock}</Text>

                <TouchableOpacity 
                  style={styles.counterBtn} 
                  onPress={() => setStock(stock + 1)}
                  activeOpacity={0.7}
                >
                  <Feather name="plus" size={20} color="#3b82f6" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Unit Type */}
            <View style={styles.unitBox}>
              <Text style={styles.label}>Unit Type</Text>
              <View style={styles.dropdownWrapper}>
                <Text style={styles.dropdownText}>Tablets</Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </View>
            </View>
          </View>

          {/* TAGS */}
          <Text style={styles.label}>Tags</Text>
          <View style={styles.tagsContainer}>
            <TouchableOpacity style={styles.tagActive} activeOpacity={0.8}>
              <Ionicons name="checkmark" size={14} color="#ffffff" style={{marginRight: 4}} />
              <Text style={styles.tagActiveText}>Prescription</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tag} activeOpacity={0.8}>
              <Text style={styles.tagText}>Refrigerated</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tag} activeOpacity={0.8}>
              <Text style={styles.tagText}>Urgent</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tag} activeOpacity={0.8}>
              <Text style={styles.tagText}>Chronic</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= AVAILABILITY PROJECTION ================= */}
        <View>
          <View style={styles.projectionCard}>
            <View style={styles.projectionIconWrapper}>
              <MaterialCommunityIcons name="calculator-variant-outline" size={24} color="#0ea5e9" />
            </View>
            <View style={styles.projectionContent}>
              <Text style={styles.projectionTitle}>Availability Projection</Text>
              <Text style={styles.projectionDesc}>
                Based on current usage, this stock will last <Text style={styles.highlightText}>42 days</Text>. 
                Estimated exhaustion date:
              </Text>
              <Text style={styles.projectionDate}>Nov 24, 2024</Text>
            </View>
          </View>
        </View>

        {/* ================= ADD BUTTON ================= */}
        <View>
          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <Ionicons name="add-circle-outline" size={22} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.addButtonText}>Add to Inventory</Text>
          </TouchableOpacity>
        </View>

        {/* ================= CURRENT STOCK LIST ================= */}
        <View style={styles.stockSection}>
          <View style={styles.stockHeader}>
            <Text style={styles.sectionTitle}>Current Stock</Text>
            <View style={styles.itemCountBadge}>
              <Text style={styles.itemCountText}>24 Items Total</Text>
            </View>
          </View>

          {/* Item 1 */}
          <View style={styles.stockCardWrapper}>
            <View style={styles.stockCardHeader}>
              <Text style={styles.medicineName}>Amoxicillin 250mg</Text>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={styles.stockAmountText}>12</Text>
                <Text style={styles.stockUnitText}> units</Text>
              </View>
            </View>
            <View style={styles.stockCardMetaRow}>
              <View style={styles.badgesRow}>
                <View style={[styles.badgePill, {backgroundColor: '#eff6ff'}]}>
                  <Text style={[styles.badgeText, {color: '#3b82f6'}]}>ANTIBIOTIC</Text>
                </View>
                <View style={[styles.badgePill, {backgroundColor: '#fef3c7'}]}>
                  <Text style={[styles.badgeText, {color: '#d97706'}]}>LOW STOCK</Text>
                </View>
              </View>
              <Text style={styles.availableDaysText}>Available: 4 days</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "15%", backgroundColor: "#f59e0b" }]} />
            </View>
          </View>

          {/* Item 2 */}
          <View style={styles.stockCardWrapper}>
            <View style={styles.stockCardHeader}>
              <Text style={styles.medicineName}>Lisinopril 10mg</Text>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={styles.stockAmountText}>450</Text>
                <Text style={styles.stockUnitText}> units</Text>
              </View>
            </View>
            <View style={styles.stockCardMetaRow}>
              <View style={styles.badgesRow}>
                <View style={[styles.badgePill, {backgroundColor: '#eff6ff'}]}>
                  <Text style={[styles.badgeText, {color: '#3b82f6'}]}>CHRONIC</Text>
                </View>
                <View style={[styles.badgePill, {backgroundColor: '#dcfce7'}]}>
                  <Text style={[styles.badgeText, {color: '#16a34a'}]}>STABLE</Text>
                </View>
              </View>
              <Text style={styles.availableDaysText}>Available: 90+ days</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "85%", backgroundColor: "#10b981" }]} />
            </View>
          </View>

          {/* Item 3 */}
          <View style={[styles.stockCardWrapper, {borderBottomWidth: 0}]}>
            <View style={styles.stockCardHeader}>
              <Text style={styles.medicineName}>Insulin Glargine</Text>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={styles.stockAmountText}>5</Text>
                <Text style={styles.stockUnitText}> vials</Text>
              </View>
            </View>
            <View style={styles.stockCardMetaRow}>
              <View style={styles.badgesRow}>
                <View style={[styles.badgePill, {backgroundColor: '#f3e8ff'}]}>
                  <Text style={[styles.badgeText, {color: '#c084fc'}]}>COLD CHAIN</Text>
                </View>
              </View>
              <Text style={styles.availableDaysText}>Available: 15 days</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "40%", backgroundColor: "#3b82f6" }]} />
            </View>
          </View>

        </View>
      </ScrollView>
      <PharmacyBottomNav activeTab="Inventory" />
    </View>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoContainer: {
    position: "relative",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 24,
    height: 24,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    zIndex: 10,
  },
  titleSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  inputSection: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 16,
  },
  stockBox: {
    flex: 1,
  },
  unitBox: {
    flex: 1,
  },
  counterWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    height: 52,
    paddingHorizontal: 8,
  },
  counterBtn: {
    padding: 8,
  },
  stockText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  dropdownWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    height: 52,
    paddingHorizontal: 14,
  },
  dropdownText: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  tagActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0ea5e9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagActiveText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  tag: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "600",
  },
  projectionCard: {
    flexDirection: "row",
    backgroundColor: "#f0f9ff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0f2fe",
  },
  projectionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#0ea5e9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  projectionContent: {
    flex: 1,
  },
  projectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0284c7",
    marginBottom: 6,
  },
  projectionDesc: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
  highlightText: {
    fontWeight: "800",
    color: "#0284c7",
  },
  projectionDate: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 6,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0ea5e9",
    borderRadius: 14,
    height: 54,
    marginBottom: 30,
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  stockSection: {
    marginBottom: 20,
  },
  stockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  itemCountBadge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  stockCardWrapper: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },
  stockCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  stockAmountText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },
  stockUnitText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  stockCardMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 8,
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  availableDaysText: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "500",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  }
});