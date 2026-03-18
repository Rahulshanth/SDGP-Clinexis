import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchConsultations } from "../../store/consultationSlice";

const LiveTranscript = () => {
  const dispatch = useAppDispatch();
  const { consultations } = useAppSelector((state) => state.consultation);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  return (
    <View>
      {consultations.map((consult) =>
        consult.conversationParagraphs.map((paragraph: string, index: number) => (
          <Text key={index} style={{ marginBottom: 10 }}>
            {paragraph}
          </Text>
        ))
      )}
    </View>
  );
};

export default LiveTranscript;