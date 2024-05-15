import { Image, StyleSheet, Text, TouchableOpacity, View, BackHandler, Dimensions, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';





const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;


const images = [
    require('../images/carousel/2771165.jpg'),
    require('../images/carousel/5269299.jpg'),
    require('../images/carousel/10150017.jpg'),
];


const MyCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Image source={item} style={styles.image} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                layout={'default'}
                data={images}
                sliderWidth={Width}
                itemWidth={Width * 0.9}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveIndex(index)}
                autoplay={true} // Enable autoplay
                autoplayInterval={2000}
                loop={true}

            />
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotColor={'lightblue'}
                dotStyle={styles.paginationDot}
                inactiveDotColor={'#000'}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',

        height: Height * 0.28,


    },
    item: {
        width: Width * 0.9,
        height: 220,
        borderRadius: 20,
        //margin: 5,
        overflow: 'hidden',

    },
    image: {
        width: '100%',
        height: "90%",

        resizeMode: "contain",

    },
    paginationContainer: {
        position: 'absolute',
        top: 170



    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        //marginHorizontal: 2,
    },
});

export default MyCarousel;