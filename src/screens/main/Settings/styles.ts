import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../../styles/scaling";
import FontFamily from "../../../styles/FontFamily";
import { CommonColors } from "../../../styles/Colors";

export const styles = StyleSheet.create({
    upperContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(12),
    },
    headline: {
        fontFamily: FontFamily.CarosSoftBold,
        fontSize: moderateScale(20),
        fontWeight: '600',
        color: CommonColors.white,
    },
    lowerConatiner: {
        flex: 1,
        backgroundColor: CommonColors.white,
        borderTopLeftRadius: moderateScale(40),
        borderTopRightRadius: moderateScale(40),
        paddingTop: verticalScale(16),
    },
    userImage: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(25),
        marginRight: moderateScale(16),
    },
    profile: {
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        borderBottomColor: CommonColors.buttonBackground,
        borderBottomWidth: moderateScale(1),
        paddingBottom: verticalScale(16),
        marginBottom: verticalScale(16),
    },
    profileText: {
        marginTop: verticalScale(8),
        width:"100%",
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: FontFamily.CarosSoftBold,
        fontSize: moderateScale(18),
        fontWeight: '600',
        color: CommonColors.black,
    },
    icon:{
        width: moderateScale(30),
        height: moderateScale(30),
    },
    container:{
        marginBottom:verticalScale(10),
        marginHorizontal:moderateScale(16),
        flexDirection: 'row',
        alignItems: 'center',
    },
    lable:{
        padding:moderateScale(10),
        fontFamily: FontFamily.CarosSoftMedium,
        fontSize: moderateScale(15),
        color: CommonColors.black,
        alignSelf: 'center',
    },
    dropdown:{
        width:'95%',
    }
})