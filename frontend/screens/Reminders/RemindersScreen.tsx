import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import ReminderCard from "../../components/features/Reminder/ReminderCard";
import { ReminderType } from "../../types/reminder.types";

const INITIAL_REMINDERS = [
  {
    _id: "1",
    patientId: "test",
    type: ReminderType.MEDICINE,
    title: "Medicine Reminder (Afternoon)",
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
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState<ReminderType>(
    ReminderType.MEDICINE,
  );
  const [reminderTime, setReminderTime] = useState("08:00 AM");

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setTitle("");
    setMessage("");
    setSelectedType(ReminderType.MEDICINE);
    setReminderTime("08:00 AM");
    setModalVisible(true);
  };

  const openEditModal = (reminder: (typeof INITIAL_REMINDERS)[0]) => {
    setIsEditing(true);
    setEditingId(reminder._id);
    setTitle(reminder.title);
    setMessage(reminder.message);
    setSelectedType(reminder.type);
    setReminderTime("08:00 AM"); // ← default time when editing
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (isEditing && editingId) {
      setReminders((prev) =>
        prev.map((r) =>
          r._id === editingId
            ? {
                ...r,
                title: title.trim(),
                message: message.trim(),
                type: selectedType,
              }
            : r,
        ),
      );
      Alert.alert("Success", "Reminder updated successfully!");
    } else {
      const newReminder = {
        _id: Date.now().toString(),
        patientId: "test",
        type: selectedType,
        title: title.trim(),
        message: message.trim(),
        reminderTime: new Date().toISOString(),
        sent: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setReminders((prev) => [...prev, newReminder]);
      Alert.alert("Success", "New reminder added!");
    }
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setReminders((prev) => prev.filter((r) => r._id !== id)),
        },
      ],
    );
  };

  const medicineReminders = reminders.filter(
    (r) => r.type === ReminderType.MEDICINE,
  );
  const otherReminders = reminders.filter(
    (r) => r.type !== ReminderType.MEDICINE,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Reminders</Text>
          <Text style={styles.headerSubtitle}>
            {reminders.length} reminders today
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Medicine Reminders */}
        {medicineReminders.length > 0 && (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>💊 MEDICINE REMINDERS</Text>
            {medicineReminders.map((item) => (
              <View key={item._id} style={styles.cardWrapper}>
                <ReminderCard reminder={item} onDelete={handleDelete} />
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => openEditModal(item)}
                >
                  <Text style={styles.editBtnText}>✏️ Edit</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Other Reminders */}
        {otherReminders.length > 0 && (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>🔔 OTHER REMINDERS</Text>
            {otherReminders.map((item) => (
              <View key={item._id} style={styles.cardWrapper}>
                <ReminderCard reminder={item} onDelete={handleDelete} />
              </View>
            ))}
          </View>
        )}

        {/* Empty state */}
        {reminders.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>No reminders yet</Text>
            <TouchableOpacity style={styles.emptyAddBtn} onPress={openAddModal}>
              <Text style={styles.emptyAddBtnText}>
                + Add your first reminder
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* ADD / EDIT MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEditing ? "Edit Reminder" : "Add New Reminder"}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Type selector — only for new reminders */}
              {!isEditing && (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Reminder Type</Text>
                  <View style={styles.typeRow}>
                    {[
                      { type: ReminderType.MEDICINE, label: "💊 Medicine" },
                      {
                        type: ReminderType.APPOINTMENT,
                        label: "📅 Appointment",
                      },
                    ].map((t) => (
                      <TouchableOpacity
                        key={t.type}
                        style={[
                          styles.typeChip,
                          selectedType === t.type && styles.typeChipActive,
                        ]}
                        onPress={() => setSelectedType(t.type)}
                      >
                        <Text
                          style={[
                            styles.typeChipText,
                            selectedType === t.type &&
                              styles.typeChipTextActive,
                          ]}
                        >
                          {t.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Title */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Title</Text>
                <TextInput
                  style={styles.formInput}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g. Morning Medicine"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Message */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Message</Text>
                <TextInput
                  style={[styles.formInput, styles.formTextArea]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="e.g. Take 1 tablet of Paracetamol"
                  placeholderTextColor="#94A3B8"
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* ✅ FIXED — Time picker shows for medicine reminders in BOTH add and edit mode */}
              {selectedType === ReminderType.MEDICINE && (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Reminder Time</Text>
                  <View style={styles.timeRow}>
                    {[
                      "07:00 AM",
                      "08:00 AM",
                      "12:00 PM",
                      "06:00 PM",
                      "09:00 PM",
                    ].map((t) => (
                      <TouchableOpacity
                        key={t}
                        style={[
                          styles.timeChip,
                          reminderTime === t && styles.timeChipActive,
                        ]}
                        onPress={() => setReminderTime(t)}
                      >
                        <Text
                          style={[
                            styles.timeChipText,
                            reminderTime === t && styles.timeChipTextActive,
                          ]}
                        >
                          {t}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Save Button */}
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>
                  {isEditing ? "Save Changes" : "Add Reminder"}
                </Text>
              </TouchableOpacity>

              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#EFF6FF" },
  header: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#FFFFFF" },
  headerSubtitle: { fontSize: 14, color: "#93C5FD", marginTop: 4 },
  addBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnText: { fontSize: 14, fontWeight: "700", color: "#1E3A8A" },
  scroll: { flex: 1 },
  sectionBlock: { paddingHorizontal: 16, marginTop: 20 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1E3A8A",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  cardWrapper: { marginBottom: 12 },
  editBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginTop: 6,
  },
  editBtnText: { fontSize: 13, fontWeight: "600", color: "#1E3A8A" },
  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: "#94A3B8", marginBottom: 20 },
  emptyAddBtn: {
    backgroundColor: "#1E3A8A",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emptyAddBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: "#0F172A" },
  modalClose: { fontSize: 20, color: "#94A3B8", padding: 4 },
  formGroup: { marginBottom: 16 },
  formLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1E293B",
  },
  formTextArea: { height: 90, textAlignVertical: "top" },
  typeRow: { flexDirection: "row", gap: 10 },
  typeChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
  },
  typeChipActive: { backgroundColor: "#EFF6FF", borderColor: "#1E3A8A" },
  typeChipText: { fontSize: 13, fontWeight: "600", color: "#64748B" },
  typeChipTextActive: { color: "#1E3A8A" },
  timeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  timeChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  timeChipActive: { backgroundColor: "#1E3A8A", borderColor: "#1E3A8A" },
  timeChipText: { fontSize: 12, fontWeight: "500", color: "#475569" },
  timeChipTextActive: { color: "#fff" },
  saveBtn: {
    backgroundColor: "#1E3A8A",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

export default RemindersScreen;
