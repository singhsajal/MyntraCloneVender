/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


//import { View, Text, Alert, StyleSheet } from 'react-native'
//import React, { useEffect, useState, useMemo } from 'react'
import 'react-native-gesture-handler';
import { useEffect } from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import messaging from '@react-native-firebase/messaging'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux';
import store from './src/store/store';


const App = () => {

  // const [selectedOption, setSelectedOption] = useState('')

  // const radioButtons = useMemo(
  //   () => [
  //     { id: '1', label: 'Option 1', value: 'option1', selected: selectedOption == 'option1' },
  //     { id: '2', label: 'Option 2', value: 'option2', selected: selectedOption == 'option2' },
  //     { id: '3', label: 'Option 3', value: 'option3', selected: selectedOption == 'option3' },
  //   ],
  //   [selectedOption]
  // );

  // const onPressRadioButton = (radioButton) => {
  //   setSelectedOption(radioButton.value);
  // };


  useEffect(() => {
    getDeviceToken()
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log(token)
  }
  return (
    <Provider store={store}>

      <AppNavigator />
    </Provider>
    // <View style={styles.container}>
    //   <Text style={styles.label}>Select an option: </Text>






    // </View>

  )
}





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   buttonContainer: {
//     marginHorizontal: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//   },
// });

export default App