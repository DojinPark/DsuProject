import React, { useState, useRef } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { 
  RecyclerListView, 
  DataProvider, 
  LayoutProvider, 
} from "recyclerlistview";
import { styles } from "../styles.js"
import { genPosts } from '../testData.js'

const SocialTabList = (props) => {
  const { navigation } = props
  const dataArray = useRef(genPosts(10))
  const [dataProviderState, setDataProvider] = useState(dataProvider.cloneWithRows(dataArray))

  return(
    <View style={{flex: 1}}>
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProviderState}
      rowRenderer={rowRenderer}
      extendedState={{navigation: navigation}}
      onEndReached={() => {
        dataArray.current.push(...genPosts(10))
        setDataProvider(dataProvider.cloneWithRows(dataArray.current))
      }} 
      rendererFooter={() => <ActivityIndicator/>}
    />
    </View>
  )
}
export default SocialTabList;

const layoutProvider = new LayoutProvider(
  (index) => 0,
  (type, dim) => {
    let { width, height } = styles.socialTabListCellDim
    dim.width = width
    dim.height = height
  }
)

const rowRenderer = (type, data, index, extendedState) => {
  const { navigation } = extendedState

  return (
    <View style={styles.socialTabListCellItem}>
      <Text style={{fontWeight: "bold"}}>#{index}</Text>
      <Button
        title = {data.title}
        onPress = {() => {
          navigation.navigate("PostScreen", data)
        }} 
      />
      <Text>by {data.writer}</Text>
    </View>
  )
}

const dataProvider = new DataProvider(
  (r1, r2) => {
    return r1 !== r2;
  }
);