import 'react-native-gesture-handler';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native"
import Splash from '../Screens/Splash'
import SignUp from '../Screens/SignUp'
import Login from '../Screens/Login'
import HomeScreen from '../Screens/HomeScreen'
import Products from '../Screens/Products'
import Orders from '../Screens/Orders'
import AddProducts from '../Screens/AddProducts'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Screens/Profile'
import VenderScreen from '../Screens/VenderScreen';
import WomensFashion from '../Screens/WomensFashion';
import Electronics from '../Screens/Electronics';
import MensFashion from '../Screens/MensFashion';
import Furniture from '../Screens/Furniture';
import ProductDetails from '../Screens/ProductDetails';
import CartScreen from '../Screens/CartScreen';
import Home from '../Screens/Home';
import Donate from '../Screens/Donate';
import SearchProduct from '../Screens/SearchProduct';
import AuthNavigator from './AuthNavigator';




const Stack = createStackNavigator()




const AppNavigator = () => {

  return (
    <NavigationContainer>

      <DrawerNav></DrawerNav>


    </NavigationContainer>

  )
}

const DrawerNav = () => {

  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <DrawerContent{...props} />}>
      <Drawer.Screen name='StackScreens' component={StackScreens} headerShown={false}></Drawer.Screen>
    </Drawer.Navigator>
  )


}

const StackScreens = () => {
  const navigation = useNavigation()

  return (

    <Stack.Navigator screenOptions={{


      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require("../images/bars.png")} style={{ height: 30, width: 30, margin: 10 }}></Image>
          </TouchableOpacity>

        )
      }
    }} >
      <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='VenderScreen' component={VenderScreen} options={{
        headerShown: false
      }}></Stack.Screen>
      <Stack.Screen name='Orders' component={Orders} options={{ headerShown: true }}></Stack.Screen>
      <Stack.Screen name='Products' component={Products} options={{
        headerShown: false
      }}></Stack.Screen>
      <Stack.Screen name='AddProducts' component={AddProducts} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='TabScreens' component={TabScreens} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='WomensFashion' component={WomensFashion} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='MensFashion' component={MensFashion} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Furniture' component={Furniture} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Electronics' component={Electronics} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='ProductDetails' component={ProductDetails} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='CartScreen' component={CartScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Donate' component={Donate} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='SearchProduct' component={SearchProduct} options={{ headerShown: false }}></Stack.Screen>



    </Stack.Navigator>





  )
}

const TabScreens = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={HomeScreen} options={{ headerShown: false }} />

      <Tab.Screen name="Products" component={Products} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
}

export default AppNavigator