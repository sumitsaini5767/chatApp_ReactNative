import { useEffect, useRef, useState, useCallback } from "react";
import { FlatList, Keyboard, } from "react-native";
import { getMessages } from "../Redux/actions/userDetail";
import { markAsRead, sendMessage, stopTyping, typing } from "../utils/sockets";
import { getMessagesByRoom, insertMessage, updateMessage } from "../Database/localDatabase";

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

    // Separate function to handle message comparison and database updates
    const syncMessagesWithLocalDB = async (incomingMessages: Message[], localMessages: any[], roomId: string) => {
        if (!incomingMessages || !Array.isArray(incomingMessages)) return;

        // Create a map of local messages by _id for quick lookup
        const localMessagesMap = new Map(
            localMessages.map((m: any) => [m._id, m])
        );

        for (const incomingMessage of incomingMessages) {
            if (!incomingMessage._id) continue;

            const localMessage = localMessagesMap.get(incomingMessage._id);

            if (!localMessage) {
                // New message - insert it
                insertMessage({ ...incomingMessage, roomId } as any);
            } else {
                // Message exists - only check isRead status (main field that changes)
                const incomingIsRead = incomingMessage.isRead ?? false;
                const localIsRead = localMessage.isRead ?? false;

                if (incomingIsRead !== localIsRead) {
                    // Only update if isRead status has changed
                    await updateMessage(incomingMessage._id, { isRead: incomingIsRead });
                    console.log(`Updated message ${incomingMessage._id} isRead status:`, incomingIsRead);
                }
            }
        }
    };

    const fetchUserMessages = useCallback(async (localMessages: any[] = [], currentPage: number) => {
        try {
            // Only show loading if no local messages and not loading more
            localMessages?.length <= 0 && currentPage === 1 && setIsLoding(true);
            const data = await getMessages({ roomId, page: currentPage });
            console.log(currentPage,"data==>",data,localMessages);
            localMessages?.length <= 0 && currentPage === 1 && setIsLoding(false);
            if (currentPage === 1) {
                setChatMessages(data?.messages ?? []);
                setTotalPages(data?.totalPages ?? 1);
                // Sync messages with local DB
                await syncMessagesWithLocalDB(data?.messages ?? [], localMessages, roomId);
            } else {
                setChatMessages((prev: Message[]) => [
                    ...prev,
                    ...(data?.messages ?? []),
                ]);
            }
        } catch (e) {
            console.warn("getMessages failed:", e);
            if (localMessages.length === 0 && currentPage === 1) {
                setIsLoding(false);
            }
        } finally {
            setIsLoadingMore(false);
        }
    }, [roomId]);

    const loadMoreMessages = () => {
        if (!isLoadingMore && page < totalPages) {
            setIsLoadingMore(true);
            setPage((prev) => prev + 1);
        }
    };

    const handleMessageSeen = useCallback((messageId: string) => {
        if (messageId) markAsRead(roomId, currentUser?._id, messageId);
    }, [roomId, currentUser?._id]);

    const handleSend = () => {
        const trimmed = messageText.trim();
        if (!trimmed) return;

        const messageData: Message = {
            receiver: targetUser?._id,
            sender: currentUser?._id,
            message: trimmed,
            timestamp: new Date().toISOString(),
            roomId: roomId,
        };

        sendMessage(messageData);
        setMessageText("");
    };

    // Use refs to store latest values to avoid stale closures
    const handleMessageSeenRef = useRef(handleMessageSeen);
    const currentUserIdRef = useRef(currentUser?._id);

    useEffect(() => {
        handleMessageSeenRef.current = handleMessageSeen;
        currentUserIdRef.current = currentUser?._id;
    }, [handleMessageSeen, currentUser?._id]);

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewableItem[] }) => {
            for (const v of viewableItems) {
                const m = v.item;
                if (!m.isRead && m.receiver === currentUserIdRef.current && m._id) {
                    handleMessageSeenRef.current(m._id);
                }
            }
        }
    ).current;

    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

    // Effect for initial load (page === 1)
    useEffect(() => {
        (async () => {
            let localMessages: any[] = [];
            if (page === 1) {
                localMessages = await getMessagesByRoom(roomId);
                console.log('localMessages==>', localMessages);
                if (localMessages.length > 0) {
                    setChatMessages(localMessages.reverse() as Message[]);
                }
            }
            if (appState === 'active' && page === 1) {
                fetchUserMessages(localMessages, 1);
            }
        })()
    }, [appState, roomId]);

    // Separate effect for pagination (page > 1)
    useEffect(() => {
        if (page > 1 && isLoadingMore && appState === 'active') {
            fetchUserMessages([], page);
        }
    }, [page, isLoadingMore, appState, fetchUserMessages]);

    useEffect(() => {
        const show = Keyboard.addListener("keyboardDidShow", (e) => {
            setIsKeyboardVisible(true);
            setKeyboardHeight(e.endCoordinates.height);
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
        handleSend,
        setMessageText,
        onViewableItemsChanged,
        setChatMessages,
    };
};
