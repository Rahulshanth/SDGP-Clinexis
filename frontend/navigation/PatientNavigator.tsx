import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PatientHome from "../screens/Patient/PatientHome";
import Reminders from "../screens/Reminders/RemindersScreen";
import Pharmacy from "../screens/Pharmacy/PharmacyScreen";
import Summary from "../screens/Summary/SummaryScreen";

const Tab = createBottomTabNavigator();

const PatientNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={PatientHome} />
      <Tab.Screen name="Reminders" component={Reminders} />
      <Tab.Screen name="Pharmacy" component={Pharmacy} />
      <Tab.Screen name="Summary" component={Summary} />
    </Tab.Navigator>
  );
};

export default PatientNavigator;