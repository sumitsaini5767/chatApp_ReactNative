import { combineReducers } from "redux";
import userDetail from "./reducers/userDetails";
const rootReducer = combineReducers({ userDetail });
export default rootReducer;