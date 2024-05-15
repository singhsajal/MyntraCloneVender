import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from "@react-native-firebase/firestore"
import { useIsFocused } from "@react-navigation/native"
import Loader from '../components/Loader'
import RazorpayCheckout from 'react-native-razorpay';



const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const CartScreen = () => {

    const isFocused = useIsFocused()

    const [quantity, setQuantity] = useState(1)
    const [visible, setVisible] = useState(false)
    const [user, setUser] = useState('')





    const [cartList, setCartList] = useState([])

    useEffect(() => {
        getProducts();

    }, [isFocused])

    const navigation = useNavigation()

    const Quantity = (item, num) => {

        if (num == "sub" & quantity >= 1) {
            return setQuantity(quantity - 1)
        } else {
            return setQuantity(quantity + 1)
        }

    }






    const getProducts = async () => {

        // setVisible(true)
        const name = await AsyncStorage.getItem('name');
        setUser(name)
        // // console.log(name)
        // await firestore().collection("cart").where('AddCartUser', '==', name)
        //     .get()
        //     .then(snapshot => {
        //         console.log(JSON.stringify(snapshot.docs[0].data()));
        //         if (!snapshot.empty) {
        //             setCartList(snapshot.docs);
        //             console.log(cartList)
        //         } else {
        //             setCartList([]); // Set productList to an empty array if snapshot is empty
        //             console.log(" Cart is empty ")
        //         }
        //     });

        await firestore().collection("cart").where('AddCartUser', '==', name)
            .get()
            .then(snapshot => {
                console.log(JSON.stringify(snapshot.docs[0].data()));
                if (!snapshot.empty) {
                    setCartList(snapshot.docs);
                } else {
                    setVisible(false)
                    setCartList([]); // Set productList to an empty array if snapshot is empty
                    console.log("Cart is empty");



                }
            });
        setVisible(false)
    }





    const deleteItem = (item) => {

        console.log(item.id)

        firestore()
            .collection('cart')
            .doc(item.id)
            .delete()
            .then(() => {
                console.log('User deleted!');
                getProducts()

            }).catch((error) => {
                console.error("error deleting item ", error)

            });


    }

    const calculateTotalPrice = async (item) => {
        try {
            const snapshot = await firestore().collection('cart').get();
            let totalPrice = 0;

            snapshot.forEach((doc) => {
                const { price } = doc.data();
                const numericPrice = parseFloat(price); // Convert price to a floating-point number
                console.log(numericPrice)
                totalPrice += numericPrice;
            });

            console.log(totalPrice)

            return proceedPayment({ totalPrice, item });
        } catch (error) {
            console.error('Error calculating total price:', error);
            return 0; // Return 0 if there's an error
        }
    };

    const proceedPayment = ({ totalPrice, item }) => {
        const amount = totalPrice.toString();
        console.log(amount)

        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_YGhZdoPoV4f4KL',
            amount: amount * 100,
            name: user,
            order_id: '',//Replace this with an order_id created using Orders API.
            prefill: {
                email: 'gaurav.kumar@example.com',
                contact: '9191919191',
                name: user
            },
            theme: { color: '#c8c8de' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log(data)
            alert(`Success: ${data.razorpay_payment_id}`);

            firestore().collection('orders').doc(item.productId).set({
                productId: item.productId,
                addedBy: item.name,
                productName: item.productName,
                productDesc: item.description,
                category: item.category,
                price: item.price,
                discount: item.discount,
                inStock: item.inStock,
                productImage: item.url


            }).then(async res => {
                //setVisible(false)
                navigation.navigate("HomeScreen")
                // Trigger a push notification
                //await sendNotification();
            }).catch(error => {
                setVisible(false)
            })



        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });


    }

    const goToProduct = async (item) => {

        // setVisible(true)
        // const name = await AsyncStorage.getItem('name');
        // setUser(name)


        await firestore().collection("products").where('productId', '==', item.id)
            .get()
            .then(snapshot => {
                //console.log(JSON.stringify(snapshot.docs[0].data().productId));
                if (!snapshot.empty) {
                    // setCartList(snapshot.docs);

                    navigation.navigate("ProductDetails", { item: snapshot.docs[1].data() })

                }
            });
        //setVisible(false)






    }



    return (

        <View style={styles.container}>
            <View style={{ flex: 1 }}>


                <TouchableOpacity style={{ top: 10, margin: 10, left: 0, height: Height * 0.05, width: Width * 0.1, backgroundColor: 'white', zIndex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => { navigation.goBack() }}>
                    <Image source={require("../images/back.png")} style={{ height: 25, width: 25 }}></Image>

                </TouchableOpacity>

                <Text style={{ color: "black", marginLeft: 20, fontSize: 25, fontWeight: "500" }}>Cart</Text>



                <View style={{ width: "100%", backgroundColor: '#cdccde', borderTopLeftRadius: 20, justifyContent: 'center', marginTop: 10, flex: 1 }}>


                    <ScrollView style={{ marginBottom: 40 }}>

                        <FlatList
                            data={cartList}
                            //keyExtractor={(item) => item.id}
                            numColumns={1}
                            renderItem={({ item }) => {

                                console.log("item ", item._data.addedBy)
                                return (
                                    // <View style={{ alignItems: 'center' }}>
                                    //     <Text style={{ color: "black" }}>{item.productName}</Text>
                                    //     <Text style={{ color: "black" }}>{item.price}</Text>
                                    //     {/* Add more fields as needed */}
                                    // </View>
                                    <View style={styles.cartItems} >

                                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => { goToProduct(item) }}>

                                            <View style={{ width: "40%" }}>
                                                <Image source={{ uri: item._data.productImage }} style={{ height: "60%", width: "80%", borderRadius: 10, margin: 20 }}></Image>
                                            </View>


                                            <View style={{ marginTop: 20, width: "50%", marginLeft: 10 }}>
                                                <Text style={{ color: "black", fontWeight: "400" }}>{item._data.productName} </Text>
                                                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                    <View style={{ width: "60%" }}>
                                                        <Text style={{ color: "black", fontSize: 10, fontWeight: "200" }}>Rent </Text>
                                                        <Text style={{ color: "black", fontSize: 12 }}>{item._data.price} / mo</Text>

                                                    </View>
                                                    <View style={{ width: "30%", marginRight: 10 }}>
                                                        <Text style={{ color: "black", fontSize: 10, fontWeight: "200" }}>Deposit </Text>
                                                        <Text style={{ color: "black", fontSize: 12 }}>299</Text>

                                                    </View>


                                                </View>


                                            </View>

                                            <TouchableOpacity style={{ width: "60%", height: "60%", justifyContent: "flex-start", marginTop: 20 }} onPress={() => { deleteItem(item) }}>
                                                <Image source={require("../images/delete.png")} style={{ width: "10%", height: "25%", }} ></Image>

                                            </TouchableOpacity>





                                        </TouchableOpacity>





                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View style={{ borderWidth: 0.5, borderColor: "grey", width: "45%", height: "100%", alignItems: "center", justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: 10 }}>
                                                <TouchableOpacity onPress={() => { Quantity(item.id, "sub") }}>
                                                    <Text style={{ color: "black" }}>---</Text>
                                                </TouchableOpacity>
                                                <Text style={{ color: "black", fontSize: 10 }}>{quantity}</Text>
                                                <TouchableOpacity onPress={() => { Quantity(item.id, "add") }}>
                                                    <Text style={{ color: "black" }}>+</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ borderWidth: 0.5, borderColor: "grey", width: "45%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", paddingHorizontal: 10 }}>
                                                <Text style={{ color: "black", fontSize: 10 }}> 12 Months </Text>
                                            </View>

                                        </View>



                                    </View>
                                )
                            }
                            }
                        />
                    </ScrollView>



                </View>





            </View>


            <View style={styles.bottomView}>
                {/* <TouchableOpacity style={styles.bottom} onPress={() => { navigation.navigate("CartScreen") }}> */}
                <TouchableOpacity style={styles.bottom} onPress={() => {

                    calculateTotalPrice()
                }}>
                    <View style={{ margin: 10 }}>
                        {/* <Text style={{ color: "white", fontWeight: "400" }}>{formatPrice(item.price)} </Text> */}
                        <Text style={{ color: "white", fontWeight: "300", fontSize: 10 }}>₹299 Refundable Deposit </Text>

                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: "white" }}> PROCEED </Text>
                    </View>

                </TouchableOpacity>
            </View>

            <Loader visible={visible}></Loader>

        </View>

    )
}

const EmptyCart = () => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image source={require('../images/cart-empty.png')} style={{ height: Height * 0.3, width: Width * 0.4 }}></Image>

        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({

    container: {

        flex: 1

    },

    bottom: {



        top: -20,


        width: '85%',
        borderRadius: 5,
        elevation: 5,
        height: Height * 0.07,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        alignSelf: 'center',
        backgroundColor: 'red',



    },
    bottomView: {

        top: 0,
        width: '100%',
        borderRadius: 5,
        elevation: 5,
        height: Height * 0.07,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: 'center',
        backgroundColor: 'grey',

    },
    cartItems: {
        height: Height * 0.22,
        width: "80%",
        backgroundColor: "white",
        padding: 10,

        borderRadius: 15,
        elevation: 3,
        alignSelf: 'center',
        marginTop: 30,


    }
})