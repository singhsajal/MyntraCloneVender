import { Image, StyleSheet, Text, TouchableOpacity, View, BackHandler, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Products from './Products';
import Orders from './Orders';
import { THEME_COLOR } from '../utils/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native"
import Profile from './Profile';


const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;


const VenderScreen = () => {

    const [selectTab, setSelectTab] = useState(2)

    const navigation = useNavigation()

    const [selectedTab, setSelectedTab] = useState(0);


    useEffect(() => {
        const backAction = () => {
            if (navigation.isFocused()) {
                return true;
            }
            return false;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [navigation]);

    return (

        <View style={styles.container}>

            <View style={styles.bottomView}>
                <TouchableOpacity onPress={() => { setSelectedTab(0) }}>
                    <Image source={require("../images/order.png")} style={[styles.icons, { tintColor: selectedTab == 0 ? "orange" : "black" }]}></Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate('AddProducts', { type: "new", data: '' }) }}>
                    <Image source={require("../images/plus.png")} style={styles.addIcon}></Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setSelectedTab(1) }}>
                    <Image source={require("../images/order-delivery.png")} style={[styles.icons, { tintColor: selectedTab == 1 ? "orange" : "black" }]}></Image>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => { setSelectedTab(2) }}>
                    <Image source={require("../images/profile-user.png")} style={[styles.icons, { tintColor: selectedTab == 2 ? "orange" : "black" }]}></Image>
                </TouchableOpacity> */}

            </View>

            <View style={{ top: 0 }}>
                {selectedTab == 0 ? <Products /> : <Orders />}
            </View>


            <View style={styles.bottom}>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: "90%", width: "15%" }} onPress={() => { navigation.navigate("Home") }}>
                    <Image source={require("../images/home.png")} style={{ height: "60%", width: "60%", tintColor: selectTab === 1 ? "#e084ba" : "black" }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: "90%", width: "15%" }} onPress={() => { setSelectTab(2) }}>
                    <Image source={require("../images/sell.png")} style={{ height: "60%", width: "60%", tintColor: selectTab === 2 ? "#e084ba" : "black" }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: "90%", width: "15%" }} onPress={() => { setSelectTab(3) }}>
                    <Image source={require("../images/donate.png")} style={{ height: "60%", width: "70%", tintColor: selectTab === 3 ? "#e084ba" : "black" }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: "90%", width: "15%" }} onPress={() => { setSelectTab(4) }}>
                    <Image source={require("../images/profile-user.png")} style={{ height: "60%", width: "60%", tintColor: selectTab === 4 ? "#e084ba" : "black" }}>
                    </Image>
                </TouchableOpacity>







            </View>




        </View>
    )
}

export default VenderScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,


    },
    bottomView: {
        backgroundColor: 'white',

        top: 0,
        width: '85%',
        borderRadius: 20,
        elevation: 5,
        height: Height * 0.07,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
        alignSelf: 'center'
    },
    icons: {
        width: 40,
        height: 40
    },
    addIcon: {
        height: 60,
        width: 60
    },
    Header: {
        top: 0,
        height: Height * 0.1,
        width: "100%",
        backgroundColor: "lightblue",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'

    },
    Icons: {
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "center",
        // left: Width * 0.35,
        right: 0,


        padding: 15

    },
    bottom: {

        backgroundColor: 'lightblue',
        position: "absolute",
        bottom: 0,
        width: '95%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 5,
        height: Height * 0.08,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: "center"

    }

})