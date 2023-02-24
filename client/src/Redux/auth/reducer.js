import { LOGIN_ADMIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes"

const initState = {
    loading: false,
    iserror: false,
    isRegister: false,
    auth: false,
    user: "",
    admin:false,
    admindata:{}
}

export const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                loading: true

            }
        }
        case REGISTER_SUCCESS: {

            return {
                ...state,
                isRegister: true,
                iserror: false,
                loading: false,
                register_token: payload.accessToken
            };

        }
        case REGISTER_ERROR: {
            return {
                ...state,
                isRegister: false,
                iserror: true,
                loading: false,
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                error: true,
                loading: false,
            }

        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                auth: true,
                user: payload,
                iserror: false,
                loading: false,

            };

        }
        case LOGIN_ADMIN_SUCCESS: {
            return {
                ...state,
               admin:true,
               auth:true
            };

        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                auth: false,
                iserror: false,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                auth: false,
                admin:false,
                user: "",
            };

        }
        default: {
            return state
        }
    }
}