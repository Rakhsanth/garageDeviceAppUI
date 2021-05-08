// react related imports
import axios from 'axios';

// custom config constants imports
import { apiBaseURL } from '../config/config';

// action types;
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
} from './actionTypes';

const pirmaryColor = '#094c59';

const getConfig = (contentType, authNeeded) => {
    let token;
    if (localStorage.token) {
        token = localStorage.getItem('token');
    }
    // config for ajax call
    let config = {
        headers: {
            'Content-Type': contentType,
        },
    };
    if (authNeeded) {
        config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': contentType,
            },
            withCredentials: true,
        };
    }
    return config;
};

// reset loading property of specified state
export const resetLoading = (state) => {
    return async function (dispatch) {
        dispatch({ type: RESET_LOADING, payload: state });
    };
};

// action to show alerts or info
export const setAlert = (color, message, timeout) => {
    // not an async function as it is not related to API calls and just static timeout
    return function (dispatch) {
        dispatch({ type: SET_ALERT, payload: { color, message } });
        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: { color, message } }),
            timeout * 1000
        );
    };
};

// User register action creator
export const registerUser = (body) => {
    return async function (dispatch) {
        // const config = {
        //     'Content-Type': 'application/json',
        // };
        try {
            const response = await axios.post(
                `${apiBaseURL}/users/register`,
                body,
                getConfig('application/json')
            );
            // history.replace('/');
            dispatch({ type: REGISTER_USER, payload: response.data });
            dispatch(loadUser());
            dispatch(
                setAlert('green', 'Signed up and logged in successfully', 3)
            );
        } catch (err) {
            if (err.response !== undefined) {
                console.log(err.response.status);
                dispatch({
                    type: LOGIN_SIGNUP_ERROR,
                    payload: err.response.data,
                });
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Servers are down, please try again later',
                        4
                    )
                );
            }
        }
    };
};

// User login action creator
export const loginUser = (body) => {
    return async function (dispatch) {
        // const config = {
        //     'Content-Type': 'application/json',
        // };
        try {
            const response = await axios.post(
                `${apiBaseURL}/users/login`,
                body,
                getConfig('application/json')
            );
            // history.replace('/');
            console.log(response.data);
            dispatch({ type: LOGIN_USER, payload: response.data });
            dispatch(setAlert('green', 'Logged in successfully', 3));
            dispatch(loadUser());
        } catch (err) {
            if (err.response !== undefined) {
                console.log(err.response.status);
                dispatch({
                    type: LOGIN_SIGNUP_ERROR,
                    payload: err.response.data,
                });
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Servers are down, please try again later',
                        4
                    )
                );
            }
        }
    };
};
// logout user
export const logout = () => {
    return async function (dispatch) {
        const response = await axios.get(
            `${apiBaseURL}/users/auth/logout`,
            getConfig(null, true)
        );
        // console.log('logging out');
        dispatch({ type: LOGOUT });
        dispatch(setAlert('green', 'Logged out successfully', 3));
    };
};

// load user when the app loads to check if he is already logged in (from local storage)
export const loadUser = () => {
    return async function (dispatch) {
        console.log('loading user in progress');
        let token;
        if (localStorage.token) {
            token = localStorage.getItem('token');
        }
        try {
            const response = await axios.get(
                `${apiBaseURL}/users/auth/me`,
                getConfig(null, true)
            );
            dispatch({ type: LOAD_USER, payload: response.data.data });
        } catch (err) {
            if (err.response !== undefined) {
                console.log(err.response.status);
                dispatch({
                    type: LOGIN_SIGNUP_ERROR,
                    payload: err.response.data,
                });
                dispatch(setAlert(pirmaryColor, 'Login to view devices', 3));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Servers are down, please try again later',
                        3
                    )
                );
            }
        }
    };
};

// Devices actions
export const getDevices = (sort, select, page, limit, query) => {
    return async function (dispatch) {
        let getURL = `${apiBaseURL}/devices?`;
        if (sort) {
            getURL = getURL + `sort=${sort}`;
        }
        if (select) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `select=${select}`;
            } else {
                getURL = getURL + `&select=${select}`;
            }
        }
        if (page) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `page=${page}`;
            } else {
                getURL = getURL + `&page=${page}`;
            }
        }
        if (limit) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `limit=${limit}`;
            } else {
                getURL = getURL + `&limit=${limit}`;
            }
        }
        if (query) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `${query}`;
            } else {
                getURL = getURL + `&${query}`;
            }
        }
        try {
            const response = await axios.get(
                getURL,
                getConfig('application/json', true)
            );
            dispatch({ type: GET_DEVICES, payload: response.data });
        } catch (err) {
            if (err.response !== undefined) {
                console.log(err.response.status);
                dispatch({
                    type: DEVICES_ERROR,
                    payload: err.response.data,
                });
                dispatch(setAlert('red', 'err.response.data.data', 3));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Servers are down, please try again later',
                        3
                    )
                );
            }
        }
    };
};
