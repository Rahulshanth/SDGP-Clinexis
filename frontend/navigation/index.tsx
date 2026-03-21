import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
      
      console.log("Token:", token);
      console.log("Role:", role);
      
      setIsLoggedIn(!!token);
      setUserRole(role);
      

    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  const clearTokenOnStart = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  useEffect(() => {
    clearTokenOnStart();
  }, []);

  if (isLoggedIn === null) return null;

  const renderHome = () => {
    if (userRole === "doctor") return <DoctorNavigator />;
    if (userRole === "pharmacy") return <PharmacyNavigator />;
    return <PatientNavigator />;
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? renderHome() : <AuthNavigator onLoginSuccess={checkLogin} />}
    </NavigationContainer>
  );
}