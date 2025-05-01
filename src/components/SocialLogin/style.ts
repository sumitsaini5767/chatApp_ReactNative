import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    socialLoginContainer:{
        marginTop:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:20
    },
    socialImageContainer:{
        height:48,
        width:48,
        borderRadius:50,
        borderColor:'white',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    SocialImage:{
        height:24,
        width:24,
        resizeMode:'contain',
    },
})