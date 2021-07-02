import React, { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext, AuthDebugger } from "./auth/auth.js"
import { config } from "./utils.js"

const LoginScreen = ({navigation, route}) => {
  const auth = useContext(AuthContext)
  const { redirectScreen, redirectParams } = route.params

  useEffect(() => {
      if (auth.authData.isLogin) {
        navigation.popToTop()
        navigation.navigate(redirectScreen, redirectParams)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth.authData.isLogin]
  )

  return (<>

    <Button
      title={"login"} 
      onPress={() => {
        auth.login("test", "test")
      }}
    />

    <AuthDebugger/>

  </>)
}
export default LoginScreen;

