import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from "../styles.js"
import SocialTabList from "./SocialTabList.js";

const Stack = createStackNavigator();

const SocialTab = ({navigation, route}) => {
  return(
    <Stack.Navigator intialRouteName="SocialTabMain">
      <Stack.Screen name="SocialTabMainScreen" component={SocialTabMainScreen}/>
    </Stack.Navigator>
  )
}
export default SocialTab

const SocialTabMainScreen = ({navigation, route}) => {
  navigation.setOptions(styles.options.socialTabMainScreen)

  return(
    <SocialTabList navigation={navigation}/>
  )
}