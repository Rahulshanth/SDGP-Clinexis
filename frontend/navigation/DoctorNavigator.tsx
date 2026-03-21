import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorHomeScreen from "../screens/Doctor/DoctorHomeScreen";
import SummaryScreen from "../screens/Summary/SummaryScreen";
import CurrentSummaryScreen from "../screens/Summary/CurrentSummaryScreen";
import SummaryHistoryScreen from "../screens/Summary/SummaryHistoryScreen";

export type DoctorStackParamList = {
  DoctorHome: undefined;
  Summary: undefined;
  CurrentSummary: { consultationId: string };
  SummaryHistory: undefined;
};

const Stack = createNativeStackNavigator<DoctorStackParamList>();

export default function DoctorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="CurrentSummary" component={CurrentSummaryScreen} />
      <Stack.Screen name="SummaryHistory" component={SummaryHistoryScreen} />
    </Stack.Navigator>
  );
}