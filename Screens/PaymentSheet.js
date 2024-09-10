import React, { useEffect, useState } from 'react'
import { Button, Image, Text, View, Alert, StyleSheet, Platform } from 'react-native'
import { usePaymentSheet, StripeProvider } from '@stripe/stripe-react-native'



const API_URL = 'http://127.0.0.1:5555'

const PaymentSheet = () => {
  const [ ready, setReady ] = useState(false)
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()


  useEffect(() => {
    initializePaymentSheet()
  }, [])

  
  const initializePaymentSheet = async() => {
    const {paymentIntent, ephemeralKey, customer} =
    await fetchPaymentSheetParams()

  
  const {error} = await initPaymentSheet({
    appearance: {
      font: { 
        family: Platform.OS === 'android' ? 'menloregular' : 'Menlo-Regular'
      }, 
      colors: { 
        primary: '#e06c75', 
        background: '#e06c75', 
        componentBackground: '#abb2bf',
        componentDivider: '#e5c07b', 
        primaryText: '#61afef', 
        secondaryText: '#c678dd', 
        componentText: '#282c34', 
        icon: '#e06c75', 
        placeholderText: '#ffffff', 
      }, 
      shapes: { 
        borderRadius: 10, 
      },
    }, 
    customerId: customer, 
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent, 
    merchantDisplayName: 'Example Inc',
    allowsDelayedPaymentMethods: true,
    returnURL: 'stripe-example://stripe-redirect',
        applePay: {
          merchantCountryCode: 'US', 
        }, 
        googlePay: {
          merchantCountryCode: 'US', 
          testEnv: true, 
          currencyCode: 'usd',
        }, 
  })
  if (error) {
    Alert.alert(`Error code: ${error.code}, error.message`)
  } else {
    setReady(true)
  }
}

  const fetchPaymentSheetParams = async() => {
    const response = await fetch(`${API_URL}/paymentsheet`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const {paymentIntent, ephemeralKey, customer} = await response.json()
    return {
      paymentIntent,
      ephemeralKey, 
      customer,
    }
  }
  
  const Pay = async() => {
    if(!ready) return
    const { error } = await presentPaymentSheet()
  }
  



  return (
    <View style={styles.container}>
      <Text style={styles.price}>$50</Text>
      <Image source={require('/Users/elizabethdelgado/development/code/phase-5/miwallet/Assets/WGTFLW.jpg')} style={styles.image}/>
      <Button title='Pay' onPress={Pay}/> 
    </View>
  )
}
export default PaymentSheet




const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    margin: 50,
  }, 
  card: {
    backgroundColor: '#efefefef', 
    height: 50, 
    marginVertical: 30, 

  }, 
  image: {
    height: 150, 
    width: 200, 
    resizeMode: 'contain',
    marginLeft: 40,
  },
  price: {
    textAlign: 'center',
  }
})