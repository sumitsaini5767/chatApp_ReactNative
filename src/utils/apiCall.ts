import axios, { AxiosRequestHeaders } from "axios";
import { showError, showSuccess } from "./helperFunction";
import { getItem } from "../localStorage/mmkv";
import { AxiosRequestConfig } from 'axios';

const getAuthToken = (): string => {
    try {
        const userData = getItem('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            return parsedData.token || '';
        }
    } catch (error) {
        console.warn('Error parsing token:', error);
    }
    return '';
};

const handleError = (error: unknown, url: string) => {
    if (axios.isAxiosError(error) && error.response) {
        console.log(`${url} failed:`, error.response.status, error.response.data, "apierror=>");
        showError(error.response.data.message);
        return {
            error: true,
            status: error.response.status,
            data: error.response.data,
            message: error.message,
        };
    } else if (error instanceof Error) {
        console.log(`${url} failed:`, error.message, "apierror=>");
        showError(error.message);
        return { error: true, message: error.message };
    } else {
        console.log(`${url} failed:`, error, "apierror=>");
        showError("Unknown error")
        return { error: true, message: "Unknown error" };
    }
}

export const getApi = async (
    url: string,
    headers: AxiosRequestHeaders | undefined,
): Promise<any> => {
    try {
        console.log(url, "url++++");
        const token = getAuthToken();
        const finalHeaders: AxiosRequestConfig['headers'] = {
            'Content-Type': 'application/json',
            ...(headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
        console.log("header++++", finalHeaders);
        const res = await axios.get(url, { headers: finalHeaders });
        return res.data;
    } catch (error: unknown) {
        return handleError(error, url);
    }
}

export const postApi = async (
    url: string,
    data: any,
    headers: AxiosRequestHeaders | undefined,
): Promise<any> => {
    try {
        console.log(url, "url++++");
        console.log("data++++", data);
        const token = getAuthToken();
        const finalHeaders: AxiosRequestConfig['headers'] = {
            'Content-Type': 'application/json',
            ...(headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
        console.log("header++++", finalHeaders);
        const res = await axios.post(url, data, { headers: finalHeaders });
        showSuccess(res.data.message);
        return res.data;
    } catch (error: unknown) {
        return handleError(error, url);
    }
}



