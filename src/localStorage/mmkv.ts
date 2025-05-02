import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Helper functions
export const setItem = (key: string, value: string) => {
    storage.set(key, value);
};

export const getItem = (key: string): string | undefined => {
    return storage.getString(key);
};

export const deleteItem = (key: string) => {
    storage.delete(key);
};

export const clearAll = () => {
    storage.clearAll();
};


//language specific funtions
export const getLanguage = (): string => {
    return storage.getString('user-language') || 'en';
};

export const setLanguage = (lang: string) => {
    storage.set('user-language', lang);
};