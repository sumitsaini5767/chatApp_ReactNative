import {Dimensions, StyleSheet} from 'react-native';
import FontFamily from '../../../styles/FontFamily';
import {CommonColors} from '../../../styles/Colors';
import {moderateScale, verticalScale} from '../../../styles/scaling';

const height = Dimensions.get('screen').height;
export const styles = StyleSheet.create({
  mainContainerStyle: {
    paddingHorizontal: moderateScale(24),
  },
  topHeading: {
    textAlign: 'center',
    marginTop: verticalScale(60),
    fontFamily: FontFamily.CarosSoftBold,
    fontSize: moderateScale(18),
  },
  bottomHeading: {
    textAlign: 'center',
    marginTop: verticalScale(16),
    width: '80%',
    alignSelf: 'center',
    fontSize: moderateScale(14),
    fontFamily: FontFamily.CarosSoft,
  },
  socialImageContainer: {
    borderColor: 'black',
  },
  OrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
    gap: moderateScale(10),
  },
  orLines: {
    height: moderateScale(1),
    backgroundColor: '#CDD1D0',
    width: '45%',
    opacity: 0.3,
  },
  orTitle: {
    color: CommonColors.textSecondary,
  },
  inputContainerStyle: {
    marginTop: verticalScale(30)
  },
  buttonStyle: {
    marginHorizontal: moderateScale(30),
    position: 'absolute',
    top: height - verticalScale(180),
    width: '100%'
  },
  forgetPassword: {
    marginTop: verticalScale(16)
  },
  forgetPasswordText: {
    textAlign: 'center',
    color: CommonColors.inputTextColor,
    fontFamily: FontFamily.CircularStd_Regular
  }
});
