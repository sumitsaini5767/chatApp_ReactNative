import { StyleSheet } from "react-native";
import { CommonColors } from "../../styles/Colors";
import { moderateScale } from "../../styles/scaling";

export const styles = StyleSheet.create({
    chatItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatUserImage: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        marginRight: moderateScale(12),
        borderWidth:2,
    },
    chatContentContainer: {
        flex: 1,
        paddingBottom: 16,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatUserName: {
            color:CommonColors.black,
            fontSize: 16,
            fontWeight: '600',
    },
    chatTimestamp: {
        color: '#888888',
        fontSize: 12,
    },
    chatMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatMessage: {
        color: '#888888',
        fontSize: 14,
        flex: 1,
        marginRight: 8,
    },
    unreadBadge: {
        backgroundColor: '#0088CC',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadCount: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },

})