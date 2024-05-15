import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Switch, PermissionsAndroid, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { launchImageLibrary } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from "@react-native-firebase/firestore"
import uuid from "react-native-uuid"
import storage from "@react-native-firebase/storage"
import Loader from '../components/Loader'
import Orders from './Orders'
import HomeScreen from './VenderScreen'
import messaging from '@react-native-firebase/messaging';
import { Picker } from '@react-native-picker/picker';
import { addProduct, addProducts } from '../utils/firestore/addProducts'
import { requestCameraPermission } from '../constants/requestCameraPermission'
import { pushNotification } from '../constants/pushNotification'

const AddProducts = () => {


    const route = useRoute()
    console.log(route.params)

    const navigation = useNavigation()
    const [productName, setProductName] = useState(route.params.type == 'edit' && !route.params.data == '' ? route?.params?.data?._data?.productName : '')


    const [visible, setVisible] = useState('false')

    const [description, setDescription] = useState(route.params.type == 'edit' && !route.params.data == '' ? route.params.data._data.productDesc : "")

    const [price, setPrice] = useState(route.params.type == 'edit' && !route.params.data == '' ? route.params.data._data.price : "")

    const [discount, setDiscount] = useState(route.params.type == 'edit' && !route.params.data == '' ? route.params.data._data.discount : "")

    const [category, setCategory] = useState(route.params.type == 'edit' && !route.params.data == '' ? route.params.data._data.discount : "")
    const categories = ['Mens Fashion', 'Womens Fashion', 'Furniture', 'Electronics'];
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryChange = (itemValue, itemIndex) => {
        setCategory(itemValue);
    };

    const [inStock, setInStock] = useState(route.params.type == 'edit' && !route.params.data == '' ? route.params.data._data.inStock : true)

    const [imageData, setImageData] = useState({
        assets: [{
            fileName: '',
            uri: route.params.type == 'edit' && !route.params.data == '' ? route.params.data._data.productImage : "",
        }]
    })

    const toggleSwitch = () => setInStock(previousState => !previousState);

    const CameraPermission = async () => {


        const granted = await requestCameraPermission();
        if (granted === true) {
            console.log('You can use the camera');
            openGalary()
        } else {
            console.log('Camera permission denied');

        }

    };

    const openGalary = async () => {
        setVisible(true)
        const response = await launchImageLibrary({ mediaType: 'photo' })
        if (!response.didCancel) {
            setImageData(response)
        }

        setVisible(false)
    }



    const saveProduct = async () => {
        //await AsyncStorage.removeItem('Sajal');
        setVisible(true)
        const name = await AsyncStorage.getItem("name")
        console.log(name)
        const email = await AsyncStorage.getItem("email")

        const productId = uuid.v4();
        let url = '';

        if (!imageData.assets[0].fileName == '') {

            const reference = storage().ref(imageData.assets[0].fileName);

            // path to existing file on filesystem
            const pathToFile = imageData.assets[0].uri;
            // uploads file
            await reference.putFile(pathToFile);
            url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
            console.log(url)
        }


        // Retrieve user information from AsyncStorage



        if (route.params.type == "edit") {
            const productId = route.params.data._data.productId
            console.log("id", productId)

            const res = await addProduct({ type: "edit", name, productName, description, category, price, discount, inStock, url, productId })
            if (res) {
                setVisible(false)
                navigation.navigate("VenderScreen")
                // Trigger a push notification
                await sendNotification();

            } else {
                setVisible(false)

            }

        } else {


            const res = await addProduct({ type: "new", name, productName, description, category, price, discount, inStock, url, productId })
            if (res) {
                setVisible(false)
                navigation.navigate("VenderScreen")
                // Trigger a push notification
                await sendNotification();

            } else {
                setVisible(false)

            }
        }


    }

    // Function to send a notification
    const sendNotification = async () => {
        pushNotification()


    };


    return (
        <ScrollView style={styles.container}>

            {imageData.assets[0].uri == '' ? (<TouchableOpacity style={styles.bannerView} onPress={() => { CameraPermission() }}>
                <Image source={require("../images/camera.png")} style={styles.camera}></Image>
            </TouchableOpacity>) : (<TouchableOpacity style={styles.bannerView} onPress={() => { CameraPermission() }}>
                <Image source={{ uri: imageData.assets[0].uri }} style={styles.banner}></Image>
            </TouchableOpacity>)}


            <View style={styles.TextInput}>
                <TextInput value={productName} placeholder='Product Title' placeholderTextColor={"grey"} onChangeText={(text) => setProductName(text)} style={styles.Text} ></TextInput>
            </View>
            <View style={styles.TextInput}>
                <TextInput value={description} placeholder='Product Description' placeholderTextColor={"grey"} onChangeText={(text) => setDescription(text)} style={styles.Text} ></TextInput>
            </View>

            {/* <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={handleCategoryChange}
                    style={styles.picker}
                >
                    {categories.map((cat, index) => (
                        <Picker.Item key={index} label={cat} value={cat} />
                    ))}
                </Picker>
            </View> */}




            <View style={styles.TextInput}>
                {/* <TextInput value={category} placeholder='Category' placeholderTextColor={"grey"} onChangeText={(text) => setCategory(text)} style={styles.Text} ></TextInput> */}

                <Picker

                    placeholder='Category'
                    selectedValue={category}
                    onValueChange={handleCategoryChange}
                    style={styles.picker}
                >
                    {categories.map((cat, index) => (
                        <Picker.Item key={index} label={cat} value={cat} />
                    ))}
                </Picker>
            </View>


            <View style={styles.TextInput}>
                <TextInput value={price} placeholder='Price' placeholderTextColor={"grey"} onChangeText={(text) => setPrice(text)} style={styles.Text} keyboardType='number-pad'></TextInput>
            </View>
            <View style={styles.TextInput}>
                <TextInput value={discount} placeholder='Discount' placeholderTextColor={"grey"} onChangeText={(text) => setDiscount(text)} style={styles.Text} keyboardType='number-pad' ></TextInput>
            </View>
            <View style={styles.stock}>
                <Text style={{ color: "black", fontWeight: "400" }}>In Stock </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={inStock ? "#f4f3f4" : "#f5dd4b"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={inStock}
                />

            </View>
            <TouchableOpacity style={styles.Submit} onPress={() => saveProduct()}>
                <Text style={{ color: "white" }}> Save Product </Text>
            </TouchableOpacity>
            <Loader visible={visible}></Loader>

        </ScrollView>
    )
}

export default AddProducts

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bannerView: {
        width: "90%",
        height: 200,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 10,
        margin: 20,
        alignItems: "center",
        justifyContent: "center"

    },
    TextInput: {
        borderWidth: 1,
        borderColor: "black",
        width: "90%",
        margin: 10,
        padding: 5,
        color: "black",
        alignSelf: "center",
        borderRadius: 10
    },
    Text: {
        color: "black",
        fontSize: 12,
        fontWeight: "400"
    },
    camera: {
        height: "30%",
        width: "20%"
    },
    stock: {
        width: "90%",
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    Submit: {
        backgroundColor: "orange",
        height: 50,
        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        borderRadius: 15,
        margin: 30
    },
    banner: {
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    dropdownContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginRight: 8,
    },
    picker: {
        borderWidth: 1,
        borderColor: "black",
        width: "90%",


        color: "black",
        alignSelf: "center",
        borderRadius: 10
    },
})