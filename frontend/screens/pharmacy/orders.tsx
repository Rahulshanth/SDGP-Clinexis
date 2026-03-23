import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import PharmacyBottomNav from '../../navigation/PharmacyBottomNav';

const { width } = Dimensions.get('window');

const ORDERS_DATA = [
  {
    id: '1',
    name: 'John Doe',
    type: 'Handwritten prescription attached',
    items: 3,
    time: '10:30 AM',
    status: 'NEW',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=200&auto=format&fit=crop', // Mock prescription image
    statusColor: '#3b82f6',
    statusBg: '#eff6ff',
  },
  {
    id: '2',
    name: 'Jane Smith',
    type: 'Digital prescription order #2940',
    items: 1,
    time: '09:45 AM',
    status: 'PROCESSING',
    statusColor: '#f59e0b',
    statusBg: '#fffbeb',
    isDigital: true,
  },
  {
    id: '3',
    name: 'Robert Wilson',
    type: 'Insulin & Syringes',
    items: 2,
    time: '08:15 AM',
    status: 'READY',
    statusColor: '#10b981',
    statusBg: '#ecfdf5',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop', // Mock medicine image
  },
  {
    id: '4',
    name: 'Anna Mendis',
    type: 'Insulin & Syringes',
    items: 2,
    time: '08:15 AM',
    status: 'READY',
    statusColor: '#10b981',
    statusBg: '#ecfdf5',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop',
  },
];

const OrderCard = ({ order }: { order: any }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          {order.isDigital ? (
            <View style={[styles.statusIconBg, { backgroundColor: '#f0fdf4' }]}>
               <Ionicons name="document-text" size={30} color="#10b981" />
            </View>
          ) : (
            <Image source={{ uri: order.image }} style={styles.orderImage} />
          )}
          {order.status === 'NEW' && <View style={styles.newIndicator} />}
        </View>
        
        <View style={styles.orderInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.patientName}>{order.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: order.statusBg }]}>
              <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
            </View>
          </View>
          
          <Text style={styles.orderType}>{order.type}</Text>
          
          <View style={styles.detailsRow}>
             <View style={styles.detailItem}>
                <Ionicons name="link-outline" size={16} color="#94a3b8" />
                <Text style={styles.detailText}>{order.items} Items</Text>
             </View>
             <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#94a3b8" />
                <Text style={styles.detailText}>{order.time}</Text>
             </View>
          </View>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            order.status === 'NEW' ? styles.acceptButton : styles.readyButton
          ]}
        >
          <Text style={[
            styles.actionButtonText,
            order.status !== 'NEW' && styles.readyButtonText
          ]}>
            {order.status === 'NEW' ? 'Accept' : 'Mark Ready'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryActionButton}>
          <Ionicons name={order.isDigital || order.status === 'PROCESSING' ? "chatbubble-outline" : "eye-outline"} size={20} color="#64748b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.mainContainer, { paddingTop: Math.max(insets.top, 10) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders Received</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={22} color="#1e293b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {ORDERS_DATA.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>

      <PharmacyBottomNav activeTab="Orders" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    flex: 1,
    marginLeft: 15,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  imageContainer: {
    position: 'relative',
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  statusIconBg: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  orderType: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#3b82f6',
  },
  readyButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  readyButtonText: {
    color: '#1e293b',
  },
  secondaryActionButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
