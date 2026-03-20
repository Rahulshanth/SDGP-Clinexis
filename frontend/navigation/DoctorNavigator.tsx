import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorHomeScreen from "../screens/Doctor/DoctorHomeScreen";

export type DoctorStackParamList = {
  DoctorHome: undefined;
};

const Stack = createNativeStackNavigator<DoctorStackParamList>();

export default function DoctorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} />
    </Stack.Navigator>
  );
}