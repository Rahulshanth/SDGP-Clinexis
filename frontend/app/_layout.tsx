<<<<<<< HEAD
<<<<<<< HEAD



=======
>>>>>>> 9b7dcf538e46af26144fa5d5018e9468fd9bbed0
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
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}






// Once our navigation/ folder is built, we can replace the <Stack> part with our RootNavigator(navigation/index.tsx)

// BELOW COMMENTED BY RAHUL ON 6TH MARCH  (JUST TO TEST THE APPLICATION FOR NOW)

/*import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../store';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}*/

/*
// app/_layout.tsx - modified by vidu for testing
=======
>>>>>>> develop
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="voice-recorder"
          options={{ headerShown: true, title: "Record Consultation" }}
        />
        <Stack.Screen
          name="live-transcript"
          options={{ headerShown: true, title: "Consultation Records" }}
        />
        <Stack.Screen name="FindMedicines" options={{ headerShown: false }} />
        <Stack.Screen
          name="SharePrescription"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}
<<<<<<< HEAD
*/
>>>>>>> develop
=======
>>>>>>> develop
=======
}
>>>>>>> 9b7dcf538e46af26144fa5d5018e9468fd9bbed0
