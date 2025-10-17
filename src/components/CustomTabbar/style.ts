import { StyleSheet } from 'react-native';
import { CommonColors } from '../../styles/Colors';
import { moderateScale, verticalScale } from '../../styles/scaling';
import FontFamily from '../../styles/FontFamily';
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: CommonColors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 }, 
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation:8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(5),
    },
    iconContainer: {
        marginBottom: verticalScale(3),
    },
    label: {
        fontSize: moderateScale(11),
        color: CommonColors.black,
    },
    activeLabel: {
        color: CommonColors.inputTextColor,
        fontFamily: FontFamily.CarosSoftBold,
    },
});
