const ApiUrl = 'http://10.0.2.2:3000';
// const ApiUrl = 'http://192.168.204.156:3000 ';
// const ApiUrl = 'https://19a685db4885.ngrok-free.app';

const getFullUrl = (url: string) => {
    return `${ApiUrl}${url}`;
}
export const SINGUP_URL = getFullUrl('/auth/signup');
export const LOGIN_URL = getFullUrl('/auth/login');
export const GET_CHATS = getFullUrl('/auth/myChats');
export const GET_MESSAGES = getFullUrl('/message/getMessage');