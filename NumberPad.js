import React from 'react'
import styled from 'styled-components'
import { Svg, Path } from 'react-native-svg'
import { Text } from 'react-native'



export default NumberPad = ({onPress}) => {


  const BackspaceIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M21 11H7.83l3.59-3.59L10 6l-6 6 6 6 1.41-1.41L7.83 13H21v-2z" fill="black" />
    </Svg>
  );


  const buttons = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    <BackspaceIcon />,
  ]

  return (
    <KeyPad>
      {buttons.map((item, index) => {
        return (
          <Number key={index} onPress={() => onPress(item, index)} delayPressIn={0 }>
            <Text large heavy>
              {item}
            </Text>
          </Number>
        )
      })}
    </KeyPad>
  )
}


const KeyPad = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
`;

const Number = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  margin: 5px 20px;
  border-width: 1px;
  border-color: #ffffff20;
`; 
