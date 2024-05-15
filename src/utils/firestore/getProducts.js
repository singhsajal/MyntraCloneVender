import firestore from '@react-native-firebase/firestore';

export const getProducts = async (category) => {

    // console.log(category)


    try {
        let snapShot

        console.log("inside get products")

        //const userId = uuid.v4()
        if (category == "Womens") {
            snapShot = await firestore().collection("products").where('category', '==', "Womens Fashion").get()

        } else if (category == "Mens") {
            snapShot = await firestore().collection("products").where('category', '==', "Mens Fashion").get()

        } else if (category == "Furniture") {
            snapShot = await firestore().collection("products").where('category', '==', "Furniture").get()

        } else if (category == "Electronics") {
            snapShot = await firestore().collection("products").where('category', '==', "Electronics").get()

        } else {
            throw new Error("Invalid category");
        }


        const productsData = await snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return productsData



        // console.log("response ", response._data.age);
    } catch (error) {
        console.error('Error', error);
    }


};