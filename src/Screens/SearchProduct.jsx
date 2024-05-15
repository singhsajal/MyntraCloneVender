import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Dimensions, Image } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../components/Loader';


//import { StyleSheet, View } from 'react-native'
//import React from 'react'

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const SearchProduct = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [visible, setVisible] = useState(false)
    const [flatListKey, setFlatListKey] = useState(Date.now().toString());

    useEffect(() => {


        fetchProducts();
    }, [searchQuery]);

    const fetchProducts = async () => {



        setVisible(true)


        const productsRef = firestore().collection('products');
        let querySnapshot;

        if (searchQuery.trim() !== '') {
            querySnapshot = await productsRef
                .where('productName', '>=', searchQuery)
                .where('productName', '<=', searchQuery + '\uf8ff')
                .get();
        } else {
            // If search query is empty, show all products
            querySnapshot = await productsRef.get();
        }

        const results = [];
        querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });
        setSearchResults(results);
        setVisible(false)

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

    return (
        <View style={styles.container} >

            {/* <TextInput
                placeholder="Search products"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            /> */}

            <View style={styles.SearchBar} >
                <View style={{ alignItems: 'center', justifyContent: "center", width: "10%" }}>
                    <Image source={require("../images/search.png")} style={{ height: 30, width: 30 }}></Image>
                </View>
                <View style={{ justifyContent: "center", width: "90%" }}>
                    <TouchableOpacity style={{}}>
                        <TextInput placeholder='Search Product' placeholderTextColor={'#c7c3c3'} style={styles.textInput} onChangeText={(text) => {
                            clearTimeout(timer); // Clear previous timer
                            const timer = setTimeout(() => {
                                setSearchQuery(text);
                            }, 2000); // Delay for 2 seconds
                        }} >


                        </TextInput>

                    </TouchableOpacity>

                </View>


            </View>
            <View style={styles.category}>
                <FlatList
                    key={flatListKey}
                    data={searchResults}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        // <View>
                        //     <Text>{item.productName}</Text>
                        //     <Text>{item.category}</Text>
                        //     <Text>{item.description}</Text>
                        // </View>

                        <TouchableOpacity style={styles.options} onPress={() => { navigation.navigate("ProductDetails", { item: item }) }}>

                            <Image source={{ uri: item.productImage }} style={{ height: "60%", width: "80%", borderRadius: 10, margin: 10 }}></Image>
                            <Text style={{ color: "black", fontWeight: "400" }}>{item.productName} </Text>
                            <Text style={{ color: "black", fontWeight: "400" }}>{formatPrice(item.price)} </Text>
                        </TouchableOpacity>
                    )}
                />

            </View>
            <Loader visible={visible}></Loader>



        </View>
    );
}

export default SearchProduct

const styles = StyleSheet.create({

    options: {
        height: Height * 0.3,
        width: Width * 0.42,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        elevation: 3,
        margin: 10,


    },
    container: {
        flex: 1
    },
    category: {
        flexDirection: "row",
        justifyContent: "space-between",

        padding: 10,

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
    textInput: {
        fontSize: 12

    }
})