import React, { useContext, useState } from "react"
import { View, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { keys } from '../utils.js';
import LoginScreen from "../LoginScreen.js"
import AuthContext from "./auth.js"

export const AuthChecker = (props) => {
  //error:todo: useContext not working
  // const auth = useContext(AuthContext)
  const auth = props.auth

  // return (<>{props.children}</>)

  return(<>
    <>{ auth.authData.isLogin
    ? props.children
    : <LoginScreen/>
    }</>
    <AuthDebugger auth={auth}/>
  </>)
}

export const AuthDebugger = (props) => {
  //error:todo: useContext not working
  // const auth = useContext(AuthContext)
  const auth = props.auth

  const [ userData, setUserData ] = useState("empty userName")
  const [ token, setToken ] = useState("empty token")

  React.useEffect(
    () => {
      AsyncStorage.getItem(keys.USER_INFO)
      .then(r => JSON.parse(r))
      .then(o => setUserData(o))
      .catch(e => setUserData("logged out"))
    }
  , [auth.authData.isLogin])

  React.useEffect(
    () => {
      SecureStore.getItemAsync(keys.TOKEN)
      .then(r => setToken(r))
      .catch(e => setToken(e))
    }
  , [auth.authData.isLogin])

    // {Object.entries(auth.authData.userData).map(([k, v], i) => <Text>{k+": "+v}</Text>)}
  return(<View style={{borderColor:"black", borderWidth:1, borderRadius:5, margin:10, padding:5}}>
    <Text style={{alignSelf: "center"}}>{"---Auth Debugger---"}</Text>
    <Text>{"> from AsyncStorage: "}</Text>
    <Text>{""+userData}</Text>
    <Text>{"> from SecureStorage: "}</Text>
    <Text>{""+token}</Text>
    {auth.authData.error ? <Text>{"> Error: "+auth.authData.error}</Text> : <Text>{"> No Errors Found on AuthContext"}</Text>}
  </View>)
}