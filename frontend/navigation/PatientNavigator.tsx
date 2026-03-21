import React from "react";
<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
=======
import { createNativeStackNavigator } from "@react-navigation/native-stack";
>>>>>>> develop
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Patient Screens
import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";
<<<<<<< HEAD
import SharePrescriptionScreen from "../screens/Patient/SharePrescriptionScreen";
import FindMedicinesScreen from "../screens/Patient/FindMedicinesScreen";
import PatientProfileScreen from "../screens/Patient/PatientProfileScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";

=======
<<<<<<< HEAD
import DoctorProfileScreen from "../screens/Patient/DoctorProfileScreen";

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
=======
//import PatientProfileScreen from "../screens/Patient/PatientProfileScreen";
//import PatientRemindersScreen from "../screens/Patient/PatientRemindersScreen";
//import PatientPharmacyScreen from "../screens/Patient/PatientPharmacyScreen";
//import PatientSummaryScreen from "../screens/Patient/PatientSummaryScreen";
//import PatientAppointmentScreen from "../screens/Patient/PatientAppointmentsScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";


>>>>>>> develop

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
>>>>>>> develop
export type PatientTabParamList = {
  Home: undefined;
  SharePrescription: undefined;
  FindMedicines: undefined;
  Profile: undefined;
};

<<<<<<< HEAD
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
=======
const Stack = createNativeStackNavigator<PatientStackParamList>();
const Tab = createBottomTabNavigator<PatientTabParamList>();

// Stack navigator for Vidu's appointment flow screens
function PatientStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientHome" component={PatientHomeScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />

      {/*
      <Stack.Screen name="FindDoctor" component={FindDoctorScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
      <Stack.Screen
        name="AppointmentConfirm"
        component={AppointmentConfirmScreen}
      />
      <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} />
      */}
    </Stack.Navigator>
  );
}

// Tab navigator — Added by Nadithi
// Vidu added PatientStackNavigator inside Home tab
export default function PatientNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1E3A8A",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      <Tab.Screen
        name="Home"
        component={PatientStackNavigator}
        options={{ headerShown: false }}
      />
      {/* Nadithi uncomments these tabs when screens are ready:
      <Tab.Screen name="Reminders" component={PatientRemindersScreen} />
      <Tab.Screen name="Pharmacy" component={PatientPharmacyScreen} />
      <Tab.Screen name="Summary" component={PatientSummaryScreen} />
      <Tab.Screen name="Appointments" component={PatientAppointmentScreen} />
      <Tab.Screen name="Profile" component={PatientProfileScreen} />
      */}
    </Tab.Navigator>
  );
}
>>>>>>> develop
