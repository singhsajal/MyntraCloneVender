import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import { useDispatch } from 'react-redux'
//import { setUserLoggedIn } from '../store/slices/loginSlice'
//import { setUserInfo } from '../store/slices/loginSlice'
//import { useSelector } from 'react-redux'
//import axios from 'axios'
import uuid from "react-native-uuid"
import firestore from "@react-native-firebase/firestore"
import Loader from '../components/Loader'
//import jwt from 'jsonwebtoken';

const screen_height = Dimensions.get('screen').height

const secretKey = 'Vender-App';



const Login = () => {

    // const dispatch = useDispatch()
    // const isLoggedIn = useSelector(state => state?.login?.isLoggedIn);
    //console.log(isLoggedIn)
    //const userDetail = useSelector(state => state?.login?.userInfo)
    //console.log(userDetail)
    const navigation = useNavigation()


    const [visible, setVisible] = useState(false)
    const [Name, SetName] = useState('')
    const [Email, SetEmail] = useState('')
    const [Password, SetPassword] = useState('')
    const [BadName, SetBadName] = useState(false)
    const [BadEmail, SetBadEmail] = useState(false)
    const [BadPassword, SetBadPassword] = useState(false)
    const [GoHome, SetGoHome] = useState(false)
    const [InvalidError, SetInvalidError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const GoToHomePage = async (data) => {
        await AsyncStorage.setItem("name", data.name)
        await AsyncStorage.setItem("email", data.email)



        navigation.navigate('Home')

    }

    // const generateJwtToken = (payload, secretKey, expiresIn) => {
    //     try {
    //         // Sign the payload to generate the token
    //         const token = jwt.sign({ username: payload }, secretKey, { expiresIn });
    //         return token;
    //     } catch (error) {
    //         console.error('Error generating JWT token:', error);
    //         return null;
    //     }
    // };




    //-------------- login function to check the if the user is present in the local storage or not if yes then setislogin true and login ------

    const login = async (username, password, email) => {
        //     console.log("hello there")
        //     //const  isLoggedIn = await useSelector(state => state?.login?.isLoggedIn);
        //     console.log("logged in status", isLoggedIn)

        //     //==========================local storage =======================

        //     // try {
        //     //     // Fetch existing users from local storage
        //     //     const existingUsers = await AsyncStorage.getItem('users');
        //     //     const users = existingUsers ? JSON.parse(existingUsers) : [];
        //     //     console.log("users", users)

        //     //     // Check if the username and password match any stored user
        //     //     const user = users.find(user => user.username === name && user.email === email);
        //     //     console.log("user", name)

        //     //     if (user) {
        //     //         console.log("inside user ", user)
        //     //         dispatch(setUserLoggedIn("true"))
        //     //         //let isLoggedIn = useSelector(state => state?.login?.isLoggedIn);
        //     //         console.log(isLoggedIn)
        //     //         dispatch(setUserInfo({ name, email }))
        //     //         console.log(userDetail)
        //     //         console.log('Login successful');
        //     //         SetGoHome(true)
        //     //         GoToHomePage()
        //     //     } else {
        //     //         console.log('Invalid username or password');
        //     //         SetInvalidError(true)
        //     //     }
        //     // } catch (error) {
        //     //     console.error('Error logging in:', error);
        //     // }

        //     //======================== live api ====================================

        //     // try {
        //     //     console.log("try", name, email, password)
        //     //     //const response = await axios.post('http://0.0.0.0:4500/signup', {
        //     //     const response = await axios.post('https://ill-ruby-housecoat.cyclic.app/login', {
        //     //         name,
        //     //         email,
        //     //         password,

        //     //     }, {
        //     //         headers: {
        //     //             'Content-Type': 'application/json'
        //     //         }
        //     //     });

        //     //     // Handle response data if needed
        //     //     console.log('Response:', response.data);
        //     // } catch (error) {
        //     //     // Handle error
        //     //     console.error('Error:', error);
        //     // }
        // }

        //     try {
        //         // Fetch existing users from local storage
        //         const existingUsers = await AsyncStorage.getItem('users');
        //         const users = existingUsers ? JSON.parse(existingUsers) : [];
        //         console.log("users", users);

        //         // Check if the username and password match any stored user
        //         const user = users.find(user => user.username === username && user.password === password && user.email === email);
        //         console.log("user", user);

        //         if (user) {
        //             console.log("inside user ", user);
        //             dispatch(setUserLoggedIn(true));
        //             dispatch(setUserInfo({ username, email }));
        //             console.log('Login successful');
        //             SetGoHome(true);
        //         } else {
        //             console.log('Invalid username or password');
        //             SetInvalidError(true);
        //         }
        //     } catch (error) {
        //         console.error('Error logging in:', error);
        //     }

        //=================== firebase======================

        try {
            // const response = await axios.get('https://dummyjson.com/products/category/womens-dresses');
            // const response = await axios.get(`http://192.168.1.68:4500/list`);

            setVisible(true)
            const userId = uuid.v4()


            const user = await firestore().collection("venders").where('name', '==', username).get({})
                .then(snapshot => {
                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        // Handle case where no documents are found
                    } else {
                        // Access the data of the first document
                        const userData = snapshot.docs[0].data();
                        setVisible(false);
                        console.log(userData);
                        GoToHomePage(userData);
                    }
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    // Handle error
                });



            // const token = generateJwtToken(username, secretKey, "5h")
            // console.log(token)
            // console.log("response ", response._data.age);
        } catch (error) {
            console.error('Error', error);
        }

    };

    // --------- validate that input field should not be empty------------------------------

    const ValidateInput = () => {
        // console.log("name", Name)
        // console.log("email", Email)
        // console.log("password", Password)
        if (Name == '') {
            SetBadName(true)

        } else if (Email == '') {
            SetBadEmail(true)
        } else if (Password == '') {
            SetBadPassword(true)
        } else {
            console.log("first")
            SetBadEmail(false)
            SetBadPassword(false)
            SetBadName(false)
            login(Name, Password, Email);
        }


    }

    //-----------  navigate to signup page --------------------

    const GoToSignUpPage = () => {
        navigation.navigate('SignUp')
    }




    return (
        <KeyboardAvoidingView keyboardVerticalOffset={20} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>


                    <Image source={require('../images/loginHeader.jpg')} style={styles.banner} />
                    <View style={styles.FormArea}>
                        <Text style={styles.loginText}>Login </Text>

                        <View style={styles.TextInput}>
                            <TextInput placeholder='name' placeholderTextColor={"grey"} onChangeText={(text) => SetName(text)} style={styles.Text}  ></TextInput>
                        </View>
                        {BadName === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Please enter Name </Text>)}

                        <View style={styles.TextInput}>
                            <TextInput placeholder='Email' placeholderTextColor={"grey"} onChangeText={(text) => SetEmail(text)} style={styles.Text} ></TextInput>
                        </View>
                        {BadEmail === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Please enter Email </Text>)}

                        <View style={styles.TextInput}>
                            <TextInput placeholder='Password' placeholderTextColor={"grey"} onChangeText={(text) => SetPassword(text)} secureTextEntry={true} style={styles.Text} ></TextInput>
                        </View>
                        {BadPassword === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Please enter Password </Text>)}

                        {InvalidError === true && (<Text style={{ color: "red", marginRight: 140, marginTop: -7 }}>Invalid UserName or Password </Text>)}
                        <TouchableOpacity style={styles.Submit} onPress={() => ValidateInput()}>
                            <Text style={{ color: "white" }}> Submit</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.CreateAccount} onPress={() => GoToSignUpPage()}>
                            <Text style={{ color: "black", fontSize: 20 }}> Create New Account </Text>
                        </TouchableOpacity>

                    </View>

                    <Loader visible={visible}></Loader>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    main: {

        flex: 1


    },
    scrollViewContent: {
        // alignItems: 'center',
        // justifyContent: "center",
        // flex: 1
        height: screen_height

    },
    loginText: {

        color: "black",
        fontSize: 40
    },
    FormArea: {
        flex: 1,
        alignItems: "center",
        width: "95%",
        height: "100%",
        backgroundColor: 'white',
        position: "absolute",
        top: 170,
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

    }


})


export default Login

