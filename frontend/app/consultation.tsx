import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import { useNlp } from "@/hooks/useNlp";

export default function ConsultationScreen() {

  const [text, setText] = useState("");

  const { medicines, loading, error, extract } = useNlp();

  const handleExtract = () => {
    if (!text) return;
    extract(text);
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Consultation Text
      </Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter doctor consultation text..."
        value={text}
        onChangeText={setText}
      />

      <Button
        title="Extract Medicines"
        onPress={handleExtract}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 20 }}
        />
      )}

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <Text style={styles.subtitle}>
        Extracted Medicines
      </Text>

      <FlatList
        data={medicines}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.medicine}>
            • {item}
          </Text>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    height: 120,
    marginBottom: 10,
    borderRadius: 6,
  },

  medicine: {
    fontSize: 16,
    paddingVertical: 4,
  },

  error: {
    color: "red",
    marginTop: 10,
  }

});