
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Notes from "./components/Notes"
import EditNote from "./components/EditNote"
import {LayoutProvider} from "./components/LayoutContext"

const Stack = createStackNavigator();
export default function App() {
  return (
    <LayoutProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes" headerMode="none" >
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="EditNote" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>
    </LayoutProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
