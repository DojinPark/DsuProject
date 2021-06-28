import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext, AuthDebugger } from "./auth/auth.js"
import { keys } from "./utils.js"

const LoginScreen = ({navigation, route}) => {
  const auth = useContext(AuthContext)

  return (<>

    <Button
      title={"login"} 
      onPress={() => {auth.login("test", "test")}}
    />

    <AuthDebugger/>

  </>)
}
export default LoginScreen;

