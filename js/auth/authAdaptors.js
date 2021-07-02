import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from 'expo-secure-store'
import jwt_decode from "jwt-decode"
import { config } from '../utils.js'

export const tryLoginAsync = async (username, password) => {
  const response = await loginAdaptorAsync(username, password)
  if (response.status === 401) { throw config.HTTP_ERROR_401 }

  const token = await response.json().then(o => {return o.token})
  const decoded = jwt_decode(token)
  const userData = retrieveUserData(decoded)

  // Store user data.
  AsyncStorage.setItem(config.USER_DATA, JSON.stringify(userData))
  .catch(e => {throw e})
  // Store token.
  SecureStore.setItemAsync(config.TOKEN, token)
  .catch(e => {throw e})

  return {userData}
};

export const tryLogoutAsync = async () => {
  //todo: handle logout fails
  const response = await logoutAdaptorAsync()
  //if (response !== 200) { throw new Error }

  AsyncStorage.removeItem(config.USER_DATA)
  .catch(e => {throw e})
  
  SecureStore.deleteItemAsync(config.TOKEN)
  .catch(e => {throw e})

  return {}
};

export const tryRestoreLogin = () => {};

export const trySignup = () => {};

const loginAdaptorAsync = async (username, password) => {
  //todo: make a login form component and get formData parameter instead.
  const formData = new FormData()
  formData.append("username", username)
  formData.append("password", password)

  return await fetch( config.API_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData
    }
  )
  .then(response => {return response})
  .catch(e => {throw e})
}

const logoutAdaptorAsync = async () => {
  const token = await SecureStore.getItemAsync(config.TOKEN)
  .catch(e => {throw e})

  return await fetch(config.API_LOGOUT_URL, {
    method: "GET",
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token,
    },
  })
}

const retrieveUserData = (decodedToken) => {
  return config.USER_DATA_KEYS
  .map(k => ({[k]: decodedToken[k]}))
  .reduce((res, o) => Object.assign(res, o))
}