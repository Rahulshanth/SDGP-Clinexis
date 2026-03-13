// Import React
import React from "react";

// Import React Native components
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";

// Import icons
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {

  return (

    // ScrollView allows the page to scroll
    <ScrollView style={styles.container}>


      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        {/* Pharmacy name + branch */}
        <View>
          <Text style={styles.title}>GG Pharmacy</Text>
          <Text style={styles.subtitle}>Downtown Branch • Online</Text>
        </View>

        {/* Notification + logo icons */}
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={22} color="#444" />
          <Ionicons name="medical" size={26} color="#3fa7ff" />
        </View>

      </View>


      {/* ================= SEARCH BAR ================= */}

      <View style={styles.searchBox}>

        <Ionicons name="search" size={18} color="#8fa3b8" />

        <TextInput
          placeholder="Search Medicine,Patient..."
          style={styles.searchInput}
        />

        <MaterialIcons name="tune" size={20} color="#8fa3b8" />

      </View>


      {/* ================= OVERVIEW ================= */}

      <Text style={styles.sectionTitle}>Overview</Text>

      <View style={styles.cardContainer}>


        {/* Today Orders Card */}
        <View style={styles.blueCard}>
          <Ionicons name="people-outline" size={30} color="white" />
          <Text style={styles.cardNumberWhite}>18</Text>
          <Text style={styles.cardTextWhite}>Toady Orders</Text>
        </View>


        {/* Medicines in stock */}
        <View style={styles.card}>
          <Ionicons name="medkit-outline" size={30} color="#4c89c6" />
          <Text style={styles.cardNumber}>25</Text>
          <Text style={styles.cardText}>Medicines in Stock</Text>
        </View>


        {/* Pending orders */}
        <View style={styles.card}>
          <Ionicons name="time-outline" size={30} color="#ff914d" />
          <Text style={styles.cardNumber}>05</Text>
          <Text style={styles.cardText}>Pending Orders</Text>
        </View>

      </View>



      {/* ================= INVENTORY ================= */}

      <Text style={styles.sectionTitle}>Medicine Inventory</Text>


      <View style={styles.inventoryBox}>


        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>MEDICINE NAME</Text>
          <Text style={styles.headerText}>QUANTITY</Text>
          <Text style={styles.headerText}>PRICE RS.</Text>
        </View>


        {/* Row 1 */}
        <View style={styles.tableRow}>
          <Text style={styles.rowText}>Paracetamol{"\n"}500mg</Text>
          <Text style={styles.rowText}>1,200 units</Text>
          <Text style={styles.rowText}>45.00</Text>
        </View>


        {/* Row 2 */}
        <View style={styles.tableRow}>
          <Text style={styles.rowText}>Metformin{"\n"}850mg</Text>
          <Text style={styles.rowText}>15 units</Text>
          <Text style={styles.rowText}>20.00</Text>
        </View>


        {/* Row 3 */}
        <View style={styles.tableRow}>
          <Text style={styles.rowText}>Amoxicillin{"\n"}250mg</Text>
          <Text style={styles.rowText}>0 units</Text>
          <Text style={styles.rowText}>15.00</Text>
        </View>


        {/* Row 4 */}
        <View style={styles.tableRow}>
          <Text style={styles.rowText}>Ventolin{"\n"}Inhaler</Text>
          <Text style={styles.rowText}>84 units</Text>
          <Text style={styles.rowText}>60.00</Text>
        </View>

      </View>



      {/* ================= WARNING ================= */}

      <View style={styles.warningBox}>
        <Ionicons name="information-circle-outline" size={18} color="#f26a3d" />
        <Text style={styles.warningText}>
          No home delivery services are provided. All medicines require valid
          prescription verification at counter.
        </Text>
      </View>


    </ScrollView>

  );

}



// ================= STYLES =================

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#f5f7fa",
  padding:20
},

header:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:20
},

title:{
  fontSize:22,
  fontWeight:"bold"
},

subtitle:{
  color:"#6d7f92",
  marginTop:4
},

headerIcons:{
  flexDirection:"row",
  gap:10
},

searchBox:{
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:"#e7edf4",
  padding:12,
  borderRadius:12,
  marginBottom:25
},

searchInput:{
  flex:1,
  marginLeft:8
},

sectionTitle:{
  fontSize:22,
  fontWeight:"bold",
  marginBottom:15
},

cardContainer:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:30
},

blueCard:{
  width:"30%",
  backgroundColor:"#2f8df5",
  padding:18,
  borderRadius:20,
  alignItems:"center"
},

card:{
  width:"30%",
  backgroundColor:"#cfe0f0",
  padding:18,
  borderRadius:20,
  alignItems:"center"
},

cardNumberWhite:{
  color:"white",
  fontSize:22,
  fontWeight:"bold",
  marginTop:10
},

cardTextWhite:{
  color:"white",
  marginTop:5,
  textAlign:"center"
},

cardNumber:{
  fontSize:22,
  fontWeight:"bold",
  marginTop:10
},

cardText:{
  marginTop:5,
  textAlign:"center"
},

inventoryBox:{
  backgroundColor:"#c9dff2",
  borderRadius:20,
  overflow:"hidden"
},

tableHeader:{
  flexDirection:"row",
  justifyContent:"space-between",
  padding:15,
  backgroundColor:"#eef2f6"
},

headerText:{
  width:"33%",
  fontWeight:"bold",
  color:"#6d7f92"
},

tableRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  padding:18,
  borderTopWidth:1,
  borderColor:"#d9e4ef"
},

rowText:{
  width:"33%",
  fontSize:16
},

warningBox:{
  flexDirection:"row",
  backgroundColor:"#fff3ee",
  padding:15,
  borderRadius:15,
  marginTop:20,
  alignItems:"center",
  gap:10
},

warningText:{
  flex:1,
  color:"#d16a4b"
}

});