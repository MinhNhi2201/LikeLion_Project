import {
    LOGIN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,

} from "../constants/auth";

const token = localStorage.getItem("accessToken");

const initState = {
    isLoading: false,
    accessToken: token ?? "",
    userId: "",
    err: false,
};
export default function authReducer(state = initState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accessToken: action.payload.accessToken,
                userId: action.payload.userId,
                err: false,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                accessToken: action.payload,
                userId: "",
                err: true,
            };

        default:
            return state;
    }
}
