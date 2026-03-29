                                                                                                                                            import React from "react";import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";
import RemindersScreen from "../screens/Reminders/RemindersScreen";
import PatientSettings from "../screens/Patient/PatientSettings";

// ─── Tab Param List
export type PatientTabParamList = {
  Home: undefined;
  Reminders: undefined;
  Settings: undefined;  // ← added
};

// ─── Stack Param List
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
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof PatientTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline",
            Reminders: "notifications-outline",
            Settings: "settings-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
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
      <Tab.Screen
        name="Settings"
        component={PatientSettings}
        options={{ title: "Settings" }}
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