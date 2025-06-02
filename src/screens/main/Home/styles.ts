import { StyleSheet } from "react-native";
import { CommonColors } from "../../../styles/Colors";
import FontFamily from "../../../styles/FontFamily";
import { moderateScale, verticalScale } from "../../../styles/scaling";

export const styles = StyleSheet.create({
    upperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(12),
    },
    searchContainer: {
        width: moderateScale(40),
        height: moderateScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchImage: {
        width: moderateScale(24),
        height: moderateScale(24),
        tintColor: '#FFFFFF',
    },
    headline: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        color: '#FFFFFF',
    },
    userImage: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
    },
    statusSection: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(20),
        paddingVertical: verticalScale(12),
    },
    statusListContainer: {
        paddingHorizontal: moderateScale(16),
    },
    statusContainer: {
        alignItems: 'center',
        width: moderateScale(72),
    },
    statusImageContainer: {
        position: 'relative',
        marginBottom: verticalScale(4),
    },
    statusImage: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
        borderWidth: moderateScale(2),
        borderColor: '#0088CC',
    },
    addStatusButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: moderateScale(22),
        // height: moderateScale(20),
        borderRadius: moderateScale(30),
        backgroundColor: CommonColors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: moderateScale(2),
        borderColor: '#000000',
    },
    plusIcon: {
        textAlign:"center",
        color: CommonColors.black,
        fontSize: moderateScale(13),
        fontWeight: 'bold',
    },
    statusName: {
        color: '#FFFFFF',
        fontSize: moderateScale(12),
        textAlign: 'center',
    },
    chatSection: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: moderateScale(40),
        borderTopRightRadius: moderateScale(40),
        paddingTop: verticalScale(16),
    },
    chatListContainer: {
        paddingHorizontal: moderateScale(16),
    },
    chatItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatUserImage: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        marginRight: moderateScale(12),
    },
    chatContentContainer: {
        flex: 1,
        paddingBottom: verticalScale(16),
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(4),
    },
    chatUserName: {
        color: CommonColors.black,
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
    chatTimestamp: {
        color: '#888888',
        fontSize: moderateScale(12),
    },
    chatMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatMessage: {
        color: '#888888',
        fontSize: moderateScale(14),
        flex: 1,
        marginRight: moderateScale(8),
    },
    unreadBadge: {
        backgroundColor: '#0088CC',
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadCount: {
        color: '#FFFFFF',
        fontSize: moderateScale(12),
        fontWeight: '600',
    },
});