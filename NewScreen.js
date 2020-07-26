import React, {useState} from 'react';

import {View, Text, StyleSheet, Button, TextInput, StatusBar} from 'react-native';
import * as Animatable from "react-native-animatable";

import { AuthContext } from '../components/context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const newScreen = ({route, navigation}) => {

    const [radius, setRadius] = useState(2000);
    const [minPrice, setminPrice] = useState(0);
    const [maxPrice, setmaxPrice] = useState(4);
    const [keyword, setKeyword] = useState("");

    const {signOut} = React.useContext(AuthContext);

    return (
        <View style = {styles.container}>
            <StatusBar 
                backgroundColor = '#F4E979' 
                barStyle = "dark-content"
            />
            <Animatable.View 
                style = {styles.header}
                animation = 'bounceInRight' >
                <Text style = {styles.headerTitleFont}>Let's go!</Text>
            </Animatable.View>
            <Animatable.View 
                style = {styles.footer}
                animation = 'bounceInUp' >
                <Text style = {styles.footerTitleFont}>What are you looking for?</Text>
                <Text> Radius: { radius } </Text>
                <View style = {styles.action}>
                    <TextInput 
                    style = {styles.textInput}
                    keyboardType = 'numeric'
                    placeholder = 'radius' 
                    onChangeText = { radius => setRadius(parseInt(radius))}
                    value = { radius }
                    >
                    </TextInput>
                </View>

                <Text> MinPrice: { minPrice } </Text>
                <View style = {styles.action}>
                    <TextInput 
                    style = {styles.textInput}
                    keyboardType = 'numeric'
                    placeholder = 'MinPrice' 
                    onChangeText = { minPrice => setminPrice(parseInt(minPrice))}
                    value = { minPrice }
                    >
                    </TextInput>
                </View>

                <Text> MaxPrice: { maxPrice } </Text>
                <View style = {styles.action}>
                    <TextInput 
                    style = {styles.textInput}
                    keyboardType = 'numeric'
                    placeholder = 'MaxPrice' 
                    onChangeText = { maxPrice => setmaxPrice(parseInt(maxPrice))}
                    value = { maxPrice }
                    >
                    </TextInput>
                </View>

                <Text> Keyword: { keyword } </Text>
                <View style = {styles.action}>
                    <TextInput 
                    style = {styles.textInput}
                    placeholder = 'Search' 
                    onChangeText = { keyword => setKeyword(keyword)}
                    value = { keyword }
                    >
                    </TextInput>
                </View>

                <View style = {styles.signInButton}>
                    <TouchableOpacity onPress = {() => navigation.navigate("Map", { radius: radius, minPrice: minPrice, maxPrice: maxPrice, keyword: keyword })}>
                        <LinearGradient
                            colors = {['#F4E979', '#F0E979']}
                            style = {styles.signIn}>
                            <Text style = {styles.buttonText}>Proceed to Map</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style = {styles.signUpButton}>
                    <TouchableOpacity onPress = {() => {signOut()}}>
                        <LinearGradient
                            colors = {['#D5D5D5','#CACACA']}
                            style = {styles.signIn}>
                            <Text style = {styles.buttonText}>Log Out</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4E979'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 3,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    headerTitleFont: {
        color: "#000000",
        fontSize: 40,
        fontWeight: "bold"
    },
    footerTitleFont: {
        color: '#000000',
        fontSize: 28,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    footerText: {
        color: '#7E7E7E',
        fontSize: 18,
        paddingTop: 5
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -6,
        paddingLeft: 10,
        color: '#05375a',
    },
    signInButton: {
        alignItems: 'center',
        marginTop: 25
    },
    signIn: {
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 15,
        color: '#000'
    },
    signUpButton: {
        alignItems: 'center',
        marginTop: 25
    },
});
export default newScreen;