import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function PharmacyBottomNav({ activeTab }: { activeTab: string }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleNav = (path: any) => {
    router.replace(path);
  };

  return (
    <View style={[styles.bottomNavContainer, { paddingBottom: Math.max(insets.bottom, 15) }]}>
        <BlurView 
          intensity={60} 
          tint="light" 
          style={styles.bottomNavIsland}
        >
          {/* Home Tab */}
          <TouchableOpacity 
            style={activeTab === 'Home' ? styles.navItemActiveContainer : styles.navItem} 
            activeOpacity={0.9}
            onPress={() => handleNav('/PharmacyHome')}
          >
            {activeTab === 'Home' && <View style={styles.navItemActiveIndicator} />}
            <Ionicons name={activeTab === 'Home' ? "home" : "home-outline"} size={activeTab === 'Home' ? 22 : 26} color={activeTab === 'Home' ? "#2563eb" : "#475569"} />
            <Text style={activeTab === 'Home' ? styles.navTextActive : styles.navText}>Home</Text>
          </TouchableOpacity>
          
          {/* Orders (Dummy for now) */}
          <TouchableOpacity 
            style={activeTab === 'Orders' ? styles.navItemActiveContainer : styles.navItem} 
            activeOpacity={0.9}
            onPress={() => {}}
          >
            {activeTab === 'Orders' && <View style={styles.navItemActiveIndicator} />}
            <Ionicons name={activeTab === 'Orders' ? "receipt" : "receipt-outline"} size={activeTab === 'Orders' ? 22 : 26} color={activeTab === 'Orders' ? "#2563eb" : "#475569"} />
            <Text style={activeTab === 'Orders' ? styles.navTextActive : styles.navText}>Orders</Text>
          </TouchableOpacity>
          
          {/* Patients */}
          <TouchableOpacity 
            style={activeTab === 'Patients' ? styles.navItemActiveContainer : styles.navItem}
            activeOpacity={0.9}
            onPress={() => handleNav('/patients')}
          >
            {activeTab === 'Patients' && <View style={styles.navItemActiveIndicator} />}
            <Ionicons name={activeTab === 'Patients' ? "people" : "people-outline"} size={activeTab === 'Patients' ? 22 : 26} color={activeTab === 'Patients' ? "#2563eb" : "#475569"} />
            <Text style={activeTab === 'Patients' ? styles.navTextActive : styles.navText}>Patients</Text>
          </TouchableOpacity>

          {/* Inventory */}
          <TouchableOpacity 
            style={activeTab === 'Inventory' ? styles.navItemActiveContainer : styles.navItem}
            activeOpacity={0.9}
            onPress={() => handleNav('/inventory')}
          >
            {activeTab === 'Inventory' && <View style={styles.navItemActiveIndicator} />}
            <Feather name={activeTab === 'Inventory' ? "package" : "box"} size={activeTab === 'Inventory' ? 22 : 24} color={activeTab === 'Inventory' ? "#2563eb" : "#475569"} />
            <Text style={activeTab === 'Inventory' ? styles.navTextActive : styles.navText}>Inventory</Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity 
            style={activeTab === 'Profile' ? styles.navItemActiveContainer : styles.navItem}
            activeOpacity={0.9}
            onPress={() => handleNav('/Pharmcyprofile')}
          >
            {activeTab === 'Profile' && <View style={styles.navItemActiveIndicator} />}
            <Ionicons name={activeTab === 'Profile' ? "person" : "person-outline"} size={activeTab === 'Profile' ? 22 : 26} color={activeTab === 'Profile' ? "#2563eb" : "#475569"} />
            <Text style={activeTab === 'Profile' ? styles.navTextActive : styles.navText}>Profile</Text>
          </TouchableOpacity>
        </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bottomNavIsland: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Highly transparent base
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 40, // More rounded capsule
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)', // Softer top reflection
    overflow: 'hidden', 
  },
  navItemActiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Solid white pill over blurred background
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    gap: 6,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  navItemActiveIndicator: {
    position: 'absolute',
    top: -4, // Pulled slightly
    left: '50%',
    marginLeft: 0,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#2563eb',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  navTextActive: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2563eb',
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    marginTop: 4,
  }
});
