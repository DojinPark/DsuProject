import React, { useState, useContext } from "react"
import { View, Text, Platform, Button } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { config } from "../utils.js"
import { AuthContext } from "./AuthContext.js"

export const AuthDebugger = (props) => {
  const auth = useContext(AuthContext)

  const [ userData, setUserData ] = useState({message: "initial state"})
  const [ token, setToken ] = useState("empty token")
  const [ reload, setReload ] = useState(false)

  React.useEffect(
    () => {
      AsyncStorage.getItem(config.USER_DATA)
      .then(o => JSON.parse(o))
      .then(o => setUserData(o))
      .catch(e => setUserData({message: "logged out"}))
    }
  , [auth.authData.isLogin, reload])

  React.useEffect(
    () => {
      SecureStore.getItemAsync(config.TOKEN)
      .then(r => setToken(r))
      .catch(e => setToken(e))
    }
  , [auth.authData.isLogin, reload])

  return(<View style={{borderColor:"black", borderWidth:1, borderRadius:5, margin:10, padding:5}}>
    <Text style={{alignSelf: "center"}}>{"---Auth Debugger---"}</Text>

    <Text>{"> from SecureStorage: "}</Text>
    {Platform.OS === "web" && token
    ? <Text>{"Unsupported on web-based platforms"}</Text>
    : <Text>{token ? token : "Logged Out!"}</Text>
    }

    <Text>{"> from AsyncStorage: "}</Text>
    {userData ? Object.entries(userData).map(([k, v], i) => <Text>{k+": "+v}</Text>) : <Text>{"Logged Out!"}</Text>}

    <Button title={"reload"} onPress={() => {setReload(!reload)}} />
    
  </View>)
}