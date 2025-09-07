
import { getItem } from '../localStorage/mmkv';
import { setUserAction } from '../Redux/actions/userDetail';
import { clearAlert, setAlert } from '../Redux/actions/alert';

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
    if(formatted == 'Invalid Date') return false;
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

export const showSuccess = (message: string) => {
    setAlert({ text: message, isSuccess: true });
    setTimeout(() => {
        clearAlert();
    }, 1000)
}
export const showError = (message: string) => {
    setAlert({ text: message, isSuccess: false });
    setTimeout(() => {
        clearAlert();
    }, 1000)
}