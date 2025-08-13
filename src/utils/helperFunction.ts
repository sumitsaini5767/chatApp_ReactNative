import {
    getToken,
    getMessaging,
    requestPermission,
    AuthorizationStatus
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';
import { getItem, setItem } from '../localStorage/mmkv';
import { setUserAction } from '../Redux/actions/userDetail';
const messaging = getMessaging(getApp());

export const resetAllDataToRedux = () => {
    if (getItem('userData')) {
        setUserAction(JSON.parse(getItem('userData') || '{}'));
    }
}

export const DateTimeConversion = (date: string) => {
    let newDate = date ? new Date(date) : new Date();
    let formatted = newDate.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // to get IST time
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    return formatted;
}

export const debounce = <T extends (...args: any[]) => void>(func: T, delay = 300):
    ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};