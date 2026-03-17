
// DON'T USE THIS (RAHUL) USE THE HOOKS INSIDE  STORE FOLDER


//export { useColorScheme } from 'react-native';
import { useColorScheme as _useColorScheme } from "react-native";

export function useColorScheme() {
  return _useColorScheme();
}