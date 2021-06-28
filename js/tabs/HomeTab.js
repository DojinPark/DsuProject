import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "../styles.js"
import HomeTabList from "./HomeTabList.js"
import { AuthContext } from "../auth/auth.js"

const Stack = createStackNavigator();

const HomeTab = ({navigation, route}) => {
  return(
    <Stack.Navigator intialRouteName="HomeTabMain">
      <Stack.Screen name="HomeTabMainScreen" component={HomeTabMainScreen}/>
    </Stack.Navigator>
  )
}
export default HomeTab;

const HomeTabMainScreen = ({navigation, route}) => {
  navigation.setOptions(styles.options.homeTabMainScreen)
  navigation.setOptions({
    headerRight: () => <UserButton navigation={navigation}/>
  })
  return(
    <HomeTabList navigation={navigation}/>
  )
}

const UserButton = (props) => {
  const navigation = props.navigation
  const auth = useContext(AuthContext)

  return(
    <Button
      title="User"
      onPress={() => {
        switch(auth.authData.isLogin) {
          case true:
            navigation.navigate("UserScreen")
            break
          case false:
            navigation.navigate("LoginScreen")
            break
        }
      }}
    />
  )
}