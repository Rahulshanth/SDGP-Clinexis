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
  return isLoggedIn ? renderHome() : <AuthNavigator onLoginSuccess={checkLogin} />;
}
