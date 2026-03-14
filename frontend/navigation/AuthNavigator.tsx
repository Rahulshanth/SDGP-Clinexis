import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import ForgotPasswordEmailScreen from "../screens/Auth/ForgotPasswordEmailScreen";
import ForgotPasswordOtpScreen from "../screens/Auth/ForgotPasswordOtpScreen";
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPasswordEmail: undefined;
  ForgotPasswordOtp: { email: string };
  ResetPassword: { email: string; code: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPasswordEmailScreen}
      />
      <Stack.Screen
        name="ForgotPasswordOtp"
        component={ForgotPasswordOtpScreen}
      />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}