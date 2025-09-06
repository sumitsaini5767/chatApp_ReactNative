import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../styles/scaling";

export const styles = StyleSheet.create({
    backButton: {
        marginTop: verticalScale(10),
        width: '10%',
        padding: moderateScale(10),
        alignItems: 'center',
    }
})