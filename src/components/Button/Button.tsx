import { ActivityIndicator, Pressable, Text, Touchable, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { styles } from './styles'
interface Props {
  containerStyle?: ViewStyle,
  label: string,
  onPress?: () => void,
  isLoading?: boolean
}
const Button: React.FC<Props> = ({ containerStyle, label, onPress, isLoading }) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
      {isLoading ? <ActivityIndicator size='small' color="#fff" />
        : <Text style={styles.textStyle}>{label}</Text>}
    </TouchableOpacity>
  )
}

export default Button
