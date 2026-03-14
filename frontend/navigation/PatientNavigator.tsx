import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";
import FindDoctorScreen from "../screens/Patient/FindDoctorScreen";
import DoctorProfileScreen from "../screens/Patient/DoctorProfileScreen";
import BookAppointmentScreen from "../screens/Patient/BookAppointmentScreen";
import AppointmentConfirmScreen from "../screens/Patient/AppointmentConfirmScreen";
import MyAppointmentsScreen from "../screens/Patient/MyAppointmentsScreen";

// ─── Type definitions for every screen and its params ───────────────────────
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

const Stack = createNativeStackNavigator<PatientStackParamList>();

export default function PatientNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientHome" component={PatientHomeScreen} />
      <Stack.Screen name="FindDoctor" component={FindDoctorScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
      <Stack.Screen
        name="AppointmentConfirm"
        component={AppointmentConfirmScreen}
      />
      <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} />
    </Stack.Navigator>
  );
}
