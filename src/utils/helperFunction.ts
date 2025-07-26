import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { getItem, setItem } from '../localStorage/mmkv';
import { setUserAction } from '../Redux/actions/userDetail';

export const getFcmToken = async () => {
    if (!getItem('fcmToken')) {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        try {
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
        } catch (error) {
            console.log(error, "error==>");
        }
    }else{
        console.log("fcmToken",getItem('fcmToken'));
    }
};

export const resetAllDataToRedux = () => {
    if (getItem('userData')) {
        setUserAction(JSON.parse(getItem('userData') || '{}'));
    }
}