import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import PatientNavigator from "./PatientNavigator";

export type RootStackParamList = {
  Auth: undefined;
  Patient: undefined;
  Doctor: undefined;
  Pharmacy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        {/* <Stack.Screen name="Patient" component={PatientTabs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}