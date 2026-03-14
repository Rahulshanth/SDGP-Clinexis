import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Reminder, ReminderType } from "../../../types/reminder.types";

interface ReminderCardProps {
  reminder: Reminder;
  onDelete: (id: string) => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ reminder, onDelete }) => {
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getTypeColor = (type: ReminderType) => {
    switch (type) {
      case ReminderType.MEDICINE:
        return "#1D4ED8"; // blue
      case ReminderType.APPOINTMENT:
        return "#0369A1"; // darker blue
      case ReminderType.NOTIFICATION:
        return "#7C3AED"; // purple
      default:
        return "#6B7280";
    }
  };

  const getTypeIcon = (type: ReminderType) => {
    switch (type) {
      case ReminderType.MEDICINE:
        return "💊";
      case ReminderType.APPOINTMENT:
        return "📅";
      case ReminderType.NOTIFICATION:
        return "🔔";
      default:
        return "📋";
    }
  };

  return (
    <View style={styles.card}>
      {/* LEFT COLOR BAR */}
      <View
        style={[
          styles.colorBar,
          { backgroundColor: getTypeColor(reminder.type) },
        ]}
      />

      <View style={styles.content}>
        {/* TOP ROW */}
        <View style={styles.topRow}>
          <View style={styles.titleRow}>
            <Text style={styles.icon}>{getTypeIcon(reminder.type)}</Text>
            <Text style={styles.title}>{reminder.title}</Text>
          </View>
          <View
            style={[
              styles.badge,
              { backgroundColor: getTypeColor(reminder.type) },
            ]}
          >
            <Text style={styles.badgeText}>{reminder.type}</Text>
          </View>
        </View>

        {/* MESSAGE */}
        <Text style={styles.message} numberOfLines={2}>
          {reminder.message}
        </Text>

        {/* BOTTOM ROW */}
        <View style={styles.bottomRow}>
          <Text style={styles.time}>
            ⏰ {formatTime(reminder.reminderTime)}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(reminder._id)}
          >
            <Text style={styles.deleteText}>🗑 Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#1E3A8A",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    overflow: "hidden",
  },
  colorBar: {
    width: 6,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E3A8A",
    flex: 1,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  message: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 10,
    lineHeight: 18,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: 13,
    color: "#3B82F6",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  deleteText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ReminderCard;
