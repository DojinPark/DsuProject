import React, { createContext, useReducer, useState, useEffect, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { keys } from '../utils.js'
import { View, Text } from 'react-native';
import * as Adaptor from "./authAdaptors.js"

export const AuthContext = createContext();

export const useAuthHandler = () => {
  //test: wipe AsyncStorage
  // AsyncStorage.clear()

  const [authData, dispatch] = useReducer((prevAuthData, action) => {
    switch (action.type) {
      case keys.LOGIN:
        return {...baseAuthData, ...action.results, isLogin: true}
      case keys.LOGOUT:
        return {...baseAuthData, ...action.results}
      case keys.RESTORE_LOGIN:
        return {...baseAuthData, ...action.results, isLogin: true}
      case keys.SIGNUP:
        return {...baseAuthData, ...action.results, isLogin: true}
    }
  }, baseAuthData);

  const adaptors = React.useMemo(() => ({
  //  authData: authData,
    login: async (username, password) => {
      let results = await Adaptor.tryLogin(username, password)
      dispatch({
        type: keys.LOGIN,
        results
      })
    },
    logout: async () => {
      let results = await Adaptor.tryLogout()
      dispatch({
        type: keys.LOGOUT,
        // results
      })
    },
  }), [])
  // const adaptors = {
  //   login: async (username, password) => {
  //     let results = await Adaptor.tryLogin(username, password)
  //     dispatch({
  //       type: keys.LOGIN,
  //       results
  //     })
  //   },
  //   logout: async () => {
  //     let results = await Adaptor.tryLogout()
  //     dispatch({
  //       type: keys.LOGOUT,
  //       // results
  //     })
  //   },
  // }

  // return authContext
  return { authData, ...adaptors }
};

const baseAuthData = {
  isLogin: false,
  userData: {},
  error: null,
};

export const AuthDebugger = (props) => {
  //error:todo: useContext not working
  const auth = useContext(AuthContext)
  // const auth = props.auth

  const [ userData, setUserData ] = useState(null)
  const [ token, setToken ] = useState("empty token")

  React.useEffect(
    () => {
      AsyncStorage.getItem(keys.USER_INFO)
      .then(r => JSON.parse(r))
      .then(o => setUserData(o))
      .catch(e => setUserData({message:"logged out"}))
    }
  , [auth.authData.isLogin])

  React.useEffect(
    () => {
      SecureStore.getItemAsync(keys.TOKEN)
      .then(r => setToken(r))
      .catch(e => setToken(e))
    }
  , [auth.authData.isLogin])

  return(<View style={{borderColor:"black", borderWidth:1, borderRadius:5, margin:10, padding:5}}>
    <Text style={{alignSelf: "center"}}>{"---Auth Debugger---"}</Text>
    <Text>{"> from AsyncStorage: "}</Text>
    {Object.entries(auth.authData.userData).map(([k, v], i) => <Text>{k+": "+v}</Text>)}
    <Text>{"> from SecureStorage: "}</Text>
    <Text>{""+token}</Text>
    {auth.authData.error ? <Text>{"> Error: "+auth.authData.error}</Text> : <Text>{"> No Errors Found on AuthContext"}</Text>}
  </View>)
}