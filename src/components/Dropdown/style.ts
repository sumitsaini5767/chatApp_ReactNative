import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../styles/scaling";
import { CommonColors } from "../../styles/Colors";
import FontFamily from "../../styles/FontFamily";

export const styles = StyleSheet.create({
    mainContainer: {
        // width:"100%",
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: moderateScale(10),
        backgroundColor: CommonColors.buttonBackground,
        borderRadius: moderateScale(5),
        marginHorizontal: moderateScale(10),
        marginBottom: verticalScale(5),
    },
    dropdownItem: {
        backgroundColor: CommonColors.buttonBackground,
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(20),
        paddingVertical: verticalScale(5),
        elevation: 5,
    },
    options: {
        padding: moderateScale(10),
    },
    optionText: {
        textAlign: 'center',
        paddingBottom:verticalScale(8),
        borderBottomWidth: 1,
        borderColor: CommonColors.darkWhite,
        fontFamily: FontFamily.CarosSoftBold,
        fontSize: moderateScale(16),
        color: CommonColors.black,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignContent:"center",
    },
    placeholderText:{
        fontFamily: FontFamily.CarosSoftBold,
        fontSize: moderateScale(16),
        color: CommonColors.black,
    }
});
