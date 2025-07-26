import { combineReducers } from "redux";
import userDetail from "./reducers/userDetails";
import alert from './reducers/alert'
const rootReducer = combineReducers({ userDetail, alert });
export default rootReducer;