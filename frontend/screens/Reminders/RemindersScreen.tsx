import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import ReminderCard from "../../components/features/Reminder/ReminderCard";
import { ReminderType } from "../../types/reminder.types";

const fakeReminders = [
  {
    _id: "1",
    patientId: "test",
    type: ReminderType.MEDICINE,
    title: "Medicine Reminder (morning)",
    message: "Time to take your medicine. Take aspirin morning and night",
    reminderTime: new Date().toISOString(),
    sent: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    patientId: "test",
    type: ReminderType.APPOINTMENT,
    title: "Appointment Reminder",
    message: "You have an appointment with Dr. Silva today",
    reminderTime: new Date().toISOString(),
    sent: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    patientId: "test",
    type: ReminderType.NOTIFICATION,
    title: "Appointment Cancelled",
    message: "Dr. Fernando has cancelled your appointment",
    reminderTime: new Date().toISOString(),
    sent: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const RemindersScreen = () => {
  const handleDelete = (id: string) => {
    console.log("Delete", id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Reminders</Text>
        <Text style={styles.headerSubtitle}>
          {fakeReminders.length} reminders today
        </Text>
      </View>

      {/* REMINDER LIST */}
      <FlatList
        data={fakeReminders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ReminderCard reminder={item} onDelete={handleDelete} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFF6FF", // light blue background
  },
  header: {
    backgroundColor: "#1E3A8A", // dark blue header
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#93C5FD", // light blue subtitle
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
});

export default RemindersScreen;
