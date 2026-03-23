import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorHomeScreen from "../screens/Doctor/DoctorHomeScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import DoctorEditProfileScreen from "../screens/Doctor/DoctorEditProfileScreen";
import CurrentSummaryScreen from "../screens/Summary/CurrentSummaryScreen";
import SummaryHistoryScreen from "../screens/Summary/SummaryHistoryScreen";


export type DoctorStackParamList = {
  DoctorHome: undefined;
  LiveTranscript: undefined;
  DoctorEditProfile: undefined; 
  CurrentSummary: { consultationId: string }; // ← needs consultationId
  SummaryHistory: undefined;
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

    <Stack.Screen
        name="DoctorEditProfile"
        component={DoctorEditProfileScreen}
        options={{ title: 'My Profile', headerShown: false }}  
        // headerShown: false because DoctorEditProfileScreen has its own header
      />  

    <Stack.Screen
        name="CurrentSummary"
        component={CurrentSummaryScreen}
        options={{ title: 'Consultation Summary' }}
      />
      <Stack.Screen
        name="SummaryHistory"
        component={SummaryHistoryScreen}
        options={{ title: 'Summary History' }}
      />  

    </Stack.Navigator>
  );
}