import React from 'react';
import { StyleSheet, View, Text, Button, Dimensions, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from "react-native-vector-icons/Feather";
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import * as Animatable from "react-native-animatable";
import { call } from 'react-native-reanimated';

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        checkTextInputChange: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true
    });

    const textInputChange = (val) => {
        if (val.length != 0){
            setData({
                ...data,
                email: val,
                checkTextInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                checkTextInputChange: false
            });
        }
    }

    const passwordInputChange = (val) => {
        setData({
            ...data,
            password: val
        })
    }

    const confirmPasswordInputChange = (val) => {
        setData({
            ...data,
            confirmPassword: val
        })
    }

    const updateSecureTextEntry = () =>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () =>{
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
        })
    }

    return (
         <View style = {styles.container}>
            <StatusBar 
                backgroundColor = '#F4E979' 
                barStyle = "dark-content"
            />
            <Animatable.View 
                style = {styles.header}
                animation = 'bounceInRight' >
                <Text style = {styles.headerTitleFont}>Register an Account</Text>
            </Animatable.View>
            <Animatable.View 
                style = {styles.footer}
                animation = 'bounceInUp' >
                <Text style = {styles.footerTitleFont}>New Account</Text>
                <Text style = {styles.footerText}>Email</Text>
                <View style = {styles.action}>
                    <EvilIcons
                        name = "user"
                        color = "#7E7E7E"
                        size = {20}
                    />
                    <TextInput
                        placeholder = "Email"
                        style = {styles.textInput}
                        autoCapitalize = "none"
                        onChangeText = {(val) => textInputChange(val)}
                    />
                    {data.checkTextInputChange ?
                        <Animatable.View animation = 'bounceIn'>
                            <Feather
                                name = "user-check"
                                color = "#4DC43F"
                                size = {20}
                            />
                        </Animatable.View> :
                        null}
                </View>
                <Text style = {styles.footerText}>Password</Text>
                <View style = {styles.action}>
                    <EvilIcons
                        name = "lock"
                        color = "#7E7E7E"
                        size = {20}
                    />
                    <TextInput
                        placeholder = "Password"
                        style = {styles.textInput}
                        autoCapitalize = "none"
                        secureTextEntry = {data.secureTextEntry ? true : false}
                        onChangeText = {(val) => passwordInputChange(val)}
                    />
                    <TouchableOpacity onPress = {updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name = 'eye-off'
                                color = '#7E7E7E'
                                size = {17}
                            /> :
                            <Feather
                                name = 'eye'
                                color = '#7E7E7E'
                                size = {17}
                            />}
                    </TouchableOpacity>
                </View>
                <Text style = {styles.footerText}>Confirm Password</Text>
                <View style = {styles.action}>
                    <EvilIcons
                        name = "lock"
                        color = "#7E7E7E"
                        size = {20}
                    />
                    <TextInput
                        placeholder = "Confirm your password"
                        style = {styles.textInput}
                        autoCapitalize = "none"
                        secureTextEntry = {data.confirmSecureTextEntry ? true : false}
                        onChangeText = {(val) => confirmPasswordInputChange(val)}
                    />
                    <TouchableOpacity onPress = {updateConfirmSecureTextEntry}>
                        {data.confirmSecureTextEntry ?
                            <Feather
                                name = 'eye-off'
                                color = '#7E7E7E'
                                size = {17}
                            /> :
                            <Feather
                                name = 'eye'
                                color = '#7E7E7E'
                                size = {17}
                            />}
                    </TouchableOpacity>
                </View>
                <View style = {styles.signUpButton}>
                    <TouchableOpacity onPress = {() => alert('firebase authentication')}>
                        <LinearGradient
                            colors = {['#F4E979', '#F0E979']}
                            style = {styles.signIn}>
                            <Text style = {styles.buttonText}>Sign Up  </Text>
                            <Feather
                                name = 'pen-tool'
                                color = '#000000'
                                size = {15}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style = {styles.signInButton}>
                    <TouchableOpacity onPress = {() => navigation.navigate("SignInScreen")}>
                        <LinearGradient
                            colors = {['#D5D5D5','#CACACA']}
                            style = {styles.signIn}>
                            <Text style = {styles.buttonText}>Sign In  </Text>
                            <Feather
                                name = 'key'
                                color = '#000'
                                size = {17}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    headerTitleFont: {
        color: "#000000",
        fontSize: 35,
        fontWeight: "bold"
    },
    footerTitleFont: {
        color: '#000000',
        fontSize: 22,
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

export default SignInScreen;