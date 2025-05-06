export interface ChatMessage {
    id?: number;
    user: User;
    message: string;
    timestamp: string;
    unreadCount?: number;
}

export interface User {
    id: number;
    image: any;
    name: string;
    isMyStatus?: boolean;
}