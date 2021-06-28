import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles.js"

const PostScreen = ({navigation, route}) => {
  const { title, writer, content } = route.params;
  navigation.setOptions(styles.options.postScreen)
  
  return(
    <View>
      <Text>{title}{'\n\n'}</Text>
      <Text>by {writer}{'\n\n'}</Text>
      <Text>{content}{'\n\n'}</Text>
    </View>
  )
}
export default PostScreen