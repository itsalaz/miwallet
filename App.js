import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PinScreen from './Screens/PinScreen'
import Card from "./Screens/Card"
import StripePayment from './Screens/StripePayment'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import * as LocalAuthentication from 'expo-local-authentication'

const Stack = createStackNavigator()

const App = () => {

  // const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  // const [isAunthenticated, setIsAuthenticated] = useState(false)


  // useEffect(() => {
  //   (async() => {
  //     const compatible = await LocalAuthentication.hasHardwareAsync()
  //     setIsBiometricSupported(compatible)
  //   })()
  // })

   

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="PinScreen" component={PinScreen}>
      <Stack.Screen name='PinScreen' component={PinScreen} />
      <Stack.Screen name='Card' component={Card} />
    </Stack.Navigator>
    </NavigationContainer>
  )

};



export default App;
