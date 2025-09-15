import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../../styles/scaling";
import FontFamily from "../../../styles/FontFamily";
import { CommonColors } from "../../../styles/Colors";

export const styles = StyleSheet.create({
    upperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
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
        paddingHorizontal: moderateScale(16),
        borderRadius: moderateScale(1),
    },
    profile: {
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingBottom: verticalScale(16),
        marginBottom: verticalScale(16),
    },
    backButton: {
        position: 'absolute',
        left: moderateScale(10),
        zIndex: 1,
        top: verticalScale(2),
    },
    inputContainerStyle: {
        marginBottom: verticalScale(35),
    },
    button: {
        marginBottom: verticalScale(25),
    },
    cameraIcon: {
        position: 'absolute',
        bottom: verticalScale(12),
        right: moderateScale(120),
        backgroundColor: CommonColors.white,
        padding: verticalScale(6),
        borderRadius: moderateScale(50),
    },
    title:{
        fontSize: moderateScale(18),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: verticalScale(10)
    },
    subtitle:{
        fontSize: moderateScale(14),
        textAlign: 'center',
        color: CommonColors.textSecondary
    }
})