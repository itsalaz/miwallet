import { useState, useEffect } from 'react'
import { StatusBar, Text, Button, Alert } from 'react-native'
import NumberPad from '../NumberPad'
import Card from './Card'
import styled from 'styled-components'


export default PinScreen = ({navigation}) => {
  const [pinCount, setPinCount] = useState(0)
  const [pin, setPin] = useState('')
  const totalPins = 6 
  const correctPin = '123456'




  useEffect(() => {
    if (pinCount === totalPins) {
      if (pin === correctPin) {
        Alert.alert('Success', 'PIN is correct!', [
          {
            onPress: () => navigation.navigate('Card'), 
          },
        ]);
      } else {
        Alert.alert('Error', 'The passcode you entered is incorrect. Please try again.');
        setPin('');
        setPinCount(0);
      }
    }
  }, [pinCount, pin, navigation]);


    const renderPins = () => {
    const pins = []

    for(let x = 1; x <= totalPins; x++) {
      pins.push(
        x <= pinCount ? (
          <PinContainer key={x}>   
            <FilledPin />
          </PinContainer>
        ) : ( 
        <PinContainer key={x}>
          <Pin />
        </PinContainer>
        )
      );
    }
    return pins;
  }


  const pressKey = (key, index) => {
    if(index !== 10) {
      if(pinCount < totalPins) {
        setPin((prev) => prev + key)
        setPinCount((prev) => prev + 1)
      }
    } else {
      if (pinCount > 0) {
        setPin((prev) => prev.slice(0, -1))
        setPinCount((prev) => prev -1)
      }
    }
  }


    
  return (
    <Container>
      <Text center heavy title color='#964ff0' margin={['32px 0 0 0']}></Text>
      <CenteredText center heavy medium margin={['32px 0 0 0']} > 
        Enter your PIN code.
      </CenteredText>
      <AccessPin>
      {renderPins()}
      </AccessPin>
      <CenteredText center bold margin={['8px 0 0 0']} color='9c9c9f'>
        Forgot PIN?
      </CenteredText>
      <NumberPad onPress={pressKey}/>
      <StatusBar barStyle='light-content' />
 
    </Container>
  )
} 


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #lelele;
  justify-content: center;
`;

const AccessPin = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 32px 64px 10px 64px;
  padding-bottom: 20px;

`;


const UseTouch = styled.TouchableOpacity`
  margin: 32px 0 64px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


const PinContainer = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #5196f4;
  align-items: center;
  justify-content: center;

  `; 

const Pin = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #51956f4;
`;

const FilledPin = styled.View `
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #5196f4

`

const CenteredText = styled(Text) `
  text-align: center;
`