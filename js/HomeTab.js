import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsList from "./ProductsList.js"
import { screenOptions } from "./Styles.js"

const Stack = createStackNavigator();

const HomeTab = ({navigation, route}) => {
  return(
    <Stack.Navigator intialRouteName="HomeTabMain">
      <Stack.Screen name="HomeTabMain" component={HomeTabMain}/>
    </Stack.Navigator>
  )
}
export default HomeTab;

const HomeTabMain = ({navigation, route}) => {
  navigation.setOptions(screenOptions.homeTabMain)
  navigation.setOptions({
    headerRight: () => <UserButton navigation={navigation}/>
  })
  return(
    <ProductsList navigation={navigation}/>
  )
}

const UserButton = (props) => {
  const navigation = props.navigation

  return(
    <Button
      title="User"
      onPress={() => navigation.navigate("UserScreen")}
    />
  )
}