import React from "react";
import { View, Text, Button } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from 'expo-secure-store'
import { config } from "../utils.js"
import { tryLoginAsync, tryLogoutAsync } from "../auth/authAdaptors.js"

const SearchTab = ({navigation, route}) => {

  return(
    <View style={{flex:1, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
    <Text>{"Search Tab"}</Text>
    </View>
  )
}
export default SearchTab;