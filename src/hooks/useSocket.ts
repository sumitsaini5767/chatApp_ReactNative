import { useEffect, useState } from 'react';
import {
    activeUsers,
    joinRoom,
    leaveRoom,
    messageReadStatus,
    offEvent,
    onMessageReceived,
    onRecentChats,
    typingStatus
} from '../utils/sockets';

type RouteParams = {
    roomId: string;
    currentUser: any;
    targetUser: any;
};

interface Message {
    _id?: string;
    receiver: string;
    sender: string;
    message: string;
    timestamp?: string;
    isRead?: boolean
}

export const useSocket = (userId?: string, onChatsUpdate?: (chats: any[]) => void) => {
    useEffect(() => {
        if (!userId) return;

        joinRoom(`${userId}`);

        if (onChatsUpdate) {
            onRecentChats((data: any) => {
                onChatsUpdate(data?.chats);
            });
        }

        return () => {
            leaveRoom(`${userId}`);
            offEvent('recent_chats');
        };
    }, [userId, onChatsUpdate]);
};

export const useChatMessageSocket = (
    route: any,
    currentAppState: any,
    setChatMessages: (prev: any) => void,
    scrollToEnd: () => void,
    handleMessageSeen: (messageId: string) => void
) => {
    const { roomId, currentUser, targetUser } = route as RouteParams;
    const [roomActiveUsers, setroomActiveUsers] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (currentAppState != "active") {
            leaveRoom(roomId, currentUser?._id);
        }else {
            joinRoom(roomId);
        }
    }, [currentAppState])

    useEffect(() => {
        activeUsers((data: any) => {
            setroomActiveUsers(data);
        })
        onMessageReceived((data: any) => {
            setChatMessages((prev: Message[]) => [...prev, data]);
            scrollToEnd();
            if (!data?.isRead && data?.receiver === currentUser?._id) {
                handleMessageSeen(data._id);
            }
        });
        typingStatus((data: any) => {
            if (data?.userId === targetUser?._id) {
                setIsTyping(data?.isTyping);
            }
        })
        messageReadStatus((data: any) => {
            setChatMessages((prev: Message[]) =>
                prev.map((msg) =>
                    msg._id === data.messageId
                        ? { ...msg, isRead: data.isRead }
                        : msg
                )
            );
        });
        return () => {
            offEvent('receive_message');
            offEvent('active_user');
            offEvent('typing_status');
            offEvent('read_update');
            leaveRoom(roomId, currentUser?._id);
        };
    }, []);

    return {
        roomActiveUsers,
        isTyping,
    }
}