import {Image, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import imagepath from '../../constants/imagepath';
import {styles} from './styles';
interface props {
  onPress?: () => void;
  style?: ViewStyle;
}
const Backbutton: React.FC<props> = ({onPress,style}) => {
  return (
    <TouchableOpacity style={[styles.backButton, style]} onPress={onPress}>
      <Image source={imagepath.backArrow} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default Backbutton;
