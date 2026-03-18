
                                             //Don't DELETE OR MAKE CHANGES IN THIS

/*import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import RootNavigator from "./navigation";
import { View, Text } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}*/

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import RootNavigator from "./navigation";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}


                                           //Don't DELETE OR MAKE CHANGES IN THIS