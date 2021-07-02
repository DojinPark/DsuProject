import React, { createContext, useReducer, useState, useEffect, useContext } from 'react';
import { config } from '../utils.js'
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store'
import * as Adaptor from "./authAdaptors.js"

export const AuthContext = createContext();

export const useAuthHandler = () => {
  //test: wipe AsyncStorage
  React.useMemo(() => {
    AsyncStorage.clear()
    SecureStore.deleteItemAsync(config.TOKEN)
  }, [])

  const [authData, dispatch] = useReducer((prevAuthData, action) => {
    switch (action.type) {
      case config.LOGIN:
        return {...baseAuthData, ...action.results, isLogin: true}
      case config.LOGOUT:
        return {...baseAuthData, ...action.results, isLogin: false}
      case config.RESTORE_LOGIN:
        return {...baseAuthData, ...action.results, isLogin: true}
      case config.SIGNUP:
        return {...baseAuthData, ...action.results, isLogin: true}
    }
  }, baseAuthData);

  // const adaptors = React.useMemo(() => ({
  // //  authData: authData,
  //   login: async (username, password) => {
  //     let results = await Adaptor.tryLogin(username, password)
  //     dispatch({
  //       type: config.LOGIN,
  //       results
  //     })
  //   },
  //   logout: async () => {
  //     let results = await Adaptor.tryLogout()
  //     dispatch({
  //       type: config.LOGOUT,
  //       // results
  //     })
  //   },
  // }), [])

  const adaptors = {
    login: async (username, password) => {
      let results = await Adaptor.tryLoginAsync(username, password)
      dispatch({
        type: config.LOGIN,
        results
      })
    },
    logout: async () => {
      let results = await Adaptor.tryLogoutAsync()
      dispatch({
        type: config.LOGOUT,
        results
      })
    },
  }

  // return authContext
  // return adaptors
  return { authData, ...adaptors }
};

const baseAuthData = {
  isLogin: false,
  userData: {},
  error: null,
};
