import firestore from "@react-native-firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'



export const addProduct = async ({ type, name, productName, description, category, price, discount, inStock, url, productId }) => {

    if (type == "new") {
        try {
            console.log(productName)
            // Get user details from AsyncStorage

            console.log("name", name)

            // Add product to Firestore
            await firestore().collection('products').doc(productId).set({
                productId: productId,
                addedBy: name,
                productName: productName,
                productDesc: description,
                category: category,
                price: price,
                discount: discount,
                inStock: inStock,
                productImage: url
            });

            console.log("Product added successfully");

            // Optionally, return the product ID or any other relevant data
            return productId;

        } catch (error) {
            console.error("Error adding product:", error);
            // Handle error (e.g., show error message to user)
            throw error; // Rethrow the error to propagate it further if needed
        }
    } else if (type == "edit") {
        try {
            console.log(productName)
            // Get user details from AsyncStorage

            console.log("name", name)

            // Add product to Firestore
            await firestore().collection('products').doc(productId).update({
                productId: productId,
                addedBy: name,
                productName: productName,
                productDesc: description,
                category: category,
                price: price,
                discount: discount,
                inStock: inStock,
                productImage: url
            });

            console.log("Product updated  successfully");

            // Optionally, return the product ID or any other relevant data
            return productId;

        } catch (error) {
            console.error("Error updating  product:", error);
            // Handle error (e.g., show error message to user)
            throw error; // Rethrow the error to propagate it further if needed
        }

    }


};