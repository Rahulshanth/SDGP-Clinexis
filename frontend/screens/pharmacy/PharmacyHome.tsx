import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useSelector((state: RootState) => state.auth);

  const [pharmacyProfile, setPharmacyProfile] = useState<any>(null);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Get pharmacy profile
      const profileRes = await api.get("/api/pharmacy-profile");
      const profiles = profileRes.data;

      // Find profile belonging to logged in user
      const myProfile = profiles.find(
      (p: any) => p.pharmacy === (user as any)?._id || p.pharmacy === (user as any)?.id
        );

      if (myProfile) {
        setPharmacyProfile(myProfile);

        // Get medicines for this pharmacy
        const inventoryRes = await api.get(
          `/api/pharmacy-inventory/${myProfile._id}`
        );
        setMedicines(inventoryRes.data);
      }
    } catch (error) {
      console.log("Error fetching pharmacy data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getQuantityStyle = (quantity: number) => {
    if (quantity === 0) return { pill: styles.quantityDanger, text: styles.quantityTextDanger };
    if (quantity < 20) return { pill: styles.quantityWarning, text: styles.quantityTextWarning };
    return { pill: styles.quantityGood, text: styles.quantityTextGood };
  };

  return (
    <View style={[styles.mainContainer, { paddingTop: Math.max(insets.top, 10) }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
        style={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.title}>
              {loading ? "Loading..." : pharmacyProfile?.name || "My Pharmacy"}
            </Text>
            <View style={styles.branchBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.subtitle}>
                {pharmacyProfile?.address || "Active"}
              </Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#1e293b" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoContainer}>
              <Ionicons name="medical" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={22} color="#94a3b8" />
          <TextInput
            placeholder="Search Medicine..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
          <View style={styles.searchDivider} />
          <TouchableOpacity>
            <MaterialIcons name="tune" size={24} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Overview</Text>
          </View>

          <View style={styles.cardContainer}>
            <TouchableOpacity style={[styles.card, styles.primaryCard]} activeOpacity={0.9}>
              <View style={styles.cardBgCircle1} />
              <View style={styles.cardBgCircle2} />
              <View style={styles.cardIconWrapperPrimary}>
                <Ionicons name="people" size={24} color="#2563eb" />
              </View>
              <Text style={styles.cardNumberWhite}>
                {medicines.length}
              </Text>
              <Text style={styles.cardTextWhite}>Total Medicines</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, styles.secondaryCard]} activeOpacity={0.8}>
              <View style={styles.cardIconWrapperSecondary}>
                <FontAwesome5 name="pills" size={20} color="#3b82f6" />
              </View>
              <Text style={styles.cardNumber}>
                {medicines.filter((m) => m.quantity > 20).length}
              </Text>
              <Text style={styles.cardText}>In{"\n"}Stock</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, styles.tertiaryCard]} activeOpacity={0.8}>
              <View style={styles.cardIconWrapperWarning}>
                <MaterialIcons name="pending-actions" size={24} color="#f97316" />
              </View>
              <Text style={styles.cardNumber}>
                {medicines.filter((m) => m.quantity <= 20).length}
              </Text>
              <Text style={styles.cardText}>Low{"\n"}Stock</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MEDICINE INVENTORY TABLE */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medicine Inventory</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
          ) : medicines.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No medicines in inventory yet</Text>
            </View>
          ) : (
            <View style={styles.inventoryBox}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerText, { flex: 2 }]}>MEDICINE NAME</Text>
                <Text style={[styles.headerText, { flex: 1.2, textAlign: "center" }]}>QUANTITY</Text>
                <Text style={[styles.headerText, { flex: 1, textAlign: "right" }]}>PRICE RS.</Text>
              </View>

              {medicines.map((med, index) => {
                const qStyle = getQuantityStyle(med.quantity);
                return (
                  <View
                    key={med._id}
                    style={[
                      styles.tableRow,
                      index === medicines.length - 1 && { borderBottomWidth: 0 },
                    ]}
                  >
                    <View style={{ flex: 2, flexDirection: "row", alignItems: "center", gap: 12 }}>
                      <View style={[styles.pillIconBg, { backgroundColor: "#eff6ff" }]}>
                        <FontAwesome5 name="tablets" size={16} color="#3b82f6" />
                      </View>
                      <Text style={styles.medicinetitle}>{med.name}</Text>
                    </View>
                    <View style={[styles.quantityPill, qStyle.pill, { flex: 1.2 }]}>
                      <Text style={qStyle.text}>{med.quantity}</Text>
                    </View>
                    <Text style={[styles.rowPrice, { flex: 1, textAlign: "right" }]}>
                      {med.price ? med.price.toFixed(2) : "N/A"}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* WARNING BOX */}
        <View style={styles.warningBox}>
          <View style={styles.warningIconBg}>
            <Ionicons name="information" size={22} color="#ea580c" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>Delivery Notice</Text>
            <Text style={styles.warningText}>
              No home delivery provided. Valid prescription verification required at counter.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#f8fafc" },
  container: { paddingHorizontal: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24, marginTop: 10 },
  greeting: { fontSize: 14, fontWeight: "600", color: "#64748b", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.5 },
  title: { fontSize: 28, fontWeight: "800", color: "#0f172a", letterSpacing: -0.5 },
  branchBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#eff6ff", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 6, alignSelf: "flex-start" },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#10b981", marginRight: 6 },
  subtitle: { color: "#3b82f6", fontSize: 12, fontWeight: "700" },
  headerIcons: { flexDirection: "row", gap: 12, alignItems: "center" },
  iconButton: { position: "relative", padding: 10, borderRadius: 14, backgroundColor: "#ffffff", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  notificationBadge: { position: "absolute", top: 8, right: 10, width: 10, height: 10, backgroundColor: "#ef4444", borderRadius: 5, borderWidth: 2, borderColor: "#ffffff" },
  logoContainer: { width: 46, height: 46, borderRadius: 16, backgroundColor: "#2563eb", justifyContent: "center", alignItems: "center" },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", paddingHorizontal: 16, paddingVertical: 14, borderRadius: 20, marginBottom: 32, shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.04, shadowRadius: 15, elevation: 3 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: "#1e293b", fontWeight: "500" },
  searchDivider: { width: 1, height: 24, backgroundColor: "#e2e8f0", marginRight: 10 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 },
  sectionTitle: { fontSize: 22, fontWeight: "800", color: "#0f172a", letterSpacing: -0.3 },
  cardContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 36, gap: 12 },
  card: { flex: 1, paddingVertical: 20, paddingHorizontal: 12, borderRadius: 24, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  primaryCard: { backgroundColor: "#2563eb", shadowColor: "#2563eb", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 8 },
  cardBgCircle1: { position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.1)" },
  cardBgCircle2: { position: "absolute", bottom: -30, left: -10, width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.1)" },
  secondaryCard: { backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#e2e8f0" },
  tertiaryCard: { backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#e2e8f0" },
  cardIconWrapperPrimary: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  cardIconWrapperSecondary: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#eff6ff", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  cardIconWrapperWarning: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#fff7ed", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  cardNumberWhite: { color: "#ffffff", fontSize: 28, fontWeight: "800", letterSpacing: 0.5 },
  cardTextWhite: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 4, textAlign: "center", fontWeight: "600" },
  cardNumber: { fontSize: 26, fontWeight: "800", color: "#0f172a", letterSpacing: 0.5 },
  cardText: { fontSize: 12, marginTop: 4, textAlign: "center", color: "#64748b", fontWeight: "600", lineHeight: 16 },
  inventoryBox: { backgroundColor: "#ffffff", borderRadius: 24, padding: 6, shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.04, shadowRadius: 15, elevation: 3 },
  tableHeader: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: "#f1f5f9" },
  headerText: { fontSize: 11, fontWeight: "800", color: "#94a3b8", letterSpacing: 1 },
  tableRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: "#f1f5f9", backgroundColor: "#ffffff" },
  pillIconBg: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  medicinetitle: { fontSize: 16, fontWeight: "800", color: "#1e293b" },
  quantityPill: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, justifyContent: "center", alignItems: "center", alignSelf: "center" },
  quantityGood: { backgroundColor: "#dcfce7" },
  quantityWarning: { backgroundColor: "#fef3c7" },
  quantityDanger: { backgroundColor: "#fee2e2" },
  quantityTextGood: { color: "#16a34a", fontWeight: "800", fontSize: 13 },
  quantityTextWarning: { color: "#d97706", fontWeight: "800", fontSize: 13 },
  quantityTextDanger: { color: "#dc2626", fontWeight: "800", fontSize: 13 },
  rowPrice: { fontSize: 16, color: "#0f172a", fontWeight: "800" },
  emptyBox: { backgroundColor: "#ffffff", borderRadius: 24, padding: 30, alignItems: "center" },
  emptyText: { color: "#94a3b8", fontSize: 16, fontWeight: "600" },
  warningBox: { flexDirection: "row", backgroundColor: "#fff7ed", padding: 16, borderRadius: 20, marginTop: 24, alignItems: "center", gap: 16, borderLeftWidth: 4, borderLeftColor: "#ea580c", marginBottom: 20 },
  warningIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#ffedd5", justifyContent: "center", alignItems: "center" },
  warningTitle: { fontSize: 15, fontWeight: "800", color: "#9a3412", marginBottom: 4 },
  warningText: { color: "#ea580c", fontSize: 13, lineHeight: 18, fontWeight: "600" },
});