import { useState, useEffect } from 'react'
import { StatusBar, Text} from 'react-native'
import NumberPad from '../NumberPad'
import Card from './Card'
import styled from 'styled-components'

// const { PinScreenView} = NativeModules;


export default PinScreen = ({navigation}) => {
  const [pinCount, setPinCount] = useState(0)
  const [pin, setPin] = useState('')
  const totalPins = 6 
  
  // if (PinScreenView) {
  //   PinScreenView.verifyPin("123456")
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));
  // } else {
  //   console.error("PinScreenView is not available");
  // }

  useEffect(() => {
      if(pinCount == totalPins) {
        router.push('/Card')
      } 
    }, [pinCount])
   

    const renderPins = () => {
    const pins = []

    for(let x = 1; x <= totalPins; x++) {
      pins.push(
        x <= pinCount ? (
          <PinContainer key={x}>   
            <Pin />
          </PinContainer>
        ) : ( 
        <PinContainer key={x}/>
        )
      );
    }
    return pins;
  }


 
  // const pressKey = (_, index) => {
  //   setPinCount(prev => {
  //     return index != 10 ? prev + 1 : prev - 1
  //   })
  //   }

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
      <Text center heavy medium margin={['32px 0 0 0']}>
        Enter your PIN code.
      </Text>
      <AccessPin>
      {renderPins()}
      </AccessPin>
      <Text center bold margin={['8px 0 0 0']} color='9c9c9f'>
        Forgot PIN?
      </Text>
      <NumberPad onPress={pressKey}/>
      <StatusBar barStyle='light-content' />
 
    </Container>
  )
} 


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #lelele;
`;

const AccessPin = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 32px 64px 10px 64px;

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