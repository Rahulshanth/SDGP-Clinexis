// Import React
import React from "react";

// Import UI components from React Native
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

// Import icons
import { Ionicons, Feather } from "@expo/vector-icons";

const pharmacyData = {
  name: "HealthFirst Pharmacy",
  license: "License #PH-99283-X",
  rating: 4.8,
  reviewCount: 1240,
  phone: "+1 (555) 123-4567",
  address: "123 Medical Plaza, Downtown",
  isOpen: true,
  hours: {
    weekday: "08:00 AM - 09:00 PM",
    weekend: "10:00 AM - 06:00 PM",
  },
  about: "HealthFirst Pharmacy is committed to providing quality healthcare services to our community. With experienced pharmacists and a wide range of medicines, we ensure the best care for you and your family.",
  services: [
    { id: "1", name: "Medicine Delivery", icon: "bicycle" },
    { id: "2", name: "24/7 Pharmacy", icon: "clock" },
  ],
  reviews: [
    {
      id: "1",
      user: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment: "Great service! The staff is very helpful and the delivery is always on time.",
    },
    {
      id: "2",
      user: "Michael Chen",
      rating: 4,
      date: "1 week ago",
      comment: "Good pharmacy with a wide selection of medicines. Highly recommended.",
    },
    {
      id: "3",
      user: "Emily Davis",
      rating: 5,
      date: "2 weeks ago",
      comment: "Best pharmacy in the area! Very professional and friendly staff.",
    },
  ],
};

const ServiceItem = ({ name, icon }: { name: string; icon: string }) => (
  <View style={styles.serviceItem}>
    <View style={styles.serviceIcon}>
      <Feather name={icon as any} size={20} color="#007AFF" />
    </View>
    <Text style={styles.serviceText}>{name}</Text>
  </View>
);

const ReviewItem = ({
  user,
  rating,
  date,
  comment,
}: {
  user: string;
  rating: number;
  date: string;
  comment: string;
}) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewHeader}>
      <View style={styles.reviewAvatar}>
        <Text style={styles.avatarText}>{user.charAt(0)}</Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text style={styles.reviewUser}>{user}</Text>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name="star"
              size={12}
              color={star <= rating ? "#FFD700" : "#E5E7EB"}
            />
          ))}
          <Text style={styles.reviewDate}>{date}</Text>
        </View>
      </View>
    </View>
    <Text style={styles.reviewComment}>{comment}</Text>
  </View>
);

export default function PharmacyProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pharmacy Profile</Text>
        <TouchableOpacity>
          <Feather name="edit-2" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* PHARMACY INFO CARD */}
      <View style={styles.infoCard}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
            }}
            style={styles.logo}
          />
          <View
            style={[
              styles.statusBadge,
              pharmacyData.isOpen ? styles.openBadge : styles.closedBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {pharmacyData.isOpen ? "Open" : "Closed"}
            </Text>
          </View>
        </View>

        <Text style={styles.pharmacyName}>{pharmacyData.name}</Text>
        <Text style={styles.license}>{pharmacyData.license}</Text>

        {/* Rating */}
        <View style={styles.ratingBox}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{pharmacyData.rating}</Text>
          <Text style={styles.reviewText}>
            • {pharmacyData.reviewCount} Reviews
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="phone" size={18} color="#007AFF" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="location-outline" size={18} color="#007AFF" />
            <Text style={styles.actionText}>Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="share-2" size={18} color="#007AFF" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTACT INFORMATION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={18} color="#6B7280" />
          <Text style={styles.infoText}>{pharmacyData.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#6B7280" />
          <Text style={styles.infoText}>{pharmacyData.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color="#6B7280" />
          <Text style={styles.infoText}>
            Mon - Fri: {pharmacyData.hours.weekday}
          </Text>
          <View
            style={[
              styles.statusBadge,
              pharmacyData.isOpen ? styles.openBadgeSmall : styles.closedBadgeSmall,
            ]}
          >
            <Text style={styles.statusTextSmall}>
              {pharmacyData.isOpen ? "Open" : "Closed"}
            </Text>
          </View>
        </View>
        <Text style={styles.weekendText}>
          Sat - Sun: {pharmacyData.hours.weekend}
        </Text>
      </View>

      {/* ABOUT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT</Text>
        <Text style={styles.aboutText}>{pharmacyData.about}</Text>
      </View>

      {/* SERVICES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OUR SERVICES</Text>
        <View style={styles.servicesContainer}>
          {pharmacyData.services.map((service) => (
            <ServiceItem key={service.id} name={service.name} icon={service.icon} />
          ))}
        </View>
      </View>

      {/* REVIEWS */}
      <View style={styles.section}>
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>REVIEWS</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {pharmacyData.reviews.map((review) => (
          <ReviewItem
            key={review.id}
            user={review.user}
            rating={review.rating}
            date={review.date}
            comment={review.comment}
          />
        ))}
      </View>

      {/* CONTACT US BUTTON */}
      <TouchableOpacity style={styles.contactButton}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" />
        <Text style={styles.contactButtonText}>Contact Us</Text>
      </TouchableOpacity>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity style={styles.logoutButton}>
        <Feather name="log-out" size={20} color="#DC2626" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  infoCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoContainer: {
    position: "relative",
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  statusBadge: {
    position: "absolute",
    bottom: 0,
    right: -5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openBadge: {
    backgroundColor: "#059669",
  },
  closedBadge: {
    backgroundColor: "#DC2626",
  },
  openBadgeSmall: {
    backgroundColor: "#D1FAE5",
  },
  closedBadgeSmall: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextSmall: {
    fontSize: 10,
    fontWeight: "600",
  },
  pharmacyName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 12,
  },
  license: {
    color: "#6B7280",
    marginTop: 4,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  ratingText: {
    marginLeft: 4,
    color: "#111827",
    fontWeight: "600",
    fontSize: 14,
  },
  reviewText: {
    marginLeft: 4,
    color: "#6B7280",
    fontSize: 14,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 90,
  },
  actionText: {
    marginTop: 6,
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    color: "#374151",
    flex: 1,
  },
  weekendText: {
    marginLeft: 28,
    color: "#6B7280",
    fontSize: 14,
  },
  aboutText: {
    color: "#4B5563",
    lineHeight: 22,
  },
  servicesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceItem: {
    alignItems: "center",
    flex: 1,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
    color: "#374151",
    textAlign: "center",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAllText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  reviewInfo: {
    marginLeft: 10,
    flex: 1,
  },
  reviewUser: {
    fontWeight: "600",
    color: "#111827",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  reviewDate: {
    marginLeft: 8,
    color: "#9CA3AF",
    fontSize: 12,
  },
  reviewComment: {
    color: "#4B5563",
    fontSize: 14,
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  contactButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FEF2F2",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
  },
  logoutButtonText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  bottomPadding: {
    height: 40,
  },
});
