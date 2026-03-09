import React, { useState } from "react";
import { View } from "react-native";
import { Audio } from "expo-av";
import Button from "../../components/ui/Button";
import { useAppDispatch } from "../../store/hooks";
import { uploadConsultationAudio } from "../../store/consultationSlice";

const VoiceRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const dispatch = useAppDispatch();

  const startRecording = async () => {
    await Audio.requestPermissionsAsync();

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    setRecording(recording);
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    const formData = new FormData();
    formData.append("audio", {
      uri,
      type: "audio/m4a",
      name: "consultation.m4a",
    } as any);

    dispatch(uploadConsultationAudio(formData));
    setRecording(null);
  };

  return (
    <View>
      {!recording ? (
        <Button title="Start Recording" onPress={startRecording} />
      ) : (
        <Button title="Stop Recording" onPress={stopRecording} />
      )}
    </View>
  );
};

export default VoiceRecorder;