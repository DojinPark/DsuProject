import React from "react";
import { View, Text, Button } from "react-native";
import { screenOptions } from "./Styles.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./HomeTab.js";
import SearchTab from "./SearchTab.js"
import SocialTab from "./SocialTab.js"

const Tab = createBottomTabNavigator();

const TabScreen = ({navigation, route}) => {
  navigation.setOptions(screenOptions.tabScreen);
  return(
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen name="HomeTab" component={HomeTab}/>
      <Tab.Screen name="SearchTab" component={SearchTab}/>
      <Tab.Screen name="SocialTab" component={SocialTab}/>
    </Tab.Navigator>
  )
}
export default TabScreen;