import React, { useContext, useState } from "react"
import { View, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { config } from '../utils.js';
import LoginScreen from "../LoginScreen.js"
import AuthContext from "./auth.js"

export const AuthChecker = (props) => {
  //error:todo: useContext not working
  // const auth = useContext(AuthContext)
  const auth = props.auth

}