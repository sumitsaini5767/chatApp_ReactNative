import {
    launchCamera,
    launchImageLibrary,
    Asset,
    ImageLibraryOptions,
    CameraOptions,
} from 'react-native-image-picker';
import { requestCameraPermission } from './userPermission';

const pickerOptions: ImageLibraryOptions & CameraOptions = {
    mediaType: 'photo',
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.8,
};

export const openCamera = async (): Promise<Asset> => {
    const granted = await requestCameraPermission();
    if (!granted) {
        throw new Error('Camera permission denied');
    }

    return new Promise((resolve, reject) => {
        launchCamera(pickerOptions, (response) => {
            if (response.didCancel) {
                reject('User cancelled camera');
            } else if (response.errorCode) {
                reject(response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                resolve(response.assets[0]);
            } else {
                reject('No image captured');
            }
        });
    });
};

export const openGallery = async (): Promise<Asset> => {
    return new Promise((resolve, reject) => {
        launchImageLibrary(pickerOptions, (response) => {
            if (response.didCancel) {
                reject('User cancelled gallery');
            } else if (response.errorCode) {
                reject(response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                resolve(response.assets[0]);
            } else {
                reject('No image selected');
            }
        });
    });
};
