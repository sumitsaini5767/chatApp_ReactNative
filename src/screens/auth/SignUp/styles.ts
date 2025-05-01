import {Dimensions, StyleSheet} from 'react-native';
import FontFamily from '../../../styles/FontFamily';
import {CommonColors} from '../../../styles/Colors';

const height=Dimensions.get('screen').height;
export const styles = StyleSheet.create({
  mainContainerStyle: {
    paddingHorizontal: 24,
  },
  topHeading: {
    textAlign: 'center',
    marginTop: 60,
    fontFamily: FontFamily.CarosSoftBold,
    fontSize: 18,
  },
  bottomHeading: {
    textAlign: 'center',
    marginTop: 16,
    width: '80%',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: FontFamily.CarosSoft,
  },
  inputContainerStyle:{
    marginTop:30
  },
  buttonStyle:{
    marginHorizontal:30,
    position:'absolute',
    top:height-180,
    width:'100%'
  },
});
