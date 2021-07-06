import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { config } from './utils.js'
import { AuthContext, AuthDebugger } from './auth/auth.js'
import TemporaryOverlay from './components/TemporaryOverlay.js'

const LoginScreen = ({navigation, route}) => {
  const auth = useContext(AuthContext)
  const { redirectScreen, redirectParams } = route.params
  const [ message, setMessage ] = useState(null)
  const [ pressed, setPressed ] = useState(false)

  useEffect(() => {
      if (auth.authData.isLogin) {
        navigation.popToTop()
        navigation.navigate(redirectScreen, redirectParams)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth.authData.isLogin]
  )

  useEffect(() => {
    const condition = auth.authData.condition
    if (condition !== config.CONDITION_OK) {
      setMessage(condition.message)
    } else {
      setMessage(null)
    }
  }, [auth.authData])

  return (<>
    <Button
      title={'login'} 
      onPress={() => {
        auth.tryLogin('test', 'test')
        setPressed(!pressed)
      }}
    />

    <Button
      title={'tryout login'}
      onPress={() => {
        auth.testLogin({name: "test user name"})
      }}
    />

    {message ?
      <><TemporaryOverlay trigger={pressed}>
        <Text>{message}</Text>
      </TemporaryOverlay>
      {}</>
    :null}

    <AuthDebugger/>
  </>)
}
export default LoginScreen;

