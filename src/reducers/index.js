import { combineReducers } from 'redux';

const initialState = {
    rootCategories: []
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_ROOT_CATEGORIES':
            return {
                ...state,
            }
        case 'RECEIVE_ROOT_CATEGORIES':
            return {
                ...state,
                rootCategories: action.rootCategories,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    categoriesReducer
});

export default rootReducer;
