// import { useState } from 'react'
// import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
// import { StatusBar } from 'expo-status-bar'
// import { useNavigation } from '@react-navigation/native'
// import Signup from './Signup'


// export default function Login({setCurrentUser}) {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const navigation = useNavigation()


//   function handleSubmit(e) {
//     e.preventDefault();

//     fetch('/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
//       body: JSON.stringify({ username, password })
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error('Invalid username or password');
//       }
//     })
//     .then(data => {
//       setCurrentUser(data);
//       navigation.navigate('Card')
//     })
//     .catch(error => {
//       alert(error.message);
//     });
//   }


//   return (
//     <View styles={styles.container}>
//     <TextInput 
//       autoCapitalize='none'
//       placeholder='Username'
//       keyboardType='username'
//       onChange={ value => setUsername(value.nativeEvent.text)}
//       style={styles.input}
//       /> 
//     <TextInput 
//       autoCapitalize='none'
//       placeholder='Password'
//       keyboardType='password'
//       onChange={ value => setPassword(value.nativeEvent.text)}
//       style={styles.input}
//     /> 
//     <Button onPress={handleSubmit} title='Login'></Button>
//     <Button onPress={() => navigation.navigate('PaymentSheet')} title='Dont have an account?'></Button>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     justifyContent: 'center', 
//     margin: 50,
//   },
//   input: {
//     backgroundColor: '#efefefef', 
//     borderColor: '#000000', 
//     borderRadius: 8, 
//     fontSize: 20, 
//     height: 50, 
//     padding: 10, 
//   }, 
// })