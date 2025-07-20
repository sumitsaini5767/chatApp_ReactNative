import { Dimensions, StyleSheet } from 'react-native';
import FontFamily from '../../../styles/FontFamily';
import { height, moderateScale, verticalScale } from '../../../styles/scaling';

export const styles = StyleSheet.create({
  mainContainerStyle: {
    paddingHorizontal: moderateScale(24),
  },
  topHeading: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontFamily: FontFamily.CarosSoftBold,
    fontSize: moderateScale(18),
  },
  bottomHeading: {
    textAlign: 'center',
    marginTop: verticalScale(16),
    alignSelf: 'center',
    fontSize: moderateScale(14),
    fontFamily: FontFamily.CarosSoft,
  },
  inputContainerStyle: {
    marginTop: verticalScale(30)
  },
  buttonStyle: {
    marginTop: verticalScale(40),
    width: '100%'
  },
});
