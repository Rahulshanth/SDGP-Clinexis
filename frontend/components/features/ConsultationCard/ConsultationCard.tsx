import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  paragraphs: string[];
}

const ConsultationCard: React.FC<Props> = ({ paragraphs }) => {
  if (!paragraphs || paragraphs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No conversation recorded.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {paragraphs.map((paragraph, index) => (
        <View key={index} style={styles.block}>
          <Text style={styles.text}>{paragraph}</Text>
        </View>
      ))}
    </View>
  );
};

export default ConsultationCard;

const styles = StyleSheet.create({
  container: { padding: 4 },
  block: {
    marginBottom: 10, padding: 12,
    backgroundColor: '#f0f4ff', borderRadius: 8,
    borderLeftWidth: 4, borderLeftColor: '#2563eb',
  },
  text: { fontSize: 14, color: '#1e293b', lineHeight: 22 },
  emptyText: { color: '#999', textAlign: 'center', padding: 16 },
});