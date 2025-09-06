import { Pressable, Text, Touchable, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { styles } from './styles'
interface Props {
  containerStyle?: ViewStyle,
  label: string,
  onPress?: () => void
}
const Button: React.FC<Props> = ({ containerStyle, label, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container,containerStyle]} onPress={onPress}>
        <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button
