import {StyleSheet} from 'react-native';
import FontFamily from '../../styles/FontFamily';
import { CommonColors } from '../../styles/Colors';
import { verticalScale } from '../../styles/scaling';

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
    marginTop:verticalScale(5),
    color:CommonColors.black
  },
  validation:{
    color:CommonColors.red,
    marginTop:verticalScale(5)
  }

});
