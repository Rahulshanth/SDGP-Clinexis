import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../store';
//import RootNavigator from '@/navigation';

export default function RootLayout() {
  return (
    <Provider store={store}>
    
      <Stack> 
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}
// Once our navigation/ folder is built, we can replace the <Stack> part with our RootNavigator(navigation/index.tsx)




                                // BELOW COMMENTED BY RAHUL ON 6TH MARCH  (JUST TO TEST THE APPLICATION FOR NOW)




/*import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../store';

import { useColorScheme } from "react-native";

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
