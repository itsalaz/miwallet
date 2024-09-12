// import React from 'react'
// import { View, Text, Image, StyleSheet, Button } from 'react-native'
// import { StatusBar } from 'expo-status-bar'
// import { useNavigation } from '@react-navigation/native'



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
//         return res.json().then(data => {
//           throw new Error(data.error);
//         });
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
//     <Button onPress={handleSubmit} title='Signup'></Button>
//     <Button onPress={() => navigation.navigate('PaymentSheet')} title='Already have an account?'></Button>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     justifyContent: 'center', 
//     margin: 50,
//   }

// })