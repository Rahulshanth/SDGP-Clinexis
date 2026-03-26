import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
<<<<<<< HEAD
import { createNativeStackNavigator } from "@react-navigation/native-stack";
=======
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
>>>>>>> dc0336c (Modified the Patient Navigator Interface)

// Patient Screens
import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 9b7dcf538e46af26144fa5d5018e9468fd9bbed0
import SharePrescriptionScreen from "../screens/Patient/SharePrescriptionScreen";
import FindMedicinesScreen from "../screens/Patient/FindMedicinesScreen";
import PatientProfileScreen from "../screens/Patient/PatientProfileScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";
import SharePrescriptionScreen from "../screens/Patient/SharePrescriptionScreen";
import FindMedicinesScreen from "../screens/Patient/FindMedicinesScreen";


<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> develop
import DoctorProfileScreen from "../screens/Patient/DoctorProfileScreen";
=======
>>>>>>> 9b7dcf538e46af26144fa5d5018e9468fd9bbed0

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
<<<<<<< HEAD
//import PatientProfileScreen from "../screens/Patient/PatientProfileScreen";
//import PatientRemindersScreen from "../screens/Patient/PatientRemindersScreen";
//import PatientPharmacyScreen from "../screens/Patient/PatientPharmacyScreen";
//import PatientSummaryScreen from "../screens/Patient/PatientSummaryScreen";
//import PatientAppointmentScreen from "../screens/Patient/PatientAppointmentsScreen";
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";


=======
>>>>>>> 9b7dcf538e46af26144fa5d5018e9468fd9bbed0

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
=======
=======
import PatientProfileScreen from "../screens/Patient/PatientProfileScreen";
>>>>>>> 988926a (Made few changes in the Patient Navigator)
import LiveTranscript from "../screens/Consultation/LiveTranscript";
import VoiceRecorder from "../screens/Consultation/VoiceRecorder";

export type PatientTabParamList = {
  Home: undefined;
  Record: undefined;
  Transcripts: undefined;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> dc0336c (Modified the Patient Navigator Interface)
=======
=======
  Pharmacy: undefined;
  Share: undefined;
>>>>>>> 1550f6d (Initial commit - Clinexis frontend)
  Profile: undefined;
>>>>>>> 988926a (Made few changes in the Patient Navigator)
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

<<<<<<< HEAD
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
=======
const COLORS = {
  primary: "#2EA7FF",
  inactive: "#8A94A6",
};

export default function PatientNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused }) => {
          let iconName: any;

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Record") iconName = "mic-outline";
          else if (route.name === "Transcripts") iconName = "document-text-outline";
          else if (route.name === "Pharmacy") iconName = "medkit-outline";
          else if (route.name === "Share") iconName = "share-social-outline";
          else if (route.name === "Profile") iconName = "person-outline";

          return (
            <View style={styles.iconWrapper}>
              <Ionicons
                name={iconName}
                size={22}
                color={focused ? COLORS.primary : COLORS.inactive}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={PatientHomeScreen} />
      <Tab.Screen name="Record" component={VoiceRecorder} />
      <Tab.Screen name="Transcripts" component={LiveTranscript} />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> dc0336c (Modified the Patient Navigator Interface)
=======
=======
      <Tab.Screen name="Pharmacy" component={FindMedicinesScreen} />
      <Tab.Screen name="Share" component={SharePrescriptionScreen} />
>>>>>>> 1550f6d (Initial commit - Clinexis frontend)
      <Tab.Screen name="Profile" component={PatientProfileScreen} />
>>>>>>> 988926a (Made few changes in the Patient Navigator)
    </Tab.Navigator>
  );
}

<<<<<<< HEAD
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
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    elevation: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: 60,
    borderTopWidth: 0,
  },

  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
<<<<<<< HEAD
<<<<<<< HEAD
});

//Added by Nadithi
>>>>>>> dc0336c (Modified the Patient Navigator Interface)
=======
});
>>>>>>> 988926a (Made few changes in the Patient Navigator)
=======
});

//Added by Nadithi
>>>>>>> 1550f6d (Initial commit - Clinexis frontend)
