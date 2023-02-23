import { legacy_createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk"
import { authReducer } from "./auth/reducer";


let rootReducer = combineReducers({ auth: authReducer })
const store = legacy_createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store