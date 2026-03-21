import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const PatientProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Nadithi Moonasingha");
  const [email, setEmail] = useState("patient@example.com");
  const [phone, setPhone] = useState("+94 77 123 4567");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [age, setAge] = useState("24");

  // ✅ NULL initially → show icon
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleEditPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required to access gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?");
  };

  const renderField = (
    icon: keyof typeof Ionicons.glyphMap,
    label: string,
    value: string,
    setter: (text: string) => void
  ) => (
    <View style={styles.fieldCard}>
      <View style={styles.fieldLabelRow}>
        <Ionicons name={icon} size={18} color="#2EA7FF" />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setter}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <LinearGradient colors={["#1E3A8A", "#2EA7FF"]} style={styles.header}>
        <View style={styles.profileHeader}>
          
          <View style={styles.avatarWrapper}>
            {/* ✅ ICON OR IMAGE */}
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color="#2EA7FF" />
              </View>
            )}

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleEditPhoto}
            >
              <Ionicons name="camera-outline" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.name}>{name}</Text>
          )}

          <Text style={styles.subtitle}>Patient Account</Text>
        </View>
      </LinearGradient>

      {/* MAIN */}
      <View style={styles.mainCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              style={styles.editIconButton}
            >
              <Ionicons
                name={isEditing ? "close-outline" : "create-outline"}
                size={18}
                color="#2EA7FF"
              />
            </TouchableOpacity>
          </View>

          {renderField("mail-outline", "Email", email, setEmail)}
          {renderField("call-outline", "Phone", phone, setPhone)}
          {renderField("water-outline", "Blood Group", bloodGroup, setBloodGroup)}
          {renderField("calendar-outline", "Age", age, setAge)}

          {isEditing ? (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PatientProfileScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#1E3A8A" },

  header: {
    padding: 20,
    paddingBottom: 70,
    alignItems: "center",
  },

  profileHeader: { alignItems: "center" },

  avatarWrapper: { position: "relative", marginBottom: 14 },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },

  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EAF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: -2,
    backgroundColor: "#2EA7FF",
    padding: 8,
    borderRadius: 16,
  },

  name: { color: "#fff", fontSize: 22, fontWeight: "600" },

  nameInput: {
    color: "#fff",
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    textAlign: "center",
  },

  subtitle: { color: "#DCEBFF", fontSize: 13, marginTop: 6 },

  mainCard: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    padding: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: { fontSize: 17, fontWeight: "600" },

  editIconButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },

  fieldCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  fieldLabel: { marginLeft: 6, color: "#6B7280" },

  fieldValue: { fontSize: 15, color: "#1E2A3A" },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 10,
  },

  editButton: {
    backgroundColor: "#2EA7FF",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  saveButton: {
    backgroundColor: "#16A34A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  logoutButton: {
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: { color: "#fff", fontWeight: "600" },
});

//Added by Nadithi