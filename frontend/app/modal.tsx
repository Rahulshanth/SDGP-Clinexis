<<<<<<< HEAD
// COMMENTED BY RAHUL ON 6TH MAR
/*import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
=======
>>>>>>> 9b7dcf538e46af26144fa5d5018e9468fd9bbed0

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
}); 

export default function Modal() {
  return null;
}
*/

// app/modal.tsx - modified by Vidu for testing
/*
export default function ModalScreen() {
  return null;
}
*/
// COMMENTED BY RAHUL ON 6TH MARCH
=======
>>>>>>> 9b7dcf538e46af26144fa5d5018e9468fd9bbed0

/*import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
}); 

export default function Modal() {
  return null;
}
*/

<<<<<<< HEAD
// app/modal.tsx - modified by Vidu for testing
=======
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modal Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
>>>>>>> 9b7dcf538e46af26144fa5d5018e9468fd9bbed0
