import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native"
//import AsyncStorage from '@react-native-async-storage/async-storage'

const Height = Dimensions.get('window').height;

const DrawerContent = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigation = useNavigation()

    const deleteUser = async () => {
        const res = await AsyncStorage.clear();
        navigation.navigate('Login')
    }



    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        setName(await AsyncStorage.getItem('name'))
        setEmail(await AsyncStorage.getItem('email'))

    }
    const GoToVenderScreen = () => {
        navigation.navigate('VenderScreen')
    }

    return (

        <View style={{ flex: 1 }}>

            <View style={styles.ProfileArea}>

                <View style={styles.profileImage}>
                    <Image source={require("../images/profile-user.png")} style={{ height: 50, width: 50, alignSelf: "flex-start" }}></Image>
                </View>
                <View style={styles.profileDetail}>
                    <Text style={{ color: "black" }}>{name}</Text>
                    <Text style={{ color: "black" }}>{email} </Text>
                </View>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center", margin: 10 }}>

                <TouchableOpacity style={styles.drawerOptions} onPress={() => { navigation.navigate("HomeScreen") }}>
                    <View>
                        <Text style={{ color: "black" }}> Home </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerOptions} onPress={() => { GoToVenderScreen() }}>
                    <View>
                        <Text style={{ color: "black" }}> Vender </Text>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={styles.bottomView}>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => { deleteUser() }}>
                    <Text style={{ color: "black" }}>Logout ;</Text>
                </TouchableOpacity>

            </View>
        </View>




    )
}

export default DrawerContent

const styles = StyleSheet.create({

    bottomView: {
        backgroundColor: 'white',
        position: "absolute",
        bottom: 0,
        width: '100%',

        elevation: 5,
        height: 80,

        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    ProfileArea: {

        top: 0,

        width: "100%",
        height: Height * 0.2,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 10,
        backgroundColor: "lightblue",
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20

    },
    profileImage: {
        margin: 5
    },
    profileDetail: {
        margin: 5
    },
    drawerOptions: {
        flexDirection: "row",
        margin: 5

    }
})