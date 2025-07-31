export interface ChatMessage {
    _id?: number;
    user?: any;
    message?: string;
    timestamp?: string;
    unreadCount?: number;
}

export interface User {
    _id: number;
    image: any;
    name: string;
    isMyStatus?: boolean;
}