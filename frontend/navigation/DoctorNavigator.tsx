import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Screens
import DoctorHomeScreen from "../screens/Doctor/DoctorHomeScreen";
//import DoctorSettingsScreen from "../screens/Doctor/DoctorSettings";
import DoctorEditProfileScreen from "../screens/Doctor/DoctorEditProfileScreen";
import DoctorProfileScreen from "../screens/Doctor/DoctorProfileScreen";

// FIXED IMPORTS
import VoiceRecorderScreen from "../screens/Consultation/VoiceRecorder";
import LiveTranscriptScreen from "../screens/Consultation/LiveTranscript";
import AppointmentsScreen from "../screens/Doctor/DoctorAppointmentsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type DoctorStackParamList = {
  DoctorProfile: undefined;
  DoctorEditProfile: undefined;
  Home: undefined;
  Recorder: undefined;
  Summary: undefined;
  Settings: undefined;
};

// 🔹 SETTINGS STACK
function SettingsStack() {
  return (
    <Stack.Navigator>{/*
      <Stack.Screen
        name="DoctorSettings"
        component={DoctorSettingsScreen}
        options={{ headerShown: false }}
      />*/}
      <Stack.Screen
        name="DoctorEditProfile"
        component={DoctorEditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}


// 🔥 MAIN NAVIGATOR
export default function DoctorNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          borderTopWidth: 0,
          elevation: 10,
        },
      }}
    >

      {/* HOME */}
      <Tab.Screen
        name="Home"
        component={DoctorHomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />

      {/*Appoinments*/}
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={22} color={color} />
          ),
        }}
      />


      {/* VOICE RECORDER */}
      <Tab.Screen
        name="Recorder"
        component={VoiceRecorderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="mic" size={24} color={color} />
          ),
        }}
      />

      {/*CONSULTATION SUMMARY */}
      <Tab.Screen
        name="Summary"
        component={LiveTranscriptScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" size={22} color={color} />
          ),
        }}
      />

      {/*SETTINGS */}
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}