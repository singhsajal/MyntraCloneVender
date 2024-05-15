import { Image, StyleSheet, Text, TouchableOpacity, View, BackHandler, Dimensions, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Products from './Products';
import Orders from './Orders';
import { THEME_COLOR } from '../utils/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native"
import Profile from './Profile';
//import Carousel from '../components/Carousel';
import MyCarousel from '../components/MyCarousel';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartCount } from '../store/slices/CartSlice';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;


const HomeScreen = () => {


    // const [selectTab, setSelectTab] = useState(1)

    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.cartCount);

    const cartItems = async () => {

        const snapshot = await firestore().collection('cart').get();
        const cartSize = snapshot.size

        dispatch(updateCartCount(cartSize));
        console.log('Cart count:', cartCount);


    }





    const navigation = useNavigation()

    const [selectedTab, setSelectedTab] = useState(0);



    useEffect(() => {

        const backAction = () => {
            if (navigation.isFocused()) {
                return true;
            }
            return false;
        };

        cartItems()
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();


    }, [navigation]);

    const GoToSearchedProduct = () => {
        navigation.navigate('SearchProduct')
    }



    return (
        <View style={styles.container}>

            <View style={styles.Header}>
                <TouchableOpacity style={{ right: "0%", margin: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Image source={require("../images/bars.png")} style={{ height: 30, width: 30, alignSelf: "flex-start" }}></Image>
                </TouchableOpacity>
                <View>
                    {/* <Image source={require("../images/christmas_2012_new_5895.jpg")} style={{ width: 50, height: 50 }}></Image> */}
                </View>
                <View style={styles.Icons}>
                    <View>
                        <TouchableOpacity style={{}}>
                            <Image source={require("../images/heart.png")} style={{ height: 30, width: 30, margin: 8 }}></Image>
                        </TouchableOpacity>
                        <View style={{ height: 20, width: 20, backgroundColor: "red", position: "absolute", borderRadius: 10 }}>

                        </View>


                    </View>

                    <View>
                        <TouchableOpacity onPress={() => { navigation.navigate("CartScreen") }}>
                            <Image source={require("../images/shopping-cart.png")} style={{ height: 30, width: 30, margin: 8 }}></Image>
                        </TouchableOpacity>
                        <View style={{ height: 20, width: 20, backgroundColor: "red", position: "absolute", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>{cartCount}</Text>
                        </View>

                    </View>

                    <TouchableOpacity>
                        <Image source={require("../images/bell.png")} style={{ height: 30, width: 30, margin: 8 }}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.SearchBar} >
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require("../images/search.png")} style={{ height: 30, width: 30 }}></Image>
                </View>
                <TouchableOpacity style={{ flex: 18, justifyContent: "center" }} onPress={() => GoToSearchedProduct()}>
                    {/* <TextInput placeholder='Search Product' placeholderTextColor={'#c7c3c3'} style={styles.TextInput} >


                    </TextInput> */}
                </TouchableOpacity>

            </View>

            <MyCarousel />

            <View style={styles.category}>
                <TouchableOpacity style={styles.options} onPress={() => { navigation.navigate("MensFashion") }}>
                    <Image source={require("../images/category/fashion.png")} style={{ height: 50, width: 50 }}></Image>
                    <Text style={{ color: "black", fontWeight: "400" }}>Men's Fashion </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={() => { navigation.navigate("WomensFashion") }}>
                    <Image source={require("../images/category/Womenfashion.png")} style={{ height: 50, width: 50 }}></Image>
                    <Text style={{ color: "black", fontWeight: "400" }}>Women's Fashion </Text>

                </TouchableOpacity>
            </View>

            <View style={styles.category}>
                <TouchableOpacity style={styles.options} onPress={() => { navigation.navigate("Furniture") }}>
                    <Image source={require("../images/category/furniture.png")} style={{ height: 50, width: 50 }}></Image>
                    <Text style={{ color: "black", fontWeight: "400" }}>Furniture </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={() => { navigation.navigate("Electronics") }}>
                    <Image source={require("../images/category/responsive.png")} style={{ height: 50, width: 50 }}></Image>
                    <Text style={{ color: "black", fontWeight: "400" }}>Electronics </Text>

                </TouchableOpacity>
            </View>

        </View >

    )
}

export default HomeScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white"


    },
    bottomView: {
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
        top: 5,
        height: Height * 0.1,
        width: "95%",
        backgroundColor: "lightblue",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        alignSelf: "center",
        borderRadius: 10,

        elevation: 5

    },
    Icons: {
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "center",
        // left: Width * 0.35,
        right: 0,


        padding: 15

    },
    SearchBar: {
        margin: 20,

        borderWidth: 2,
        borderColor: '#c7c3c3',
        borderRadius: 30,
        height: 40,
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    category: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10
    },
    options: {
        height: Height * 0.15,
        width: Width * 0.4,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        elevation: 3
    },

    image: {
        width: Width * 0.9,
        height: 250,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        margin: 20


    },
    pagination: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#333',
    },


})