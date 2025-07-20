import store from "../store";
import { emptyUserdetails, setUser } from "../reducers/userDetails";
import { postApi } from "../../utils/apiCall";
import { LOGIN_URL, SINGUP_URL } from "../../Config/Urls";
import { AxiosRequestHeaders } from "axios";
import { deleteItem, getItem, setItem } from "../../localStorage/mmkv";
import { Platform } from "react-native";

export const setUserAction = (user: any) => {
    setItem('userData', JSON.stringify(user));
    store.dispatch(setUser(user));
}

export const signUp = (data: any) => {
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
    const res = postApi(SINGUP_URL, newData, header as AxiosRequestHeaders);
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

export const logout = () => {
    deleteItem('userData');
    store.dispatch(emptyUserdetails());
}