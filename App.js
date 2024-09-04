import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeModules, NativeEventEmitter } from 'react-native';
import Login from './Screens/Login'
import PinScreen from './Screens/PinScreen'
import Card from "./Screens/Card"
import StripeApp from './Screens/Card'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const App = () => {



  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="PinScreen" component={PinScreen}>
      <Stack.Screen name='PinScreen' component={PinScreen} />
      <Stack.Screen name='Card' component={Card} />
      <Stack.Screen name='StripeApp' component={StripeApp} />
    </Stack.Navigator>
    </NavigationContainer>
  )

};



export default App;
