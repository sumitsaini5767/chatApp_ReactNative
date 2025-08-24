import { useState, useEffect, useCallback } from 'react';
import { getMyChats } from '../Redux/actions/userDetail';

export const useChats = (userId?: string) => {
    const [allUsers, setAllusers] = useState<any[]>([]);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchChats = useCallback(async () => {
        if (!userId || pageNo > totalPages) return;
        setIsLoading(true);

        const res = await getMyChats(`?userId=${userId}&pageNo=${pageNo}`);

        if (pageNo === 1) {
            setAllusers(res?.allChats?.chats ?? []);
            setTotalPages(res?.allChats?.totalPages);
        } else {
            setAllusers((prev) => [...prev, ...(res?.allChats?.chats ?? [])]);
        }

        setIsLoading(false);
        setRefreshing(false);
    }, [pageNo, userId, totalPages]);

    useEffect(() => {
        fetchChats();
    }, [pageNo, fetchChats]);

    const handleRefresh = () => {
        setRefreshing(true);
        setPageNo(1);
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
