import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from "./UserScreen.js";
import TabScreen from "./TabScreen.js";
import ProductScreen from "./ProductScreen.js"
import PostScreen from "./PostScreen.js"

const Stack = createStackNavigator();

const MobileRoot = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="TabScreen">
      <Stack.Screen name="TabScreen" component={TabScreen}/>
      <Stack.Screen name="UserScreen" component={UserScreen}/>
      <Stack.Screen name="ProductScreen" component={ProductScreen}/>
      <Stack.Screen name="PostScreen" component={PostScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MobileRoot;