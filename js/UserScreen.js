import React from "react";
import { View, Text } from "react-native";
import { ScreenOptions } from "./Styles.js"

const UserScreen = ({navigation, route}) => {
  navigation.setOptions(ScreenOptions);
  return(
    <View>
      <Text>{"User Screen"}</Text>
    </View>
  )
}
export default UserScreen;