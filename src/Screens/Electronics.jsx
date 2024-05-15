import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native'
import { getProducts } from '../utils/firestore/getProducts';
import Loader from '../components/Loader';
import { formatPrice } from '../constants/formatPrice';


const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Electronics = () => {


    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {


        try {

            setVisible(true)
            const productsData = await getProducts("Electronics")
            setVisible(false)
            setProducts(productsData);

        } catch (error) {
            console.error('Error', error);
        }


    };


    return (
        <View style={styles.container}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ top: 0, margin: 10, left: 0 }} onPress={() => { navigation.goBack() }}>
                    <Image source={require("../images/back.png")} style={{ height: 25, width: 25 }}></Image>

                </TouchableOpacity>
                <View style={{ justifyContent: "center", margin: 10 }}>
                    <Text style={{ color: "black", fontSize: 20, fontWeight: "400" }}>Electronics</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'orange' }}>Sort </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.category}>


                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        // <View style={{ alignItems: 'center' }}>
                        //     <Text style={{ color: "black" }}>{item.productName}</Text>
                        //     <Text style={{ color: "black" }}>{item.price}</Text>
                        //     {/* Add more fields as needed */}
                        // </View>
                        <TouchableOpacity style={styles.options}>

                            <Image source={{ uri: item.productImage }} style={{ height: "60%", width: "80%", borderRadius: 10, margin: 10 }}></Image>
                            <Text style={{ color: "black", fontWeight: "400" }}>{item.productName} </Text>
                            <Text style={{ color: "black", fontWeight: "400" }}>{formatPrice(item.price)} </Text>
                        </TouchableOpacity>
                    )
                    }
                />
                <Loader visible={visible}></Loader>

            </View>

        </View >
    )
}

export default Electronics

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    category: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        padding: 10
    },
    options: {
        height: Height * 0.3,
        width: Width * 0.42,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        elevation: 3,
        margin: 10

    }


})