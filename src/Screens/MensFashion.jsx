import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { getProducts } from '../utils/firestore/getProducts';
import { formatPrice } from '../constants/formatPrice';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const MensFashion = () => {

    const [visible, setVisible] = useState(false)
    const [products, setProducts] = useState([]);

    const navigation = useNavigation()

    const isFocused = useIsFocused()

    useEffect(() => {
        fetchProducts();
    }, [isFocused]);

    const fetchProducts = async () => {




        try {

            setVisible(true)
            const productsData = await getProducts("Mens")
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
                    <Text style={{ color: "black", fontSize: 20, fontWeight: "400" }}>Men's Fashion</Text>
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

export default MensFashion

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