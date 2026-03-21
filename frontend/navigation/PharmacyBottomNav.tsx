import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

import PharmacyHomeScreen from "../screens/pharmacy/PharmacyHome";
import PharmacyInventoryScreen from "../screens/pharmacy/inventory";
import PharmacyOrdersScreen from "../screens/pharmacy/orders";
import PharmacyPatientsScreen from "../screens/pharmacy/patients";
import PharmacySettingsScreen from "../screens/pharmacy/PharmacySettings";

export type PharmacyTabParamList = {
  Home: undefined;
  Inventory: undefined;
  Orders: undefined;
  Patients: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<PharmacyTabParamList>();

interface PharmacyBottomNavProps {
  activeTab?: string;
}

export default function PharmacyBottomNav({ activeTab = "Home" }: PharmacyBottomNavProps) {
  return (
    <Tab.Navigator
      initialRouteName={activeTab as keyof PharmacyTabParamList}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={PharmacyHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={PharmacyInventoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medical" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={PharmacyOrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Patients" 
        component={PharmacyPatientsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={PharmacySettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});