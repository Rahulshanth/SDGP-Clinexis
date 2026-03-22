


import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 
// Screens
import SplashScreen from "../screens/Auth/SplashScreen";
import WelcomeScreen from "../screens/Auth/Welcome";
import ChooseProfileScreen from "../screens/Auth/choose-profile";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import ForgotPasswordEmailScreen from "../screens/Auth/ForgotPasswordEmailScreen";
import ForgotPasswordOtpScreen from "../screens/Auth/ForgotPasswordOtpScreen";
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";
 
export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  ChooseProfile: undefined;
  SignIn: { role: string };
  SignUp: { role: string };
  ForgotPasswordEmail: undefined;
  ForgotPasswordOtp: { email: string };
  ResetPassword: { email: string; code: string };
};
 
// ✅ Accept onLoginSuccess as a prop
type AuthNavigatorProps = {
  onLoginSuccess: () => void;
};
 
const Stack = createNativeStackNavigator<AuthStackParamList>();
 
export default function AuthNavigator({ onLoginSuccess }: AuthNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ChooseProfile" component={ChooseProfileScreen} />
 
      {/* ✅ children prop passes onLoginSuccess to SignInScreen */}
      <Stack.Screen
        name="SignIn"
        children={(props) => (
          <SignInScreen {...props} onLoginSuccess={onLoginSuccess} />
        )}
      />
 
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmailScreen} />
      <Stack.Screen name="ForgotPasswordOtp" component={ForgotPasswordOtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

// Added by Rivithi
//Added by Rivithi