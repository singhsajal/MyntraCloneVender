import { Image, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Slider from "react-native-slider"
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native"
import firestore from "@react-native-firebase/firestore"
import uuid from "react-native-uuid"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const ProductDetails = ({ route }) => {

    const { item } = route.params
    console.log({ item })

    const productId = uuid.v4();

    const [value, setValue] = useState(1);



    const navigation = useNavigation()

    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    const formatPrice = (price) => {
        // Convert the price to a string
         const priceString = price.toString();

        // Split the price into two parts: integer and decimal
        const [integerPart, decimalPart] = priceString.split('.');

        // Add commas to the integer part
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Combine the integer and decimal parts
        let formattedPrice = formattedIntegerPart;
        if (decimalPart) {
            formattedPrice += '.' + decimalPart;
        }

        // Add INR symbol at the beginning
        formattedPrice = '₹' + formattedPrice;

        return formattedPrice;
    };

    const addCart = async (item) => {

        const AddCartUser = await AsyncStorage.getItem('name');

        firestore().collection('cart').doc(item.id).set({
            AddCartUser: AddCartUser,
            productId: item.id,
            addedBy: item.addedBy,
            productName: item.productName,
            productDesc: item.productDesc,
            category: item.category,
            price: item.price,
            discount: item.discount,
            inStock: item.inStock,
            productImage: item.productImage


        }).then(async res => {
            // setVisible(false)
            navigation.navigate("CartScreen")
            // // Trigger a push notification
            // await sendNotification();
            console.log(" product added ")
        }).catch(error => {
            // setVisible(false)
            console.log(" cant add ")

        })



    }



    return (
        <View style={styles.container}>



            <ScrollView >
                <TouchableOpacity style={{ top: 10, margin: 10, left: 0, height: Height * 0.05, width: Width * 0.1, backgroundColor: 'white', zIndex: 1, position: "absolute", alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => { navigation.goBack() }}>
                    <Image source={require("../images/back.png")} style={{ height: 25, width: 25 }}></Image>

                </TouchableOpacity>

                <View style={{ alignItems: "center", top: 0 }} >

                    <Image source={{ uri: item.productImage }} style={{ height: Height * 0.5, width: "100%", borderRadius: 10 }}></Image>
                </View>

                <View style={{ width: "100%", height: Height * 0.18, backgroundColor: 'grey', top: -20, borderTopLeftRadius: 20, justifyContent: "center" }}>

                    <Text style={{ marginLeft: 20, fontSize: 30, color: 'white' }}>{formatPrice(item.price)} / Month</Text>
                    <Text style={{ color: "white", marginTop: 20, marginLeft: 20 }}> ₹299 Refundable deposit</Text>

                </View>

                <View style={{ width: "100%", height: Height * 0.5, backgroundColor: 'white', top: -35, borderTopLeftRadius: 20 }}>

                    <Text style={{ color: 'black', top: 30, margin: 20 }}>{item.productName}</Text>

                    <Text style={{ color: 'black', marginLeft: 20, marginTop: 20, fontWeight: "300" }}>How Long do you want to rent this for? </Text>

                    <Slider
                        style={{ width: "90%", height: 40, marginLeft: 20 }}
                        minimumValue={1}
                        maximumValue={3}
                        minimumTrackTintColor="red"  // Set color of the track before the thumb to red
                        maximumTrackTintColor="pink" // Set color of the track after the thumb to pink
                        thumbTintColor="red"
                        step={1}
                        value={value}
                        onValueChange={handleValueChange}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "90%", marginLeft: 20 }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontWeight: "200", fontSize: 10 }}>3+</Text>
                        <Text style={{ textAlign: 'center', color: 'black', fontWeight: "200", fontSize: 10 }}>6+</Text>
                        <Text style={{ textAlign: 'center', color: 'black', fontWeight: "200", fontSize: 10 }}>12+</Text>
                    </View>

                    <View style={{ margin: 20 }}>
                        <Text style={{ color: 'black' }}> Product Details </Text>
                        <Text style={{ color: "black", marginTop: 10, fontWeight: '300' }}>{item.productDesc}</Text>
                    </View>

                    <View style={{ margin: 20, flexDirection: "row" }}>
                        <View style={{ borderWidth: 1, borderColor: "grey", height: Height * .1, width: Width * 0.2, marginRight: 5, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "black", fontSize: 10, fontWeight: '300' }}> COVID-19 </Text>
                            <Text style={{ color: "black", fontSize: 10, fontWeight: '300' }}> Safety </Text>
                        </View>

                        <View style={{ borderWidth: 1, borderColor: "grey", height: Height * .1, width: Width * 0.2, marginRight: 5, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "black", fontSize: 10, fontWeight: '300' }}> Damage </Text>
                            <Text style={{ color: "black", fontSize: 10, fontWeight: '300' }}> Walver </Text>
                        </View>

                        <View style={{ borderWidth: 1, borderColor: "grey", height: Height * .1, width: Width * 0.2, marginRight: 5, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "black", fontSize: 10, fontWeight: '300' }}> Cancel </Text>
                            <Text style={{ color: "black", fontSize: 10, fontWeight: '300' }}> anytime </Text>
                        </View>


                    </View>




                </View>


                <View style={{ width: "100%", height: Height * 0.25, backgroundColor: '#cdccde', top: -45, borderTopLeftRadius: 20, justifyContent: 'center' }}>

                    <Text style={{ color: 'black', top: 10, marginLeft: 20 }}>Offers</Text>

                    <View style={{ margin: 20, borderWidth: 0.5, borderColor: 'grey', alignItems: "flex-start", height: Height * 0.1, width: "90%" }}>

                        <Text style={{ color: 'black', top: 30, marginLeft: 20, fontWeight: "400" }}>{item.productDesc}</Text>

                    </View>

                </View>


                <View style={{ width: "100%", height: Height * 0.35, backgroundColor: 'white', top: -55, borderTopLeftRadius: 20, justifyContent: 'center' }}>

                    <Text style={{ color: 'black', top: 30, marginLeft: 20, fontWeight: "300" }}> Also try these</Text>

                    <ScrollView horizontal style={{ flexDirection: "row", marginTop: 35, marginLeft: 10 }}>
                        <TouchableOpacity style={{
                            borderWidth: 0.5, borderColor: 'grey', width: Width * 0.4, height: Height * 0.2, margin: 10, borderRadius: 10, backgroundColor: "lightblue",
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: 3
                        }} onPress={() => { navigation.navigate("MensFashion") }}>
                            <Image source={require("../images/category/fashion.png")} style={{ height: 50, width: 50 }}></Image>
                            <Text style={{ color: "black", fontWeight: "400" }}>Men's Fashion </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth: 0.5, borderColor: 'grey', width: Width * 0.4, height: Height * 0.2, margin: 10, borderRadius: 10, backgroundColor: "lightblue",
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: 3
                        }} onPress={() => { navigation.navigate("WomensFashion") }}>
                            <Image source={require("../images/category/Womenfashion.png")} style={{ height: 50, width: 50 }}></Image>
                            <Text style={{ color: "black", fontWeight: "400" }}>Women's Fashion </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            borderWidth: 0.5, borderColor: 'grey', width: Width * 0.4, height: Height * 0.2, margin: 10, borderRadius: 10, backgroundColor: "lightblue",
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: 3
                        }} onPress={() => { navigation.navigate("Furniture") }}>
                            <Image source={require("../images/category/furniture.png")} style={{ height: 50, width: 50 }}></Image>
                            <Text style={{ color: "black", fontWeight: "400" }}>Furniture </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth: 0.5, borderColor: 'grey', width: Width * 0.4, height: Height * 0.2, margin: 10, borderRadius: 10, backgroundColor: "lightblue",
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: 3
                        }} onPress={() => { navigation.navigate("Electronics") }}>
                            <Image source={require("../images/category/responsive.png")} style={{ height: 50, width: 50 }}></Image>
                            <Text style={{ color: "black", fontWeight: "400" }}>Electronics </Text>

                        </TouchableOpacity>

                    </ScrollView>

                </View>
            </ScrollView>

            <TouchableOpacity style={styles.bottom} onPress={() => { addCart(item) }}>
                <View style={{ margin: 10 }}>
                    <Text style={{ color: "white", fontWeight: "400" }}>{formatPrice(item.price)} </Text>
                    <Text style={{ color: "white", fontWeight: "300", fontSize: 10 }}>₹299 Refundable Deposit </Text>

                </View>
                <View style={{ margin: 10 }}>
                    <Text style={{ color: "white" }}> ADD TO CART </Text>
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    bottom: {

        backgroundColor: 'white',

        top: -40,


        width: '85%',
        borderRadius: 5,
        elevation: 5,
        height: Height * 0.07,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        alignSelf: 'center',
        backgroundColor: 'red',

    }

})