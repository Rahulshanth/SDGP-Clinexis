import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";
import RemindersScreen from "../screens/Reminders/RemindersScreen";

export type PatientTabParamList = {
  Home: undefined;
  Reminders: undefined;
};

export type PatientStackParamList = {
  PatientTabs: undefined;
  VoiceRecorder: undefined;
  LiveTranscript: undefined;
  DoctorProfile: {
    doctor: {
      id: string;
      name: string;
      specialty: string;
      hospital: string;
      image: string;
      rating: number;
      reviews: number;
      earliest: string;
    };
  };
};

const Tab = createBottomTabNavigator<PatientTabParamList>();
const Stack = createNativeStackNavigator<PatientStackParamList>();

function PatientTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      <Tab.Screen
        name="Home"
        component={PatientHomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{ title: "Reminders" }}
      />
    </Tab.Navigator>
  );
}

export default function PatientNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientTabs" component={PatientTabs} />
      <Stack.Screen
        name="VoiceRecorder"
        component={VoiceRecorder}
        options={{ headerShown: true, title: "Record Consultation" }}
      />
      <Stack.Screen
        name="LiveTranscript"
        component={LiveTranscript}
        options={{ headerShown: true, title: "My Consultations" }}
      />
    </Stack.Navigator>
  );
}