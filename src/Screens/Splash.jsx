import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { THEME_COLOR } from '../utils/Colors'
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Splash = () => {

    const navigation = useNavigation()


    useEffect(() => {
        setTimeout(() => {
            //navigation.navigate('Login')
            checkLogin()
        }, 2000)
    }, [])

    const checkLogin = async () => {
        const userId = await AsyncStorage.getItem('name')
        console.log(userId)
        if (userId !== null) {
            //navigation.navigate('HomeScreen')
            navigation.navigate('Home')
        } else {
            navigation.navigate('Login')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}> E-comm </Text>
            <Text style={styles.logo}> Vender </Text>
        </View>
    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME_COLOR

    },
    logo: {
        color: 'white',
        fontSize: 30
    }
})

export default Splash