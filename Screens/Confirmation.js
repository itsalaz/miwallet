import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'




export default function Confirmation({navigation}) {

  return (
    <View style={styles.container}>
      <Text>Payment Made Successfully!</Text>
      <Text> A receipt has been sent to Email</Text>
      <Text></Text>
    
      <Button
      className='return-button' 
      onPress={() => navigation.navigate('Card')}
      title='Return'
      />
    </View>
  )
}

const styles = StyleSheet.create ({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
})