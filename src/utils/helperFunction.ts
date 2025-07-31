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