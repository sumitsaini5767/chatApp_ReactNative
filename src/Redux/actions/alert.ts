import { emptyAlertState, setAlertValue } from "../reducers/alert"
import store from "../store"

export const setAlert = (data: any) => {
    store.dispatch(setAlertValue(data))
}
export const clearAlert = () => {
    store.dispatch(emptyAlertState());
}