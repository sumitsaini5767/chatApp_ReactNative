const ApiUrl = 'http://10.0.2.2:3000';

const getFullUrl = (url: string) => {
    return `${ApiUrl}${url}`;
}
export const SINGUP_URL = getFullUrl('/auth/signup');
export const LOGIN_URL = getFullUrl('/auth/login');
export const GET_USERS = getFullUrl('/auth/allusers');
export const GET_MESSAGES = getFullUrl('/message/getMessage');