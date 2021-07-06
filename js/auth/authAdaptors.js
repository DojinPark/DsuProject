import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from 'jwt-decode'
import { config } from '../utils.js'

export const tryLoginAsync = async (username, password) => {
  const response = await loginAdaptorAsync(username, password)
  if (response.status === 401) { return {condition:config.CONDITION_HTTP_401} }
  if (response.status === 502) { return {condition:config.CONDITION_HTTP_502}}
  if (response.status === 503) { return {condition:config.CONDITION_HTTP_503} }

  const token = await response.json().then(o => {return o.token})
  const decoded = jwt_decode(token)
  const userData = retrieveUserData(decoded)

  // Store user data.
  AsyncStorage.setItem(config.USER_DATA, await JSON.stringify(userData))
  .catch(e => {throw e})
  // Store token.
  SecureStore.setItemAsync(config.TOKEN, token)
  .catch(e => {throw e})

  return {userData, isLogin: true, condition:config.CONDITION_OK}
};

export const tryLogoutAsync = async () => {
  //todo: handle logout fails
  const response = await logoutAdaptorAsync()
  //if (response !== 200) { throw new Error }
  
  //todo: what should be done when SecureStore has no token?
  if (response === null) {1}

  AsyncStorage.removeItem(config.USER_DATA)
  .catch(e => {throw e})
  
  SecureStore.deleteItemAsync(config.TOKEN)
  .catch(e => {throw e})

  return {isLogin: false, condition:config.CONDITION_OK}
};

export const tryRestoreLoginAsync = async () => {
  //test:
  return {isLogin: true, condition:config.CONDITION_RESTORED_LOGIN}

  const orgToken = await SecureStore.getItemAsync(config.TOKEN)
  .catch(e => {throw e})
  if (orgToken === null) { return null }

  const response = await restoreLoginAdaptorAsync(orgToken)
  .catch(e => {throw e})
  if (response.status !== 200) { return null }

  const newToken = await response.json().then(o => {return o.token})
  if (orgToken !== newToken) {
    logoutAdaptorAsync(newToken)
    return null
  }

  // const decoded = jwt_decode(orgToken)
  // const userData = retrieveUserData(decoded)  
  // await AsyncStorage.setItem(config.USER_DATA, userData)
  // .catch(e => {return null})

  const userData = await AsyncStorage.getItem(config.USER_DATA)

  // if orgToken === newToken
  return {userData, isLogin: true, condition:config.CONDITION_OK}
};

export const trySignupAsync = async () => {};

const loginAdaptorAsync = async (username, password) => {
  //todo: make a login form component and get formData parameter instead.
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)

  return await fetch( config.API_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: formData
    }
  )
  .then(response => {return response})
  .catch(e => {throw e})
}

const logoutAdaptorAsync = async (token) => {
  return await fetch(config.API_LOGOUT_URL, {
    method: 'GET',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
}

const restoreLoginAdaptorAsync = async (token) => {
  const response = await fetch(config.API_RESTORE_LOGIN_URL, {
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Contet-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })

  return response
}

const retrieveUserData = (decodedToken) => {
  return config.USER_DATA_KEYS
  .map(k => ({[k]: decodedToken[k]}))
  .reduce((res, o) => Object.assign(res, o))
}