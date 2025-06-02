import store from "../store";
import { setUser } from "../reducers/userDetails";

const setUserAction = (user: any) => {
    store.dispatch(setUser(user));
}

export default setUserAction;