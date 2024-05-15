import { Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from "@react-native-firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useIsFocused } from "@react-navigation/native"
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native"
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { formatPrice } from '../constants/formatPrice'
import Loader from '../components/Loader'




const Products = () => {


    const Drawer = createDrawerNavigator();

    const [productList, setProductList] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [visible, setVisible] = useState(false)
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    useEffect(() => {
        getProducts();
    }, [isFocused])

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(async () => {

            await getProducts()

            setRefreshing(false);
        }, 2000); // Example: simulate a delay of 2 seconds
    };

    const getProducts = async () => {
        setVisible(true)
        const name = await AsyncStorage.getItem('name');
        console.log(name)
        firestore().collection('products')
            .where('addedBy', '==', name)
            .get()
            .then(snapshot => {
                //console.log(JSON.stringify(snapshot.docs[0].data()));
                if (!snapshot.empty) {
                    setProductList(snapshot.docs);
                    console.log("  ----- Product List --", productList)
                } else {
                    setProductList([]);
                }
            });
        setVisible(false)
    }

    const deleteUser = async () => {
        const res = await AsyncStorage.clear();
        navigation.navigate('Login')
    }

    const deleteItem = (item) => {

        firestore()
            .collection('products')
            .doc(item._data.productId)
            .delete()
            .then(() => {
                console.log('User deleted!');

            });
        getProducts()

    }


    return (
        <View>

            <View style={styles.container}>
                <FlatList data={productList} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#9Bd35A', '#689F38']}
                        tintColor="#689F38"
                        title="Refreshing..." // iOS
                        titleColor="#00ff00"
                    />
                } renderItem={({ item, index }) => {

                    return (
                        <View style={styles.productItems}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: item._data.productImage }} style={styles.productImage}></Image>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: "black", fontSize: 10, fontWeight: '600' }}>{item._data.productName}</Text>
                                    <Text style={{ color: "grey", fontSize: 10, fontWeight: '600' }}>{item._data.productDesc}</Text>
                                    <Text style={{ color: "green", fontSize: 10, fontWeight: '600' }}>{formatPrice(item._data.price)}</Text>
                                </View>

                            </View>
                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('AddProducts', { data: item, type: "edit" }) }}>
                                    <Image source={require("../images/edit.png")} style={{ width: 25, height: 25, margin: 5 }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { deleteItem(item) }}>
                                    <Image source={require("../images/delete.png")} style={{ width: 25, height: 25, margin: 5 }}></Image>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )
                }} >

                </FlatList>




            </View>
            <Loader visible={visible}></Loader>
        </View>

    )
}

export default Products

const styles = StyleSheet.create({

    container: {



    },
    productItems: {
        width: "95%",
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        alignSelf: "center",
        borderRadius: 20,
        top: 0,




    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 15,
        margin: 5
    },
    Text: {
        fontSize: 10,
        color: 'black',
        fontWeight: '600'
    }


})