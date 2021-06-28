import React from "react";
import { View, Text, Button } from "react-native";
import { styles } from "./styles.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./tabs/HomeTab.js";
import SearchTab from "./tabs/SearchTab.js"
import SocialTab from "./tabs/SocialTab.js"

const Tab = createBottomTabNavigator();

const TabScreen = ({navigation, route}) => {
  navigation.setOptions(styles.options.tabsScreen);
  return(
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen name="HomeTab" component={HomeTab}/>
      <Tab.Screen name="SearchTab" component={SearchTab}/>
      <Tab.Screen name="SocialTab" component={SocialTab}/>
    </Tab.Navigator>
  )
}
export default TabScreen;