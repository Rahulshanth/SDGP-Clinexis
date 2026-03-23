import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function PharmacySettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    systemUpdates: false,
  });

  const [biometrics, setBiometrics] = useState(true);

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingItem = ({ icon, title, value, onPress, type = 'arrow', color = '#1e293b' }: any) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress} 
      disabled={type === 'switch'}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBg, { backgroundColor: `${color}10` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.settingTitle}>{title}</Text>
      {type === 'arrow' && <Ionicons name="chevron-forward" size={20} color="#94a3b8" />}
      {type === 'text' && <Text style={styles.settingValue}>{value}</Text>}
      {type === 'switch' && (
        <Switch
          trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
          thumbColor={'#ffffff'}
          ios_backgroundColor="#e2e8f0"
          onValueChange={value}
          value={onPress} // reusing fields for simplicity in component
        />
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={[styles.mainContainer, { paddingTop: Math.max(insets.top, 20) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Account Section */}
        <SectionHeader title="Account" />
        <View style={styles.sectionCard}>
          <SettingItem 
            icon="mail-outline" 
            title="Email Address" 
            value="gagana.pharmacy@gmail.com" 
            type="text"
            color="#3b82f6"
          />
          <SettingItem 
            icon="lock-closed-outline" 
            title="Update Password" 
            onPress={() => {}} 
            color="#3b82f6"
          />
          <SettingItem 
            icon="finger-print-outline" 
            title="Biometric Login" 
            onPress={biometrics} 
            value={(val: boolean) => setBiometrics(val)}
            type="switch"
            color="#3b82f6"
          />
        </View>

        {/* Store Management */}
        <SectionHeader title="Store Management" />
        <View style={styles.sectionCard}>
          <SettingItem 
            icon="time-outline" 
            title="Operating Hours" 
            value="Open 08:00 - 22:00" 
            type="text"
            color="#10b981"
          />
          <SettingItem 
            icon="bicycle-outline" 
            title="Delivery Settings" 
            value="Within 5km" 
            type="text"
            color="#10b981"
          />
          <SettingItem 
            icon="storefront-outline" 
            title="Store Information" 
            onPress={() => {}} 
            color="#10b981"
          />
        </View>

        {/* Notifications */}
        <SectionHeader title="Notifications" />
        <View style={styles.sectionCard}>
          <SettingItem 
            icon="receipt-outline" 
            title="New Order Alerts" 
            onPress={notifications.newOrders} 
            value={() => toggleSwitch('newOrders')}
            type="switch"
            color="#f59e0b"
          />
          <SettingItem 
            icon="warning-outline" 
            title="Low Stock Alerts" 
            onPress={notifications.lowStock} 
            value={() => toggleSwitch('lowStock')}
            type="switch"
            color="#f59e0b"
          />
          <SettingItem 
            icon="notifications-outline" 
            title="System Updates" 
            onPress={notifications.systemUpdates} 
            value={() => toggleSwitch('systemUpdates')}
            type="switch"
            color="#f59e0b"
          />
        </View>

        {/* Support & Legal */}
        <SectionHeader title="Support & Legal" />
        <View style={styles.sectionCard}>
          <SettingItem 
            icon="help-circle-outline" 
            title="Help Center" 
            onPress={() => {}} 
            color="#64748b"
          />
          <SettingItem 
            icon="shield-checkmark-outline" 
            title="Privacy Policy" 
            onPress={() => {}} 
            color="#64748b"
          />
          <SettingItem 
            icon="document-text-outline" 
            title="Terms of Service" 
            onPress={() => {}} 
            color="#64748b"
          />
        </View>

        {/* Danger Zone */}
        <TouchableOpacity style={styles.deleteAccount} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
          <Text style={styles.deleteText}>Delete Pharmacy Account</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.2.0 • Build 152</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  settingValue: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  deleteAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 8,
  },
  deleteText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ef4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 20,
    fontWeight: '600',
  },
});
