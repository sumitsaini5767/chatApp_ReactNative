import {Image, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import imagepath from '../../constants/imagepath';
import {styles} from './styles';
import { useNavigation } from '@react-navigation/native';
interface props {
  onPress?: () => void;
  style?: ViewStyle;
}
const Backbutton: React.FC<props> = ({onPress,style}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.backButton, style]} onPress={() => navigation.goBack()}>
      <Image source={imagepath.backArrow} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default Backbutton;
