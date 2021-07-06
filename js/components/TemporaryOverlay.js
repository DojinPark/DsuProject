import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import { styles } from '../styles.js'

const TemporaryOverlay = (props) => {
  // Whenever value of tigger changes, the overlay will re-appear with new timer
  const { trigger } = props
  const [ show, setShow ] = useState(true)
  const cancelTimer = useRef(false)

  useEffect(() => {
    setShow(true)
    cancelTimer.current = false
    const timer = setTimeout(() => {
      if (!cancelTimer.current)
        setShow(false)
    }, 3000);
    return () => clearTimeout(timer)
  }, [trigger])

  return (<>{show ? (
    <Pressable style={({pressed}) => [
        style.overlay,
        styles.temporaryOverlay, 
        props.style,
        pressed ? {opacity: 8} : null,
      ]}
      onPressIn={() => {
        cancelTimer.current = true
      }}
      onPressOut={() => {
        setShow(false)
      }}
    >
      <View style={style.xMark}>
        <Text style={style.xMark}>{'✕'}</Text>
      </View>

      <View style={style.children}>
        {props.children}
      </View>
    </Pressable>
  ) : (
    null
  )}</>)
}
export default TemporaryOverlay

const { width, height } = Dimensions.get('window')
const style = {
  overlay: {
    position: 'absolute',
    zindex: 999,
    alignSelf: 'center',
    top: height*0.6,
    borderRadius: 13,
    width: 230,
    height: 80
  },
  xMark: {
    position: 'absolute',
    zindex: 999,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 29,
    left: 105,
    color: '#666',
    opacity: 0.85,
  },
  children: {
    position: 'absolute',
    padding: 15,
  },
}