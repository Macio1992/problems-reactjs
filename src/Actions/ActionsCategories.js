import axios from 'axios';

const SERVER_URL = `http://localhost:8080`;

export const REQUEST_ROOT_CATEGORIES = 'REQUEST_ROOT_CATEGORIES';
export const RECEIVE_ROOT_CATEGORIES = 'RECEIVE_ROOT_CATEGORIES';
export const RECEIVE_SUBCATEGORIES = 'RECEIVE_SUBCATEGORIES';

export const requestRootCategories = () => ({
    type: REQUEST_ROOT_CATEGORIES
});

export const receiveRootCategories = rootCategories => ({
    type: RECEIVE_ROOT_CATEGORIES,
    rootCategories,
});

export const receiveSubcategories = (subcategories, id) => ({
    type: RECEIVE_SUBCATEGORIES,
    payload: {
        subcategories,
        id,
    },
});

const dispatchRootCategories = () => async dispatch => {
    dispatch(requestRootCategories());
    const rootCategories = await axios.get(`${SERVER_URL}/api/categories/rootCategories`);
    dispatch(receiveRootCategories(rootCategories.data));

    for (let i = 0; i < rootCategories.data.length; i++) {
        const { _id: id } = rootCategories.data[i];
        const subcategories = await axios.get(`${SERVER_URL}/api/categories/subcategories/${id}`);
        dispatch(receiveSubcategories(subcategories.data, id));
    }
}

export const fetchRootCategories = () => async dispatch => {
    return dispatch(dispatchRootCategories());
}
