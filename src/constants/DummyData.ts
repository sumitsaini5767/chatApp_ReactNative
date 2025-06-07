import { User, ChatMessage } from "./Allinterface";
import imagepath from "./imagepath";

export const statusList: User[] = [
    {
        id: 1,
        image: imagepath.user,
        name: 'My status',
        isMyStatus: true,
    },
    {
        id: 2,
        image: imagepath.user,
        name: 'Adil',
    },
    {
        id: 3,
        image: imagepath.user,
        name: 'Marina',
    },
    {
        id: 4,
        image: imagepath.user,
        name: 'Dean',
    },
    {
        id: 5,
        image: imagepath.user,
        name: 'Max',
    },
];
export const chatMessages: ChatMessage[] = [
    {
        id: 1,
        user: {
            id: 1,
            image: imagepath.user,
            name: 'Alex Linderson',
        },
        message: 'How are you today?',
        timestamp: '2 min ago',
        unreadCount: 3,
    },
    {
        id: 2,
        user: {
            id: 2,
            image: imagepath.user,
            name: 'Team Align',
        },
        message: "Don't miss to attend the meeting.",
        timestamp: '2 min ago',
        unreadCount: 4,
    },
    {
        id: 3,
        user: {
            id: 3,
            image: imagepath.user,
            name: 'John Ahraham',
        },
        message: 'Hey! Can you join the meeting?',
        timestamp: '2 min ago',
        unreadCount: 1,
    },
    {
        id: 4,
        user: {
            id: 4,
            image: imagepath.user,
            name: 'Sabila Sayma',
        },
        message: 'How are you today?',
        timestamp: '2 min ago',
    },
    {
        id: 5,
        user: {
            id: 5,
            image: imagepath.user,
            name: 'John Borino',
        },
        message: 'Have a good day ❤️',
        timestamp: '2 min ago',
    },
];