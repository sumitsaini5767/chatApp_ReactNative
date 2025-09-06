import { StatusBar, StyleSheet } from "react-native";
import { moderateScale } from "../../styles/scaling";
import { CommonColors } from "../../styles/Colors";

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: StatusBar.currentHeight,
        left: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        right: moderateScale(10),
        padding: moderateScale(10),
        borderRadius: moderateScale(6),
        zIndex: 1,
        backgroundColor: CommonColors.white,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Android shadow
        elevation: 5,
    },
    text: {
        fontSize: moderateScale(15),
        marginHorizontal: moderateScale(8)
    },
})