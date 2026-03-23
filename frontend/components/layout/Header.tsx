import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

interface Props {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});