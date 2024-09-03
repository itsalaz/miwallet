import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeModules, NativeEventEmitter } from 'react-native';
import PinScreen from './Screens/PinScreen'
import Card from "./Screens/Card"
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator()

const App = () => {



  return (
      <>
      <PinScreen />
      </>

    // <NavigationContainer>
    // <Stack.Navigator initialRouteName="Passcode" component={PinScreen}>
    //   <Stack.Screen name='passcode' component={PinScreen} />
    //   <Stack.Screen name='card' component={Card} />
    // </Stack.Navigator>
    // </NavigationContainer>
  )

};



export default App;
