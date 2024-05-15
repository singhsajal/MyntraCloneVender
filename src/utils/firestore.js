// import firestore from '@react-native-firebase/firestore';

// export const cartItems = async () => {
//     try {
//         const snapshot = await firestore().collection('cart').get();
//         return snapshot
//     } catch (error) {
//         console.error("Errro fetching products", error)
//     }

// }

// export const mensProducts = async () => {

//     try {


//         //const userId = uuid.v4()
//         await firestore().collection("products").where('category', '==', "Mens Fashion").get({
//         }).then(async snapShot => {
//             // setVisible(false)
//             // console.log("user created")
//             // navigation.goBack()
//             //console.log(snapShot.docs[0].data())
//             // setVisible(false)
//             // setProducts(snapShot.docs[0].data())
//             // console.log("Products", products)

//             const productsData = await snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//             setProducts(productsData);
//             setVisible(false)

//         }).catch(error => {
//             console.log(error)
//         })
//         // console.log("response ", response._data.age);
//     } catch (error) {
//         console.error('Error', error);
//     }


// }