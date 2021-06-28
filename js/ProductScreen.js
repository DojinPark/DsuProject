import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles.js"

const ProductScreen = ({navigation, route}) => {
  const { productName, price } = route.params
  navigation.setOptions(styles.options.productScreen)
  navigation.setOptions({title: productName})
  
  return(
    <View>
    <Text>The price is {price}</Text>
    </View>
  )
}
export default ProductScreen;