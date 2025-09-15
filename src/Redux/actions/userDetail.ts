import store from "../store";
import { emptyUserdetails, setUser } from "../reducers/userDetails";
import { getApi, postApi, putApi } from "../../utils/apiCall";
import { GET_MESSAGES, GET_CHATS, LOGIN_URL, SINGUP_URL, FIND_USER, SOCIAL_SIGNUP, LOGOUT, EDITPROFILE } from "../../Config/Urls";
import { AxiosRequestHeaders } from "axios";
import { deleteItem, getItem, setItem } from "../../localStorage/mmkv";
import { Platform } from "react-native";

export const setUserAction = (user: any) => {
    setItem('userData', JSON.stringify(user));
    store.dispatch(setUser(user));
}

export const signUp = async (data: any) => {
    const header = {
        Accept: 'application/json',
    };
    const newData = {
        ...data,
        deviceInfo: {
            deviceId: getItem('deviceId'),
            deviceType: Platform.OS,
            fcmToken: getItem('fcmToken'),
        }
    }
    const res = await postApi(SINGUP_URL, newData, header as AxiosRequestHeaders);
    setUserAction(res?.data);
    return res;
}

export const socialLogin = async (token: string) => {
    const header = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const newData = {
        deviceInfo: {
            deviceId: getItem('deviceId'),
            deviceType: Platform.OS,
            fcmToken: getItem('fcmToken'),
        }
    }
    const res = await postApi(SOCIAL_SIGNUP, newData, header as AxiosRequestHeaders);
    setUserAction(res?.data);
    return res;
}

export const login = async (data: any) => {
    const header = {
        Accept: 'application/json',
    };
    const newData = {
        ...data,
        deviceInfo: {
            deviceId: getItem('deviceId'),
            deviceType: Platform.OS,
            fcmToken: getItem('fcmToken'),
        }
    }
    const res = await postApi(LOGIN_URL, newData, header as AxiosRequestHeaders);
    setUserAction(res?.data);
    return res;
}

export const logout = async () => {
    const header = {
        Accept: 'application/json',
    };
    const res = await putApi(LOGOUT, {}, header as AxiosRequestHeaders);
    if (!!res) {
        deleteItem('userData');
        store.dispatch(emptyUserdetails());
        return res;
    }
    return;
}
export const getMyChats = async (params: string) => {
    const header = {
        Accept: 'application/json',
    };
    const res = await getApi(GET_CHATS + params, header as AxiosRequestHeaders);
    return res;
}

export const getMessages = async (data: any) => {
    const header = {
        Accept: 'application/json',
    };
    const res = await postApi(GET_MESSAGES, data, header as AxiosRequestHeaders);
    return res;
}
export const searchUser = async (data: any) => {
    const header = {
        Accept: 'application/json',
    };
    const res = await getApi(FIND_USER + data, header as AxiosRequestHeaders);
    return res;
}
export const editProfileApi = async (data: any) => {
    const header = {
        "Content-Type": "multipart/form-data",
    };
    const res = await postApi(EDITPROFILE, data, header as AxiosRequestHeaders);
    setUserAction(res?.data);
    return res;
}