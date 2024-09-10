import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native'
import { CardField, StripeProvider, useConfirmPayment } from'@stripe/stripe-react-native'
import Confirmation from './Confirmation'
import PaymentSheet from'./PaymentSheet'
import { useNavigation } from '@react-navigation/native'


const API_URL = 'http://127.0.0.1:5555'

const Card = props => {
  const [ isReady, setIsReady ] = useState(false)
  const { confirmPayment, loading } = useConfirmPayment()
  const [ email, setEmail ] = useState('')
  const navigation = useNavigation()
  
  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${API_URL}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          amount: 5000, 
        }),
      });
  
      const { clientSecret, error } = await response.json()
      
      if (error) {
        throw new Error(error)
      }
  
      return clientSecret
    } catch (error) {
      console.error("Failed to fetch client secret:", error)
      return null
    }
  }


    const Pay = async () => {
      const clientSecret = await fetchPaymentIntentClientSecret()
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      })

      if(error) {
        Alert.alert(`Error code: ${error.code}`, error.localizedMessage)
      } else if (paymentIntent) {
        Alert.alert(
          'Success', 
          `The payment was confirmed successfully!`)
          navigation.navigate('Confirmation')
      }
    }
  


    return (
      <View style={styles.container}>
      <StripeProvider 
      publishableKey='pk_test_51PtD9yRqqjKBjICaX79G8pD1vvUDw4Q4CutFZ8pO8fTT5yiIEWkPiJQIgVnblsAo9kb55lpx9FpDHmpLKoiTzJYZ00iEYmPgqb'
      merchantIdentifier='MERCHANT_ID'
      >
      <Text style={styles.price}>$50</Text>
      <Image source={require('/Users/elizabethdelgado/development/code/phase-5/miwallet/Assets/WGTFLW.jpg')} style={styles.image}/>
      <TextInput 
        autoCapitalize='none'
        placeholder='E-mail'
        keyboardType='email-address'
        onChange={ value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      /> 
      <CardField
      postalCodeEnabled={true}
      // placeholder= '4242 4242 4242 4242'
      cardStyle={styles.card}
      style={styles.cardField}
        onCardChange={(details) => {
          if(details.complete) {
            setIsReady(true)
          }
        }}  // -- verification of real card payment
        />
        <Button onPress={Pay} title='Pay'/> 
        <Button onPress={() => navigation.navigate('PaymentSheet')} title='Alternative Payment'/>
      </StripeProvider>
      </View>
    ) 
  }
  export default Card


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    margin: 50,
  }, 
  input: {
    backgroundColor: '#efefefef', 
    borderColor: '#000000', 
    borderRadius: 8, 
    fontSize: 20, 
    height: 50, 
    padding: 10, 
  }, 
  card: {
    backgroundColor: '#efefefef', 
    height: 50, 
    marginVertical: 30, 

  }, 
  cardField: {
    height: 50,
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