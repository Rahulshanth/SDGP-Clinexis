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
      
       // ✅ Add these temporarily
         console.log("Token:", token);
        console.log("Role:", role);
      
      setIsLoggedIn(!!token);  // ✅ cleaner way to set true/false
      setUserRole(role);
      

    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
  clearTokenOnStart();
}, []);

  /*const clearTokenOnStart = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (isLoggedIn === null) return null;

  return (
    <NavigationContainer>
      {isLoggedIn 
        ? <PatientNavigator /> 
        : <AuthNavigator onLoginSuccess={checkLogin} />}  
    </NavigationContainer>
  );
}*/

const clearTokenOnStart = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userRole"); // ✅ clear role too
    setIsLoggedIn(false);
    setUserRole(null);
  };

  if (isLoggedIn === null) return null;

  // ✅ Render correct navigator based on role
  const renderHome = () => {
    if (userRole === "doctor") return <DoctorNavigator />;
    if (userRole === "pharmacy") return <PharmacyNavigator />;
    return <PatientNavigator />; // default
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? renderHome() : <AuthNavigator onLoginSuccess={checkLogin} />}
    </NavigationContainer>
  );
}