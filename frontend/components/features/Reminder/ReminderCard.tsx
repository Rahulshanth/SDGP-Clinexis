import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Reminder, ReminderType } from "../../../types/reminder.types";

interface ReminderCardProps {
  reminder: Reminder;
  onDelete: (id: string) => void;
}

// ── Fix: Convert UTC time from MongoDB → Sri Lanka local (UTC+5:30) ──────────
const formatLocalTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const sriLankaOffset = 5.5 * 60 * 60 * 1000;
  const localDate = new Date(date.getTime() + sriLankaOffset);
  const hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  const displayMin = minutes.toString().padStart(2, "0");
  return `${displayHour.toString().padStart(2, "0")}:${displayMin} ${ampm}`;
};

// ── Card theme per type ───────────────────────────────────────────────────────
const getTheme = (type: ReminderType) => {
  switch (type) {
    case ReminderType.MEDICINE:
      return {
        barColor: "#1D4ED8", // deep blue
        badgeBackground: "#DBEAFE",
        badgeText: "#1D4ED8",
        cardBackground: "#F0F7FF",
        icon: "💊",
        label: "Medicine",
      };
    case ReminderType.APPOINTMENT:
      return {
        barColor: "#059669", // green
        badgeBackground: "#D1FAE5",
        badgeText: "#065F46",
        cardBackground: "#F0FDF4",
        icon: "📅",
        label: "Appointment",
      };
    case ReminderType.NOTIFICATION:
      return {
        barColor: "#7C3AED", // purple
        badgeBackground: "#EDE9FE",
        badgeText: "#5B21B6",
        cardBackground: "#FAF5FF",
        icon: "🔔",
        label: "Notification",
      };
    default:
      return {
        barColor: "#6B7280",
        badgeBackground: "#F3F4F6",
        badgeText: "#374151",
        cardBackground: "#FFFFFF",
        icon: "📋",
        label: "Reminder",
      };
  }
};

const ReminderCard: React.FC<ReminderCardProps> = ({ reminder, onDelete }) => {
  const theme = getTheme(reminder.type);

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      {/* LEFT COLOR BAR — changes color per type */}
      <View style={[styles.colorBar, { backgroundColor: theme.barColor }]} />

      <View style={styles.content}>
        {/* TOP ROW — icon + title + badge */}
        <View style={styles.topRow}>
          <View style={styles.titleRow}>
            <Text style={styles.icon}>{theme.icon}</Text>
            <Text style={styles.title} numberOfLines={1}>
              {reminder.title}
            </Text>
          </View>
          <View
            style={[styles.badge, { backgroundColor: theme.badgeBackground }]}
          >
            <Text style={[styles.badgeText, { color: theme.badgeText }]}>
              {theme.label}
            </Text>
          </View>
        </View>

        {/* MESSAGE */}
        <Text style={styles.message} numberOfLines={2}>
          {reminder.message}
        </Text>

        {/* BOTTOM ROW — time + delete */}
        <View style={styles.bottomRow}>
          <Text style={[styles.time, { color: theme.barColor }]}>
            ⏰ {formatLocalTime(reminder.reminderTime)}
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
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    overflow: "hidden",
  },
  colorBar: {
    width: 6,
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
    marginRight: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
    flex: 1,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
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
