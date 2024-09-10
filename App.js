import React from 'react'
// import StartScreen from './Screens/StartScreen'
// import Login from './Screens/Login'
// import Signup from './Screens/StartScreen'
import PinScreen from './Screens/PinScreen'
import Card from "./Screens/Card"
import Confirmation from './Screens/Confirmation'
import PaymentSheet from './Screens/PaymentSheet'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
// import * as LocalAuthentication from 'expo-local-authentication'

const stripePromise = loadStripe('pk_test_51PtD9yRqqjKBjICaX79G8pD1vvUDw4Q4CutFZ8pO8fTT5yiIEWkPiJQIgVnblsAo9kb55lpx9FpDHmpLKoiTzJYZ00iEYmPgqb')
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const App = () => {

  // const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  // const [isAunthenticated, setIsAuthenticated] = useState(false)


  // useEffect(() => {
  //   (async() => {
  //     const compatible = await LocalAuthentication.hasHardwareAsync()
  //     setIsBiometricSupported(compatible)
  //   })()
  // })

  function CardScreen() {
    return (
      <Tab.Navigator
      initialRouteName='Credit Card'
      screenOptions={{headerShown: false}} 
      >
        <Tab.Screen
        name='creditcard'
        component={Card}
        options={{title: 'Credit Card', 
      tabBarIcon: ({size, color}) => (
        <MaterialCommunityIcons name='creditcard'
        size={size} color={color} />
      )
    }}
  />
    <Tab.Screen
    name='Payment Methods'
    component={PaymentSheet}
    options={{title: 'Payment Methods Page', 
    tabBarIcon: ({size, color}) => (
      <MaterialCommunityIcons name='Payment Methods'
      size={size} color={color} />
      )
    }}
  />
    </Tab.Navigator>
    )
  }
   
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="PinScreen"  screenOptions={{headerShown: false}} component={PinScreen}>
      {/* <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} /> */}
      <Stack.Screen name='PinScreen' component={PinScreen} />
      {/* <Elements stripe={stripePromise}> */}
      <Stack.Screen name='Card' component={Card} />
      <Stack.Screen name='PaymentSheet' component={PaymentSheet} />
      <Stack.Screen name='Confirmation' component={Confirmation} />
      {/* </Elements>  */}
    </Stack.Navigator>
    </NavigationContainer>
  )

};
export default App;

