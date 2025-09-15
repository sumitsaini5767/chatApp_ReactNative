import { PermissionsAndroid, Platform } from 'react-native';
import notifee, { AuthorizationStatus } from '@notifee/react-native';

export const requestNotificationPermission = async () => {
    try {
        const settings = await notifee.requestPermission();
        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            console.log('✅ Notification permission granted');
        } else {
            console.log('❌ Notification permission denied');
        }
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            console.log('🔒 Android 13+ permission status:', settings.authorizationStatus);
        }
        if (Platform.OS === 'ios') {
            console.log('📱 iOS permission status:', settings.authorizationStatus);
        }
    } catch (error) {
        console.error('⚠️ Error requesting notification permission:', error);
    }
};
// ✅ Request Camera Permission (only Android)
export async function requestCameraPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs access to your camera to take profile photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true; // iOS auto handles
}
