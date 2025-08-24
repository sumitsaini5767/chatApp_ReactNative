import { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard } from "react-native";
import { getMessages } from "../Redux/actions/userDetail";
import { markAsRead, sendMessage, stopTyping, typing } from "../utils/sockets";

interface Message {
    _id?: string;
    receiver: string;
    sender: string;
    message: string;
    timestamp?: string;
    isRead?: boolean;
}

type RouteParams = {
    roomId: string;
    currentUser: any;
    targetUser: any;
};

type ViewableItem = { item: Message };

export const useChatMessages = ({ roomId, currentUser, targetUser }: RouteParams) => {
    const flatListRef = useRef<FlatList>(null);

    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [messageText, setMessageText] = useState("");

    const fetchUserMessages = async () => {
        try {
            const data = await getMessages({ roomId, page });

            if (page === 1) {
                setChatMessages(data?.messages?.reverse() ?? []);
                setTotalPages(data?.totalPages ?? 1);
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

    useEffect(() => {
        fetchUserMessages();
    }, [page]);

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
        loadMoreMessages,
        handleMessageSeen,
        scrollToEnd,
        handleSend,
        setMessageText,
        onViewableItemsChanged,
        setChatMessages,
    };
};
