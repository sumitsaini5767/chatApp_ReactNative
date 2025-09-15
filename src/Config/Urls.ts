export const ApiUrl = 'http://10.0.2.2:5055';
// export const ApiUrl = 'https://backend-chatapp-285c.onrender.com';
// export const ApiUrl = 'https://backend-chatapp-1-f2fy.onrender.com';
// const ApiUrl = 'http://192.168.204.156:3000 ';
// const ApiUrl = 'https://19a685db4885.ngrok-free.app';

const getFullUrl = (url: string) => {
    return `${ApiUrl}${url}`;
}
export const SINGUP_URL = getFullUrl('/auth/signup');
export const LOGIN_URL = getFullUrl('/auth/login');
export const SOCIAL_SIGNUP = getFullUrl('/auth/socialSignup');
export const GET_CHATS = getFullUrl('/message/myChats');
export const GET_MESSAGES = getFullUrl('/message/getMessage');
export const FIND_USER = getFullUrl('/message/findUser');
export const LOGOUT = getFullUrl('/auth/logout');
export const EDITPROFILE = getFullUrl('/auth/edituser');