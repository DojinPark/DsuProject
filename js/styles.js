
import React from "react"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")
const WIDTH = width

export const styles = {
  pressedOpacity: {
    opacity: 0.5 
  },
  userButton: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  
  homeTabListCellItem: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    width: "80%",
    margin: 5,
    backgroundColor: "pink",
  },
  homeTabListCellDim: {
    width: WIDTH,
    height: 150
  },
  socialTabListCellItem: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "start",
    flex: 1,
    width: "99%",
    margin: 5,
    backgroundColor: "pink"
  },
  socialTabListCellDim: {
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
  },

  // Navigator screens options
  options: {
    tabsScreen: {
      headerShown: false
    },
    defaultScreen: {
      headerTitle: null
    },
    homeTabMainScreen: {
      headerTitle: null
    },
    searchTab: {
      headerTitle: null
    },
    socialTabMainScreen: {
      // headerTitle: null
      headerShown: false
    },
    productScreen: {
      headerStyle: {
        backgroundColor: "transparent",
      }
    },
    postScreen: {
      dummy: true
    },
    userScreen: {

    }
  }
}

