import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../store';
import { NavigationContainer } from '@react-navigation/native';
import PatientNavigator from './PatientNavigator';
import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PharmacyNavigator from './PharmacyNavigator';
import DoctorNavigator from './DoctorNavigator';

export default function RootLayout() {
  function checkLogin(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <NavigationContainer>
      {setIsLoggedIn() 
        ? <PatientNavigator /> 
        : <AuthNavigator onLoginSuccess={checkLogin} />}  
    </NavigationContainer>
  );
}

const clearTokenOnStart = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userRole"); // clear role too
    setIsLoggedIn(false);
    setUserRole(null);
  };

  if (setIsLoggedIn === null) return null;

  // Render correct navigator based on role
  const renderHome = () => {
    if (userRole === "doctor") return <DoctorNavigator />;
    if (userRole === "pharmacy") return <PharmacyNavigator />;
    return <PatientNavigator />; // default
  };

  return (
    <NavigationContainer>
      {setIsLoggedIn ? renderHome() : <AuthNavigator onLoginSuccess={checkLogin} />}
    </NavigationContainer>
  );
}

function setIsLoggedIn(arg0: boolean) {
  throw new Error('Function not implemented.');
}


function setUserRole(arg0: null) {
  throw new Error('Function not implemented.');
}
