import { io, Socket } from 'socket.io-client';
let socket: Socket | null = null;
export const connectSocket = (url: string): Promise<Socket> => {
    return new Promise((resolve, reject) => {
        socket = io(url, {
            transports: ['websocket'],
            timeout: 10000,
        });
        socket.on('connect', () => {
            console.log('✅ Socket connected');
            resolve(socket!);
        });
        socket.on('connect_error', (err: Error) => {
            console.log('❌ Connection error:', err.message);
            reject(err);
        });
    });
};

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        console.log('🚪 Socket disconnected');
    }
};

export const joinRoom = (roomId: string, userId?: string): void => {
    if (socket) {
        socket.emit('join', { userId, roomId });
        console.log(`📥 Joined room: ${roomId}`);
    }
};
export const leaveRoom = (roomId: string, userId?: string): void => {
    if (socket) {
        socket.emit('leave_room', { userId, roomId });
        console.log(`📥 leave room: ${roomId}`);
    }
};

export const sendMessage = (data: any): void => {
    if (socket) {
        socket.emit('send_message', data);
    }
};
type MessageCallback = (data: { sender: string; message: string }) => void;

export const onMessageReceived = (callback: MessageCallback): void => {
    if (socket) {
        socket.on('receive_message', callback);
    }
};

export const offEvent = (eventName: string): void => {
    if (socket) {
        socket.off(eventName);
    }
};

type RecentChatCallback = (chats: any[]) => void;

export const onRecentChats = (callback: RecentChatCallback): void => {
    if (socket) {
        socket.on('recent_chats', callback);
    }
};