import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Signup from './Signup'



export default function StartScreen({navigation}) {
  return (
    <View className='signup'>
      <Text className='start'> Let's Get Started! </Text>
      <TouchableOpacity 
      className='signup-button' 
      onPress={() => navigation.navigate('Signup')}
      >
        <Text> Sign Up </Text>
      </TouchableOpacity>
      <Text> Already have an account?</Text>
      <TouchableOpacity>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}