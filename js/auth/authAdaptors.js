import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { keys } from '../utils.js'

//test
const DUMMY_TOKEN = 'MY_TOKEN';
const SERVER_IP = '18.118.198.117';
const AUTH_PORT = ':1323';

export const tryLogin = async (username, password) => {
  //todo: pack and send JWT to server
  const token = '[Dummy Token]'

  //todo: unpack user info from token
  const userData = {
    name: "김지수",
  }

  AsyncStorage.setItem(keys.USER_INFO, JSON.stringify(userData))
  .catch(e => {
    console.error(e)
    return {userData, error: e}
  })

  //note: Doesn't work on web release.
  SecureStore.setItemAsync(keys.TOKEN, token)
  .catch(e => {
    // console.error(e)
    return {userData, error: e}
  })

  return {userData};
};

export const tryLogout = async () => {
  AsyncStorage.removeItem(keys.USER_INFO)
  .catch(e => {
    console.error(e)
    return {error: e}
  })
  
  //note: Doesn't work on web release/
  SecureStore.deleteItemAsync(keys.TOKEN)
  .catch(e => {
    // console.error(e)
    return {error: e}
  })

  return {}
};

export const tryRestoreLogin = () => {};

export const trySignup = () => {};


