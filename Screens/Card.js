import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { CardField } from '@stripe/stripe-react-native'
import { StripeProvider, useConfirmPayment } from'@stripe/stripe-react-native'


const API_URL = 'http://localhost:6789'

const Card = props => {
  const [ isReady, setIsReady ] = useState(false)
  // const [email, setEmail] = useState('')
  // const [cardDetails, setCardDetails] = useState('')
  const { confirmPayment, loading } = useConfirmPayment()

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/
    create-payment-intent`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }
    })
    const { clientSecret,error} = await response.json()
    return {clientSecret, error}
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
          `The payment was confirmed successfully! currency" ${paymentIntent.currency}`
        )
      }
    }


    return (
      <View style={styles.container}>
      <StripeProvider 
      publishableKey='pk_test_51PtD9yRqqjKBjICaX79G8pD1vvUDw4Q4CutFZ8pO8fTT5yiIEWkPiJQIgVnblsAo9kb55lpx9FpDHmpLKoiTzJYZ00iEYmPgqb'
      // add merchantIdentifier
      >
      <Text>I am something to purchase</Text>
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

  }
})


