import { combineReducers } from "redux";
import {UserReducer} from './functions';
import { userReducerSignOut } from "./functions";
const root=combineReducers({
    UserReducer,userReducerSignOut
});

export default root;