import { KeyboardAvoidingView } from "react-native";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./Home";
import SettingsScreen from "./Settings";
import TabBar from "./TabBar";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}
