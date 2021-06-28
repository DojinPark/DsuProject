import React, { Component, useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, useAuthHandler } from "./auth/auth.js"
import TabsScreen from "./TabsScreen.js";
import UserScreen from "./UserScreen.js";
import ProductScreen from "./ProductScreen.js"
import PostScreen from "./PostScreen.js"
import LoginScreen from "./LoginScreen.js"

const Stack = createStackNavigator();

const Root = () => {
  const auth = useAuthHandler();

  return(
    <NavigationContainer>
    <AuthContext.Provider value={auth}>
    <Stack.Navigator initialRouteName="TabsScreen">
      <Stack.Screen name="TabsScreen" component={TabsScreen}/>
      <Stack.Screen name="ProductScreen" component={ProductScreen}/>
      <Stack.Screen name="PostScreen" component={PostScreen}/>
      {auth.authData.isLogin
      ? <Stack.Screen name="UserScreen" component={UserScreen}/>
      : <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      }
    </Stack.Navigator>
    </AuthContext.Provider>
    </NavigationContainer>
  )
}
export default Root;