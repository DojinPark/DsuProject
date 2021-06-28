import React, { useState, useRef } from "react";
import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { 
  RecyclerListView, 
  DataProvider, 
  LayoutProvider, 
} from "recyclerlistview";
import { styles } from "../styles.js"
import { genProduct, genProducts } from '../testData.js'

const HomeTabList = (props) => {
  const { navigation } = props
  //old: immutable state array takes up huge memory overhead
  // const [dataArray, setDataArray] = useState(genProducts(5))
  const dataArray = useRef(genProducts(30))
  const [dataProviderState, setDataProvider] = useState(dataProvider.cloneWithRows(dataArray))
 
  return(
    <View style={{flex: 1}}>
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProviderState}
      rowRenderer={rowRenderer}
      extendedState={{navigation: navigation}}
      onEndReached={() => {
      
        //old: immutable state array takes up huge memory overhead
        // const longerDataArray = dataArray.concat(genProducts(5))
        // setDataProvider(dataProvider.cloneWithRows(longerDataArray))
        // setDataArray(longerDataArray) 

        //tune: synchronized or asynchronized data push
        dataArray.current.push(...genProducts(15))
        // for (let i=0; i<15; i++) {
        //   dataArray.current.push(genProduct())
        // }
        // (async () => {dataArray.current.push(genProduct())})()
        setDataProvider(dataProvider.cloneWithRows(dataArray.current))
        
      }}
      renderFooter={() => <Text>Loading...</Text>}
      renderAheadOffset={2250}
      onEndReachedThreshold={2250}
      disableRecycling={true}
      // scrollThrottle={10}
    />
    </View>
  )
}
export default HomeTabList;

const layoutProvider = new LayoutProvider(
  (index) => 0,
  (type, dim) => {
    let { width, height } = styles.homeTabListCellDim
    dim.width = width
    dim.height = height
  }
)

const rowRenderer = (type, data, index, extendedState) => {
  const { navigation } = extendedState

  return (
    <Pressable
      style={ ({ pressed }) => [
        styles.homeTabListCellItem,
        pressed ? styles.pressedOpacity : null
      ]}
      onPress = {() => {
        navigation.navigate("ProductScreen", data)
      }} 
    >
      <Text style={{fontWeight: "bold"}}>#{index}</Text>
      {data.image}
      {
      // <Image
      //   style={{height:80, width:200}}
      //   source={{uri: data.image}}
      // />
      }
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