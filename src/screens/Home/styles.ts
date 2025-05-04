import { StyleSheet } from "react-native";
import { CommonColors } from "../../styles/Colors";
import FontFamily from "../../styles/FontFamily";

export const styles=StyleSheet.create({
    upperContainer:{
        flexDirection:'row',
        justifyContent:"space-between",
        marginHorizontal:25,
        marginVertical:10,
        flexShrink:2,
    },
    lowerContainer:{
        flexGrow:1,
        backgroundColor:CommonColors.textWhite,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
    },
    Userimage:{
        width:40,
        height:40,
    },
    Searchimage:{
        width:22,
        height:22,
    },
    searchContainer:{
        padding:10,
        justifyContent:"center",
        borderWidth:1,
        borderRadius:50,
        borderColor:CommonColors.white
    },
    headline:{
        fontFamily:FontFamily.CarosSoftBold,
        fontSize:20,
        textAlignVertical:'center',
        color:CommonColors.white,
    },
    Userstatusbar:{
        marginTop:40,
        marginBottom:30,
    },
    flatlistContainer:{
        paddingHorizontal:15,
    },
    statusContainer:{
    },
    statusImage:{
        width:58,
        height:58,
        resizeMode:'contain'
    }
})