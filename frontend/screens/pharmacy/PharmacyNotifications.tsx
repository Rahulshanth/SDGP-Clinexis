import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NotificationType = 'order' | 'alert' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'order', title: 'New Prescription Order', message: 'Order #ORD-2024-001 received from Dr. Smith for 3 items.', time: '2 mins ago', isRead: false },
  { id: '2', type: 'alert', title: 'Low Stock Alert', message: 'Paracetamol 500mg is running low (only 12 strips left).', time: '1 hour ago', isRead: false },
  { id: '3', type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance will occur tonight at 2 AM EST.', time: '4 hours ago', isRead: true },
  { id: '4', type: 'order', title: 'Order Status Updated', message: 'Order #ORD-2024-002 has been marked as ready for pickup.', time: '1 day ago', isRead: true },
  { id: '5', type: 'alert', title: 'Expiring Medications', message: 'You have 4 batches of Amoxicillin expiring next month.', time: '2 days ago', isRead: true },
];

export default function PharmacyNotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'order': return { name: 'receipt-outline' as const, color: '#3b82f6', bg: '#eff6ff' };
      case 'alert': return { name: 'warning-outline' as const, color: '#f59e0b', bg: '#fffbeb' };
      case 'system': return { name: 'information-circle-outline' as const, color: '#64748b', bg: '#f1f5f9' };
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => {
    const iconConfig = getIconForType(item.type);
    return (
      <TouchableOpacity
        style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: iconConfig.bg }]}>
            <Ionicons name={iconConfig.name} size={20} color={iconConfig.color} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.notificationTitle, !item.isRead && styles.unreadText]}>
              {item.title}
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={[styles.messageText, !item.isRead && styles.unreadMessageText]}>
          {item.message}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.mainContainer, { paddingTop: Math.max(insets.top, 20) }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
          <Ionicons name="checkmark-done-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={64} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyText}>You're all caught up!</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  markAllButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100, gap: 12 },
  notificationCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 1 },
  unreadCard: { backgroundColor: '#f0f9ff', borderColor: '#bae6fd' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconContainer: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  titleContainer: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: '600', color: '#475569' },
  unreadText: { color: '#0f172a', fontWeight: '700' },
  timeText: { fontSize: 12, color: '#94a3b8', marginTop: 2, fontWeight: '500' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3b82f6', marginLeft: 10 },
  messageText: { fontSize: 14, color: '#64748b', lineHeight: 20 },
  unreadMessageText: { color: '#334155' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingHorizontal: 30 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#475569', marginTop: 16, marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#94a3b8', textAlign: 'center', lineHeight: 20 },
});