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
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const PatientProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Nadithi Moonasingha");
  const [email, setEmail] = useState("patient@example.com");
  const [phone, setPhone] = useState("+94 77 123 4567");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [age, setAge] = useState("24");

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleEditPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
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
    Alert.alert("Profile updated successfully");
  };

  const renderField = (
    icon: keyof typeof Ionicons.glyphMap,
    label: string,
    value: string,
    setter: (text: string) => void
  ) => (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <Ionicons name={icon} size={16} color="#3b82f6" />
        <Text style={styles.label}>{label}</Text>
      </View>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setter}
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color="#3b82f6" />
              </View>
            )}

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleEditPhoto}
            >
              <Ionicons name="camera" size={14} color="#fff" />
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
        </View>

        {/* INFO */}
        {renderField("mail-outline", "Email", email, setEmail)}
        {renderField("call-outline", "Phone", phone, setPhone)}
        {renderField("water-outline", "Blood Group", bloodGroup, setBloodGroup)}
        {renderField("calendar-outline", "Age", age, setAge)}

        {/* BUTTONS */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.primaryButtonText}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => Alert.alert("Logout")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },

  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3b82f6",
    padding: 6,
    borderRadius: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },

  nameInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  label: {
    marginLeft: 6,
    color: "#64748b",
    fontSize: 13,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
  },

  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 10,
  },

  primaryButton: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  logoutButton: {
    marginTop: 10,
    padding: 14,
    alignItems: "center",
  },

  logoutText: {
    color: "#ef4444",
    fontWeight: "600",
  },
});

//Added by Nadithi