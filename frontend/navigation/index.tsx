<<<<<<< HEAD
*frontend/app/layout*


import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="voice-recorder" options={{ headerShown: true, title: 'Record Consultation' }} />
        <Stack.Screen name="live-transcript" options={{ headerShown: true, title: 'Consultation Records' }} />
        <Stack.Screen name="FindMedicines" options={{ headerShown: false }} />
        <Stack.Screen name="SharePrescription" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
=======
import React, { useEffect, useState, useCallback } from "react";
// ✅ NO NavigationContainer here — expo-router already provides one
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNavigator from "./AuthNavigator";
import PatientNavigator from "./PatientNavigator";
import DoctorNavigator from "./DoctorNavigator";
import PharmacyNavigator from "./PharmacyNavigator";

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const checkLogin = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("userRole");
      setIsLoggedIn(!!token);
      setUserRole(role);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    clearTokenOnStart();
  }, []);

  // ✅ Clears token every app start (dev/testing mode)
  const clearTokenOnStart = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  if (isLoggedIn === null) return null;

  // ✅ Render correct navigator based on role
  const renderHome = () => {
    if (userRole === "doctor") return <DoctorNavigator />;
    if (userRole === "pharmacy") return <PharmacyNavigator />;
    return <PatientNavigator />; // default patient
  };

  // ✅ No NavigationContainer wrapper — expo-router provides it
  return isLoggedIn ? (
    renderHome()
  ) : (
    <AuthNavigator onLoginSuccess={checkLogin} />
>>>>>>> develop
  );
}
