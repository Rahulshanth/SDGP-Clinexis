//import { View } from 'react-native';

export default function HomeScreen() {
  return null;
}


// import { View, Text } from 'react-native';

// export default function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
//         Clinexis App Running -  🚀RIVITHI AND NADITHI WILL DO THE FRONTEND
//       </Text>
//     </View>
//   );
// }

//                                 // COMMENTED BY RAHUL ON 6TH MARCH  (JUST TO TEST THE APPLICATION FOR NOW)
//                                 // Once we connect our real navigation/ folder, this file also gets deleted.

// /*import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });*/

// /*
// import { View, Text } from 'react-native';

// export default function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
//         Clinexis App Running -  🚀ri
//       </Text>
//     </View>
//   );
// }*/

// import React, { useEffect } from 'react';
// import { View, Image, StyleSheet, StatusBar } from 'react-native';
// import { router } from 'expo-router';

// export default function SplashScreen() {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.replace('/welcome');
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#2EA8FF" />
//       <Image
//         source={require('/Users/nadithimoonasingha/SDGP-Clinexis/frontend/assets/images/ClinexisLogo.png')}
//         style={styles.logo}
//         resizeMode="contain"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2EA8FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 280,
//     height: 280,
//   },
// });

// //Added by Nadithi
//import { View, Text } from 'react-native';

/*export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Clinexis App Running -  🚀RIVITHI AND NADITHI WILL DO THE FRONTEND
      </Text>
    </View>
  );
}*/

//TEST1 *********// app/(tabs)/index.tsx — Temporarily modified by Vidu for testing
/*
import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RemindersScreen from "../../screens/Reminders/RemindersScreen";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [medicines, setMedicines] = useState<string[]>([]);

  const handleExtract = async () => {
    try {
      const data = await extractMedicines(text);
      setMedicines(data.medicines);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Text style={styles.iconText}>⚕</Text>
        </View>
        <Text style={styles.title}>Medicine Extractor</Text>
        <Text style={styles.subtitle}>Paste a prescription and instantly identify all medicines</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.label}>PRESCRIPTION TEXT</Text>
        <TextInput
          placeholder="Paste or type your prescription here..."
          placeholderTextColor="#9BAAB8"
          value={text}
          onChangeText={setText}
          multiline
          style={styles.input}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.button} onPress={handleExtract} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Extract Medicines</Text>
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {medicines.length > 0 && (
        <View style={styles.resultsCard}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Identified Medicines</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{medicines.length} found</Text>
            </View>
          </View>

          {medicines.map((med, index) => (
            <View key={index} style={styles.medItem}>
              <View style={styles.medDot} />
              <Text style={styles.medName}>{med}</Text>
            </View>
          ))}
        </View>
      )}

      {medicines.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💊</Text>
          <Text style={styles.emptyText}>Results will appear here</Text>
        </View>
      )}

    </ScrollView>
  );
}
  
*/

//import PatientHomeScreen from '../../screens/Patient/PatientHomeScreen';
//import DoctorHomeScreen from '../../screens/Doctor/DoctorHomeScreen';

// 🔧 TEMP: Change to 'doctor' to test doctor view — remove when login is ready
//const TEST_ROLE: 'patient' | 'doctor' = 'patient';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: TEAL,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  iconText: {
    fontSize: 30,
    color: WHITE,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: NAVY,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: SLATE,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 260,
  },

  /* Card */
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: TEAL,
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  input: {
    backgroundColor: BG,
    borderRadius: 12,
    padding: 14,
    height: 140,
    fontSize: 15,
    color: NAVY,
    lineHeight: 22,
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginBottom: 16,
  },
  button: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TEAL,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    gap: 8,
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonIcon: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
  },

  /* Results Card */
  resultsCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
  },
  badge: {
    backgroundColor: TEAL_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: TEAL,
  },
  medItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: BG,
    gap: 12,
  },
  medDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEAL,
  },
  medName: {
    fontSize: 15,
    color: NAVY,
    fontWeight: '500',
  },

  /* Empty State */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    opacity: 0.4,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: SLATE,
    fontWeight: '500',
  },
});