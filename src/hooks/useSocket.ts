import { useEffect, useRef, useState } from 'react';
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
import { insertMessage, updateConversationOnNewMessage, updateMessage } from '../Database/localDatabase';
import { useInternet } from './useInternet';
import Sound from "react-native-sound";

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
    const isOnline = useInternet(4000);
    useEffect(() => {
        if (isOnline && userId) {
            joinRoom(`${userId}`);

            if (onChatsUpdate) {
                onRecentChats((data: any) => {
                    onChatsUpdate(data?.chats);
                    data?.chats?.map((message: any) => updateConversationOnNewMessage(message));
                });
            }
        }
        return () => {
            if (userId) {
                leaveRoom(`${userId}`);
                offEvent('recent_chats');
            }
        };
    }, [userId, onChatsUpdate, isOnline]);
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
    const messageSound = useRef<Sound | null>(null);

    useEffect(() => {
        messageSound.current = new Sound('message.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) console.log('Failed to load sound', error);
        });
        return () => {
            messageSound.current?.release();
        };
    }, []);


    const playMessageSound = () => {
        messageSound.current?.stop(() => {
            messageSound.current?.play();
        });
    };

    useEffect(() => {
        if (currentAppState != "active") {
            leaveRoom(roomId, currentUser?._id);
        } else {
            joinRoom(roomId);
        }
    }, [currentAppState])

    useEffect(() => {
        activeUsers((data: any) => {
            setroomActiveUsers(data);
        })
        onMessageReceived((data: any) => {
            setChatMessages((prev: Message[]) => [...prev, data]);
            insertMessage(data as any);
            if (currentAppState === "active" && data?.sender !== currentUser?._id) {
                playMessageSound();
            }
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
            updateMessage(data.messageId, { isRead: data.isRead })
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