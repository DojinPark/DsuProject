import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions } from "./Styles.js"
import PostsList from "./PostsList.js";

const Stack = createStackNavigator();

const SocialTab = ({navigation, route}) => {
  return(
    <Stack.Navigator intialRouteName="SocialTabMain">
      <Stack.Screen name="SocialTabMain" component={SocialTabMain}/>
    </Stack.Navigator>
  )
}
export default SocialTab

const SocialTabMain = ({navigation, route}) => {
  navigation.setOptions(screenOptions.socialTabMain)

  return(
    <PostsList navigation={navigation}/>
  )
}