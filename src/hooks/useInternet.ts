import { useEffect, useState } from "react";
import axios from "axios";

export const useInternet = (intervalMs: number = 5000) => {
    const [isOnline, setIsOnline] = useState(true);

    const checkConnection = async () => {
        try {
            await axios.head("https://www.google.com", { timeout: 4000 });
            setIsOnline(true);
        } catch {
            setIsOnline(false);
        }
    };

    useEffect(() => {
        checkConnection();
        const interval = setInterval(checkConnection, intervalMs);
        return () => clearInterval(interval);
    }, [intervalMs]);

    return isOnline;
};