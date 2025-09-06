import { StyleSheet } from "react-native";
import FontFamily from "../../styles/FontFamily";
import { CommonColors } from "../../styles/Colors";

export const styles=StyleSheet.create({
    container:{
        backgroundColor:CommonColors.inputTextColor,
        padding:20,
        borderRadius:20
    },
    textStyle:{
        textAlign:"center",
        color:CommonColors.white,
        fontFamily:FontFamily.CarosSoftBold
    }
})