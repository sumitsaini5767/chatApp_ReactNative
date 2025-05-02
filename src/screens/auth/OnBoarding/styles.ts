import {Dimensions, StyleSheet} from 'react-native';
import {CommonColors} from '../../../styles/Colors';
import FontFamily from '../../../styles/FontFamily';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  MainContainer: {
    paddingHorizontal: 50,
  },
  bgCircleImage: {
    position: 'absolute',
    height: 500,
    margin: 0,
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
    right:15,
    top:15,
    padding:10,
    borderRadius:60,
    backgroundColor:CommonColors.textWhite,
    justifyContent:'center',
    alignItems:'center',
    zIndex: 99,
  },  
  translateImage:{
    resizeMode:'contain',
    height: 15,
    width: 15,
  },
  cLetterImage: {
    height: 19,
    width: 19,
    marginTop: 25,
    resizeMode: 'contain',
  },
  LogoTitle: {
    color: CommonColors.textWhite,
    fontFamily: FontFamily.CarosSoft,
    fontSize: 14,
    marginTop: 25,
  },
  Title: {
    marginTop: 50,
    color: CommonColors.textWhite,
    fontFamily: FontFamily.CarosSoft,
    fontSize: 68,
    // textAlign:'center'
  },
  Title1: {
    color: CommonColors.textWhite,
    fontFamily: FontFamily.CarosSoftMedium,
    fontSize: 68,
    // textAlign:'center'
  },
  subtitle: {
    marginTop: 10,
    color: CommonColors.textSecondary,
    lineHeight: 26,
    fontSize: 16,
    fontFamily: FontFamily.CircularStd_Regular,
  },
  OrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 10,
  },
  orLines: {
    height: 1,
    backgroundColor: '#CDD1D0',
    width: 100,
    opacity: 0.3,
  },
  orTitle: {
    color: CommonColors.textSecondary,
  },
  ButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  Button: {
    backgroundColor: CommonColors.textWhite,
    padding: 13,
    borderRadius: 16,
    width: '100%',
  },
  ButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FontFamily.CarosSoftMedium,
  },
  ExistingAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 5,
  },
  ExistingAccountText: {
    color: CommonColors.textSecondary,
    fontSize: 14,
    fontFamily: FontFamily.CircularStd_Regular,
  },
  LoginButtontext: {
    color: CommonColors.textWhite,
    fontSize: 14,
    fontFamily: FontFamily.CircularStd_Medium,
  },
});
