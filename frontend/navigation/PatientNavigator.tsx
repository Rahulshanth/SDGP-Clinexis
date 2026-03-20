import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Patient Screens
import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";
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
  Reminders: undefined;
  Pharmacy: undefined;
  Summary: undefined;
  Appointments: undefined;
  Profile: undefined;
};

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
