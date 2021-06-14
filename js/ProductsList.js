import React, { useState } from "react";
import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { 
  RecyclerListView, 
  DataProvider, 
  LayoutProvider, 
} from "recyclerlistview";
import { styles } from "./Styles.js"
import { genProducts } from './TestData.js'

const ProductsList = (props) => {
  const { navigation } = props
  const [dataArray, setDataArray] = useState(genProducts(10))
  const [dataProviderState, setDataProvider] = useState(dataProvider.cloneWithRows(dataArray))

  return(
    <View style={{flex: 1}}>
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProviderState}
      rowRenderer={rowRenderer}
      extendedState={{navigation: navigation}}
      onEndReached={() => {
        const longerDataArray = dataArray.concat(genProducts(10))
        setDataProvider(dataProvider.cloneWithRows(longerDataArray))
        setDataArray(longerDataArray) 
      }} 
      rendererFooter={() => <ActivityIndicator/>}
    />
    </View>
  )
}
export default ProductsList;

const layoutProvider = new LayoutProvider(
  (index) => 0,
  (type, dim) => {
    let { width, height } = styles.productCellDim
    dim.width = width
    dim.height = height
  }
)

const rowRenderer = (type, data, index, extendedState) => {
  const { navigation } = extendedState

  return (
    <Pressable
      style={ ({ pressed }) => [
        styles.productCellItem,
        pressed ? styles.productCellItemPressed : null
      ]}
      onPress = {() => {
        navigation.navigate("ProductScreen", data)
      }} 
    >
      <Text style={{fontWeight: "bold"}}>#{index}</Text>
      <Image
        style={{height:80, width:200}}
        source={{uri: data.image, cache: "reload"}}
      />
      <Text>{data.productName}</Text>
      <Text>{data.price}</Text>
    </Pressable>
    
  )
}

const dataProvider = new DataProvider(
  (r1, r2) => {
    return r1 !== r2;
  }
);