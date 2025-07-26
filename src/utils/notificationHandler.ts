import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Alert } from 'react-native';
export const forgroundHandler = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        messaging().onMessage(async remoteMessage => {
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
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        // console.log('Message handled in the background!', remoteMessage);
    });
}
export const OnClickNotif = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        // console.log('Notification caused app to open from background:', remoteMessage.notification);
    });
    messaging().getInitialNotification().then(remoteMessage => {
        if (remoteMessage) {
            // console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
    });
}