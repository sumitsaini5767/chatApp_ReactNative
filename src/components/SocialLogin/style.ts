import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../styles/scaling";
import { CommonColors } from "../../styles/Colors";

export const styles = StyleSheet.create({
    socialLoginContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    socialImageContainer: {
        height: 48,
        width: 48,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SocialImage: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
    OrContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(15),
        gap: moderateScale(10),
    },
    orLines: {
        height: moderateScale(1),
        backgroundColor: '#CDD1D0',
        width: '45%',
        opacity: 0.3,
    },
    orTitle: {
        color: CommonColors.textSecondary,
    },
})