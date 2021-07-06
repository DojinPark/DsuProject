import React, { createContext, useState, useCallback, useMemo } from 'react'
import { config } from '../utils.js'
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store'
import * as Adaptors from "./authAdaptors.js"

export const AuthContext = createContext();

export const useAuthHandler = () => {
  //test: wipe AsyncStorage
  // React.useMemo(() => {
  //   AsyncStorage.clear()
  //   SecureStore.deleteItemAsync(config.TOKEN)
  // }, [])

  const [ authData, setAuthData ] = useState(baseAuthData)
  
  const adaptors = useMemo(() => ({
    testLogin: async (userData) => {
      AsyncStorage.setItem(config.USER_DATA, await JSON.stringify(userData))
      .catch(e => {throw e})
      SecureStore.setItemAsync(config.TOKEN, "A-dummy-token")
      .catch(e => {throw e})
      setAuthData({ ...baseAuthData, isLogin: true, userData })
    },
    testLogout: () => {
      AsyncStorage.removeItem(config.USER_DATA)
      .catch(e => {throw e})
      SecureStore.deleteItemAsync(config.TOKEN)
      .catch(e => {throw e})
      setAuthData({ ...baseAuthData, isLogin: false})
    },
    tryLogin: async (username, password) => {
      let results = await Adaptors.tryLoginAsync(username, password)
      setAuthData({ ...baseAuthData, ...results })
    },
    tryLogout: async () => {
      let results = await Adaptors.tryLogoutAsync()
      setAuthData({ ...baseAuthData, ...results })
    },
    tryRestoreLogin: async () => {
      let results = await Adaptors.tryRestoreLoginAsync()
      setAuthData({ ...baseAuthData, ...results })
    }
  }), [])

  useCallback(async () => await adaptors.tryRestoreLogin(), [])

  return { authData, ...adaptors }
};

const baseAuthData = {
  isLogin: false,
  userData: {},
  condition: config.CONDITION_OK,
};
