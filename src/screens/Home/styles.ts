import { StyleSheet } from "react-native";
import { CommonColors } from "../../styles/Colors";
import FontFamily from "../../styles/FontFamily";

export const styles = StyleSheet.create({
    upperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchImage: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    headline: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    statusSection: {
        marginTop: 10,
        marginBottom: 20,
        paddingVertical: 12,
    },
    statusListContainer: {
        paddingHorizontal: 16,
    },
    statusContainer: {
        alignItems: 'center',
        width: 72,
    },
    statusImageContainer: {
        position: 'relative',
        marginBottom: 4,
    },
    statusImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#0088CC',
    },
    addStatusButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0088CC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000000',
    },
    plusIcon: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusName: {
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
    },
    chatSection: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 16,
    },
    chatListContainer: {
        paddingHorizontal: 16,
    },
    chatItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatUserImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
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
});