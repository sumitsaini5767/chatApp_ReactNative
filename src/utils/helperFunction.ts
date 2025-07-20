import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { clearAll, getItem, setItem } from '../localStorage/mmkv';
import store from '../Redux/store';
import { setUser } from '../Redux/reducers/userDetails';

export const getFcmToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        const token = await messaging().getToken();
        const deviceId = await DeviceInfo.getUniqueId();
        console.log("FCM Token:", token, " Device ID:", deviceId);
        setItem('fcmToken', token);
        setItem('deviceId', deviceId);
        return;
    } else {
        console.log("FCM permission not granted");
        return null;
    }
};

export const resetAllDataToRedux = () => {
    if (getItem('userData')) {
        store.dispatch(setUser(JSON.parse(getItem('userData') || '{}')));
    }
}