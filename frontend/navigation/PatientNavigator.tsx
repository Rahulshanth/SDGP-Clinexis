import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Patient Screens
import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";

import SharePrescriptionScreen from "../screens/Patient/SharePrescriptionScreen";
import FindMedicinesScreen from "../screens/Patient/FindMedicinesScreen";
import PatientProfileScreen from "../screens/Patient/PatientProfileScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";



/*import FindDoctorScreen from "../screens/Patient/FindDoctorScreen";
import BookAppointmentScreen from "../screens/Patient/BookAppointmentScreen";
import AppointmentConfirmScreen from "../screens/Patient/AppointmentConfirmScreen";
import MyAppointmentsScreen from "../screens/Patient/MyAppointmentsScreen";
*/

// Nadithi's tabs (uncomment when screens are ready)
/*import PatientRemindersScreen from "../screens/Patient/PatientReminderScreen";
import PatientPharmacyScreen from "../screens/Patient/PatientPharmacyScreen";
import PatientSummaryScreen from "../screens/Patient/PatientSummaryScreen";
import PatientProfileScreen from "../screens/Patient/ PatientProfileScreen";
import PatientAppointmentScreen from "../screens/Patient/PatientAppointmentsScreen";*/

// ─── Stack param list (Vidu's screens) ───────────────────────
export type PatientStackParamList = {
  PatientHome: undefined;
  FindDoctor: undefined;
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
  BookAppointment: {
    doctor: {
      id?: string;
      name: string;
      specialty: string;
      hospital: string;
      image: string;
    };
    selectedSlot: string;
    selectedDay: string;
  };
  AppointmentConfirm: {
    doctor: {
      name: string;
      specialty: string;
      hospital: string;
      image: string;
    };
    date: string;
    time: string;
    consultType: string;
    fee: string;
  };
  MyAppointments: undefined;
};

// ─── Tab param list (Nadithi's tabs) ───────────────────────
// Added by Nadithi

export type PatientTabParamList = {
  Home: undefined;
  SharePrescription: undefined;
  FindMedicines: undefined;
  Profile: undefined;
};

export type PatientStackParamList = {
  
  PatientTabs: undefined;
  VoiceRecorder: undefined;
  LiveTranscript: undefined;
  FindMedicines:
    | {
        medicines?: string;
        results?: string;
      }
    | undefined;
};

const Tab = createBottomTabNavigator<PatientTabParamList>();
const Stack = createNativeStackNavigator<PatientStackParamList>();

function PatientTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, focused, size }) => {
          const icons: Record<keyof PatientTabParamList, React.ComponentProps<typeof Ionicons>["name"]> = {
            Home: focused ? "home" : "home-outline",
            SharePrescription: focused ? "document-text" : "document-text-outline",
            FindMedicines: focused ? "medkit" : "medkit-outline",
            Profile: focused ? "person" : "person-outline",
          };

          return <Ionicons name={icons[route.name as keyof PatientTabParamList]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={PatientHomeScreen} options={{ title: "Home" }} />
      <Tab.Screen
        name="SharePrescription"
        component={SharePrescriptionScreen}
        options={{ title: "Prescription" }}
      />
      <Tab.Screen
        name="FindMedicines"
        component={FindMedicinesScreen}
        options={{ title: "Medicines" }}
      />
      <Tab.Screen name="Profile" component={PatientProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}

export default function PatientNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientTabs" component={PatientTabs} />
      <Stack.Screen name="VoiceRecorder" component={VoiceRecorder} />
      <Stack.Screen name="LiveTranscript" component={LiveTranscript} />
      <Stack.Screen name="FindMedicines" component={FindMedicinesScreen} />
    </Stack.Navigator>
  );
}
