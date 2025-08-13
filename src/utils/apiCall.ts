import axios, { AxiosRequestHeaders } from "axios";
import { setAlert ,clearAlert} from "../Redux/actions/alert";

const handleError = (error: unknown, url: string) => {
    if (axios.isAxiosError(error) && error.response) {
        console.log(`${url} failed:`, error.response.status, error.response.data, "apierror=>");
        setAlert({ text: error.response.data.message, isSuccess: false });
        setTimeout(() => {
            clearAlert();
        }, 900)
        return {
            error: true,
            status: error.response.status,
            data: error.response.data,
            message: error.message,
        };
    } else if (error instanceof Error) {
        console.log(`${url} failed:`, error.message, "apierror=>");
        setAlert({ text: error.message, isSuccess: false });
        setTimeout(() => {
            clearAlert();
        }, 900)
        return { error: true, message: error.message };
    } else {
        console.log(`${url} failed:`, error, "apierror=>");
        setAlert({ text: "Unknown error", isSuccess: false });
        setTimeout(() => {
            clearAlert();
        }, 900)
        return { error: true, message: "Unknown error" };
    }
}

export const getApi = async (
    url: string,
    headers: any,
): Promise<any> => {
    try {
        console.log(url, "url++++");
        const res = await axios.get(url, { headers });
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
        console.log(url, "url++++",data);
        const res = await axios.post(url, data, { headers });
        setAlert({ text: res.data.message, isSuccess: true });
        setTimeout(() => {
            clearAlert();
        }, 3000)
        return res.data;
    } catch (error: unknown) {
        return handleError(error, url);
    }
}



