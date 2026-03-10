import React from "react";
import PharmacyBottomNav from "../../components/PharmacyBottomNav";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PharmacyProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.mainContainer, { paddingTop: Math.max(insets.top, 10) }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 40) }}
        style={styles.container}
      >
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color="#334155" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pharmacy Profile</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="settings-outline" size={22} color="#334155" />
          </TouchableOpacity>
        </View>

        {/* ================= PROFILE CARD (TOP) ================= */}
        <View style={styles.profileSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBorder}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png", 
                  // using the provided image or placeholder
                }}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check-decagram" size={20} color="#0ea5e9" />
            </View>
          </View>

          <Text style={styles.pharmacyName}>Gagana Pharmacy</Text>
          
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#0ea5e9" />
            <Text style={styles.ratingText}>4.8</Text>
            <Text style={styles.reviewsText}>(1.2k Reviews)</Text>
          </View>
          
          <Text style={styles.licenseText}>License: #PH-99283-00</Text>

          {/* EDIT BUTTON */}
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Feather name="edit-2" size={16} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* ACTION BUTTONS */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Ionicons name="call-outline" size={20} color="#0284c7" />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="directions" size={20} color="#0284c7" />
              <Text style={styles.actionText}>Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Ionicons name="share-social-outline" size={20} color="#0284c7" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= ABOUT SECTION ================= */}
        <View style={styles.cardHeader}>
          <Ionicons name="information-circle-outline" size={22} color="#0284c7" />
          <Text style={styles.cardTitle}>About Pharmacy</Text>
        </View>
        <View style={[styles.cardContainer, styles.cardTopRoundedOnly]}>
          <Text style={styles.aboutText}>
            Dedicated to providing high-quality healthcare and medication management services to our community. Our mission is to ensure every patient receives personalized care and expert pharmacological advice for their chronic and acute needs.
          </Text>
        </View>

        {/* Spacer between cards to create the split look */}
        <View style={{ height: 16 }} />

        {/* ================= CONTACT INFORMATION ================= */}
        <View style={styles.cardHeader}>
          <Ionicons name="help-circle-outline" size={22} color="#0284c7" />
          <Text style={styles.cardTitle}>Contact Information</Text>
        </View>
        <View style={[styles.cardContainer, styles.cardTopRoundedOnly]}>
          
          {/* Phone */}
          <View style={styles.contactRow}>
            <View style={styles.contactIconBg}>
              <Ionicons name="call-outline" size={18} color="#64748b" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactValue}>+1 (555) 123-4567</Text>
              <Text style={styles.contactLabel}>Primary Contact Line</Text>
            </View>
          </View>

          {/* Email */}
          <View style={styles.contactRow}>
            <View style={styles.contactIconBg}>
              <Ionicons name="mail-outline" size={18} color="#64748b" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactValue}>contact@clinexiscentral.com</Text>
              <Text style={styles.contactLabel}>Business Inquiries</Text>
            </View>
          </View>

          {/* Location */}
          <View style={[styles.contactRow, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}>
            <View style={styles.contactIconBg}>
              <Ionicons name="location-outline" size={20} color="#64748b" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactValue}>742 Medical Mile, Health City, HC 90210</Text>
              <TouchableOpacity>
                <Text style={styles.viewMapText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* ================= LOGOUT ================= */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" style={{ marginRight: 8, transform: [{ rotateY: '180deg' }] }} />
          <Text style={styles.logoutButtonText}>Logout Account</Text>
        </TouchableOpacity>

      </ScrollView>
      <PharmacyBottomNav activeTab="Profile" />
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  headerBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  logoContainer: {
    position: "relative",
    marginBottom: 16,
  },
  logoBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 2,
    right: 6,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 2,
  },
  pharmacyName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0ea5e9",
  },
  reviewsText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  licenseText: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
    marginBottom: 20,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0284c7",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#0284c7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0f2fe",
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#0f172a",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#f1f5f9",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  cardTopRoundedOnly: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 24,
    color: "#475569",
    fontWeight: "500",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
    gap: 16,
  },
  contactIconBg: {
    width: 24,
    alignItems: "center",
  },
  contactInfo: {
    flex: 1,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  contactLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  viewMapText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0ea5e9",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#fee2e2",
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ef4444",
  }
});
