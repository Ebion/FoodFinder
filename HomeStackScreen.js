import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "./MapScreen";
import NewScreen from "./NewScreen";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
    return (
        <HomeStack.Navigator headerMode = 'none'>
            <HomeStack.Screen name = 'New' component = {NewScreen}/>
            <HomeStack.Screen name = 'Map' component = {MapScreen}/>
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;