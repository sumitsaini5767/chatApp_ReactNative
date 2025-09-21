import { use, useEffect, useRef, useState } from "react";
import { AppState, FlatList, Keyboard } from "react-native";
import { getMessages } from "../Redux/actions/userDetail";
import { markAsRead, sendMessage, stopTyping, typing } from "../utils/sockets";
import { dropDB, getMessagesByRoom, insertMessage } from "../Database/localDatabase";

interface Message {
    _id?: string;
    receiver: string;
    sender: string;
    message: string;
    timestamp?: string;
    isRead?: boolean;
    roomId?: string;
}

type RouteParams = {
    roomId: string;
    currentUser: any;
    targetUser: any;
};

type ViewableItem = { item: Message };

export const useChatMessages = ({ roomId, currentUser, targetUser }: RouteParams, appState?: string) => {
    const flatListRef = useRef<FlatList>(null);

    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [messageText, setMessageText] = useState("");
    const [isLoding, setIsLoding] = useState(false);

    const fetchUserMessages = async (localMessages?: any) => {
        try {
            localMessages?.length <= 0 && setIsLoding(true);
            const data = await getMessages({ roomId, page });
            localMessages?.length <= 0 && setIsLoding(false);
            if (page === 1) {
                setChatMessages(data?.messages.reverse() ?? []);
                setTotalPages(data?.totalPages ?? 1);
                (localMessages[localMessages.length - 1]?._id !== data?.messages[data?.messages.length - 1]?._id) &&
                    data?.messages.map((m: Message) => insertMessage(m as any));
                // dropDB();
                scrollToEnd();
            } else {
                setChatMessages((prev: Message[]) => [
                    ...(data?.messages?.reverse() ?? []),
                    ...prev,
                ]);
            }
        } catch (e) {
            console.warn("getMessages failed:", e);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const loadMoreMessages = () => {
        if (!isLoadingMore && page < totalPages) {
            setIsLoadingMore(true);
            setPage((prev) => prev + 1);
        }
    };

    const scrollToEnd = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    const handleMessageSeen = (messageId: string) => {
        if (messageId) markAsRead(roomId, currentUser?._id, messageId);
    };

    const handleSend = () => {
        const trimmed = messageText.trim();
        if (!trimmed) return;

        const messageData: Message = {
            receiver: targetUser?._id,
            sender: currentUser?._id,
            message: trimmed,
            timestamp: new Date().toISOString(),
        };

        sendMessage(messageData);
        setMessageText("");
        scrollToEnd();
    };

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewableItem[] }) => {
            for (const v of viewableItems) {
                const m = v.item;
                if (!m.isRead && m.receiver === currentUser?._id && m._id) {
                    handleMessageSeen(m._id);
                }
            }
        }
    ).current;

    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

    useEffect(() => {
        (async () => {
            let localMessages: any[] = [];
            if (page == 1) {
                localMessages = await getMessagesByRoom(roomId);
                localMessages.length > 0 && setChatMessages(localMessages as Message[]);
            }
            if (appState == 'active') {
                fetchUserMessages(localMessages);
            }
        })()
    }, [page, appState]);

    useEffect(() => {
        const show = Keyboard.addListener("keyboardDidShow", (e) => {
            setIsKeyboardVisible(true);
            setKeyboardHeight(e.endCoordinates.height);
            scrollToEnd();
            typing(roomId, currentUser?._id);
        });

        const hide = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
            setKeyboardHeight(0);
            stopTyping(roomId, currentUser?._id);
        });

        return () => {
            show.remove();
            hide.remove();
        };
    }, [currentUser?._id, roomId]);

    return {
        chatMessages,
        totalPages,
        isLoadingMore,
        isKeyboardVisible,
        keyboardHeight,
        currentUser,
        targetUser,
        messageText,
        viewabilityConfig,
        flatListRef,
        isLoding,
        loadMoreMessages,
        handleMessageSeen,
        scrollToEnd,
        handleSend,
        setMessageText,
        onViewableItemsChanged,
        setChatMessages,
    };
};
