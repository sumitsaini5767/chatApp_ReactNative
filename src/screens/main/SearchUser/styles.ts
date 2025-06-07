import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../../styles/scaling";
import { CommonColors } from "../../../styles/Colors";

export const styles = StyleSheet.create({
    searchIcon: {
        flex: 0.1,
        width: moderateScale(18),
        height: verticalScale(18),
        alignSelf: "center",
    },
    input: {
        flex: 1,
        fontSize: moderateScale(14),
        color: CommonColors.black,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(5),
    },
    searchContainer: {
        marginVertical:verticalScale(10),
        flexDirection: "row",
        backgroundColor:CommonColors.buttonBackground,
        marginHorizontal: moderateScale(10),
        borderRadius: moderateScale(10),
        padding:moderateScale(5),
        overflow: "hidden",
    },
    crossImage: {
        alignSelf: "center",
        width: moderateScale(10),
        height: verticalScale(10),
    },
    crossImageContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
    },
    chatListContainer:{
        marginTop:verticalScale(15),
        marginHorizontal:moderateScale(15)
    },
    heading:{
        fontSize:moderateScale(16),
        fontWeight:'bold',
        marginVertical:verticalScale(6)
    }
});