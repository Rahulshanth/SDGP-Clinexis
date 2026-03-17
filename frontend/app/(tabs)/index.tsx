import React from "react";
import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PatientHomeScreen from "../../screens/Patient/PatientHomeScreen";
import PatientProfileScreen from "../../screens/Patient/PatientProfileScreen";
import ChooseProfileScreen from "../../screens/Auth/choose-profile";
import Welcome from "../../screens/Auth/Welcome";
import SplashScreen from "../../screens/Auth/SplashScreen";
import PatientNavigator from "../../navigation/PatientNavigator";

// Define types
type RootStackParamList = {
  PatientProfile: undefined;
  PatientHome: undefined;
  PatientNavigator: undefined;
  SplashScreen: undefined;
  Welcome: undefined;
  "choose-profile": undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// WRAP INSIDE FUNCTION
export default function RootNavigator() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PatientProfile" component={PatientProfileScreen} />
        <Stack.Screen name="PatientHome" component={PatientHomeScreen} />
        <Stack.Screen name="PatientNavigator" component={PatientNavigator} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="choose-profile" component={ChooseProfileScreen} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}