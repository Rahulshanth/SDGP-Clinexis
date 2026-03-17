import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SummaryCardProps = {
  title: string;
  subtitle?: string;
  date?: string;
  onPress?: () => void;
  rightLabel?: string;
};

const COLORS = {
  primary: "#2EA7FF",
  white: "#FFFFFF",
  text: "#1E2A3A",
  subtext: "#8A94A6",
  border: "#E8EEF5",
  bg: "#F5F7FB",
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  subtitle,
  date,
  onPress,
  rightLabel,
}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        {rightLabel ? <Text style={styles.rightLabel}>{rightLabel}</Text> : null}
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {date ? <Text style={styles.date}>{date}</Text> : null}
    </TouchableOpacity>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.subtext,
    lineHeight: 18,
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.subtext,
  },
});