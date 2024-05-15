import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions, Touchable } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native'
import Loader from '../components/Loader';
import { useIsFocused } from "@react-navigation/native"
import { getProducts } from '../utils/firestore/getProducts';
import { formatPrice } from '../constants/formatPrice';


const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const WomensFashion = () => {

    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState(false)
    const [Sorted, setSorted] = useState([])

    const isFocused = useIsFocused()


    useEffect(() => {
        fetchProducts();
    }, [isFocused], [products]);

    const fetchProducts = async () => {


        try {

            setVisible(true)
            const productsData = await getProducts("Womens")
            setVisible(false)
            setProducts(productsData);

        } catch (error) {
            console.error('Error', error);
        }


    };

    const assendingSortedPrice = async (products) => {

        const sortedProduct = await products.sort((a, b) => a.price - b.price);
        // return setProducts(sortedProduct)
        sortedProduct.map((item) => {
            console.log(item.price)
        })
        setSorted(true)
        setSorted(sortedProduct)




    }


    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ top: 0, margin: 10, left: 0 }} onPress={() => { navigation.goBack() }}>
                    <Image source={require("../images/back.png")} style={{ height: 25, width: 25 }}></Image>

                </TouchableOpacity>
                <View style={{ justifyContent: "center", margin: 10 }}>
                    <Text style={{ color: "black", fontSize: 20, fontWeight: "400" }}>Women's Fashion</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10, padding: 7, backgroundColor: "#5e7bf7", borderRadius: 10 }}>
                    <TouchableOpacity style={{}} onPress={() => { assendingSortedPrice(products) }}>
                        <Text style={{ color: 'orange' }}>Sort </Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.category}>



                <FlatList
                    data={sort ? Sorted : products}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        // <View style={{ alignItems: 'center' }}>
                        //     <Text style={{ color: "black" }}>{item.productName}</Text>
                        //     <Text style={{ color: "black" }}>{item.price}</Text>
                        //     {/* Add more fields as needed */}
                        // </View>
                        <TouchableOpacity style={styles.options} onPress={() => { navigation.navigate("ProductDetails", { item: item }) }}>

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

export default WomensFashion

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