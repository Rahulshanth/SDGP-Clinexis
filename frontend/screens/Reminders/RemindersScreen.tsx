import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ReminderCard from "../../components/features/Reminder/ReminderCard";
import { ReminderType } from "../../types/reminder.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchReminders,
  addMedicineReminder,
  removeReminder,
} from "../../store/reminder.Slice";

// ── Time slots per type ────────────────────────────────────────────────────────
const TIME_SLOTS: Record<string, string[]> = {
  [ReminderType.MEDICINE]: [
    "07:00 AM",
    "08:00 AM",
    "12:00 PM",
    "06:00 PM",
    "09:00 PM",
  ],
  [ReminderType.APPOINTMENT]: [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ],
};

// ── 24h → display label (for pre-selecting slot from saved reminderTime) ───────
const TIME_MAP: Record<string, string> = {
  "07:00 AM": "07:00",
  "08:00 AM": "08:00",
  "09:00 AM": "09:00",
  "10:00 AM": "10:00",
  "11:00 AM": "11:00",
  "12:00 PM": "12:00",
  "01:00 PM": "13:00",
  "02:00 PM": "14:00",
  "03:00 PM": "15:00",
  "04:00 PM": "16:00",
  "05:00 PM": "17:00",
  "06:00 PM": "18:00",
  "09:00 PM": "21:00",
};

// ── Fix 1: Convert UTC ISO string → Sri Lanka local time label ─────────────────
// MongoDB stores UTC. Sri Lanka = UTC+5:30
// So we add 5h30m offset before extracting hours/minutes
const isoToLocalTimeLabel = (isoString: string): string => {
  const date = new Date(isoString);

  // Convert to Sri Lanka time (UTC+5:30)
  const sriLankaOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in ms
  const localDate = new Date(date.getTime() + sriLankaOffset);

  const hours = localDate.getUTCHours(); // use UTC after manual offset
  const minutes = localDate.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  const displayMin = minutes.toString().padStart(2, "0");
  const label = `${displayHour.toString().padStart(2, "0")}:${displayMin} ${ampm}`;

  // Find closest matching slot label
  const allSlots = [
    ...TIME_SLOTS[ReminderType.MEDICINE],
    ...TIME_SLOTS[ReminderType.APPOINTMENT],
  ];
  return allSlots.find((s) => s === label) ?? "08:00 AM";
};

const RemindersScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { reminders, loading, error } = useAppSelector(
    (state) => state.reminders,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState<ReminderType>(
    ReminderType.MEDICINE,
  );
  const [reminderTime, setReminderTime] = useState("08:00 AM");

  useEffect(() => {
    dispatch(fetchReminders());
  }, []);

  const handleTypeChange = (type: ReminderType) => {
    setSelectedType(type);
    setReminderTime(TIME_SLOTS[type]?.[0] ?? "08:00 AM");
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setTitle("");
    setMessage("");
    setSelectedType(ReminderType.MEDICINE);
    setReminderTime(TIME_SLOTS[ReminderType.MEDICINE][0]);
    setModalVisible(true);
  };

  // ── Fix 2: Pre-select the correct time slot when editing ──────────────────
  const openEditModal = (reminder: any) => {
    setIsEditing(true);
    setEditingId(reminder._id);
    setTitle(reminder.title);
    setMessage(reminder.message);
    setSelectedType(reminder.type);
    // Convert saved UTC time → Sri Lanka local → match to a slot label
    const localLabel = isoToLocalTimeLabel(reminder.reminderTime);
    setReminderTime(localLabel);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const today = new Date();
    const [hours, minutes] = (TIME_MAP[reminderTime] || "08:00").split(":");
    today.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    if (isEditing && editingId) {
      // TODO: wire up PATCH /reminders/:id when backend is ready
      // For now, show success and close
      Alert.alert("Success", "Reminder updated! (backend patch coming soon)");
      setModalVisible(false);
    } else {
      await dispatch(
        addMedicineReminder({
          type: selectedType,
          title: title.trim(),
          message: message.trim(),
          reminderTime: today.toISOString(),
        }),
      );
      Alert.alert("Success", "New reminder added!");
      setModalVisible(false);
      dispatch(fetchReminders());
    }
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
          onPress: async () => {
            await dispatch(removeReminder(id));
            dispatch(fetchReminders());
          },
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

  // ── Time slot grid ─────────────────────────────────────────────────────────
  const renderTimeSlots = () => {
    const slots = TIME_SLOTS[selectedType];
    if (!slots) return null;
    return (
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>
          {selectedType === ReminderType.MEDICINE
            ? "Medicine Time"
            : "Appointment Time"}
        </Text>
        <View style={styles.timeGrid}>
          {slots.map((t) => (
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
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
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

      {/* Loading */}
      {loading && (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.centerText}>Loading reminders...</Text>
        </View>
      )}

      {/* Error */}
      {error && !loading && (
        <View style={styles.centerState}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => dispatch(fetchReminders())}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
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
              <TouchableOpacity
                style={styles.emptyAddBtn}
                onPress={openAddModal}
              >
                <Text style={styles.emptyAddBtnText}>
                  + Add your first reminder
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 32 }} />
        </ScrollView>
      )}

      {/* ADD / EDIT MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEditing ? "Edit Reminder" : "Add New Reminder"}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Type selector — ADD mode only */}
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
                        onPress={() => handleTypeChange(t.type)}
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
                  placeholder={
                    selectedType === ReminderType.MEDICINE
                      ? "e.g. Morning Medicine"
                      : "e.g. Appointment with Dr. Silva"
                  }
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
                  placeholder={
                    selectedType === ReminderType.MEDICINE
                      ? "e.g. Take 1 tablet of Paracetamol"
                      : "e.g. Cardiology checkup at City Hospital"
                  }
                  placeholderTextColor="#94A3B8"
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* ── Fix 2: Time slots shown in BOTH add and edit mode ── */}
              {renderTimeSlots()}

              {/* Save */}
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
  centerState: { flex: 1, alignItems: "center", justifyContent: "center" },
  centerText: { fontSize: 15, color: "#94A3B8", marginTop: 12 },
  errorText: { fontSize: 14, color: "#DC2626", marginBottom: 12 },
  retryBtn: {
    backgroundColor: "#1E3A8A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 12,
  },
  retryText: { color: "#fff", fontWeight: "600" },
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
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeChip: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    minWidth: "30%",
    alignItems: "center",
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
