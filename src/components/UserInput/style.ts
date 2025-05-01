import {StyleSheet} from 'react-native';
import FontFamily from '../../styles/FontFamily';
import { CommonColors } from '../../styles/Colors';

export const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    borderColor:CommonColors.gray,
  },
  textStyle: {
    color:CommonColors.inputTextColor,
    fontFamily:FontFamily.CarosSoftBold
  },
  inputStyle: {
    marginVertical:8,
    color:CommonColors.black
  },
});
