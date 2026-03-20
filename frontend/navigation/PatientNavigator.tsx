import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";
//import PatientProfileScreen from "../screens/Patient/PatientProfileScreen";
//import PatientRemindersScreen from "../screens/Patient/PatientRemindersScreen";
//import PatientPharmacyScreen from "../screens/Patient/PatientPharmacyScreen";
//import PatientSummaryScreen from "../screens/Patient/PatientSummaryScreen";
//import PatientAppointmentScreen from "../screens/Patient/PatientAppointmentsScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";



export type PatientTabParamList = {
  Home: undefined;
  Reminders: undefined;
  Pharmacy: undefined;
  Summary: undefined;
  Appointments: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<PatientTabParamList>();

export default function PatientNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      <Tab.Screen name="Home" component={PatientHomeScreen} />
    </Tab.Navigator>
  );
}

//Added by Nadithi