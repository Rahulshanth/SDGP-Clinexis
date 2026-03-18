import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
} from "react-native";
import { colors, spacing, fonts, layout } from "../../theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[styles.input, error && styles.errorBorder]}
        placeholderTextColor={colors.mutedText}
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.xs,
    fontWeight: fonts.weight.medium,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: layout.radius.sm,
    fontSize: fonts.size.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  errorBorder: {
    borderColor: colors.danger,
  },
  errorText: {
    marginTop: 4,
    color: colors.danger,
    fontSize: fonts.size.sm,
  },
});