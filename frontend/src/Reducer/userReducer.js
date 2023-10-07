import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS , CLEAR_ERROR } from "../Constants/userConstants";



export const userReducer = (state = { user: {}, token: '' }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuth: false,
                
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: action.payload.user,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state

    }
}