/*import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

export default function DoctorSettingsScreen() {
  const navigation = useNavigation<any>();

  const [appointmentAlerts, setAppointmentAlerts] = useState(true);
  const [reportAlerts, setReportAlerts] = useState(true);
  const [availabilityVisible, setAvailabilityVisible] = useState(true);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Auth");
  };

  const SettingRow = ({
    icon,
    iconFamily = "Ionicons",
    iconColor = "#2563EB",
    title,
    value,
    onPress,
    showArrow = true,
    rightElement,
  }: any) => {
    const renderIcon = () => {
      if (iconFamily === "MaterialIcons") {
        return <MaterialIcons name={icon} size={20} color={iconColor} />;
      }
      if (iconFamily === "Feather") {
        return <Feather name={icon} size={20} color={iconColor} />;
      }
      return <Ionicons name={icon} size={20} color={iconColor} />;
    };

    return (
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={onPress ? 0.75 : 1}
      >
        <View style={styles.rowLeft}>
          <View style={styles.iconBox}>{renderIcon()}</View>
          <Text style={styles.rowTitle}>{title}</Text>
        </View>

        <View style={styles.rowRight}>
          {value ? <Text style={styles.rowValue}>{value}</Text> : null}
          {rightElement ? rightElement : null}
          {!rightElement && showArrow ? (
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>

        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.card}>

        <SettingRow
          icon="cash-outline"
          title="Consultation Fee"
          value="LKR 3000"
          onPress={() => {}}
        />
      </View>

      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.card}>
        <SettingRow
          icon="notifications-outline"
          title="Appointment Alerts"
          showArrow={false}
          rightElement={
            <Switch
              value={appointmentAlerts}
              onValueChange={setAppointmentAlerts}
              trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
              thumbColor={appointmentAlerts ? "#2563EB" : "#F8FAFC"}
            />
          }
        />

        <SettingRow
          icon="document-text-outline"
          title="Report Notifications"
          showArrow={false}
          rightElement={
            <Switch
              value={reportAlerts}
              onValueChange={setReportAlerts}
              trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
              thumbColor={reportAlerts ? "#2563EB" : "#F8FAFC"}
            />
          }
        />

        <SettingRow
          icon="eye-outline"
          title="Show Availability to Patients"
          showArrow={false}
          rightElement={
            <Switch
              value={availabilityVisible}
              onValueChange={setAvailabilityVisible}
              trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
              thumbColor={availabilityVisible ? "#2563EB" : "#F8FAFC"}
            />
          }
        />
      </View>

      <Text style={styles.sectionTitle}>Support</Text>
      <View style={styles.card}>
        <SettingRow
          icon="lock-closed-outline"
          title="Privacy & Security"
          onPress={() => {}}
        />

        <SettingRow
          icon="shield-checkmark-outline"
          title="Terms & Policies"
          onPress={() => {}}
        />

        <SettingRow
          icon="help-circle-outline"
          title="Help Center"
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={18} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 8,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  headerSpacer: {
    width: 42,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 6,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },

  row: {
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  rowTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },

  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rowValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    marginRight: 4,
  },

  logoutButton: {
    backgroundColor: "#EF4444",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});*/