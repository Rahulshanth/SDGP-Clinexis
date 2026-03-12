import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "..//(tabs)/PharmacyHome";

import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();


// Temporary screens
function OrdersScreen(){
  return(
    <View>
      <Text>Orders Page</Text>
    </View>
  )
}

function InventoryScreen(){
  return(
    <View>
      <Text>Inventory Page</Text>
    </View>
  )
}

function ProfileScreen(){
  return(
    <View>
      <Text>Profile Page</Text>
    </View>
  )
}


export default function PharmacyTabs(){

  return(

    <Tab.Navigator

      screenOptions={({route}) => ({

        headerShown:false,

        tabBarIcon: ({color,size}) => {

          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if(route.name === "Home"){
            iconName = "home-outline";
          }
          else if(route.name === "Orders"){
            iconName = "document-text-outline";
          }
          else if(route.name === "Inventory"){
            iconName = "cube-outline";
          }
          else if(route.name === "Profile"){
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color}/>
        },

        tabBarActiveTintColor:"#2f8df5",
        tabBarInactiveTintColor:"gray",

        tabBarStyle:{
          height:70,
          paddingBottom:10
        }

      })}

    >

      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Orders" component={OrdersScreen}/>
      <Tab.Screen name="Inventory" component={InventoryScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen}/>

    </Tab.Navigator>

  )

}