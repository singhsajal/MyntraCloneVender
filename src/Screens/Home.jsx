import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeScreen from './HomeScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import VenderScreen from './VenderScreen';
import Donate from './Donate';
import Profile from './Profile';
import { useIsFocused } from '@react-navigation/native';





const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Home = ({ navigation }) => {

    const isFocused = useIsFocused();


    const [selectTab, setSelectTab] = useState(0)

    useEffect(() => {
        if (isFocused) {
            // Refresh component logic here
            console.log('Component refreshed');
            setSelectTab(0)
        }
    }, [isFocused]);





    return (
        <View style={styles.container}>

            {
                selectTab === 0 ? (
                    // Render content for selectedTab 1

                    <HomeScreen></HomeScreen>

                ) : selectTab === 1 ? (
                    // Render content for selectedTab 2

                    <VenderScreen></VenderScreen>

                ) : selectTab === 2 ? (
                    // Render content for selectedTab 3
                    <View>
                        <Donate></Donate>
                    </View>
                ) : (
                    // Render content for selectedTab 4
                    <View>
                        <Profile></Profile>
                    </View>
                )
            }

            <View style={styles.bottomView}>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: "90%", width: "15%" }} onPress={() => { setSelectTab(0) }}>
                    <Image source={require("../images/home.png")} style={{ resizeMode: "contain", height: "60%", width: 40, tintColor: selectTab === 0 ? "#e084ba" : "black" }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: "90%", width: "15%" }} onPress={() => { setSelectTab(1) }}>
                    <Image source={require("../images/sell.png")} style={{ resizeMode: "contain", height: "70%", width: 40, tintColor: selectTab === 1 ? "#e084ba" : "black" }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: "90%", width: "15%" }} onPress={() => { setSelectTab(2) }}>
                    <Image source={require("../images/donate.png")} style={{ resizeMode: "contain", height: "60%", width: 40, tintColor: selectTab === 2 ? "#e084ba" : "black" }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: "90%", width: "15%" }} onPress={() => { setSelectTab(3) }}>
                    <Image source={require("../images/profile-user.png")} style={{ resizeMode: "contain", height: "50%", width: 25, tintColor: selectTab === 3 ? "#e084ba" : "black" }}>
                    </Image>
                </TouchableOpacity>







            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white"


    },
    bottomView: {
        backgroundColor: 'lightblue',
        position: "absolute",
        bottom: 0,
        width: '95%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 5,
        height: Height * 0.08,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: "center"
    },
})