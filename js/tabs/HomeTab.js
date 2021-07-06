import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "../styles.js"
import HomeTabList from "./HomeTabList.js"
import { ToRestrictedButton } from "../auth/auth.js"
import { AuthContext } from "../auth/auth.js"
//test:
import TemporaryOverlay from "../components/TemporaryOverlay.js"

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
    <>
    <HomeTabList navigation={navigation}/>
    <TemporaryOverlay>
      <Text style={{textAlign: 'center', fontSize: 14}}>{'Welcome to my demo🌼'}</Text>
    </TemporaryOverlay>
    </>
  )
}

const UserButton = (props) => {
  const navigation = props.navigation

  return(
    <ToRestrictedButton
      navigation={navigation}
      redirectScreen={"UserScreen"}
      style={({pressed}) => [
        styles.userButton,
        pressed ? styles.pressedOpacity : null
      ]}
    >
      <Text>{"User"}</Text>
    </ToRestrictedButton>
  )
}