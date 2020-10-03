import { combineReducers } from 'redux';

const initialState = {
    rootCategories: {}
}

const categoriesReducer = (state = initialState, action) => {
    let rootCategoriesObject;

    switch (action.type) {
        case 'REQUEST_ROOT_CATEGORIES':
            return {
                ...state,
            }
        case 'RECEIVE_ROOT_CATEGORIES':
            const { rootCategories } = action;

            rootCategoriesObject = {};
            rootCategories.forEach(category => {
                const { _id: id, CategoryName } = category;
                rootCategoriesObject[id] = {
                    CategoryName
                };
            });

            return {
                ...state,
                rootCategories: rootCategoriesObject,
            }
        case 'RECEIVE_SUBCATEGORIES':
            const { subcategories, id } = action.payload;

            rootCategoriesObject = state.rootCategories;
            rootCategoriesObject[id] = {
                subcategories,
            }

            return {
                ...state,
                rootCategories: rootCategoriesObject,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    categoriesReducer
});

export default rootReducer;
