import React from 'react';
import { StyleSheet, View, Text, Button, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from "react-native-animatable";

const {height} = Dimensions.get("screen"); //height need to get from device
const height_logo = height * 0.28; //ratio of the logo is relative to device height

const SplashScreen = ({navigation}) => {
     return (
         <View style = {styles.container}>
            <View style = {styles.header}>
                <Animatable.Image
                    animation = "bounceIn"
                    source = {require('../assets/icon_yellow_background.png')}
                    style = {styles.logo}
                    resizeMode = "stretch"
                />
            </View>
            <Animatable.View 
                style = {styles.footer}
                animation = "bounceInUp" >
                <Text style = {styles.footerTitleFont} >Welcome to FoodFinder!</Text>
                <Text style = {styles.footerTextFont} >view your dining options a click away</Text>
                <View style = {styles.button}>
                    <TouchableOpacity onPress = {() => navigation.navigate("SignInScreen")}>
                        <LinearGradient
                            colors = {['#F4E979', '#F0E979']}
                            style = {styles.signIn} >
                            <Text>Get Started!</Text>
                            <EvilIcons
                                name = 'chevron-right'
                                color = '#000000'
                                size = {25}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
         </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4E979'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    footerTitleFont: {
        color: '#000000',
        fontSize: 28,
        fontWeight: 'bold'
    },
    footerTextFont: {
        color: '#606060',
        fontSize: 15, 
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 150
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    }
});

export default SplashScreen;