import axios from 'axios';

const SERVER_URL = `http://localhost:8080`;

export const REQUEST_ROOT_CATEGORIES = 'REQUEST_ROOT_CATEGORIES';
export const RECEIVE_ROOT_CATEGORIES = 'RECEIVE_ROOT_CATEGORIES';

export const requestRootCategories = () => ({
    type: REQUEST_ROOT_CATEGORIES,
});

export const receiveRootCategories = (data) => ({
    type: RECEIVE_ROOT_CATEGORIES,
    rootCategories: data,
});

const dispatchRootCategories = () => async dispatch => {
    dispatch(requestRootCategories());
    const data = await axios.get(`${SERVER_URL}/api/categories/rootCategories`);
    dispatch(receiveRootCategories(data.data));
}

export const fetchRootCategories = () => async dispatch => {
    return dispatch(dispatchRootCategories());
}