import {
    getMessaging,
    onMessage,
    setBackgroundMessageHandler,
    onNotificationOpenedApp,
    getInitialNotification,
    AuthorizationStatus,
    getToken,
    requestPermission
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { getItem, setItem } from '../localStorage/mmkv';
import DeviceInfo from 'react-native-device-info';
const messaging = getMessaging(getApp());

export const getFcmToken = async () => {
    if (!getItem('fcmToken')) {
        const authStatus = await requestPermission(messaging);
        const enabled =
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL;
        try {
            if (enabled) {
                const token = await getToken(messaging);
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
    } else {
        console.log("fcmToken", getItem('fcmToken'));
    }
};
export const forgroundHandler = async () => {
    try {
        onMessage(messaging, async remoteMessage => {
            console.log("remote Message", remoteMessage);
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                sound: remoteMessage.notification?.android?.sound || 'customnotii',
                importance: AndroidImportance.HIGH,
            });
            await notifee.displayNotification({
                title: remoteMessage.notification?.title ?? 'Notification',
                body: remoteMessage.notification?.body ?? '',
                android: {
                    channelId: channelId,
                    smallIcon: 'ic_launcher',
                    pressAction: {
                        id: 'default',
                    },
                },
            });
        });
    } catch (error) {
        console.log(error, "error in forgroundhandler");
    }
}
export const backgroundhandler = () => {
    setBackgroundMessageHandler(messaging, async remoteMessage => {
        // console.log('Message handled in the background!', remoteMessage);
    });
}
export const OnClickNotif = () => {
    onNotificationOpenedApp(messaging, remoteMessage => {
        // console.log('Notification caused app to open from background:', remoteMessage.notification);
    });
    getInitialNotification(messaging).then(remoteMessage => {
        if (remoteMessage) {
            // console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
    });
}