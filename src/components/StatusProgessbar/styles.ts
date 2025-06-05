import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../styles/scaling";
import { CommonColors } from "../../styles/Colors";

export const styles = StyleSheet.create({
    container: {
      flex:1,
      height: moderateScale(3),
      backgroundColor: CommonColors.black,
      borderRadius: moderateScale(2),
      overflow: 'hidden',
      marginHorizontal: moderateScale(5),
      marginVertical:verticalScale(5)
    },
    progressBar: {
      height: '100%',
      backgroundColor: CommonColors.white,
    },
  });