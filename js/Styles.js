
import React from "react"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")
const WIDTH = width

export const screenOptions = {
  homeTabMain: {
    headerTitle: null
  },
  searchTab: {
    headerTitle: null
  },
  socialTabMain: {
    headerTitle: null
  },
  screen: {
    headerTitle: null
  },
  tabScreen: {
    headerShown: false
  },
  productScreen: {
    headerStyle: {
      backgroundColor: "transparent",
    }
  },
  postScreen: {
    dummy: true
  }
}

export const styles = {
  productCellItem: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    width: "80%",
    margin: 5,
    backgroundColor: "pink",
  },
  productCellItemPressed: {
    opacity: 0.5 
  },
  productCellDim: {
    width: WIDTH,
    height: 150
  },
  postCellItem: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "start",
    flex: 1,
    width: "99%",
    margin: 5,
    backgroundColor: "pink"
  },
  postCellDim: {
    width: WIDTH,
    height: 100
  },
  background: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
    backgroundColor: "#AAA6",
  },
  screen: {
    flex: 1,
    backgroundColor: "#1000",
  },
  buttonTray: {
    width: 220,
    height: 60,
    marginBottom: 25,
    position: "absolute",
    zindex: 1,
    //temp
    backgroundColor: "#AAA7",
  }
}