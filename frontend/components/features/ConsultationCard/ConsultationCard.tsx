import React from "react";
import { View, Text } from "react-native";
import { Consultation } from "../../../types/consultation.types";

interface Props {
  consultation: Consultation;
}

const ConsultationCard: React.FC<Props> = ({ consultation }) => {
  return (
    <View style={{ padding: 15, marginBottom: 15, backgroundColor: "#fff" }}>
      {consultation.transcript.map((p, index) => (
        <Text key={index} style={{ marginBottom: 8 }}>
          {p.text}
        </Text>
      ))}
    </View>
  );
};

export default ConsultationCard;