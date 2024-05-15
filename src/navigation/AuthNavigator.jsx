import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/Login';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;