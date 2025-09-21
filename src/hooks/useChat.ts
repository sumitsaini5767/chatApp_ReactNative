import { useState, useEffect, useCallback } from 'react';
import { getMyChats } from '../Redux/actions/userDetail';
import { addConversationToDb, dropDB, getConversations } from '../Database/localDatabase';
import { useInternet } from './useInternet';

export const useChats = (userId?: string, appState?: string) => {
    const isOnline = useInternet(4000);
    const [allUsers, setAllusers] = useState<any[]>([]);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchChats = useCallback(async (reset?: boolean, localConversation: any[] = []) => {
        try {
            if (!userId || pageNo > totalPages) return;
            localConversation?.length <= 0 && setIsLoading(true);
            const res = await getMyChats(`?userId=${userId}&pageNo=${pageNo}`);
            const conversations = res?.allChats?.chats ?? [];
            if (pageNo === 1 || reset) {
                setAllusers(conversations);
                setTotalPages(res?.allChats?.totalPages);
            } else {
                setAllusers((prev) => [...prev, ...conversations]);
            }
            localConversation?.length <= 0 && setIsLoading(false);
            setRefreshing(false);
            localConversation[localConversation.length - 1]?._id !== conversations[conversations.length - 1]?._id
                && conversations?.map((con: any) => addConversationToDb(con))
        } catch (error) {
            console.log(error,"error==>");
        }
    }, [pageNo, userId, totalPages]);

    useEffect(() => {
        (async () => {
            let localConversation = [];
            if (pageNo == 1) {
                localConversation = await getConversations();
                localConversation.length > 0 && setAllusers(localConversation);
            }
            if (appState === "active" && isOnline) {
                fetchChats(false, localConversation);
            }
        })()
    }, [pageNo, appState, isOnline]);

    const handleRefresh = () => {
        setRefreshing(true);
        setPageNo(1);
        fetchChats(true);
    };

    const loadMoreChats = () => {
        if (pageNo < totalPages && !isLoading) {
            setPageNo((prev) => prev + 1);
        }
    };

    return {
        allUsers,
        isLoading,
        refreshing,
        handleRefresh,
        loadMoreChats,
        setAllusers,
    };
};
