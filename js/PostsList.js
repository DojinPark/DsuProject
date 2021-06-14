import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { 
  RecyclerListView, 
  DataProvider, 
  LayoutProvider, 
} from "recyclerlistview";
import { styles } from "./Styles.js"
import { genPosts } from './TestData.js'

const PostsList = (props) => {
  const { navigation } = props
  const [dataArray, setDataArray] = useState(genPosts(10))
  const [dataProviderState, setDataProvider] = useState(dataProvider.cloneWithRows(dataArray))

  return(
    <View style={{flex: 1}}>
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProviderState}
      rowRenderer={rowRenderer}
      extendedState={{navigation: navigation}}
      onEndReached={() => {
        const longerDataArray = dataArray.concat(genPosts(10))
        setDataProvider(dataProvider.cloneWithRows(longerDataArray))
        setDataArray(longerDataArray) 
      }} 
      rendererFooter={() => <ActivityIndicator/>}
    />
    </View>
  )
}
export default PostsList;

const layoutProvider = new LayoutProvider(
  (index) => 0,
  (type, dim) => {
    let { width, height } = styles.postCellDim
    dim.width = width
    dim.height = height
  }
)

const rowRenderer = (type, data, index, extendedState) => {
  const { navigation } = extendedState

  return (
    <View style={styles.postCellItem}>
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