import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import axios from "axios";

export default function NlpMedicineScreen() {

  const [text, setText] = useState("");
  const [medicines, setMedicines] = useState([]);

  const extractMedicines = async () => {
    try {
      const res = await axios.post("http://10.31.13.194:5001/nlp/extract", {
        text: text
      });

      setMedicines(res.data.medicines || []);

    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <View style={{ padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Medicine Extractor
      </Text>

      <TextInput
        placeholder="Paste consultation text"
        value={text}
        onChangeText={setText}
        multiline
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 20,
          height: 120
        }}
      />

      <Button title="Extract Medicines" onPress={extractMedicines} />

      <FlatList
        data={medicines}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 10 }}>💊 {item}</Text>
        )}
      />

    </View>
  );
}