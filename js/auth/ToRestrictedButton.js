import React, { useContext } from "react"
import { View, Text, Pressable } from "react-native"
import { AuthContext } from "./auth.js"

export const ToRestrictedButton = (props) => {
  const { navigation, redirectScreen, redirectParams, ...restProps } = props
  const auth = useContext(AuthContext)

  return (
    <Pressable
      {...restProps}
      onPress = {() => {
        if (auth.authData.isLogin) {
          navigation.navigate(redirectScreen, redirectParams)
        } else {
          navigation.navigate("LoginScreen", {
            redirectScreen: redirectScreen,
            redirectParams: redirectParams
          })
        }
      }}
    >

    {props.children}

    </Pressable>
  )
}