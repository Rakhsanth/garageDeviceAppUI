// react related
import { combineReducers } from 'redux';
// action types
import {
    RESET_LOADING,
    REGISTER_USER,
    LOGIN_USER,
    LOAD_USER,
    LOGOUT,
    LOGIN_SIGNUP_ERROR,
    SET_ALERT,
    REMOVE_ALERT,
    GET_DEVICES,
    DEVICES_ERROR,
} from '../actions/actionTypes';

const initialLoginStatus = {
    loading: true,
    loggedIn: false,
    token: null,
    user: null,
    error: false,
};
// reducer to register a user
const userLoginRegisterReducer = (state = initialLoginStatus, action) => {
    const { type, payload } = action;
    switch (type) {
        case RESET_LOADING:
            if (payload === 'auth') {
                return { ...state, loading: true };
            } else {
                return state;
            }
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                loading: false,
                // loggedIn: true,
                token: payload.token,
            };
        case LOAD_USER:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                user: payload,
            };
        case LOGIN_SIGNUP_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                loggedIn: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

// Devices reducer
const initialDevicesState = {
    loading: true,
    devices: [],
    prev: null,
    next: null,
    count: 0,
    error: false,
};
const devicesReducer = (state = initialDevicesState, action) => {
    const { type, payload } = action;
    switch (type) {
        case RESET_LOADING:
            if (payload === 'auth') {
                return { ...state, loading: true };
            } else {
                return state;
            }
        case GET_DEVICES:
            return {
                ...state,
                loading: false,
                devices: payload.data,
                count: payload.count,
                prev: payload.pagination.prev,
                next: payload.pagination.next,
            };
        case DEVICES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                devices: [],
                count: 0,
                prev: null,
                next: null,
            };
        default:
            return state;
    }
};

// Alert reducer
const initialAlertState = {
    alerts: [],
};
const alertReducer = (state = initialAlertState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT:
            return { ...state, alerts: [...state.alerts, payload] };
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(
                    ({ color, message }) => message !== payload.message
                ),
            };
        default:
            return state;
    }
};

export default combineReducers({
    auth: userLoginRegisterReducer,
    devices: devicesReducer,
    alert: alertReducer,
});
