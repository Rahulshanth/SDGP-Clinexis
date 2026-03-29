import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function InventoryScreen() {
  const { user } = useSelector((state: RootState) => state.auth);

  const [medicine, setMedicine] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [pharmacyProfile, setPharmacyProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileRes = await api.get("/api/pharmacy-profile");
      const profiles = profileRes.data;
      const myProfile = profiles.find(
      (p: any) => p.pharmacy === (user as any)?._id || p.pharmacy === (user as any)?.id
        );
      if (myProfile) {
        setPharmacyProfile(myProfile);
        fetchMedicines(myProfile._id);
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicines = async (pharmacyId: string) => {
    try {
      const res = await api.get(`/api/pharmacy-inventory/${pharmacyId}`);
      setMedicines(res.data);
    } catch (error) {
      console.log("Error fetching medicines:", error);
    }
  };

  const handleAddMedicine = async () => {
    if (!medicine.trim()) {
      Alert.alert("Error", "Please enter a medicine name");
      return;
    }
    if (!pharmacyProfile) {
      Alert.alert("Error", "Pharmacy profile not found");
      return;
    }
    try {
      setAdding(true);
      await api.post("/api/pharmacy-inventory", {
        name: medicine.trim(),
        quantity: stock,
        price: parseFloat(price) || 0,
        pharmacyId: pharmacyProfile._id,
      });
      Alert.alert("Success", `${medicine} added to inventory!`);
      setMedicine("");
      setPrice("");
      setStock(1);
      fetchMedicines(pharmacyProfile._id);
    } catch (error) {
      Alert.alert("Error", "Failed to add medicine");
      console.log("Error adding medicine:", error);
    } finally {
      setAdding(false);
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "OUT OF STOCK", style: styles.lowStock };
    if (quantity < 20) return { label: "LOW STOCK", style: styles.lowStock };
    return { label: "STABLE", style: styles.stable };
  };

  const getProgressWidth = (quantity: number) => {
    if (quantity === 0) return "0%";
    if (quantity < 20) return "20%";
    if (quantity < 100) return "50%";
    return "90%";
  };

  const getProgressColor = (quantity: number) => {
    if (quantity === 0) return "#ef4444";
    if (quantity < 20) return "orange";
    return "green";
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inventory</Text>
        <Text style={styles.pharmacyName}>
          {pharmacyProfile?.name || ""}
        </Text>
      </View>

      {/* ADD MEDICINE SECTION */}
      <Text style={styles.sectionTitle}>Add Medicine</Text>
      <Text style={styles.subtitle}>Update stock levels and medicine info</Text>

      <Text style={styles.label}>Medicine Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Paracetamol 500mg"
        value={medicine}
        onChangeText={setMedicine}
      />

      <Text style={styles.label}>Price (RS.)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 45.00"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* STOCK COUNTER */}
      <View style={styles.stockBox}>
        <Text style={styles.label}>Stock Count</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => setStock(Math.max(0, stock - 1))}>
            <Text style={styles.counterBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.stockText}>{stock}</Text>
          <TouchableOpacity onPress={() => setStock(stock + 1)}>
            <Text style={styles.counterBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddMedicine}
        disabled={adding}
      >
        {adding ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.addButtonText}>Add to Inventory</Text>
        )}
      </TouchableOpacity>

      {/* CURRENT STOCK */}
      <View style={styles.stockHeader}>
        <Text style={styles.sectionTitle}>Current Stock</Text>
        <Text style={styles.itemCount}>{medicines.length} Items Total</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2F80ED" style={{ marginTop: 20 }} />
      ) : medicines.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No medicines added yet</Text>
        </View>
      ) : (
        medicines.map((med) => {
          const status = getStockStatus(med.quantity);
          return (
            <View key={med._id} style={styles.stockCard}>
              <Text style={styles.medicineName}>{med.name}</Text>
              <View style={styles.stockInfo}>
                <Text style={status.style}>{status.label}</Text>
                <Text style={styles.units}>{med.quantity} units</Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: getProgressWidth(med.quantity),
                      backgroundColor: getProgressColor(med.quantity),
                    },
                  ]}
                />
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  pharmacyName: { fontSize: 14, color: "#6B7280", fontWeight: "600" },
  sectionTitle: { fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "#6B7280", marginBottom: 15 },
  label: { fontWeight: "600", marginBottom: 5 },
  input: { backgroundColor: "white", padding: 12, borderRadius: 10, marginBottom: 15 },
  stockBox: { marginBottom: 15 },
  counter: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 12, borderRadius: 10 },
  counterBtn: { fontSize: 20 },
  stockText: { fontSize: 18 },
  addButton: { backgroundColor: "#2F80ED", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 20 },
  addButtonText: { color: "white", fontWeight: "bold" },
  stockHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  itemCount: { color: "#6B7280" },
  stockCard: { backgroundColor: "white", padding: 15, borderRadius: 12, marginTop: 10 },
  medicineName: { fontWeight: "bold", fontSize: 16 },
  stockInfo: { flexDirection: "row", justifyContent: "space-between", marginVertical: 8 },
  units: { fontWeight: "600" },
  lowStock: { backgroundColor: "#FDE68A", paddingHorizontal: 8, borderRadius: 6 },
  stable: { backgroundColor: "#BBF7D0", paddingHorizontal: 8, borderRadius: 6 },
  progressBar: { height: 6, backgroundColor: "#E5E7EB", borderRadius: 5 },
  progressFill: { height: "100%", borderRadius: 5 },
  emptyBox: { backgroundColor: "white", padding: 30, borderRadius: 12, alignItems: "center", marginTop: 10 },
  emptyText: { color: "#6B7280", fontSize: 16 },
});