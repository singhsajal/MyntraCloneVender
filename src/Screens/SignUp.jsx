import { View, Text, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView, Platform, } from 'react-native'
import React from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import uuid from "react-native-uuid"
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import axios from 'axios'
import firestore from '@react-native-firebase/firestore'
import Loader from '../components/Loader'
import auth from '@react-native-firebase/auth';

const SignUp = () => {

    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [Name, setName] = useState('')
    const [Email, SetEmail] = useState('')
    const [Password, SetPassword] = useState('')
    const [Confirm, SetConfirm] = useState('')
    const [BadName, SetBadName] = useState(false)
    const [BadEmail, SetBadEmail] = useState(false)
    const [BadPassword, SetBadPassword] = useState(false)
    const [BadConfirm, SetBadConfirm] = useState(false)
    const [SendData, SetSendData] = useState(false)
    const [GoLogin, SetGoLogin] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const GoToLoginPage = () => {
        navigation.navigate('Login')
    }

    //==============Delete user ==========================

    // const deleteUser = async (usernameToDelete) => {
    //     try {
    //         // Fetch existing users from local storage
    //         const existingUsers = await AsyncStorage.getItem('users');
    //         const users = existingUsers ? JSON.parse(existingUsers) : [];

    //         // Find the index of the user to delete
    //         const userIndexToDelete = users.findIndex(user => user.username === usernameToDelete);

    //         // If the user is found, remove it from the array
    //         if (userIndexToDelete !== -1) {
    //             users.splice(userIndexToDelete, 1);

    //             // Save the updated array back to local storage
    //             await AsyncStorage.setItem('users', JSON.stringify(users));

    //             console.log(`User '${usernameToDelete}' deleted successfully`);
    //             console.log('Updated users:', users);
    //         } else {
    //             console.log(`User '${usernameToDelete}' not found`);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //     }
    // };

    //======================hit api =====================================

    const signUp = async (username, email, password, confirmPassword) => {



        //     if (SendData === false) {

        //         console.log("Signup", username, email, password, confirmPassword)

        //         // try {
        //         //     const result = await fetch('http://0.0.0.0:4500/signup', {
        //         //         method: 'post',
        //         //         body: JSON.stringify({ username, email, password, confirmPassword }),
        //         //         headers: {
        //         //             'Content-Type': "application/json"
        //         //         }
        //         //     })
        //         // }
        //         // catch (error) {
        //         //     console.error('Error:', error);
        //         // }

        //         //=============================== local api================== 
        //         try {
        //             console.log("try", username, email, password, confirmPassword)
        //             //const response = await axios.post('http://0.0.0.0:4500/signup', {
        //             const response = await axios.post('https://ill-ruby-housecoat.cyclic.app/signup', {
        //                 username,
        //                 email,
        //                 password,
        //                 confirmPassword
        //             }, {
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 }
        //             });

        //             // Handle response data if needed
        //             console.log('Response:', response.data);
        //         } catch (error) {
        //             // Handle error
        //             console.error('Error:', error);
        //         }


        //=================== firebase======================

        try {
            // const response = await axios.get('https://dummyjson.com/products/category/womens-dresses');
            // const response = await axios.get(`http://192.168.1.68:4500/list`);

            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    setVisible(true)
                    const userId = uuid.v4()
                    await firestore().collection("venders").doc(userId).set({
                        name: username,
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword

                    }).then(res => {
                        setVisible(false)
                        console.log("user created")
                        navigation.goBack()
                    }).catch(error => {
                        console.log(error)
                    })
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                        setEmailError(true)

                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });

            // setVisible(true)
            // const userId = uuid.v4()


            // await firestore().collection("venders").doc(userId).set({
            //     name: username,
            //     email: email,
            //     password: password,
            //     confirmPassword: confirmPassword

            // }).then(res => {
            //     setVisible(false)
            //     console.log("user created")
            //     navigation.goBack()
            // }).catch(error => {
            //     console.log(error)
            // })
            // console.log("response ", response._data.age);
        } catch (error) {
            console.error('Error', error);
        }
        //======================== local storage ==========================

        // try {
        //     // Fetch existing users from local storage (if any)
        //     const existingUsers = await AsyncStorage.getItem('users');
        //     const users = existingUsers ? JSON.parse(existingUsers) : [];

        //     // Check if the username is already taken
        //     const isUsernameTaken = users.some(user => user.username === username);
        //     if (isUsernameTaken) {
        //         console.log('Username is already taken');
        //         return;
        //     }

        //     // Add the new user to the array
        //     const newUser = { username, email, password };
        //     users.push(newUser);

        //     // Save the updated array back to local storage
        //     await AsyncStorage.setItem('users', JSON.stringify(users));

        //     console.log('User signed up successfully');
        //     SetGoLogin(true)

        // } catch (error) {
        //     console.error('Error signing up:', error);
        // }


        //     }

        //     else {

        //     }
    };



    const ValidateInput = () => {



        if (Name == '') {
            SetBadName(true)
            SetSendData(true)

        }
        else {
            SetBadName(false)
            SetSendData(false)
            console.log(Name)

        }
        if (Email == '') {
            SetBadEmail(true)
            SetSendData(true)
        }
        else {
            SetBadEmail(false)
            SetSendData(false)
            console.log(Email)
        }
        if (Password == '') {
            SetBadPassword(true)
            SetSendData(true)
        }
        else {
            SetBadPassword(false)
            SetSendData(false)
            console.log(Password)
        }
        if (Confirm == '') {
            SetBadConfirm(true)
            SetSendData(true)
        }
        else {
            SetBadConfirm(false)
            SetSendData(false)
            console.log(Password)
            signUp(Name, Email, Password, Confirm)
            if (GoLogin == true) {
                GoToLoginPage()

            }
            else {
                SetGoLogin(false)
            }
        }

        // signUp(Name, Email, Password, Confirm)
        // if (GoLogin == true) {
        //     GoToLoginPage()

        // }
        // else {
        //     SetGoLogin(false)
        // }

    }


    return (
        <ScrollView contentContainerStyle={styles.main}>
            <Image source={require('../images/loginHeader.jpg')} style={styles.banner} />
            <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                <Image source={require("../images/back.png")} style={styles.backIcon}></Image>
            </TouchableOpacity>

            <View style={styles.FormArea}>
                <Text style={styles.loginText}>SignUp </Text>

                {/* <View style={styles.TextInput}>
                    <TextInput placeholder='name' placeholderTextColor={"grey"} onChangeText={(text) => { SetName(text) }} style={styles.Text} ></TextInput>
                </View> */}
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Adjust the offset as needed
                >
                    <View style={styles.TextInput}>
                        <TextInput
                            placeholder='Name'
                            placeholderTextColor="grey"
                            onChangeText={(text) => setName(text)}
                            style={styles.textInput}
                        />
                    </View>
                </KeyboardAvoidingView>
                {BadName === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Please enter Name </Text>)}

                <View style={styles.TextInput}>
                    <TextInput placeholder='Email' placeholderTextColor={"grey"} onChangeText={(text) => { SetEmail(text); setEmailError(false) }} style={styles.Text} ></TextInput>
                </View>
                {BadEmail === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Please enter Email </Text>)}
                {emailError === true && (<Text style={{ color: "red", marginRight: 150, marginTop: -7, fontSize: 11, }}>Email already taken  </Text>)}

                <View style={styles.TextInput}>
                    <TextInput placeholder='Password' placeholderTextColor={"grey"} onChangeText={(text) => { SetPassword(text) }} secureTextEntry={true} style={styles.Text} ></TextInput>
                </View>
                {BadPassword === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Please enter Password </Text>)}

                <View style={styles.TextInput}>
                    <TextInput placeholder='ConfirmPassword' placeholderTextColor={"grey"} onChangeText={(text) => { SetConfirm(text) }} secureTextEntry={true} style={styles.Text} ></TextInput>
                </View>
                {BadConfirm === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Please enter Password </Text>)}

                <TouchableOpacity style={styles.Submit} onPress={() => ValidateInput()}>
                    <Text style={{ color: "white" }}> SignUp </Text>
                </TouchableOpacity>

                {/* {SendData === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Please enter Details</Text>)} */}
                <TouchableOpacity style={styles.CreateAccount} onPress={() => navigation.goBack()}>
                    <Text style={{ color: "black", fontSize: 20 }}> Already have account </Text>
                </TouchableOpacity>

                {/* <Button title='Delete user' onPress={() => deleteUser("Sajal")}>

                </Button> */}

                <Loader visible={visible}></Loader>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    main: {

        flex: 1

    },
    loginText: {

        color: "black",
        fontSize: 40
    },
    FormArea: {
        flex: 1,
        alignItems: 'center',
        width: "95%",
        height: "100%",
        backgroundColor: 'white',
        position: "absolute",
        top: 150,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        alignSelf: 'center'
    },
    TextInput: {
        borderWidth: 2,
        borderColor: "black",
        width: 270,
        margin: 10,
        padding: 3,
        color: "black"
    },
    Submit: {
        backgroundColor: "black",
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        margin: 10

    },
    CreateAccount: {
        marginTop: 15,
        height: 60,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15

    },
    Text: {
        color: "black"
    },
    banner: {
        width: '100%',
        height: 250,

    },
    backButton: {
        backgroundColor: "white",
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        elevation: 5,
        top: 20,
        left: 20,
        borderRadius: 10
    },
    backIcon: {
        width: "60%",
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})

export default SignUp