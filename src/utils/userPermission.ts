import { Platform } from 'react-native';
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