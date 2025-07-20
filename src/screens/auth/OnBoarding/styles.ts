import {Dimensions, StyleSheet} from 'react-native';
import {CommonColors} from '../../../styles/Colors';
import FontFamily from '../../../styles/FontFamily';
import { moderateScale, verticalScale, width } from '../../../styles/scaling';
export const styles = StyleSheet.create({
  MainContainer: {
    paddingHorizontal:moderateScale(40),
  },
  bgCircleImage: {
    position: 'absolute',
    height: verticalScale(500),
    width: width,
  },
  TopContainer:{
    flexDirection:'row',
  },
  LogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  translateImageContainer:{
    position:"absolute",
    right:moderateScale(15),
    top:moderateScale(15),
    padding:moderateScale(10),
    borderRadius:moderateScale(50),
    backgroundColor:CommonColors.textWhite,
    justifyContent:'center',
    alignItems:'center',
    zIndex: 99,
  },  
  translateImage:{
    resizeMode:'contain',
    height: verticalScale(15),
    width: moderateScale(15),
  },
  cLetterImage: {
    height: verticalScale(19),
    width: moderateScale(19),
    marginTop: verticalScale(25),
    resizeMode: 'contain',
  },
  LogoTitle: {
    color: CommonColors.textWhite,
    fontFamily: FontFamily.CarosSoft,
    fontSize: moderateScale(14),
    marginTop: verticalScale(25),
  },
  Title: {
    marginTop: verticalScale(20),
    color: CommonColors.textWhite,
    fontFamily: FontFamily.CarosSoft,
    fontSize: moderateScale(58),
    // textAlign:'center'
  },
  Title1: {
    color: CommonColors.textWhite,
    fontFamily: FontFamily.CarosSoftMedium,
    fontSize: moderateScale(58),
    // textAlign:'center'
  },
  subtitle: {
    marginTop: verticalScale(10),
    color: CommonColors.textSecondary,
    lineHeight: verticalScale(18),
    fontSize: moderateScale(16),
    fontFamily: FontFamily.CircularStd_Regular,
  },
  OrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:verticalScale(30),
    gap: 10,
  },
  orLines: {
    height: verticalScale(1),
    backgroundColor: '#CDD1D0',
    width: moderateScale(100),
    opacity: 0.3,
  },
  orTitle: {
    color: CommonColors.textSecondary,
  },
  ButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  Button: {
    backgroundColor: CommonColors.textWhite,
    padding: moderateScale(13),
    borderRadius: moderateScale(16),
    width: '100%',
  },
  ButtonText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: FontFamily.CarosSoftMedium,
  },
  ExistingAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
    gap: 5,
  },
  ExistingAccountText: {
    color: CommonColors.textSecondary,
    fontSize: moderateScale(14),
    fontFamily: FontFamily.CircularStd_Regular,
  },
  LoginButtontext: {
    color: CommonColors.textWhite,
    fontSize: moderateScale(14),
    fontFamily: FontFamily.CircularStd_Medium,
  },
});
