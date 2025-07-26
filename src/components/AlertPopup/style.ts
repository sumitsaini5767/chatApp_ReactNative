import { StyleSheet } from "react-native";
import { moderateScale } from "../../styles/scaling";

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: moderateScale(30),
        top: moderateScale(30),
        left: moderateScale(10),
        right: moderateScale(10),
        bottom: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(6),
        zIndex: 1000,
    },
    text: {
        fontSize: moderateScale(15),
        color: 'white',
    },
})