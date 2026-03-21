import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="voice-recorder" options={{ headerShown: true, title: 'Record Consultation' }} />
        <Stack.Screen name="live-transcript" options={{ headerShown: true, title: 'Consultation Records' }} />
        <Stack.Screen name="FindMedicines" options={{ headerShown: false }} />
        <Stack.Screen name="SharePrescription" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}