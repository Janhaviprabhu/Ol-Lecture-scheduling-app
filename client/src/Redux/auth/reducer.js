import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes"

const initState = {
    loading: false,
    iserror: false,
    isRegister: false,
    auth: false,
    user: "",
    login_token: null || localStorage.getItem('logToken'),
    register_token: !!localStorage.getItem('authToken') || ""
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

            // if (payload !== 'Try loggin in, User already exist') {
            //     localStorage.setItem('authToken', payload.accessToken)
            //     localStorage.setItem('email', payload.user.email)
            // }
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
            //    if (payload !== 'Invalid Credentials') {
            //         localStorage.setItem('logToken', payload.accessToken)
            //         localStorage.setItem('logUser', JSON.stringify(payload.user))
            //     }
            return {
                ...state,
                auth: true,
                user: payload,
                iserror: false,
                loading: false,
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
        default: {
            return state
        }
    }
}