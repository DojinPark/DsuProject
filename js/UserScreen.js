import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles.js'
import { AuthContext, AuthDebugger } from './auth/auth.js'

import { Button } from 'react-native'

const userToken = null;
const UserScreen = ({navigation, route}) => {
  navigation.setOptions(styles.options.userScreen);
  const auth = useContext(AuthContext)

  return(<>
    <Button 
      title={'logout'} 
      onPress={() => auth.tryLogout()}
    />
    <Button
      title={'tryout logout'}
      onPress={() => auth.testLogout()}
    />
    <AuthDebugger/>
  </>)
}
export default UserScreen;