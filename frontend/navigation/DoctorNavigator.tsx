import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorHomeScreen from "../screens/Doctor/DoctorHomeScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";


export type DoctorStackParamList = {
  DoctorHome: undefined;
  LiveTranscript: undefined;
};

const Stack = createNativeStackNavigator<DoctorStackParamList>();

export default function DoctorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="DoctorHome" component={DoctorHomeScreen}
      options={{ title: 'Home' }} />

    <Stack.Screen
        name="LiveTranscript"
        component={LiveTranscript}
        options={{ title: 'Consultation Records' }}
      />
    </Stack.Navigator>
  );
}