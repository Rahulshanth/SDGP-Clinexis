import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PharmacyBottomNav from "./PharmacyBottomNav";

export type PharmacyStackParamList = {
  PharmacyMain: undefined;
};

const Stack = createNativeStackNavigator<PharmacyStackParamList>();

export default function PharmacyNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PharmacyMain" component={PharmacyBottomNav} />
    </Stack.Navigator>
  );
}