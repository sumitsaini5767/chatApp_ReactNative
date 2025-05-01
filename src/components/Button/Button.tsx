import {Text, Touchable, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { styles } from './styles'
interface Props {
    containerStyle?:ViewStyle,
    lable:string,
}
const Button:React.FC<Props> = ({containerStyle,lable}) => {
  return (
    <TouchableOpacity style={[styles.container,containerStyle]}>
        <Text style={styles.textStyle}>{lable}</Text>
    </TouchableOpacity>
  )
}

export default Button
